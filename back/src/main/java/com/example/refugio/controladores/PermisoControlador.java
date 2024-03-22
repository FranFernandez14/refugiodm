package com.example.refugio.controladores;

import com.example.refugio.entidades.Cabaña;
import com.example.refugio.entidades.Permiso;
import com.example.refugio.servicios.PermisoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(path = "api/permisos")
public class PermisoControlador {

    @Autowired
    PermisoServicio permisoServicio;

    @GetMapping
    public List<Permiso> getPermisos() {
        return permisoServicio.getPermisos();
    }
}
