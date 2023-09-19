package com.example.refugio.controladores;


import com.example.refugio.entidades.Calificacion;
import com.example.refugio.servicios.CalificacionServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/reservas/calificaciones")
public class CalificacionControlador {

    @Autowired
    private CalificacionServicio calificacionServicio;

    @GetMapping
    public List<Calificacion> getCalificaciones (){
        return calificacionServicio.getCalificaciones();
    }
    @PostMapping
    public void saveUpdate (@RequestBody Calificacion calificacion){
        calificacionServicio.saveOrUpdate(calificacion);
    }

    @DeleteMapping ("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        calificacionServicio.delete(id);
    }

    @GetMapping ("/{Id}")
    public Optional<Calificacion> getById (@PathVariable ("id") Long id) {
        return calificacionServicio.getCalificacion(id);
    }
}
