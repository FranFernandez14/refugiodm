package com.example.refugio.dto;

import lombok.Data;

@Data
public class CambiarContraseñaDTO {

    private Long idUsuario;
    private String contraseñaActual;
    private String contraseñaNueva;
}
