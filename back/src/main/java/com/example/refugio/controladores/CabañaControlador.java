package com.example.refugio.controladores;

import com.example.refugio.dto.BuscarCabañaDTO;
import com.example.refugio.dto.CabañaDTO;
import com.example.refugio.dto.CambiarTipoDTO;
import com.example.refugio.dto.RegistroDTO;
import com.example.refugio.dto.salida.EstadoDTO;
import com.example.refugio.entidades.*;
import com.example.refugio.repositorios.CabañaImagenRepositorio;
import com.example.refugio.repositorios.TipoCabañaRepositorio;
import com.example.refugio.servicios.CabañaServicio;
import com.example.refugio.servicios.TipoCabañaServicio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/cabañas")
public class CabañaControlador {

    @Autowired
    private CabañaServicio cabañaServicio;

    @Autowired
    private CabañaImagenRepositorio cabañaImagenRepositorio;
    //@Value("${file.upload-dir}")
    //private String uploadDir;

    @Autowired
    private TipoCabañaRepositorio tipoCabañaRepositorio;

    @GetMapping
    public List<Cabaña> getCabañas() {
        return cabañaServicio.getCabañas();
    }

    @GetMapping("/{id}")
    public Optional<Cabaña> getById(@PathVariable("id") Long id) {
        return cabañaServicio.getCabaña(id);
    }

    @PostMapping
    public void saveUpdate(@RequestBody Cabaña cabaña) {
        cabañaServicio.saveOrUpdate(cabaña);
    }

    @DeleteMapping("/{Id}")
    public void delete(@PathVariable("Id") Long id) {
        cabañaServicio.deleteById(id);
    }

    @PostMapping("crear")
    public ResponseEntity<String> crear(@RequestBody CabañaDTO cabañaDTO) {

        Cabaña cabaña = new Cabaña();

        cabaña.setTamaño(cabañaDTO.getTamaño());

        TipoCabaña tipoCabaña = tipoCabañaRepositorio.findById(cabañaDTO.getIdTipoCabaña()).get();

        cabaña.setTipoCabaña(tipoCabaña);

        tipoCabaña.getCabañas().add(cabaña);

        cabañaServicio.saveOrUpdate(cabaña);

        tipoCabañaRepositorio.save(tipoCabaña);


        return new ResponseEntity<>("Cabaña creada correctamente", HttpStatus.OK);
    }

    @GetMapping("/buscar")
    public List<Cabaña> buscar(@RequestParam("fechaInicio") LocalDate fechaInicio,
                               @RequestParam("fechaFin") LocalDate fechaFin,
                               @RequestParam("cantPersonas") int cantPersonas,
                               @RequestParam("idTipoCabaña") Long idTipoCabaña) {
        BuscarCabañaDTO buscarCabañaDTO = new BuscarCabañaDTO();
        buscarCabañaDTO.setFechaInicio(fechaInicio);
        buscarCabañaDTO.setFechaFin(fechaFin);
        buscarCabañaDTO.setCantPersonas(cantPersonas);
        buscarCabañaDTO.setIdTipoCabaña(idTipoCabaña);

        return cabañaServicio.buscar(buscarCabañaDTO);
    }

