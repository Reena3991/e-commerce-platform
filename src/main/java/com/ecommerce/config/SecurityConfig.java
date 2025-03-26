package com.ecommerce.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationProvider;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.security.web.authentication.preauth.RequestHeaderAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.authorizeHttpRequests(authorize -> authorize
						.requestMatchers("/**").permitAll()
						.anyRequest().denyAll()
				)
				.csrf(csrf -> csrf.disable())
				.sessionManagement(session -> session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
				)
				.cors(cors -> cors.configurationSource(corsConfigurationSource()))
				.addFilterBefore(siteminderFilter(), RequestHeaderAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(Arrays.asList("*"));
		configuration.setAllowedMethods(Arrays.asList("*"));
		configuration.setAllowedHeaders(Arrays.asList("*"));
		configuration.setAllowCredentials(false);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean(name = "siteminderFilter")
	public RequestHeaderAuthenticationFilter siteminderFilter() {
		RequestHeaderAuthenticationFilter requestHeaderAuthenticationFilter = new RequestHeaderAuthenticationFilter();
		requestHeaderAuthenticationFilter.setPrincipalRequestHeader("roles");
		requestHeaderAuthenticationFilter.setCredentialsRequestHeader("email");
		requestHeaderAuthenticationFilter.setAuthenticationManager(authenticationManager());
		requestHeaderAuthenticationFilter.setExceptionIfHeaderMissing(false);
		return requestHeaderAuthenticationFilter;
	}

	@Bean
	public AuthenticationManager authenticationManager() {
		List<AuthenticationProvider> providers = new ArrayList<>();
		providers.add(preAuthAuthProvider());
		return new ProviderManager(providers);
	}

	@Bean(name = "preAuthProvider")
	public PreAuthenticatedAuthenticationProvider preAuthAuthProvider() {
		PreAuthenticatedAuthenticationProvider provider = new PreAuthenticatedAuthenticationProvider();
		provider.setPreAuthenticatedUserDetailsService(userDetailsServiceWrapper());
		return provider;
	}

	@Bean
	public AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> userDetailsServiceWrapper() {
		return new AuthorizationUserDetailsService();
	}
}