package com.example.refugio.dto;

import lombok.Data;

@Data
public class RegistroDTO {
    private String email;
    private String password;
    private String nombre;
    private String apellido;
    private String dni;
    private String nroTelefono;
}
