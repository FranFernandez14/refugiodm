package com.example.refugio.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
public class Calificacion {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long idCalificacion;
    private LocalDate fechaReseña;
    private String reseña;
    private int puntaje;

    @OneToOne
    @JsonIgnoreProperties
    private Reserva reserva;

}