    @PostMapping("/{id}/imagenes")
    public ResponseEntity<String> uploadImages(@PathVariable Long id, @RequestParam("files") List<MultipartFile> files) {
        try {
            Optional<Cabaña> cabaña = cabañaServicio.getCabaña(id);
            if (cabaña == null) {
                return ResponseEntity.notFound().build();
            }

            if (files != null && !files.isEmpty()) {
                for (MultipartFile file : files) {
                    byte[] bytes = file.getBytes();
                    CabañaImagen imagen = new CabañaImagen();
                    imagen.setImagen(bytes);
                    // Puedes agregar más atributos a la imagen si es necesario
                    cabaña.get().getImagenes().add(imagen);
                }
                cabañaServicio.saveOrUpdate(cabaña.get());

                // Guardar los archivos en el directorio de carga
                /*for (int i = 0; i < files.size(); i++) {
                    MultipartFile file = files.get(i);
                    String fileName = id + "_imagen_" + i + ".jpg"; // Generar un nombre de archivo único
                    Path path = Paths.get(uploadDir + "/" + fileName);
                    Files.write(path, file.getBytes());
                    System.out.println("Imagen guardada en: " + path.toAbsolutePath());
                }*/

                return ResponseEntity.ok("Imágenes cargadas correctamente");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cargar las imágenes");
        }
        return ResponseEntity.badRequest().body("No se han proporcionado imágenes");
    }

    @GetMapping("/{id}/imagenes")
    public ResponseEntity<List<byte[]>> getImagenes(@PathVariable Long id) {
        Optional<Cabaña> cabaña = cabañaServicio.getCabaña(id);

        if (cabaña.isPresent()) {
            List<CabañaImagen> imagenes = cabaña.get().getImagenes();
            List<byte[]> imagenBytesList = new ArrayList<>();

            for (CabañaImagen imagen : imagenes) {
                imagenBytesList.add(imagen.getImagen());
            }

            // Configura el tipo de contenido de la respuesta como imagen JPEG (o el adecuado)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);

            return new ResponseEntity<>(imagenBytesList, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{cabañaId}/imagenes/{imagenId}")
    public ResponseEntity<byte[]> getImagen(@PathVariable Long cabañaId, @PathVariable Long imagenId) {
        Optional<Cabaña> cabaña = cabañaServicio.getCabaña(cabañaId);

        if (cabaña.isPresent()) {
            List<CabañaImagen> imagenes = cabaña.get().getImagenes();

            for (CabañaImagen imagen : imagenes) {
                if (imagen.getId().equals(imagenId)) {
                    HttpHeaders headers = new HttpHeaders();
                    headers.setContentType(MediaType.IMAGE_JPEG);

                    return new ResponseEntity<>(imagen.getImagen(), headers, HttpStatus.OK);
                }
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{cabañaId}/imagenes/{imagenId}")
    public ResponseEntity<String> deleteImagen(@PathVariable Long cabañaId, @PathVariable Long imagenId) {
        Optional<Cabaña> cabaña = cabañaServicio.getCabaña(cabañaId);

        if (cabaña.isPresent()) {
            List<CabañaImagen> imagenes = cabaña.get().getImagenes();

            for (CabañaImagen imagen : imagenes) {
                if (imagen.getId().equals(imagenId)) {
                    imagenes.remove(imagen);
                    cabañaImagenRepositorio.deleteById(imagenId);
                    return new ResponseEntity<>("Imagen eliminada correctamente", HttpStatus.OK);
                }
            }
        }

        return new ResponseEntity<>("No se encontró la cabaña o la imagen especificada", HttpStatus.NOT_FOUND);
    }


    @GetMapping("/{idCabaña}/estados")
    public List<EstadoDTO> getEstados(@PathVariable("idCabaña") Long id) {
        Optional<Cabaña> cabaña = cabañaServicio.getCabaña(id);

        List<CabañaEstado> estados = cabaña.get().getEstados();

        List<EstadoDTO> estadosDTO = new ArrayList<>();


        for (CabañaEstado estado : estados) {
            EstadoDTO estadoDTO = new EstadoDTO();
            estadoDTO.setId(estado.getId());
            estadoDTO.setNombre(estado.getEstadoCabaña().getNombreEC());
            estadoDTO.setFechaInicio(estado.getFechaInicioCE());
            estadoDTO.setFechaFin(estado.getFechaFinCE());
            estadosDTO.add(estadoDTO);
        }
        return estadosDTO;
    }

    @PostMapping("/{idCabaña}/mantenimiento")
    public void setMantenimiento(@PathVariable("idCabaña") Long id, @RequestBody EstadoDTO estadoDTO) {
        cabañaServicio.setMantenimiento(id, estadoDTO);
    }


    @PostMapping("/{idCabaña}/cambiarTipo")
    public void cambiarTipo(@RequestBody CambiarTipoDTO cambiarTipoDTO) {
        cabañaServicio.cambiarTipo(cambiarTipoDTO);
    }
}
    