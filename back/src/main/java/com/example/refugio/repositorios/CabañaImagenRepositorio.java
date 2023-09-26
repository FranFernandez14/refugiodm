package com.example.refugio.repositorios;

import com.example.refugio.entidades.CabañaImagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabañaImagenRepositorio extends JpaRepository<CabañaImagen, Long> {
}
