package com.example.refugio.controladores;

import com.example.refugio.entidades.ReservaEstado;
import com.example.refugio.servicios.ReservaEstadoServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/estados")
public class ReservaEstadoControlador {
    @Autowired
    private ReservaEstadoServicio reservaEstadoServicio;

    @GetMapping("/reservaestados")
    public List<ReservaEstado> getReservaEstados (){
        return reservaEstadoServicio.getReservaEstados();
    }
    @PostMapping("/reservaestados")
    public void saveUpdate (@RequestBody ReservaEstado reservaEstado){
        reservaEstadoServicio.saveOrUpdate(reservaEstado);
    }

    @DeleteMapping("/reservaestados/{Id}")
    public void delete(@PathVariable("Id") Long id){
        reservaEstadoServicio.delete(id);
    }

    @GetMapping ("/reservaestados/{Id}")
    public Optional<ReservaEstado> getById (@PathVariable ("id") Long id){
        return reservaEstadoServicio.getReservaEstado(id);
    }

}
