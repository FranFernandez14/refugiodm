package com.example.refugio.servicios;

import com.example.refugio.entidades.Permiso;
import com.example.refugio.repositorios.PermisoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermisoServicio {

    @Autowired
    PermisoRepositorio permisoRepositorio;

    public List<Permiso> getPermisos(){
        return permisoRepositorio.findAll();
    }
}
