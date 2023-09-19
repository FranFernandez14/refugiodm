package com.example.refugio.servicios;

import com.example.refugio.dto.CrearCostoDTO;
import com.example.refugio.entidades.CostoTipoCabaña;
import com.example.refugio.entidades.TipoCabaña;
import com.example.refugio.repositorios.CostoTipoCabañaRepositorio;
import com.example.refugio.repositorios.TipoCabañaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CostoTipoCabañaServicio {
    @Autowired
    CostoTipoCabañaRepositorio costoTipoCabañaRepositorio;
    @Autowired
    TipoCabañaRepositorio tipoCabañaRepositorio;



    public List<CostoTipoCabaña> getCostos(){
        return costoTipoCabañaRepositorio.findAll();
    }

    public Optional<CostoTipoCabaña> getCosto(Long id){
        return costoTipoCabañaRepositorio.findById(id);
    }


    public void saveOrUpdate(CostoTipoCabaña costoTipoCabaña){
        costoTipoCabañaRepositorio.save(costoTipoCabaña);
    }

    public void delete (Long id){
        costoTipoCabañaRepositorio.deleteById(id);
    }

    public void crearCosto(CrearCostoDTO crearCostoDTO) {
        TipoCabaña tipoCabaña = tipoCabañaRepositorio.getReferenceById(crearCostoDTO.getIdTipoCabaña());

        List<CostoTipoCabaña> costos = tipoCabaña.getCostos();

        for (CostoTipoCabaña costo : costos) {
            if (costo.getFechaHoraBaja() == null) {
                costo.setFechaHoraBaja(LocalDateTime.now());
            }
        }

        CostoTipoCabaña costo = new CostoTipoCabaña();
        costo.setValorInicial(crearCostoDTO.getValorInicial());
        costo.setValorPorPersona(crearCostoDTO.getValorPorPersona());
        costo.setTipoCabaña(tipoCabaña);

        tipoCabaña.getCostos().add(costo);
        tipoCabañaRepositorio.save(tipoCabaña);

        costoTipoCabañaRepositorio.save(costo);

    }
}
