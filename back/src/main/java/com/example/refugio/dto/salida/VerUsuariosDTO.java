package com.example.refugio.dto.salida;

import com.example.refugio.entidades.Rol;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.time.LocalDateTime;

@AllArgsConstructor
@Data
public class VerUsuariosDTO {

    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private String dni;
    private String rol;
    private String nroTelefono;
    private LocalDateTime fechaHoraAlta;
    private LocalDateTime fechaHoraBaja;
}
