__selenium webdriver in java to automate a web browser__
```java
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class MySeleniumTest {

    public static void main(String[] args) {
        // Set the path to the ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");

        // Create a new instance of the ChromeDriver
        WebDriver driver = new ChromeDriver();

        // Navigate to the Google homepage
        driver.get("https://www.google.com");

        // Find the search box element and enter a query
        WebElement searchBox = driver.findElement(By.name("q"));
        searchBox.sendKeys("Selenium WebDriver");

        // Submit the search query
        searchBox.submit();

        // Wait for the search results page to load
        WebDriverWait wait = new WebDriverWait(driver, 10);
        wait.until(ExpectedConditions.titleContains("Selenium WebDriver - Google Search"));

        // Print the page title and URL to the console
        System.out.println("Page title: " + driver.getTitle());
        System.out.println("Page URL: " + driver.getCurrentUrl());

        // Click the first search result link
        WebElement firstResult = driver.findElement(By.cssSelector("div.rc > div > a"));
        firstResult.click();

        // Wait for the new page to load
        wait.until(ExpectedConditions.titleContains("Selenium WebDriver"));

        // Print the new page title and URL to the console
        System.out.println("New page title: " + driver.getTitle());
        System.out.println("New page URL: " + driver.getCurrentUrl());

        // Close the browser
        driver.quit();
    }
}

```
In this example, we have a Java class called MySeleniumTest that uses Selenium WebDriver to automate a web browser and perform some basic actions. We're using the ChromeDriver, but the same basic principles apply to other browser drivers as well.
We first set the path to the ChromeDriver executable using the webdriver.chrome.driver system property. We then create a new instance of the ChromeDriver and navigate to the Google homepage.
We then find the search box element on the page using its name attribute, enter a query, and submit the search query. We wait for the search results page to load using the ExpectedConditions.titleContains method, and print the page title and URL to the console.
We then click the first search result link on the page, wait for the new page to load, and print the new page title and URL to the console.
Finally, we close the browser using the quit method.
This is just a simplified example, but it demonstrates how to use Selenium WebDriver in Java to automate a web browser and perform various actions. By combining these basic actions with more complex logic and error handling, you can build powerful and scalable automated testing and web scraping systems with Selenium.

_fredrik (at) conva se_
