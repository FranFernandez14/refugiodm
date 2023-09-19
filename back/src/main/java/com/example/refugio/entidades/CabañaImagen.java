package com.example.refugio.entidades;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class CabañaImagen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    @Column(name = "imagen", columnDefinition = "LONGBLOB")
    private byte[] imagen;
}
