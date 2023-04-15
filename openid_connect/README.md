__openid connect__
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/api/**").authenticated()
            .and()
            .oauth2Login()
            .userInfoEndpoint()
            .oidcUserService(oidcUserService());
    }

    private OidcUserService oidcUserService() {
        return new OidcUserService() {
            @Override
            public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
                OidcUser oidcUser = super.loadUser(userRequest);
                // Map the OIDC user claims to Spring Security authorities
                Set<GrantedAuthority> authorities = new HashSet<>();
                authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
                return new DefaultOidcUser(authorities, oidcUser.getIdToken(), oidcUser.getUserInfo());
            }
        };
    }
}

```
```java
@RestController
@RequestMapping("/api")
public class ApiController {

    @GetMapping("/user")
    public Map<String, String> getUserDetails(@AuthenticationPrincipal OidcUser oidcUser) {
        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("username", oidcUser.getName());
        userDetails.put("email", oidcUser.getEmail());
        userDetails.put("roles", oidcUser.getAuthorities().toString());
        return userDetails;
    }
}
```


_fredrik (at) conva se_
