package com.example.refugio.servicios;

import com.example.refugio.entidades.CabañaEstado;
import com.example.refugio.entidades.ReservaEstado;
import com.example.refugio.repositorios.CabañaEstadoRepositorio;
import com.example.refugio.repositorios.ReservaEstadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaEstadoServicio {

    @Autowired
    ReservaEstadoRepositorio reservaEstadoRepositorio;

    public List<ReservaEstado> getReservaEstados(){
        return reservaEstadoRepositorio.findAll();
    }

    public Optional<ReservaEstado> getReservaEstado(Long id){
        return reservaEstadoRepositorio.findById(id);
    }


    public void saveOrUpdate(ReservaEstado reservaEstado){
        reservaEstadoRepositorio.save(reservaEstado);
    }

    public void delete (Long id){
        reservaEstadoRepositorio.deleteById(id);
    }
}
