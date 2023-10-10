package com.example.refugio.servicios;

import com.example.refugio.dto.CalificarDTO;
import com.example.refugio.entidades.Calificacion;
import com.example.refugio.entidades.Reserva;
import com.example.refugio.repositorios.CalificacionRepositorio;
import com.example.refugio.repositorios.ReservaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CalificacionServicio {

    @Autowired
    private CalificacionRepositorio calificacionRepositorio;

    @Autowired
    private ReservaRepositorio reservaRepositorio;


    public List<Calificacion> getCalificaciones(){
        return calificacionRepositorio.findAll();
    }

    public Optional<Calificacion> getCalificacion(Long id){
        return calificacionRepositorio.findById(id);
    }


    public void saveOrUpdate(Calificacion calificacion){
        calificacionRepositorio.save(calificacion);
    }

    public void delete (Long id){
        calificacionRepositorio.deleteById(id);
    }


    public void calificar(Long id, CalificarDTO calificarDTO) {
        Calificacion calificacion = new Calificacion();
        Reserva reserva = reservaRepositorio.getReferenceById(id);
        calificacion.setReseña(calificarDTO.getReseña());
        calificacion.setPuntaje(calificarDTO.getPuntaje());
        calificacion.setReserva(reserva);
        calificacion.setFechaReseña(LocalDateTime.now());

        calificacionRepositorio.save(calificacion);
        reserva.setCalificacion(calificacion);
        reservaRepositorio.save(reserva);
    }

    public void editar(Long id, CalificarDTO calificarDTO) {
        Calificacion calificacion = calificacionRepositorio.getReferenceById(id);
        calificacion.setReseña(calificarDTO.getReseña());
        calificacion.setPuntaje(calificarDTO.getPuntaje());
        calificacionRepositorio.save(calificacion);
    }
}
