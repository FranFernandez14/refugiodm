package com.example.refugio.controladores;


import com.example.refugio.dto.CrearCostoDTO;
import com.example.refugio.entidades.Caracteristica;
import com.example.refugio.entidades.CostoTipoCabaña;
import com.example.refugio.servicios.CaracteristicaServicio;
import com.example.refugio.servicios.CostoTipoCabañaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/cabañas/tipos/costos")
public class CostoTipoCabañaControlador {

    @Autowired
    private CostoTipoCabañaServicio costoTipoCabañaServicio;

    @GetMapping
    public List<CostoTipoCabaña> getCostos (){
        return costoTipoCabañaServicio.getCostos();
    }
    @PostMapping
    public void saveUpdate (@RequestBody CostoTipoCabaña costoTipoCabaña){
        costoTipoCabañaServicio.saveOrUpdate(costoTipoCabaña);
    }

    @DeleteMapping ("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        costoTipoCabañaServicio.delete(id);
    }

    @GetMapping ("/{Id}")
    public Optional<CostoTipoCabaña> getById (@PathVariable ("id") Long id) {
        return costoTipoCabañaServicio.getCosto(id);
    }


    @PostMapping("/crear")
    public void crearCosto(@RequestBody CrearCostoDTO crearCostoDTO){
        costoTipoCabañaServicio.crearCosto(crearCostoDTO);
    }
}
