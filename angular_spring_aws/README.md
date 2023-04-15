### crud webapp with angular fe, springboot be, deployed to aws
how to create a crud web application with angular frontend and spring boot backend, deployed to aws 
#### step 1: create a document database in mongodb atlas

To store our data, we will use a MongoDB document database. We will use MongoDB Atlas, which is a cloud-based service that offers a free-tier database. Here are the steps to create a database in MongoDB Atlas:

1. Go to https://www.mongodb.com/cloud/atlas and create an account or log in.
2. Create a new project by clicking on "Create a New Project".
3. Give your project a name and choose an organization (if you have multiple organizations). Then click on "Create Project".
4. Choose "Build a Cluster" to create a new database.
5. Choose a cloud provider and a region for your database. We will use AWS and choose "US East (N. Virginia)".
6. Choose "M0 Sandbox" for database size and then click on "Create Cluster".

When your database is ready, click on "Connect" and follow the instructions to connect to your database.

#### step 2: create a spring boot backend

Now that we have our database ready, let's create our Spring Boot backend. Here are the steps:

1. Open your favorite IDE and create a new project with Spring Initializr.
2. Add the following dependencies:
    - Spring Web
    - Spring Data MongoDB
    - Spring Boot DevTools (optional)
3. Create a new model class that represents our data. For example:
    ```java
    @Document(collection = "products")
    public class Product {
        @Id
        private String id;
        private String name;
        private String description;
        private double price;
        // getters and setters
    }
    ```
4. Create a new repository class that will handle our database access. For example:
    ```java
    @Repository
    public interface ProductRepository extends MongoRepository<Product, String> {}
    ```
5. Create a new controller class that will handle our HTTP requests. For example:
    ```java
    @RestController
    @RequestMapping("/api/products")
    public class ProductController {
        @Autowired
        private ProductRepository productRepository;
        
        @GetMapping
        public List<Product> getAllProducts() {
            return productRepository.findAll();
        }
        
        @PostMapping
        public Product addProduct(@RequestBody Product product) {
            return productRepository.save(product);
        }
        
        @PutMapping("/{id}")
        public Product updateProduct(@PathVariable String id, @RequestBody Product product) {
            product.setId(id);
            return productRepository.save(product);
        }
        
        @DeleteMapping("/{id}")
        public void deleteProduct(@PathVariable String id) {
            productRepository.deleteById(id);
        }
    }
    ```
6. Configure your application to connect to your MongoDB database. You can do this by adding the following code to your `application.properties` file:
    ```
    spring.data.mongodb.uri=mongodb+srv://<username>:<password>@<cluster-name>.<region>.mongodb.net/test?retryWrites=true&w=majority
    ```
   Remember to replace `<username>`, `<password>`, `<cluster-name>`, and `<region>` with your own values.
7. Create a new repository class that will handle our database access. For example:
   ```java
   @Repository
   public interface ProductRepository extends MongoRepository<Product, String> {}
   ```
8. Create a new controller class that will handle our HTTP requests. For example:
   ```java
   @RestController
   @RequestMapping("/api")
   public class ProductController {
     @Autowired
     private ProductRepository productRepository;

     @GetMapping("/products")
     public List<Product> getAllProducts() {
       return productRepository.findAll();
     }

     @PostMapping("/products")
     public Product createProduct(@RequestBody Product product) {
       return productRepository.save(product);
     }

     @GetMapping("/products/{id}")
     public ResponseEntity<Product> getProductById(@PathVariable(value = "id") String productId) {
       Optional<Product> product = productRepository.findById(productId);
       if (product.isPresent()) {
         return ResponseEntity.ok().body(product.get());
       } else {
         return ResponseEntity.notFound().build();
       }
     }

     @PutMapping("/products/{id}")
     public ResponseEntity<Product> updateProduct(@PathVariable(value = "id") String productId,
       @RequestBody Product productDetails) {
       Optional<Product> product = productRepository.findById(productId);
       if (product.isPresent()) {
         Product updatedProduct = product.get();
         updatedProduct.setName(productDetails.getName());
         updatedProduct.setDescription(productDetails.getDescription());
         updatedProduct.setPrice(productDetails.getPrice());
         Product savedProduct = productRepository.save(updatedProduct);
         return ResponseEntity.ok().body(savedProduct);
       } else {
         return ResponseEntity.notFound().build();
       }
     }

     @DeleteMapping("/products/{id}")
     public ResponseEntity<String> deleteProduct(@PathVariable(value = "id") String productId) {
       Optional<Product> product = productRepository.findById(productId);
       if (product.isPresent()) {
         productRepository.delete(product.get());
         return ResponseEntity.ok().body("Product deleted successfully");
       } else {
         return ResponseEntity.notFound().build();
       }
     }
   }```
