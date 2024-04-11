package com.example.refugio.controladores;

import com.example.refugio.dto.BuscarReservasDTO;
import com.example.refugio.dto.CambiarEstadoReservaDTO;
import com.example.refugio.dto.ReservaDTO;
import com.example.refugio.dto.salida.VerReservaDTO;
import com.example.refugio.dto.salida.VerReservasDTO;
import com.example.refugio.entidades.*;
import com.example.refugio.repositorios.EstadoCabañaRepositorio;
import com.example.refugio.repositorios.EstadoReservaRepositorio;
import com.example.refugio.servicios.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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

    @GetMapping("/iniciadas")
    public List<VerReservasDTO> getReservasIniciadas(){
        return reservaServicio.getReservasIniciadas();
    }


    @GetMapping("/byState")
    public ResponseEntity<Page<VerReservasDTO>> getReservasByState(
            @RequestParam Long estado,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fechaFin,
            Pageable pageable) {
        Page<VerReservasDTO> reservas = reservaServicio.getReservasByState(estado, fechaInicio, fechaFin, pageable);
        return ResponseEntity.ok().body(reservas);
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

    @PostMapping("/cancelarByUsuario/{id}")
    public void cancelarByUsuario(@PathVariable ("id") Long id){
        reservaServicio.cancelarByUsuario(id);
    }

    @PostMapping("/cancelarByAdmin/{id}")
    public void cancelarByAdmin(@PathVariable ("id") Long id){
        reservaServicio.cancelarByAdmin(id);
    }

    @PostMapping("/aceptarByAdmin/{id}")
    public void aceptarByAdmin(@PathVariable ("id") Long id){
        reservaServicio.aceptarByAdmin(id);
    }

    @PostMapping("/finalizarByAdmin/{id}")
    public void finalizarByAdmin(@PathVariable ("id") Long id){
        reservaServicio.finalizarByAdmin(id);
    }

    @PostMapping("/iniciarByAdmin/{id}")
    public void iniciarByAdmin(@PathVariable ("id") Long id){
        reservaServicio.iniciarByAdmin(id);
    }

    @GetMapping("/misreservas/{idUsuario}")
    public List<VerReservasDTO> getReservasByUsuario(@PathVariable ("idUsuario") Long id){
        return reservaServicio.getReservasByUsuario(id);
    }
}
