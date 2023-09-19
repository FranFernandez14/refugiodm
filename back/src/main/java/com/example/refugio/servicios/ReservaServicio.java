package com.example.refugio.servicios;


import com.example.refugio.dto.ReservaDTO;
import com.example.refugio.entidades.*;
import com.example.refugio.repositorios.EstadoCabañaRepositorio;
import com.example.refugio.repositorios.EstadoReservaRepositorio;
import com.example.refugio.repositorios.ReservaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaServicio {

    @Autowired
    ReservaRepositorio reservaRepositorio;

    @Autowired
    private CabañaServicio cabañaServicio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private ReservaEstadoServicio reservaEstadoServicio;

    @Autowired
    private EstadoReservaRepositorio estadoReservaRepositorio;

    @Autowired
    private EstadoCabañaRepositorio estadoCabañaRepositorio;

    @Autowired
    private CabañaEstadoServicio cabañaEstadoServicio;

    public List<Reserva> getReservas(){
        return reservaRepositorio.findAll();
    }

    public Optional<Reserva> getReserva(Long id){
        return reservaRepositorio.findById(id);
    }


    public void saveOrUpdate(Reserva reserva){
        reservaRepositorio.save(reserva);
    }

    public void delete (Long id){
        reservaRepositorio.deleteById(id);
    }

    public ResponseEntity<String> reservar( ReservaDTO reservaDTO){
        try{
            if(reservaDTO.getCantPersonas() > cabañaServicio.getCabaña(reservaDTO.getIDCabaña()).get().getTamaño()){
                return new ResponseEntity<>("La cabaña no admite tantas personas", HttpStatus.BAD_REQUEST);
            }

            /*
            List<CabañaEstado> estados = cabañaServicio.getCabaña(reservaDTO.getIDCabaña()).get().getEstados();
            for (CabañaEstado estado: estados) {
                if(true){
                    return new ResponseEntity<>("Ya hay una reserva en esas fechas", HttpStatus.BAD_REQUEST);
                }
            }
            */

            Reserva reserva = new Reserva();
            reserva.setMontoTotal(reservaDTO.getMontoTotal());
            reserva.setFechaInicio(reservaDTO.getFechaInicio());
            reserva.setFechaFin(reservaDTO.getFechaFin().minusDays(1));
            reserva.setCantPersonas(reservaDTO.getCantPersonas());

            Usuario usuario = usuarioServicio.getUsuario(reservaDTO.getIDUsuario()).get();

            reserva.setUsuario(usuario);

            Cabaña cabaña = cabañaServicio.getCabaña(reservaDTO.getIDCabaña()).get();
            reserva.setCabaña(cabaña);

            ReservaEstado reservaEstado = new ReservaEstado();
            reservaEstado.setEstadoReserva(estadoReservaRepositorio.findByNombreER("Reservada").get());
            reserva.setReservasEstado(Collections.singletonList(reservaEstado));

            reserva.setFechaReserva(LocalDateTime.now());

            reservaRepositorio.save(reserva);
            usuario.getReservas().add(reserva);
            usuarioServicio.saveOrUpdate(usuario);

            reservaEstado.setFechaInicioRE(LocalDateTime.now());
            reservaEstado.setReserva(reserva);
            reservaEstadoServicio.saveOrUpdate(reservaEstado);

            cabaña.getReservas().add(reserva);

            CabañaEstado cabañaEstado = new CabañaEstado();
            cabañaEstado.setEstadoCabaña(estadoCabañaRepositorio.findByNombreEC("Ocupada").get());
            cabañaEstado.setFechaInicioCE(reserva.getFechaInicio());
            cabañaEstado.setFechaFinCE(reserva.getFechaFin().minusDays(1));
            cabañaEstado.setCabaña(cabaña);
            cabaña.getEstados().add(cabañaEstado);
            cabañaEstadoServicio.saveOrUpdate(cabañaEstado);
            cabaña.getEstados().add(cabañaEstado);

            cabañaServicio.saveOrUpdate(cabaña);


            return new ResponseEntity<>("Reserva realizada correctamente", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(reservaDTO.toString() , HttpStatus.BAD_REQUEST);
        }

    }

}
