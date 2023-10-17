package com.example.refugio.dto.salida;

import com.example.refugio.entidades.CostoTipoCabaña;
import lombok.Data;

import java.util.*;

@Data
public class VerTipoCabañaDTO {

    private Long id;
    private String nombre;
    private String descripcion;
    private int cantCabañas;
}
