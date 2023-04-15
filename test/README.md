__test__
```java
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ShoppingCartTest {

    @Test
    void testAddItemToCart() {
        // Given a shopping cart
        ShoppingCart cart = new ShoppingCart();

        // When an item is added to the cart
        cart.addItem(new Item("Apple", 1.99));

        // Then the cart should contain the item
        assertTrue(cart.containsItem("Apple"));
    }
}


```
```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class OrderControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testPlaceOrder() throws Exception {
        // Given a customer with an order
        Customer customer = new Customer("John", "Doe");
        Order order = new Order(customer);
        order.addItem(new Item("Apple", 1.99));
        order.addItem(new Item("Banana", 0.99));

        // When the order is placed
        mockMvc.perform(get("/order").flashAttr("order", order))
                .andExpect(status().isOk())
                .andExpect(content().string("Order placed successfully."));
    }
}


```
This component test tests the GreetingController class in a Spring Boot web application by performing an HTTP GET request to the /greeting endpoint with a query parameter name set to "John". The andExpect methods are used to verify that the response has an HTTP status code of 200 and a body content of "Hello, John!".
```java
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.JdbcTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.jdbc.Sql;
import static org.assertj.core.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByUsername() {
        User user = userRepository.findByUsername("john");
        assertThat(user).isNotNull();
        assertThat(user.getUsername()).isEqualTo("john");
        assertThat(user.getEmail()).isEqualTo("john@example.com");
    }

    @Test
    void testSave() {
        User user = new User("jane", "jane@example.com");
        userRepository.save(user);
        assertThat(user.getId()).isNotNull();
    }
}

```
This integration test tests the UserRepository class in a Spring Boot application with an embedded H2 database. The @DataJpaTest annotation sets up a test database with the required configuration for JPA tests. The @AutoConfigureTestDatabase annotation is used to prevent the test database from being replaced with an in-memory database.
```
Feature: Shopping Cart
  As a shopper
  I want to add items to my cart
  So that I can purchase them later

  Scenario: Add item to cart
    Given I have an empty cart
    When I add an apple to the cart
    Then the cart should contain one apple

```

_fredrik (at) conva se_