package com.example.refugio.seguridad;

import com.example.refugio.entidades.Permiso;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    
    private UsuarioRepositorio usuarioRepositorio;

    @Autowired
    public CustomUserDetailsService(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Usuario usuario = usuarioRepositorio.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        return new User(usuario.getEmail(), usuario.getPassword(), mapRolesToAuthorities(usuario.getRol().getPermisos()));

    }

    private Collection<GrantedAuthority> mapRolesToAuthorities(List<Permiso> permisos){
        return permisos.stream().map(permiso -> new SimpleGrantedAuthority((permiso.getNombre()))).collect(Collectors.toList());
    }
}
