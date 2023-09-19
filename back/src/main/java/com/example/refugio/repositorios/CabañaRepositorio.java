package com.example.refugio.repositorios;

import com.example.refugio.entidades.Cabaña;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CabañaRepositorio extends JpaRepository<Cabaña, Long> {
}
