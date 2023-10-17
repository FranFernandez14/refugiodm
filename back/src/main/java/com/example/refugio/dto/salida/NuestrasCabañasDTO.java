package com.example.refugio.dto.salida;

import com.example.refugio.entidades.Caracteristica;
import lombok.Data;

import java.util.*;

@Data
public class NuestrasCabañasDTO {

    private String nombre;
    private String descripcion;
    private List<Caracteristica> caracteristicas = new ArrayList<>();


}
