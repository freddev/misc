__JavaEE__

```java
@Local
public interface ProductService {
    Product createProduct(Product product);
    Product getProduct(long id);
    List<Product> getAllProducts();
    Product updateProduct(Product product);
    void deleteProduct(long id);
}

```
```java
@Stateless
public class ProductServiceImpl implements ProductService {

    @PersistenceContext(unitName = "myPersistenceUnit")
    private EntityManager entityManager;

    @Override
    public Product createProduct(Product product) {
        entityManager.persist(product);
        return product;
    }

    @Override
    public Product getProduct(long id) {
        return entityManager.find(Product.class, id);
    }

    @Override
    public List<Product> getAllProducts() {
        CriteriaQuery<Product> cq = entityManager.getCriteriaBuilder().createQuery(Product.class);
        cq.select(cq.from(Product.class));
        return entityManager.createQuery(cq).getResultList();
    }

    @Override
    public Product updateProduct(Product product) {
        entityManager.merge(product);
        return product;
    }

    @Override
    public void deleteProduct(long id) {
        entityManager.remove(getProduct(id));
    }
}

```
```java
@WebServlet("/products/*")
public class ProductServlet extends HttpServlet {

    @EJB
    private ProductService productService;

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        if (pathInfo == null || pathInfo.equals("/")) {
            List<Product> products = productService.getAllProducts();
            request.setAttribute("products", products);
            request.getRequestDispatcher("/WEB-INF/views/products.jsp").forward(request, response);
        } else {
            String productId = pathInfo.substring(1);
            Product product = productService.getProduct(Long.parseLong(productId));
            request.setAttribute("product", product);
            request.getRequestDispatcher("/WEB-INF/views/product.jsp").forward(request, response);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String name = request.getParameter("name");
        String description = request.getParameter("description");
        double price = Double.parseDouble(request.getParameter("price"));

        Product product = new Product(name, description, price);
        productService.createProduct(product);

        response.sendRedirect(request.getContextPath() + "/products/");
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        String productId = pathInfo.substring(1);
        Product product = productService.getProduct(Long.parseLong(productId));
        product.setName(request.getParameter("name"));
        product.setDescription(request.getParameter("description"));
        product.setPrice(Double.parseDouble(request.getParameter("price")));
        productService.updateProduct(product);
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String pathInfo = request.getPathInfo();
        String productId = pathInfo.substring(1);
        productService.deleteProduct(Long.parseLong(productId));
    }
}

```
```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee" version="3.0">
    <display-name>MyApp</display-name>
    
    <servlet>
        <servlet-name>ProductServlet</servlet-name>
        <servlet-class>com.myapp.ProductServlet</servlet-class>
    </servlet>
    
    <servlet-mapping>
        <servlet-name>ProductServlet</servlet-name>
        <url-pattern>/products/*</url-pattern>
    </servlet-m

```

_fredrik (at) conva se_