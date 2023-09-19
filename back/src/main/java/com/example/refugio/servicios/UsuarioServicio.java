package com.example.refugio.servicios;

import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {
    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    public List<Usuario> getUsuarios(){
        return usuarioRepositorio.findAll();
    }

    public Optional<Usuario> getUsuario(Long id){
        return usuarioRepositorio.findById(id);
    }

    public Optional<Usuario> getUsuarioByEmail(String email){
        return usuarioRepositorio.findByEmail(email);
    }

    public void saveOrUpdate(Usuario usuario){
        usuarioRepositorio.save(usuario);
    }

    public void delete (Long id){
        usuarioRepositorio.deleteById(id);
    }

}
