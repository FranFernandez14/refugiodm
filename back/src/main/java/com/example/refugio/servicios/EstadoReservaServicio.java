package com.example.refugio.servicios;


import com.example.refugio.entidades.EstadoReserva;
import com.example.refugio.repositorios.EstadoReservaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoReservaServicio {

    @Autowired
    EstadoReservaRepositorio estadoReservaRepositorio;


    public List<EstadoReserva> getEstadosReserva(){
        return estadoReservaRepositorio.findAll();
    }

    public Optional<EstadoReserva> getEstadoReserva(Long id){
        return estadoReservaRepositorio.findById(id);
    }


    public void saveOrUpdate(EstadoReserva estadoReserva){
        estadoReservaRepositorio.save(estadoReserva);
    }

    public void delete (Long id){
        estadoReservaRepositorio.deleteById(id);
    }

}
