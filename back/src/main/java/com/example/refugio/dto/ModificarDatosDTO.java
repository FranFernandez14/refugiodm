package com.example.refugio.dto;

import lombok.Data;

@Data
public class ModificarDatosDTO {

    Long idUsuario;
    String nombre;
    String apellido;
    String email;
    String telefono;
    String dni;
}
