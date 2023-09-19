package com.example.refugio.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
public class CabañaEstado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private LocalDate fechaInicioCE;
    private LocalDate fechaFinCE;

    @ManyToOne
    @JoinColumn(name = "IDCabaña")
    @JsonIgnoreProperties("estados")
    private Cabaña cabaña;

    @ManyToOne
    @JoinColumn (name = "IDEC")
    private EstadoCabaña estadoCabaña;
}
