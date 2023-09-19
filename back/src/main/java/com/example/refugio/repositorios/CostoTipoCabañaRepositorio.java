package com.example.refugio.repositorios;

import com.example.refugio.entidades.CostoTipoCabaña;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CostoTipoCabañaRepositorio extends JpaRepository<CostoTipoCabaña, Long> {
}
