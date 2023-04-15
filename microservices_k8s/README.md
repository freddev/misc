__webapp using microservices, jwt, rabbitmq, redis, mongodb deployed to kubernetes in aws__

```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

  @Autowired
  private ProductService productService;

  @GetMapping("/{id}")
  public Product getProductById(@PathVariable String id) {
    return productService.getProductById(id);
  }

  @GetMapping
  public List<Product> getAllProducts() {
    return productService.getAllProducts();
  }

  @PostMapping
  public Product addProduct(@RequestBody Product product) {
    return productService.addProduct(product);
  }
}
``` 
```java
@Service
public class ProductService {

  @Autowired
  private ProductRepository productRepository;

  @Autowired
  private RabbitTemplate rabbitTemplate;

  @Autowired
  private RedisTemplate<String, Product> redisTemplate;

  private static final String PRODUCT_CACHE_KEY = "product:";

  public Product getProductById(String id) {
    // First, check the Redis cache
    String cacheKey = PRODUCT_CACHE_KEY + id;
    Product cachedProduct = redisTemplate.opsForValue().get(cacheKey);
    if (cachedProduct != null) {
      return cachedProduct;
    }

    // If the product isn't in the cache, get it from the database
    Optional<Product> productOptional = productRepository.findById(id);
    if (productOptional.isPresent()) {
      Product product = productOptional.get();
      // Add the product to the cache
      redisTemplate.opsForValue().set(cacheKey, product);
      return product;
    }

    return null;
  }

  public List<Product> getAllProducts() {
    return productRepository.findAll();
  }

  public Product addProduct(Product product) {
    Product savedProduct = productRepository.save(product);
    // Send a message to the inventory service to update inventory
    rabbitTemplate.convertAndSend("inventory.exchange", "update", savedProduct);
    return savedProduct;
  }
}

``` 
```java
@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

}


``` 
```java
@Configuration
public class RabbitMQConfig {

  @Value("${spring.rabbitmq.host}")
  private String rabbitHost;

  @Value("${spring.rabbitmq.port}")
  private int rabbitPort;

  @Value("${spring.rabbitmq.username}")
  private String rabbitUsername;

  @Value("${spring.rabbitmq.password}")
  private String rabbitPassword;

  @Bean
  public ConnectionFactory connectionFactory() {
    CachingConnectionFactory connectionFactory = new CachingConnectionFactory(rabbitHost, rabbitPort);
    connectionFactory.setUsername(rabbitUsername);
    connectionFactory.setPassword(rabbitPassword);
    return connectionFactory;
  }

  @Bean
  public RabbitTemplate rabbitTemplate() {
    return new RabbitTemplate(connectionFactory());
  }
}


``` 
```java
@Configuration
public class RedisConfig {

  @Value("${spring.redis.host}")
  private String redisHost;

  @Value("${spring.redis.port}")
  private int redisPort;

  @Bean
  public RedisConnectionFactory redisConnectionFactory() {
    return new LettuceConnectionFactory(redisHost, redisPort);
  }

  @Bean
  public RedisTemplate<String, Product> redisTemplate() {
    RedisTemplate<String, Product> template = new RedisTemplate<>();
    template.setConnectionFactory(redisConnectionFactory());
    template.setKeySerializer(new StringRedisSerializer());
    template.setValueSerializer(new Jackson2JsonRedisSerializer<>(Product.class));
    return template;
  }
}

``` 
```java
public class Product {

  @Id
  private String id;

  private String name;

  private double price;

  public Product() {}

  public Product(String name, double price) {
    this.name = name;
    this.price = price;
  }

  // Getters and setters omitted for brevity
}

``` 

_fredrik (at) conva se_
