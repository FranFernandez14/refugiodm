package com.example.refugio.repositorios;

import com.example.refugio.dto.salida.VerReservasDTO;
import com.example.refugio.entidades.Reserva;
import com.example.refugio.entidades.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepositorio extends JpaRepository<Reserva,Long> {
    Optional<Reserva> findByUsuario(Usuario usuario);

    @Query(value = "SELECT r from Reserva r join r.usuario u where u.id = :id")
    List<Reserva> getReservasByUsuario(@Param("id") Long id);
}
