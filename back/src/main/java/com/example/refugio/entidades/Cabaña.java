package com.example.refugio.entidades;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Cabaña {


    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long IDCabaña;
    private int tamaño;
    private LocalDate fechaHoraBajaCabaña;

    @ManyToOne
    @JoinColumn (name = "IDTipocabaña")
    @JsonIgnoreProperties("cabañas")
    private TipoCabaña tipoCabaña;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cabaña")
    @JsonIgnoreProperties("cabaña")
    private List<CabañaEstado> estados = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "cabaña")
    @JsonIgnoreProperties("cabaña")
    private List<Reserva> reservas = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "cabaña_id")
    private List<CabañaImagen> imagenes = new ArrayList<>();


}
