package com.example.refugio.controladores;

import com.example.refugio.entidades.Calificacion;
import com.example.refugio.entidades.Caracteristica;
import com.example.refugio.servicios.CalificacionServicio;
import com.example.refugio.servicios.CaracteristicaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/cabañas/tipos/caracteristicas")
public class CaracteristicaControlador {

    @Autowired
    private CaracteristicaServicio caracteristicaServicio;

    @GetMapping
    public List<Caracteristica> getCaracteristicas (){
        return caracteristicaServicio.getCaracteristicas();
    }
    @PostMapping
    public void saveUpdate (@RequestBody Caracteristica caracteristica){
        caracteristicaServicio.saveOrUpdate(caracteristica);
    }

    @DeleteMapping ("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        caracteristicaServicio.delete(id);
    }

    @GetMapping ("/{Id}")
    public Optional<Caracteristica> getById (@PathVariable ("id") Long id) {
        return caracteristicaServicio.getCaracteristica(id);
    }
}
