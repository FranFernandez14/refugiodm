package com.example.refugio.seguridad;

import com.example.refugio.entidades.Rol;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.UsuarioRepositorio;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Component
public class JwtGenerator {

    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    public String generateToken(Authentication authentication){
        String email = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date (currentDate.getTime() + Constantes.JWTExpiration);
        Optional<Usuario> usuario = usuarioRepositorio.findByEmail(email);

        int cantRoles = usuario.get().getRoles().size();
        Long id = usuario.get().getId();

        String token = Jwts.builder()
                .setSubject(email)
                .claim("id", id)
                .claim("cantRoles", cantRoles)
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, Constantes.JWTSecret)
                .compact();
        return token;
    }

    public String getEmailFromJWT(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(Constantes.JWTSecret)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String token){
        try{
            Jwts.parser().setSigningKey(Constantes.JWTSecret).parseClaimsJws(token);
            return true;
        } catch (Exception e){
            throw new AuthenticationCredentialsNotFoundException("JWT expirado o incorrecto");
        }
    }
}
