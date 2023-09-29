package com.example.refugio.dto.salida;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Data
public class VerReservaDTO {

    private Long idCabaña;
    private int cantPersonas;
    private double montoTotal;
    private String fechaReservaFormatted; // Cambiar a String
    private LocalDateTime fechaReserva; // Mantener la fecha sin formato
    private LocalDate fechaInicio;
    private LocalDate fechaFin;
    private String estadoActual;
    private List<ReservaEstadoDTO> estados = new ArrayList<>();
    private String nombreUsuario;
    private String dni;
    private String email;
    private String telefono;

    public void setFechaReserva(LocalDateTime fechaReserva) {
        this.fechaReserva = fechaReserva;
        formatFechaReserva();
    }

    private void formatFechaReserva() {
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        this.fechaReservaFormatted = fechaReserva.format(format);
    }

    public String getFechaReservaFormatted() {
        return fechaReservaFormatted;
    }
}
