package com.example.refugio.dto.salida;

import lombok.Data;

import java.time.MonthDay;

@Data
public class GananciaMensualDTO {

    private MonthDay dia;
    private double monto;
}
