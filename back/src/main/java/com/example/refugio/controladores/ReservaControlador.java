package com.example.refugio.controladores;

import com.example.refugio.dto.ReservaDTO;
import com.example.refugio.entidades.*;
import com.example.refugio.repositorios.EstadoCabañaRepositorio;
import com.example.refugio.repositorios.EstadoReservaRepositorio;
import com.example.refugio.servicios.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/reservas")

public class ReservaControlador {

    @Autowired
    private ReservaServicio reservaServicio;

    @GetMapping
    public List<Reserva> getReservas(){
        return reservaServicio.getReservas();
    }

    @PostMapping
    public void saveUpdate (@RequestBody Reserva reserva){
        reservaServicio.saveOrUpdate(reserva);
    }

    @DeleteMapping ("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        reservaServicio.delete(id);
    }

    @GetMapping("/{id}")
    public Optional<Reserva> getById (@PathVariable ("id") Long id){
        return reservaServicio.getReserva(id);
    }

    @PostMapping ("/reservar")
    public ResponseEntity<String> reservar(@RequestBody ReservaDTO reservaDTO){
       return reservaServicio.reservar(reservaDTO);
    }



}
