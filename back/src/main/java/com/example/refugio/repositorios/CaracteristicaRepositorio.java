package com.example.refugio.repositorios;

import com.example.refugio.entidades.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaracteristicaRepositorio extends JpaRepository<Caracteristica, Long> {

}
