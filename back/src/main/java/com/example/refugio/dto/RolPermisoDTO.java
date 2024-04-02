package com.example.refugio.dto;

import lombok.Data;
import org.antlr.v4.runtime.misc.NotNull;

@Data
public class RolPermisoDTO {
    @NotNull
    private Long idRol;
    @NotNull
    private Long idPermiso;
}
