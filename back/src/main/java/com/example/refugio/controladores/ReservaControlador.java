package com.example.refugio.controladores;

import com.example.refugio.dto.CambiarEstadoReservaDTO;
import com.example.refugio.dto.ReservaDTO;
import com.example.refugio.dto.salida.VerReservaDTO;
import com.example.refugio.dto.salida.VerReservasDTO;
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

    @GetMapping("/pendientes")
    public List<VerReservasDTO> getReservasPendientes(){
        return reservaServicio.getReservasPendientes();
    }

    @GetMapping("/aceptadas")
    public List<VerReservasDTO> getReservasAceptadas(){
        return reservaServicio.getReservasAceptadas();
    }

    @GetMapping("/canceladas")
    public List<VerReservasDTO> getReservasCanceladas(){
        return reservaServicio.getReservasCanceladas();
    }

    @GetMapping("/finalizadas")
    public List<VerReservasDTO> getReservasFinalizadas(){
        return reservaServicio.getReservasFinalizadas();
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
    public VerReservaDTO getReserva (@PathVariable ("id") Long id){
        return reservaServicio.getReserva(id);
    }

    @PostMapping ("/reservar")
    public ResponseEntity<String> reservar(@RequestBody ReservaDTO reservaDTO){
       return reservaServicio.reservar(reservaDTO);
    }

    @PostMapping("/{id}/cancelarByUsuario")
    public void cancelarByUsuario(@PathVariable ("id") Long id){
        reservaServicio.cancelarByUsuario(id);
    }

    @PostMapping("/{id}/cancelarByAdmin")
    public void cancelarByAdmin(@PathVariable ("id") Long id){
        reservaServicio.cancelarByAdmin(id);
    }

    @PostMapping("/{id}/aceptarByAdmin")
    public void aceptarByAdmin(@PathVariable ("id") Long id){
        reservaServicio.aceptarByAdmin(id);
    }

    @PostMapping("/{id}/finalizarByAdmin")
    public void finalizarByAdmin(@PathVariable ("id") Long id){
        reservaServicio.finalizarByAdmin(id);
    }
}
