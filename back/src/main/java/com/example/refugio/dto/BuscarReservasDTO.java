package com.example.refugio.dto;

import lombok.Data;

import java.time.LocalDate;
@Data

public class BuscarReservasDTO {
    private String estado;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
}
