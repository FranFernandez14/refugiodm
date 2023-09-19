package com.example.refugio.repositorios;

import com.example.refugio.entidades.Reserva;
import com.example.refugio.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReservaRepositorio extends JpaRepository<Reserva,Long> {
    Optional<Reserva> findByUsuario(Usuario usuario);
}
