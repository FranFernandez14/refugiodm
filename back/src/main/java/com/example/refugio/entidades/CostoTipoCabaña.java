package com.example.refugio.entidades;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
public class CostoTipoCabaña {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long IDCostoTipoCabaña;
    private float valorInicial;
    private float valorPorPersona;
    private LocalDateTime fechaHoraAlta;
    private LocalDateTime fechaHoraBaja;

    @ManyToOne
    @JoinColumn (name = "IDTipoCabaña")
    @JsonIgnoreProperties("costos")
    private TipoCabaña tipoCabaña;

    @PrePersist
    public void prePersist() {
        fechaHoraAlta = LocalDateTime.now();
    }



}
