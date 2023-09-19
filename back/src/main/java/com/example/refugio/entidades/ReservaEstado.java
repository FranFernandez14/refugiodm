package com.example.refugio.entidades;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class ReservaEstado {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime fechaInicioRE;
    private LocalDateTime fechafinRE;

    @ManyToOne
    @JoinColumn (name = "IDReserva")
    @JsonIgnoreProperties("reservasEstado")
    private Reserva reserva;

    @ManyToOne
    @JoinColumn (name = "IDER")
    private EstadoReserva estadoReserva;
}
