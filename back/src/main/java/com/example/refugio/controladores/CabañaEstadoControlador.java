package com.example.refugio.controladores;

import com.example.refugio.entidades.CabañaEstado;
import com.example.refugio.servicios.CabañaEstadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/estados")
public class CabañaEstadoControlador {

    @Autowired
    private CabañaEstadoServicio cabañaEstadoServicio;

    @GetMapping ("/cabañaestados")
    public List<CabañaEstado> getCabañaEstados (){
        return cabañaEstadoServicio.getCabañaEstados();
    }
    @PostMapping ("/cabañaestados")
    public void saveUpdate (@RequestBody CabañaEstado cabañaEstado){
        cabañaEstadoServicio.saveOrUpdate(cabañaEstado);
    }

    @DeleteMapping ("/cabañaestados/{Id}")
    public void delete(@PathVariable("Id") Long id){
        cabañaEstadoServicio.delete(id);
    }

    @GetMapping ("/cabañaestados/{Id}")
    public Optional<CabañaEstado> getById (@PathVariable ("id") Long id){
        return cabañaEstadoServicio.getCabañaEstado(id);
    }
}
