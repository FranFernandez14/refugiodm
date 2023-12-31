package com.example.refugio.controladores;


import com.example.refugio.dto.CalificacionDTO;
import com.example.refugio.dto.salida.CalificacionesDTO;
import com.example.refugio.entidades.Calificacion;
import com.example.refugio.servicios.CalificacionServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/reservas/calificaciones")
public class CalificacionControlador {

    @Autowired
    private CalificacionServicio calificacionServicio;

    @GetMapping
    public List<CalificacionesDTO> getCalificaciones (){
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

    @GetMapping ("/{id}")
    public CalificacionDTO getCalificacion (@PathVariable ("id") Long id) {
        return calificacionServicio.getCalificacion(id);
    }

    @PostMapping("/calificar/{id}")
    public void calificar(@PathVariable ("id") Long id, @RequestBody CalificacionDTO calificacionDTO){
        calificacionServicio.calificar(id, calificacionDTO);
    }

    @PutMapping("editar/{id}")
    public void editar(@PathVariable ("id")Long id, @RequestBody CalificacionDTO calificacionDTO){
        calificacionServicio.editar(id, calificacionDTO);
    }
}
