package com.example.refugio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ReservaDTO {
    @JsonProperty("IDUsuario")
    private Long IDUsuario;

    @JsonProperty("IDCabaña")
    private Long IDCabaña;

    @JsonProperty("cantPersonas")
    private int cantPersonas;

    @JsonProperty("montoTotal")
    private double montoTotal;

    @JsonProperty("fechaInicio")
    private LocalDate fechaInicio;

    @JsonProperty("fechaFin")
    private LocalDate fechaFin;
}
