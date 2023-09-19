package com.example.refugio.servicios;

import com.example.refugio.dto.BuscarCabañaDTO;
import com.example.refugio.dto.salida.EstadoDTO;
import com.example.refugio.entidades.Cabaña;
import com.example.refugio.entidades.CabañaEstado;
import com.example.refugio.repositorios.CabañaEstadoRepositorio;
import com.example.refugio.repositorios.CabañaRepositorio;
import com.example.refugio.repositorios.EstadoCabañaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CabañaServicio {

    @Autowired
    CabañaRepositorio cabañaRepositorio;

    @Autowired
    EstadoCabañaRepositorio estadoCabañaRepositorio;

    @Autowired
    CabañaEstadoRepositorio cabañaEstadoRepositorio;

    public List<Cabaña> getCabañas() {
        return cabañaRepositorio.findAll();
    }

    public Optional<Cabaña> getCabaña(Long id) {
        return cabañaRepositorio.findById(id);
    }

    public void saveOrUpdate(Cabaña cabaña) {
        cabañaRepositorio.save(cabaña);
    }

    public void deleteById(Long id) {
        cabañaRepositorio.deleteById(id);
    }




    public List<Cabaña> buscar(BuscarCabañaDTO buscarCabañaDTO) {
        return cabañaRepositorio.findAll().stream()
                .filter(cabaña -> cabaña.getTamaño() >= buscarCabañaDTO.getCantPersonas())
                .filter(cabaña -> buscarCabañaDTO.getIdTipoCabaña() == 0 || buscarCabañaDTO.getIdTipoCabaña() == cabaña.getTipoCabaña().getIDTipoCabaña())
                .filter(cabaña -> {
                    List<CabañaEstado> estados = cabaña.getEstados();
                    if (estados.isEmpty()) {
                        return true;
                    }
                    return estados.stream().noneMatch(estado -> rangesOverlap(buscarCabañaDTO.getFechaInicio(), buscarCabañaDTO.getFechaFin(), estado.getFechaInicioCE(), estado.getFechaFinCE()));
                })
                .collect(Collectors.toList());
    }



    public boolean rangesOverlap(LocalDate startA, LocalDate endA, LocalDate startB, LocalDate endB) {
       return (!startA.isAfter(endB) && !startB.isAfter(endA));
    }

    public void setMantenimiento(Long id, EstadoDTO estadoDTO) {
        Cabaña cabaña = cabañaRepositorio.getReferenceById(id);
        CabañaEstado cabañaEstado = new CabañaEstado();

        cabañaEstado.setCabaña(cabaña);
        cabañaEstado.setFechaInicioCE(estadoDTO.getFechaInicio());
        cabañaEstado.setFechaFinCE(estadoDTO.getFechaFin());
        cabañaEstado.setEstadoCabaña(estadoCabañaRepositorio.findByNombreEC("Mantenimiento").get());

        cabañaEstadoRepositorio.save(cabañaEstado);
        cabaña.getEstados().add(cabañaEstado);
        cabañaRepositorio.save(cabaña);
    }
}