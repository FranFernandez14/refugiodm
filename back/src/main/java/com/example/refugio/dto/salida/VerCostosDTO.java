package com.example.refugio.dto.salida;

import lombok.Data;

import java.time.LocalDate;


@Data
public class VerCostosDTO {
    private long IDCostoTipoCabaña;
    private float valorInicial;
    private float valorPorPersona;
    private LocalDate fechaHoraAlta;
    private LocalDate fechaHoraBaja;
}
