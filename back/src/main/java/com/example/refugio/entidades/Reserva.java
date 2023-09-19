package com.example.refugio.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
public class Reserva {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long idReserva;
    private int cantPersonas;
    private double montoTotal;
    private LocalDateTime fechaReserva;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    @ManyToOne
    @JoinColumn (name = "IDUsuario")
    @JsonIgnoreProperties("reservas")
    private Usuario usuario;

    @OneToOne (mappedBy = "reserva")
    @JoinColumn (name = "IDReserva")
    @JsonIgnoreProperties("reserva")
    private Calificacion calificacion;

    @OneToMany (mappedBy = "reserva")
    @JsonIgnoreProperties("reserva")
    private List<ReservaEstado> reservasEstado;

    @ManyToOne
    @JoinColumn (name = "IDCabaña")
    @JsonIgnoreProperties("reservas")
    private Cabaña cabaña;
}
