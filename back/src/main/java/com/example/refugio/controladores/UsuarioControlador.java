package com.example.refugio.controladores;

import com.example.refugio.entidades.Usuario;
import com.example.refugio.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping (path = "api/usuarios")
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;
    @GetMapping
    public List<Usuario> getUsuarios (){
        return usuarioServicio.getUsuarios();
    }
    @PostMapping
    public void saveUpdate (@RequestBody Usuario usuario){
       usuarioServicio.saveOrUpdate(usuario);
    }

    @DeleteMapping ("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        usuarioServicio.delete(id);
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getById (@PathVariable ("id") Long id){
        return usuarioServicio.getUsuario(id);
    }

    }
