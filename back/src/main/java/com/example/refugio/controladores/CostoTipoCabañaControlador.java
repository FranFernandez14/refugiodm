package com.example.refugio.controladores;


import com.example.refugio.dto.CrearCostoDTO;
import com.example.refugio.dto.salida.VerCostosDTO;
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

    @GetMapping("/vercostos/{idTipoCabaña}")
    public List<VerCostosDTO> getCostosByTipoCabaña (@PathVariable("idTipoCabaña") Long id){
        return costoTipoCabañaServicio.getCostos(id);
    }
    @PostMapping
    public void saveUpdate (@RequestBody CostoTipoCabaña costoTipoCabaña){
        costoTipoCabañaServicio.saveOrUpdate(costoTipoCabaña);
    }

    @DeleteMapping ("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        costoTipoCabañaServicio.delete(id);
    }



    @PostMapping("/crear")
    public void crearCosto(@RequestBody CrearCostoDTO crearCostoDTO){
        costoTipoCabañaServicio.crearCosto(crearCostoDTO);
    }
}
