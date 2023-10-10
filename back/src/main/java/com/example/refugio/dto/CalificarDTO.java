package com.example.refugio.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CalificarDTO {

    private Long idCalificacion;
    private String reseña;
    private int puntaje;

}
