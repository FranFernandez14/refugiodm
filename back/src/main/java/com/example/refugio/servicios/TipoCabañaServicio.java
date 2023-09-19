package com.example.refugio.servicios;

import com.example.refugio.entidades.CostoTipoCabaña;
import com.example.refugio.entidades.TipoCabaña;
import com.example.refugio.repositorios.TipoCabañaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TipoCabañaServicio {
    @Autowired
    TipoCabañaRepositorio tipoCabañaRepositorio;

    public List<TipoCabaña> getTipos(){return tipoCabañaRepositorio.findAll();}

    public Optional<TipoCabaña> getTipoById(Long id){
        return tipoCabañaRepositorio.findById(id);
    }

    public void saveOrUpdate(TipoCabaña tipoCabaña){
        tipoCabañaRepositorio.save(tipoCabaña);
    }

    public void deleteById(Long id){
        tipoCabañaRepositorio.deleteById(id);
    }


    public CostoTipoCabaña getCostoActual(Long id) {
        TipoCabaña tipoCabaña = tipoCabañaRepositorio.getReferenceById(id);
        List<CostoTipoCabaña> costos = tipoCabaña.getCostos();
        CostoTipoCabaña costoActual= new CostoTipoCabaña();

        for (CostoTipoCabaña costo : costos) {
            if (costo.getFechaHoraBaja() == null) {
                costoActual= costo;
                break;
            }
        }
        return costoActual;
    }
}
