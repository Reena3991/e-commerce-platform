package com.ecommerce.config;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class AuthorizationUserDetailsService
		implements AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> {

	@Override
	public UserDetails loadUserDetails(PreAuthenticatedAuthenticationToken token) throws UsernameNotFoundException {
		final String principal = (String) token.getPrincipal();
		final String credential = (String) token.getCredentials();
		List<SimpleGrantedAuthority> authorities = new ArrayList<SimpleGrantedAuthority>();
		if (principal == null || principal.isEmpty() || credential == null || credential.isEmpty()) {
			return new User("xxxx", "", authorities);
		}

		List<String> listPrincipal = Stream.of(principal.split(",")).collect(Collectors.toList());

		listPrincipal.forEach(principalObj -> authorities.add(new SimpleGrantedAuthority(principalObj)));

		return new User(credential, "", authorities);

	}
}
