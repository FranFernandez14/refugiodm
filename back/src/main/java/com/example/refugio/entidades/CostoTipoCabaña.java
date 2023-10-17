package com.example.refugio.entidades;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class CostoTipoCabaña {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long IDCostoTipoCabaña;
    private float valorInicial;
    private float valorPorPersona;
    private LocalDate fechaHoraAlta;
    private LocalDate fechaHoraBaja;

    @ManyToOne
    @JoinColumn (name = "IDTipoCabaña")
    @JsonIgnoreProperties("costos")
    private TipoCabaña tipoCabaña;




}
