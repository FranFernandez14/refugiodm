package com.example.refugio.dto;

import lombok.Data;

@Data
public class ModificarDatosDTO {

   private Long idUsuario;
   private String nombre;
   private String apellido;
   private String email;
   private String telefono;
   private String dni;
}
