package com.example.refugio.servicios;

import com.example.refugio.entidades.CabañaEstado;
import com.example.refugio.entidades.Caracteristica;
import com.example.refugio.repositorios.CaracteristicaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class CaracteristicaServicio {

    @Autowired
    CaracteristicaRepositorio caracteristicaRepositorio;


    public List<Caracteristica> getCaracteristicas(){
        return caracteristicaRepositorio.findAll();
    }

    public Optional<Caracteristica> getCaracteristica(Long id){
        return caracteristicaRepositorio.findById(id);
    }


    public void saveOrUpdate(Caracteristica caracteristica){
        caracteristicaRepositorio.save(caracteristica);
    }

    public void delete (Long id){
        caracteristicaRepositorio.deleteById(id);
    }
}
