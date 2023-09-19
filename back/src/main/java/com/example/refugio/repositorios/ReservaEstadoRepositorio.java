package com.example.refugio.repositorios;

import com.example.refugio.entidades.ReservaEstado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReservaEstadoRepositorio extends JpaRepository<ReservaEstado, Long> {
}
