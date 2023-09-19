package com.example.refugio.servicios;

import com.example.refugio.entidades.CabañaEstado;
import com.example.refugio.entidades.EstadoCabaña;
import com.example.refugio.repositorios.CabañaEstadoRepositorio;
import com.example.refugio.repositorios.EstadoCabañaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoCabañaServicio {

    @Autowired
    EstadoCabañaRepositorio estadoCabañaRepositorio;


    public List<EstadoCabaña> getEstadosCabaña(){
        return estadoCabañaRepositorio.findAll();
    }

    public Optional<EstadoCabaña> getEstadoCabaña(Long id){
        return estadoCabañaRepositorio.findById(id);
    }


    public void saveOrUpdate(EstadoCabaña estadoCabaña){
        estadoCabañaRepositorio.save(estadoCabaña);
    }

    public void delete (Long id){
        estadoCabañaRepositorio.deleteById(id);
    }

}
