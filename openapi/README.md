__openapi__
```java
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.example.controller"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(apiInfo());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("My API")
                .description("This is a sample API")
                .version("1.0")
                .build();
    }
}
```
```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/hello")
    @ApiOperation(value = "Get a hello message", response = String.class)
    public String hello() {
        return "Hello, World!";
    }
}

```
_fredrik (at) conva se_
