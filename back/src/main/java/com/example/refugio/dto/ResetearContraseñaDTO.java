package com.example.refugio.dto;

import lombok.Data;

@Data
public class ResetearContraseñaDTO {

    private String email;
    private String token;
    private String contraseñaNueva;
}
