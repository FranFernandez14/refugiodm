package com.example.refugio.dto.salida;

import lombok.Data;

@Data
public class VerTiposCabañaDTO {

    private Long id;
    private String nombre;
    private int cantCabañas;
    private double valorPorPersonaActual;
    private double valorInicialActual;

}
