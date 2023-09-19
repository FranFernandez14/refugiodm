package com.example.refugio.servicios;

import com.example.refugio.entidades.CabañaEstado;
import com.example.refugio.entidades.Calificacion;
import com.example.refugio.repositorios.CabañaEstadoRepositorio;
import com.example.refugio.repositorios.CalificacionRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CalificacionServicio {

    @Autowired
    CalificacionRepositorio calificacionRepositorio;


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



}
