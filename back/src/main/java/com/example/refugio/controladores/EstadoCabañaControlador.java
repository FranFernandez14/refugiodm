package com.example.refugio.controladores;

import com.example.refugio.entidades.CabañaEstado;
import com.example.refugio.entidades.Caracteristica;
import com.example.refugio.entidades.EstadoCabaña;
import com.example.refugio.servicios.CaracteristicaServicio;
import com.example.refugio.servicios.EstadoCabañaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/estados")
public class EstadoCabañaControlador {

    @Autowired
    private EstadoCabañaServicio estadoCabañaServicio;

    @GetMapping ("/estadoscabaña")
    public List<EstadoCabaña> getEstadosCabaña (){
        return estadoCabañaServicio.getEstadosCabaña();
    }
    @PostMapping ("/estadoscabaña")
    public void saveUpdate (@RequestBody EstadoCabaña estadoCabaña){
        estadoCabañaServicio.saveOrUpdate(estadoCabaña);
    }

    @DeleteMapping ("/estadoscabaña/{Id}")
    public void delete(@PathVariable("Id") Long id){
        estadoCabañaServicio.delete(id);
    }

    @GetMapping ("/estadoscabaña/{Id}")
    public Optional<EstadoCabaña> getById (@PathVariable ("id") Long id){
        return estadoCabañaServicio.getEstadoCabaña(id);
    }
}
