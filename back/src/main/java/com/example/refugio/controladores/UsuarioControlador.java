package com.example.refugio.controladores;

import com.example.refugio.dto.CambiarRolDTO;
import com.example.refugio.dto.ModificarDatosDTO;
import com.example.refugio.dto.salida.VerUsuariosDTO;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.servicios.UsuarioServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping (path = "api/usuarios")
public class UsuarioControlador {

    @Autowired
    private UsuarioServicio usuarioServicio;
    @GetMapping
    public Page<VerUsuariosDTO> getUsuarios ( Pageable pageable){
        return usuarioServicio.buscar(pageable);
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

    @PostMapping("/modificarDatos")
    public void modificarDatos(@RequestBody ModificarDatosDTO modificarDatosDTO){
        usuarioServicio.modificarDatos(modificarDatosDTO);
    }

    @PutMapping("/darDeBaja/{id}")
    public void darDeBaja(@PathVariable("id") Long id){
        usuarioServicio.darDeBaja(id);
    }

    @PutMapping("/cancelarBaja/{id}")
    public void cancelarBaja(@PathVariable("id") Long id){
        usuarioServicio.cancelarBaja(id);
    }



    @GetMapping("/buscar")
    public Page<VerUsuariosDTO> buscarPorParametros(@RequestParam List<String> parametros,   Pageable pageable){
        return usuarioServicio.buscarUsuarios(parametros, pageable);
    }

    @PutMapping("/cambiarRol")
    public void cambiarRola (@RequestBody CambiarRolDTO cambiarRolDTO){
        usuarioServicio.cambiarRol(cambiarRolDTO);
    }
    }