9. Build your Spring Boot application by running the following command:
      ```bash
      ./mvnw clean package
      ```
10. Start your Spring Boot application by running the following command:
      ```bash
      java -jar target/my-app-0.0.1-SNAPSHOT.jar
      ```
11. Open your web browser and navigate to http://localhost:8080. You should see a JSON representation of your products. You can also test your API endpoints using a tool like Postman.
#### step 3: create an angular frontend
1. Now that our backend is up and running, let's move on to creating the frontend of our web application using Angular.
2. Install the latest version of Angular CLI by running the following command:
      ```bash
      npm install -g @angular/cli
      ng new my-app
      cd my-app
      ng generate component product-list
      ```
3. Update the HTML template of the product-list component to display the list of products. For example:
      ```html
        <h1>Products</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let product of products">
              <td>{{ product.name }}</td>
              <td>{{ product.description }}</td>
              <td>{{ product.price }}</td>
            </tr>
          </tbody>
        </table>
    
      ``` 
4. Update the TypeScript code of the product-list component to fetch the list of products from our backend. For example:
      ```typescript
        import { Component, OnInit } from '@angular/core';
        import { HttpClient } from '@angular/common/http';
        
        @Component({
          selector: 'app-product-list',
          templateUrl: './product-list.component.html',
          styleUrls: ['./product-list.component.css']
        })
        export class ProductListComponent implements OnInit {
          products: any[] = [];
        
          constructor(private http: HttpClient) { }
        
          ngOnInit(): void {
            this.http.get<any[]>('/api/products').subscribe(products => {
              this.products = products;
            });
          }
        }  
      ```
5. Create a new Angular service that will handle the HTTP requests to our backend. For example:
      ```
      ng generate service product  
      ```
6. Update the TypeScript code of the product service to handle the HTTP requests to our backend. For example:
      ```typescript
        import { Injectable } from '@angular/core';
        import { HttpClient } from '@angular/common/http';
        
        @Injectable({
          providedIn: 'root'
        })
        export class ProductService {
          constructor(private http: HttpClient) { }
        
          getAllProducts() {
            return this.http.get<any[]>('/api/products');
          }
        
          createProduct(product: any) {
            return this.http.post<any>('/api/products', product);
          }
        
          getProductById(id: string) {
            return this.http.get<any>(`/api/products/${id}`);
          }
        
          updateProduct(id: string, product: any) {
            return this.http.put<any>(`/api/products/${id}`, product);
          }
        
          deleteProduct(id: string) {
            return this.http.delete<any>(`/api/products/${id}`);
          }
        }  
      ```
7. Update the TypeScript code of the product-list component to use the product service. For example:
      ```typescript
        import { Component, OnInit } from '@angular/core';
        import { ProductService } from '../product.service';
        
        @Component({
          selector: 'app-product-list',
          templateUrl: './product-list.component.html',
          styleUrls: ['./product-list.component.css']
        })
        export class ProductListComponent implements OnInit {
          products: any[] = [];
        
          constructor(private productService: ProductService) { }
        
          ngOnInit(): void {
            this.productService.getAllProducts().subscribe(products => {
              this.products = products;
            });
          }
        }
    ```
8. Test the application by running the following command:
    ```bash
    ng serve
    ``` 
9. Build your Angular application by running the following command:
    ```bash
    ng build --prod
    ``` 
#### Step 4: package and deploy to aws
1. Now that our Angular application is built, let's deploy it to AWS using Elastic Beanstalk. 
Navigate to the AWS Management Console and search for Elastic Beanstalk.
2. Click on "Create Application" and follow the steps to create a new application.
3. Once the application is created, click on "Create Environment" and choose "Web server environment".
4. Choose "Upload your code" and upload the .zip file of your Angular application that was generated in the previous step.
5. Choose a preconfigured platform for your environment. For example, "Node.js" for an Angular application.
6. Configure your environment by giving it a name, setting up the load balancer, and choosing your database and storage options.
7. Review your environment settings and create your environment.
8. Once your environment is created, you can access your deployed Angular application by clicking on the environment URL that is displayed in the Elastic Beanstalk console.

_fredrik (at) conva se_