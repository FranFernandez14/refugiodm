package com.example.refugio.servicios;

import com.example.refugio.dto.ModificarDescripcionDTO;
import com.example.refugio.dto.salida.NuestrasCabañasDTO;
import com.example.refugio.dto.salida.VerTipoCabañaDTO;
import com.example.refugio.dto.salida.VerTiposCabañaDTO;
import com.example.refugio.entidades.Caracteristica;
import com.example.refugio.entidades.CostoTipoCabaña;
import com.example.refugio.entidades.TipoCabaña;
import com.example.refugio.repositorios.TipoCabañaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TipoCabañaServicio {
    @Autowired
    TipoCabañaRepositorio tipoCabañaRepositorio;

    public List<VerTiposCabañaDTO> getTipos(){

        List<TipoCabaña> tipos= tipoCabañaRepositorio.findAll();
        List<VerTiposCabañaDTO> tiposDTO=new ArrayList<>();

        for (TipoCabaña tipo: tipos) {
            VerTiposCabañaDTO tipoCabañaDTO = new VerTiposCabañaDTO();
            tipoCabañaDTO.setId(tipo.getIDTipoCabaña());
            tipoCabañaDTO.setNombre(tipo.getNombre());
            tipoCabañaDTO.setCantCabañas(tipo.getCabañas().size());
            for (CostoTipoCabaña costo: tipo.getCostos()) {
                if (costo.getFechaHoraBaja()==null){
                    tipoCabañaDTO.setValorInicialActual(costo.getValorInicial());
                    tipoCabañaDTO.setValorPorPersonaActual(costo.getValorPorPersona());
                    break;
                }
            }
            tiposDTO.add(tipoCabañaDTO);
        }

        return tiposDTO;
    }

    public VerTipoCabañaDTO getTipoById(Long id){
        TipoCabaña tipoCabaña = tipoCabañaRepositorio.findById(id).get();
        VerTipoCabañaDTO tipoDTO = new VerTipoCabañaDTO();
        tipoDTO.setDescripcion(tipoCabaña.getDescripcion());
        tipoDTO.setId(id);
        tipoDTO.setNombre(tipoCabaña.getNombre());
        tipoDTO.setCantCabañas(tipoCabaña.getCabañas().size());

        return tipoDTO;
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

    public List<Caracteristica> getCaracteristicas(Long id) {
        List<Caracteristica> caracteristicas = tipoCabañaRepositorio.getReferenceById(id).getCaracteristicas();
        return caracteristicas;
    }

    public void modificarDescripcion(Long id, ModificarDescripcionDTO descripcion) {
        TipoCabaña tipoCabaña = tipoCabañaRepositorio.getReferenceById(id);
        tipoCabaña.setDescripcion(descripcion.getDescripcion());
        tipoCabañaRepositorio.save(tipoCabaña);
    }

    public List<NuestrasCabañasDTO> nuestrasCabañas() {
        List<TipoCabaña> cabañas = tipoCabañaRepositorio.findAll();
        List<NuestrasCabañasDTO> dtos = new ArrayList<>();

        for (TipoCabaña cabaña: cabañas) {
            NuestrasCabañasDTO dto = new NuestrasCabañasDTO();
            dto.setCaracteristicas(cabaña.getCaracteristicas());
            dto.setNombre(cabaña.getNombre());
            dto.setDescripcion(cabaña.getDescripcion());
            dtos.add(dto);
        }
        return dtos;
    }

}
