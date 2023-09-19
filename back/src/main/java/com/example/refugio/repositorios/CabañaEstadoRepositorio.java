package com.example.refugio.repositorios;

import com.example.refugio.entidades.CabañaEstado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabañaEstadoRepositorio extends JpaRepository<CabañaEstado, Long> {
}
