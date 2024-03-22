package com.example.refugio.repositorios;

import com.example.refugio.entidades.Permiso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PermisoRepositorio extends JpaRepository<Permiso, Long> {
}
