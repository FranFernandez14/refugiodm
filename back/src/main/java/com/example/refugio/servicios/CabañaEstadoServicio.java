package com.example.refugio.servicios;


import com.example.refugio.entidades.CabañaEstado;

import com.example.refugio.repositorios.CabañaEstadoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CabañaEstadoServicio {

    @Autowired
    CabañaEstadoRepositorio cabañaEstadoRepositorio;


    public List<CabañaEstado> getCabañaEstados(){
        return cabañaEstadoRepositorio.findAll();
    }

    public Optional<CabañaEstado> getCabañaEstado(Long id){
        return cabañaEstadoRepositorio.findById(id);
    }


    public void saveOrUpdate(CabañaEstado cabañaEstado){
       cabañaEstadoRepositorio.save(cabañaEstado);
    }

    public void delete (Long id){
        cabañaEstadoRepositorio.deleteById(id);
    }

}
