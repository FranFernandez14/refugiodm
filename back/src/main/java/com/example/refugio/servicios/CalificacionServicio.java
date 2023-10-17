package com.example.refugio.servicios;

import com.example.refugio.dto.CalificacionDTO;
import com.example.refugio.dto.salida.CalificacionesDTO;
import com.example.refugio.entidades.Calificacion;
import com.example.refugio.entidades.Reserva;
import com.example.refugio.repositorios.CalificacionRepositorio;
import com.example.refugio.repositorios.EstadoReservaRepositorio;
import com.example.refugio.repositorios.ReservaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CalificacionServicio {

    @Autowired
    private CalificacionRepositorio calificacionRepositorio;

    @Autowired
    private ReservaRepositorio reservaRepositorio;

    @Autowired
    private EstadoReservaRepositorio estadoReservaRepositorio;

    public List<CalificacionesDTO> getCalificaciones(){
        List<Calificacion> calificaciones = calificacionRepositorio.findAll();

        List<CalificacionesDTO> calificacionesDTO = new ArrayList<>();

        for (Calificacion calificacion: calificaciones) {
            CalificacionesDTO dto = new CalificacionesDTO();

            dto.setFecha(calificacion.getFechaReseña());
            dto.setNombreUsuario(calificacion.getReserva().getUsuario().getNombre() + " " + calificacion.getReserva().getUsuario().getApellido());
            dto.setReseña(calificacion.getReseña());
            dto.setPuntaje(calificacion.getPuntaje());
            calificacionesDTO.add(dto);
        }

        return calificacionesDTO;
    }

    public CalificacionDTO getCalificacion(Long id){
        Calificacion calificacion = reservaRepositorio.getReferenceById(id).getCalificacion();

        CalificacionDTO calificacionDTO = new CalificacionDTO();

        calificacionDTO.setPuntaje(calificacion.getPuntaje());
        calificacionDTO.setReseña(calificacion.getReseña());

        return calificacionDTO;
    }


    public void saveOrUpdate(Calificacion calificacion){
        calificacionRepositorio.save(calificacion);
    }

    public void delete (Long id){
        calificacionRepositorio.deleteById(id);
    }


    public void calificar(Long id, CalificacionDTO calificacionDTO) {
        Calificacion calificacion = new Calificacion();
        Reserva reserva = reservaRepositorio.getReferenceById(id);
        calificacion.setReseña(calificacionDTO.getReseña());
        calificacion.setPuntaje(calificacionDTO.getPuntaje());
        calificacion.setReserva(reserva);
        calificacion.setFechaReseña(LocalDate.now());

        calificacionRepositorio.save(calificacion);
        reserva.setCalificacion(calificacion);
        reserva.setEstadoActual(estadoReservaRepositorio.findByNombreER("Calificada").get());
        reservaRepositorio.save(reserva);
    }

    public void editar(Long id, CalificacionDTO calificacionDTO) {
        Calificacion calificacion = reservaRepositorio.getReferenceById(id).getCalificacion();
        calificacion.setReseña(calificacionDTO.getReseña());
        calificacion.setPuntaje(calificacionDTO.getPuntaje());
        calificacionRepositorio.save(calificacion);
    }
}
