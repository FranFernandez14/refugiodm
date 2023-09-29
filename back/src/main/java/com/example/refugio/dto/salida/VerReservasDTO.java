package com.example.refugio.dto.salida;

import com.example.refugio.entidades.ReservaEstado;
import lombok.Data;

import java.time.LocalDate;
@Data
public class VerReservasDTO {

    private Long idReserva;
    private Long idCabaña;
    private int cantPersonas;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private double montoTotal;
    private String estadoActual;

}
