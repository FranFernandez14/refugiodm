package com.example.refugio.dto.salida;

import lombok.Data;

import java.time.Month;

@Data
public class GananciaAnualDTO {

    private Month mes;
    private double monto;
}
