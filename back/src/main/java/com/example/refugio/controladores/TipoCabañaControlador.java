package com.example.refugio.controladores;

import com.example.refugio.dto.ModificarDescripcionDTO;
import com.example.refugio.dto.TipoCabañaCaracteristicaDTO;
import com.example.refugio.dto.salida.NuestrasCabañasDTO;
import com.example.refugio.dto.salida.VerTipoCabañaDTO;
import com.example.refugio.dto.salida.VerTiposCabañaDTO;
import com.example.refugio.entidades.Caracteristica;
import com.example.refugio.entidades.CostoTipoCabaña;
import com.example.refugio.entidades.TipoCabaña;
import com.example.refugio.repositorios.TipoCabañaRepositorio;
import com.example.refugio.servicios.CaracteristicaServicio;
import com.example.refugio.servicios.TipoCabañaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/cabañas/tipos")
public class TipoCabañaControlador {

    @Autowired
    private TipoCabañaServicio tipoCabañaServicio;
    @Autowired
    private CaracteristicaServicio caracteristicaServicio;
    @Autowired
    private TipoCabañaRepositorio tipoCabañaRepositorio;

    @GetMapping
    public List<VerTiposCabañaDTO> getTipos(){
        return tipoCabañaServicio.getTipos();
    }

    @GetMapping("nuestrasCabañas")
    public List<NuestrasCabañasDTO> nuestrasCabañas(){
        return tipoCabañaServicio.nuestrasCabañas();
    }

    @GetMapping("/{id}")
    public VerTipoCabañaDTO getById (@PathVariable("id") Long id){
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
        TipoCabaña tipoCabaña = tipoCabañaRepositorio.getReferenceById(tipoCabañaCaracteristicaDTO.getIdTipoCabaña());
        Caracteristica caracteristica = new Caracteristica();
        caracteristica.setNombreCaracteristica(tipoCabañaCaracteristicaDTO.getNombreCaracteristica());
        tipoCabaña.getCaracteristicas().add(caracteristica);
        tipoCabañaServicio.saveOrUpdate(tipoCabaña);
        return new ResponseEntity<>("Característica creada correctamente", HttpStatus.OK);
    }

    /*@PostMapping("/eliminarCaracteristica")
    public ResponseEntity<String> eliminarCaracteristica(@RequestBody TipoCabañaCaracteristicaDTO tipoCabañaCaracteristicaDTO){
        TipoCabaña tipoCabaña = tipoCabañaRepositorio.getReferenceById(tipoCabañaCaracteristicaDTO.getIdTipoCabaña());
        for (Caracteristica caracteristica:tipoCabaña.getCaracteristicas()) {
            if(caracteristica.getNombreCaracteristica().equals(tipoCabañaCaracteristicaDTO.getNombreCaracteristica())){
                tipoCabaña.getCaracteristicas().remove(caracteristica);
            }
        }
        tipoCabañaServicio.saveOrUpdate(tipoCabaña);
        return new ResponseEntity<>("Característica eliminada correctamente", HttpStatus.OK);
    }*/

    @PostMapping("/eliminarCaracteristica")
    public ResponseEntity<String> eliminarCaracteristica(@RequestBody TipoCabañaCaracteristicaDTO tipoCabañaCaracteristicaDTO){
        TipoCabaña tipoCabaña = tipoCabañaRepositorio.getReferenceById(tipoCabañaCaracteristicaDTO.getIdTipoCabaña());

        List<Caracteristica> caracteristicasAEliminar = new ArrayList<>();

        for (Caracteristica caracteristica : tipoCabaña.getCaracteristicas()) {
            if (caracteristica != null && tipoCabañaCaracteristicaDTO.getNombreCaracteristica().equals(caracteristica.getNombreCaracteristica())) {
                caracteristicasAEliminar.add(caracteristica);
            }
        }
        tipoCabaña.getCaracteristicas().removeAll(caracteristicasAEliminar);
        tipoCabañaServicio.saveOrUpdate(tipoCabaña);
        return new ResponseEntity<>("Características eliminadas correctamente", HttpStatus.OK);
    }


    @GetMapping("/{id}/costoactual")
    public CostoTipoCabaña getCostoActual(@PathVariable("id") Long id){
        return tipoCabañaServicio.getCostoActual(id);
    }


    @GetMapping("/{id}/caracteristicas")
    public List<Caracteristica> getCaracteristicasByTipo(@PathVariable ("id") Long id){
        return tipoCabañaServicio.getCaracteristicas(id);
    }

    @PostMapping("/{id}/modificarDescripcion")
    public void modificarDescripcion(@PathVariable("id") Long id, @RequestBody ModificarDescripcionDTO descripcion){
        tipoCabañaServicio.modificarDescripcion(id, descripcion);
    }


}
