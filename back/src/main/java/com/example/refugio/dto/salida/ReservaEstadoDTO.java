package com.example.refugio.dto.salida;

import lombok.Data;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Data
public class ReservaEstadoDTO {
    private String nombre;
    private String fechaInicioREFormatted; // Cambiar a String
    private String fechaFinREFormatted; // Cambiar a String
    private LocalDateTime fechaInicioRE; // Mantener la fecha sin formato
    private LocalDateTime fechaFinRE; // Mantener la fecha sin formato

    // Constructor y otros métodos de la clase...

    // Método para establecer fechaInicioRE y formatearla automáticamente


    // Método privado para formatear fechaInicioRE y guardarla en fechaInicioREFormatted
    private void formatFechaInicioRE() {
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        this.fechaInicioREFormatted = fechaInicioRE.format(format);
    }

    // Getter para obtener fechaInicioRE formateada
    public String getFechaInicioREFormatted() {
        return fechaInicioREFormatted;
    }

    public void setFechaInicioRE(LocalDateTime fechaInicioRE) {
        this.fechaInicioRE = fechaInicioRE;
        if (fechaInicioRE != null) {
            formatFechaInicioRE(); // Llamar al método para formatear solo si la fecha no es nula
        }
    }

    public void setFechaFinRE(LocalDateTime fechaFinRE) {
        this.fechaFinRE = fechaFinRE;
        if (fechaFinRE != null) {
            formatFechaFinRE(); // Llamar al método para formatear solo si la fecha no es nula
        }
    }


    private void formatFechaFinRE() {
        DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        this.fechaFinREFormatted = fechaFinRE.format(format);
    }
}

