__OAuth2 authentication, Spring Security__
OAuth2 authentication in a Java web application using Spring Security
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private DataSource dataSource;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/api/**").authenticated()
            .and()
            .oauth2Login()
            .and()
            .oauth2ResourceServer().jwt();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.jdbcAuthentication()
            .dataSource(dataSource)
            .usersByUsernameQuery("SELECT username, password, enabled FROM users WHERE username = ?")
            .authoritiesByUsernameQuery("SELECT username, role FROM user_roles WHERE username = ?");
    }
}

@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/user")
    public Map<String, String> getUserDetails(@AuthenticationPrincipal Jwt jwt) {
        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("username", jwt.getSubject());
        userDetails.put("email", jwt.getClaim("email"));
        userDetails.put("roles", jwt.getClaimAsStringList("roles").toString());
        return userDetails;
    }
}

```
In this example, we have a SecurityConfig class that extends WebSecurityConfigurerAdapter and configures Spring Security to use OAuth2 authentication. We specify that requests to the /api/** path require authentication, and we configure OAuth2 login and resource server using JWT.
We also override the configure(AuthenticationManagerBuilder auth) method to specify the database and queries to use for user authentication.
In the ApiController, we have a simple REST endpoint that returns the authenticated user's details. We use the @AuthenticationPrincipal annotation to inject the Jwt token into the method, which we then use to extract the user's username, email, and roles.
This is just a simplified example, but it demonstrates how to use OAuth2 authentication with Spring Security in a Java web application. By configuring the SecurityConfig class and writing custom endpoints to handle authenticated requests, you can build a secure and scalable web application that provides a seamless user experience.

_fredrik (at) conva se_
