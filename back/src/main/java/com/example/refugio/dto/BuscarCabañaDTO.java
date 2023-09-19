package com.example.refugio.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class BuscarCabañaDTO {

    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private int cantPersonas;
    private Long idTipoCabaña;
}
