package com.example.refugio.dto.salida;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EstadoDTO {
    private Long id;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String nombre;
}
