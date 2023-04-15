__api secured by jwt__
api secured by jwt
```xml
<dependency>
    <groupId>org.springframework.security</groupId>
    <artifactId>spring-security-web</artifactId>
    <version>5.5.0</version>
</dependency>

```
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/").permitAll() // allow access to home page
                .antMatchers("/admin/**").hasRole("ADMIN") // allow access to admin pages only for users with role ADMIN
                .anyRequest().authenticated() // require authentication for all other requests
                .and()
            .formLogin()
                .loginPage("/login") // set the custom login page URL
                .permitAll() // allow access to login page
                .and()
            .logout()
                .permitAll(); // allow access to logout page
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth
            .inMemoryAuthentication()
                .withUser("user").password("{noop}password").roles("USER") // add a user with username 'user', password 'password', and role 'USER'
                .and()
                .withUser("admin").password("{noop}password").roles("ADMIN"); // add a user with username 'admin', password 'password', and role 'ADMIN'
    }
}

```
```java
@Controller
public class LoginController {
    
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";
    }
    
    @GetMapping("/logout")
    public String logout(HttpServletRequest request) throws ServletException {
        request.logout();
        return "redirect:/";
    }
}

```
```java
@RestController
@RequestMapping("/admin")
public class AdminController {
    
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getAllUsers() {
        // return all users
    }
    
    @PostMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public User createUser(@RequestBody User user) {
        // create a new user
    }
    
    // ...
}

```

_fredrik (at) conva se_