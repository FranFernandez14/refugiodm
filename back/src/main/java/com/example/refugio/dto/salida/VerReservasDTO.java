package com.example.refugio.dto.salida;

import com.example.refugio.entidades.ReservaEstado;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor

public class VerReservasDTO {

    private Long idReserva;
    private Long IDCabaña;
    private int cantPersonas;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private double montoTotal;
    private String estadoActual;

}
