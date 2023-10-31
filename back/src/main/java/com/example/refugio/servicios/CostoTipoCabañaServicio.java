package com.example.refugio.servicios;

import com.example.refugio.dto.CrearCostoDTO;
import com.example.refugio.dto.salida.VerCostosDTO;
import com.example.refugio.entidades.CostoTipoCabaña;
import com.example.refugio.entidades.TipoCabaña;
import com.example.refugio.repositorios.CostoTipoCabañaRepositorio;
import com.example.refugio.repositorios.TipoCabañaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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



    public List<VerCostosDTO> getCostos(Long id){
        List<CostoTipoCabaña> costos = tipoCabañaRepositorio.getReferenceById(id).getCostos();
        List <VerCostosDTO> costosDTO = new ArrayList<>();

        for (CostoTipoCabaña costo: costos) {
            VerCostosDTO costoDTO = new VerCostosDTO();
            costoDTO.setIDCostoTipoCabaña(costo.getIDCostoTipoCabaña());
            costoDTO.setFechaHoraAlta(costo.getFechaHoraAlta());
            costoDTO.setFechaHoraBaja(costo.getFechaHoraBaja());
            costoDTO.setValorPorPersona(costo.getValorPorPersona());
            costoDTO.setValorInicial(costo.getValorInicial());
            costosDTO.add(costoDTO);
        }
        return costosDTO;
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
                costo.setFechaHoraBaja(LocalDate.now());
            }
        }

        CostoTipoCabaña costo = new CostoTipoCabaña();
        costo.setValorInicial(crearCostoDTO.getValorInicial());
        costo.setValorPorPersona(crearCostoDTO.getValorPorPersona());
        costo.setTipoCabaña(tipoCabaña);
        costo.setFechaHoraAlta(LocalDate.now());

        tipoCabaña.getCostos().add(costo);
        tipoCabañaRepositorio.save(tipoCabaña);


    }
}
