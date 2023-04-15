__soap__
```java
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBElement;
import javax.xml.namespace.QName;
import javax.xml.ws.Service;
import java.net.URL;

public class MySoapClient {

    public static void main(String[] args) throws Exception {
        // Set the URL of the WSDL file for the web service
        URL wsdlUrl = new URL("http://localhost:8080/myservice?wsdl");

        // Create a QName object for the service and port
        QName serviceName = new QName("http://example.com/myservice", "MyService");
        QName portName = new QName("http://example.com/myservice", "MyServicePort");

        // Create a Service object using the WSDL URL and service/port QNames
        Service service = Service.create(wsdlUrl, serviceName);

        // Get a reference to the web service port using the port QName
        MyServicePort port = service.getPort(portName, MyServicePort.class);

        // Create an input object for the web service operation
        MyServiceInput input = new MyServiceInput();
        input.setName("John");

        // Invoke the web service operation and get the result
        MyServiceOutput output = port.sayHello(input);

        // Print the result to the console
        System.out.println(output.getMessage());
    }
}

```
In this example, we have a Java class called MySoapClient that uses the JAX-WS API to consume a SOAP web service.
We first set the URL of the WSDL file for the web service. We then create a QName object for the service and port, and use them to create a Service object using the Service.create method.
We then get a reference to the web service port using the service.getPort method, passing in the port QName and the Java interface for the port as arguments.
We then create an input object for the web service operation, set its properties, and invoke the web service operation using the port object.
Finally, we print the result of the web service operation to the console.
This is just a simplified example, but it demonstrates how to use the JAX-WS API in Java to consume a SOAP web service. By defining more complex input and output objects and handling errors and exceptions, you can build robust and scalable SOAP clients with Java.

_fredrik (at) conva se_
