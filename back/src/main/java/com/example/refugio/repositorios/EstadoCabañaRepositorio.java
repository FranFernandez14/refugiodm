package com.example.refugio.repositorios;

import com.example.refugio.entidades.EstadoCabaña;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EstadoCabañaRepositorio extends JpaRepository<EstadoCabaña, Long> {
    Optional<EstadoCabaña> findByNombreEC(String nombreEC);
}
