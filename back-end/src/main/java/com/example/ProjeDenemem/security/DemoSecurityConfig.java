package com.example.ProjeDenemem.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import javax.sql.DataSource;

@Configuration
public class DemoSecurityConfig {

    /*
    @Bean
    public InMemoryUserDetailsManager userDetailsManager(){
        UserDetails john = User.builder()
                .username("john")
                .password("{noop}test123")
                .roles("Student")
                .build();

        UserDetails johr = User.builder()
                .username("johr")
                .password("{noop}test123")
                .roles("Rector","Student","Department Representative")
                .build();

        UserDetails reas = User.builder()
                .username("reas")
                .password("{noop}test123")
                .roles("Department Representative","Student")
                .build();

        UserDetails atwe = User.builder()
                .username("atwe")
                .password("{noop}test123")
                .roles("Student")
                .build();


        return new InMemoryUserDetailsManager(john,reas,atwe,johr);

    }
*/
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.authorizeHttpRequests(configurer ->
                configurer
                        .requestMatchers("/").hasRole("EMPLOYEE")
                        .requestMatchers("/leaders/**").hasRole("MANAGER")
                        .requestMatchers("/systems/**").hasRole("ADMIN")
                        .anyRequest().authenticated()

            )
                .formLogin(form ->
                        form
                                .loginPage("/showMyLoginPage")
                                .loginProcessingUrl("/authenticateTheUser")
                                .permitAll()

                )

                .logout(logout -> logout.permitAll()
                )

                .exceptionHandling(configurer ->
                        configurer.accessDeniedPage("/access-denied"));
            return http.build();
    }

    // ADD SUPPORT FOR JDBC

    @Bean
    public UserDetailsManager userDetailsManager(DataSource dataSource){
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);
        // define query to retrieve a user by name
        jdbcUserDetailsManager.setUsersByUsernameQuery("select user_id, pw, active from members where user_id=?");


        // define query to retrieve a roles by  username
        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery("select user_id, role from roles where user_id=?");
        return new JdbcUserDetailsManager(dataSource);
    }

}