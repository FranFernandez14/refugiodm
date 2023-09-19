package com.example.refugio.repositorios;

import com.example.refugio.entidades.TipoCabaña;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoCabañaRepositorio extends JpaRepository<TipoCabaña, Long> {
}
