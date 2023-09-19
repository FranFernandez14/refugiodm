package com.example.refugio.controladores;

import com.example.refugio.dto.TipoCabañaCaracteristicaDTO;
import com.example.refugio.entidades.Cabaña;
import com.example.refugio.entidades.Caracteristica;
import com.example.refugio.entidades.CostoTipoCabaña;
import com.example.refugio.entidades.TipoCabaña;
import com.example.refugio.servicios.CabañaServicio;
import com.example.refugio.servicios.CaracteristicaServicio;
import com.example.refugio.servicios.TipoCabañaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/cabañas/tipos")
public class TipoCabañaControlador {

    @Autowired
    private TipoCabañaServicio tipoCabañaServicio;
    @Autowired
    private CaracteristicaServicio caracteristicaServicio;

    @GetMapping
    public List<TipoCabaña> getTipos(){
        return tipoCabañaServicio.getTipos();
    }

    @GetMapping("/{id}")
    public Optional<TipoCabaña> getById (@PathVariable("id") Long id){
        return tipoCabañaServicio.getTipoById(id);
    }
    @PostMapping
    public void saveUpdate (@RequestBody TipoCabaña tipoCabaña){
        tipoCabañaServicio.saveOrUpdate(tipoCabaña);
    }

    @DeleteMapping("/{Id}")
    public void delete(@PathVariable("Id") Long id){
        tipoCabañaServicio.deleteById(id);
    }


    @PostMapping ("/agregarCaracteristica")
    public ResponseEntity<String> agregarCaracteristica(@RequestBody TipoCabañaCaracteristicaDTO tipoCabañaCaracteristicaDTO) {
        TipoCabaña tipoCabaña = tipoCabañaServicio.getTipoById(tipoCabañaCaracteristicaDTO.getIdTipoCabaña()).get();
        Caracteristica caracteristica = caracteristicaServicio.getCaracteristica(tipoCabañaCaracteristicaDTO.getIdCaracteristica()).get();
        tipoCabaña.getCaracteristicas().add(caracteristica);
        tipoCabañaServicio.saveOrUpdate(tipoCabaña);
        return new ResponseEntity<>("Característica creada correctamente", HttpStatus.OK);

    }

    @PostMapping("/eliminarCaracteristica")
    public ResponseEntity<String> eliminarCaracteristica(@RequestBody TipoCabañaCaracteristicaDTO tipoCabañaCaracteristicaDTO){
        TipoCabaña tipoCabaña = tipoCabañaServicio.getTipoById(tipoCabañaCaracteristicaDTO.getIdTipoCabaña()).get();
        Caracteristica caracteristica = caracteristicaServicio.getCaracteristica(tipoCabañaCaracteristicaDTO.getIdCaracteristica()).get();
        tipoCabaña.getCaracteristicas().remove(caracteristica);
        tipoCabañaServicio.saveOrUpdate(tipoCabaña);
        return new ResponseEntity<>("Característica eliminada correctamente", HttpStatus.OK);
    }

    @GetMapping("/{id}/costoactual")
    public CostoTipoCabaña getCostoActual(@PathVariable("id") Long id){
        return tipoCabañaServicio.getCostoActual(id);
    }
}
