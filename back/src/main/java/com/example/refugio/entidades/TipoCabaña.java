package com.example.refugio.entidades;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class TipoCabaña {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long IDTipoCabaña;
    private String nombre;

    private String descripcion;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tipoCabaña")
    @JsonIgnoreProperties("tipoCabaña")
    private List<Cabaña> cabañas = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tipoCabaña", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("tipoCabaña")
    private List<CostoTipoCabaña> costos = new ArrayList<>();

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "idTipoCabaña")
    private List<Caracteristica> caracteristicas = new ArrayList<>();

}
