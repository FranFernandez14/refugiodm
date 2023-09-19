package com.example.refugio.controladores;

import com.example.refugio.entidades.EstadoReserva;
import com.example.refugio.servicios.EstadoReservaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/estados")
public class EstadoReservaControlador {

    @Autowired
    private EstadoReservaServicio estadoReservaServicio;

    @GetMapping("/estadosreserva")
    public List<EstadoReserva> getEstadosReserva (){
        return estadoReservaServicio.getEstadosReserva();
    }
    @PostMapping("/estadosreserva")
    public void saveUpdate (@RequestBody EstadoReserva estadoReserva){
        estadoReservaServicio.saveOrUpdate(estadoReserva);
    }

    @DeleteMapping ("/estadosreserva/{Id}")
    public void delete(@PathVariable("Id") Long id){
        estadoReservaServicio.delete(id);
    }

    @GetMapping ("/estadosreserva/{Id}")
    public Optional<EstadoReserva> getById (@PathVariable ("id") Long id){
        return estadoReservaServicio.getEstadoReserva(id);
    }

}
