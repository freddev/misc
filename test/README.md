__unit test__
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

__component test__
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

__integration test__
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

__cucumber test__
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

__load test__
1. Create a new test plan in JMeter by selecting "File" > "New Test Plan" from the menu.
2. Add a thread group to the test plan by right-clicking on the test plan and selecting "Add" > "Threads (Users)" > "Thread Group".
3. Set the number of threads (users) and the ramp-up period in the thread group. For example, you could set the number of threads to 100 and the ramp-up period to 10 seconds, which would mean that JMeter would start 10 new threads (users) per second until it reaches 100 threads (users).
4. Add a sampler to the thread group by right-clicking on the thread group and selecting "Add" > "Sampler" > "HTTP Request".
5. Configure the HTTP request sampler with the URL of the endpoint you want to test, the method (GET, POST, etc.), and any parameters or headers required.
6. Add a listener to the thread group by right-clicking on the thread group and selecting "Add" > "Listener". There are several different types of listeners available in JMeter, but for a load test, you will likely want to use the "Aggregate Report" or "Summary Report" listener.
7. Run the load test by selecting "Run" > "Start" from the menu.
8. Here's an example JMeter test plan (partial) that sends HTTP GET requests to a web server and measures the response time:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jmeterTestPlan version="1.2" properties="3.3" jmeter="5.4.1">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Example Load Test" enabled="true">
      <stringProp name="TestPlan.comments"></stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <stringProp name="TestPlan.user_define_classpath"></stringProp>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Example Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">-1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">100</stringProp>
        <stringProp name="ThreadGroup.ramp_time">10</stringProp>
        <longProp name="ThreadGroup.start_time">1618768981000</longProp>
        <longProp name="ThreadGroup.end_time">1618768981000</longProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <stringProp name="ThreadGroup.duration"></stringProp>
        <stringProp name="ThreadGroup.delay"></stringProp>
      </ThreadGroup>
              :
              :
```

_fredrik (at) conva se_