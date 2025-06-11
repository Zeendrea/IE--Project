package com.appdev.Jobflex.Service;

import com.appdev.Jobflex.Entity.UserEntity;
import com.appdev.Jobflex.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // Get Google attributes
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String googleId = (String) attributes.get("sub");
        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");

        // Check if user exists in DB
        Optional<UserEntity> existingUser = userRepository.findByGoogleId(googleId);

        UserEntity user;
        if (existingUser.isPresent()) {
            user = existingUser.get();
        } else {
            // Register new user
            user = new UserEntity();
            user.setGoogleId(googleId);
            user.setEmail(email);
            user.setName(name);
            user.setProfileImage(picture);
            user.setUserType(null); // let frontend choose later
            userRepository.save(user);
        }

        // Create a custom principal that includes our DB user info
        Map<String, Object> customAttributes = new HashMap<>(attributes);
        customAttributes.put("userId", user.getUserId());
        customAttributes.put("userType", user.getUserType());

        return new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("USER")),
                customAttributes,
                "sub"
        );
    }
}
