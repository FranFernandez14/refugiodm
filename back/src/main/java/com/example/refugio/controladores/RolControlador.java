package com.example.refugio.controladores;

import com.example.refugio.dto.CambiarRolDTO;
import com.example.refugio.entidades.Rol;
import com.example.refugio.servicios.RolServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/usuarios/roles")
public class RolControlador {

    @Autowired
    RolServicio rolServicio;

    @GetMapping
    public List<Rol> getRoles(){
        return rolServicio.getRoles();
    }

    @PostMapping
    public void saveUpdate (@RequestBody Rol rol){
        rolServicio.saveOrUpdate(rol);
    }

    @DeleteMapping ("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        rolServicio.delete(id);
    }

    @GetMapping("/{id}")
    public Optional<Rol> getById (@PathVariable ("id") Long id){
        return rolServicio.getRol(id);
    }

    @PostMapping("/asignarUsuario")
    public void asignarUsuario(@RequestBody CambiarRolDTO cambiarRolDTO){
        rolServicio.asignarUsuario(cambiarRolDTO);
    }

    @PostMapping("/asignarEmpleado")
    public void asignarEmpleado(@RequestBody CambiarRolDTO cambiarRolDTO){
        rolServicio.asignarEmpleado(cambiarRolDTO);
    }

    @PostMapping("/asignarAdministrador")
    public void asignarAdministrador(@RequestBody CambiarRolDTO cambiarRolDTO){
        rolServicio.asignarAdministrador(cambiarRolDTO);
    }
}
