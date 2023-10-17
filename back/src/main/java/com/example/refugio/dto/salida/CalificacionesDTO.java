package com.example.refugio.dto.salida;

import lombok.Data;

import java.time.LocalDate;
@Data
public class CalificacionesDTO {
    private String nombreUsuario;
    private LocalDate fecha;
    private String reseña;
    private int puntaje;
}
