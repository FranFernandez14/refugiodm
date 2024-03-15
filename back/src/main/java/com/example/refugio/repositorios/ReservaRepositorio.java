package com.example.refugio.repositorios;

import com.example.refugio.dto.BuscarReservasDTO;
import com.example.refugio.dto.salida.VerReservasDTO;
import com.example.refugio.entidades.Reserva;
import com.example.refugio.entidades.Usuario;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ReservaRepositorio extends JpaRepository<Reserva,Long> {
    Optional<Reserva> findByUsuario(Usuario usuario);

    @Query(value = "SELECT r from Reserva r join r.usuario u where u.id = :id")
    List<Reserva> getReservasByUsuario(@Param("id") Long id);

    @Query("SELECT r FROM Reserva r " +
            "WHERE r.estadoActual.idER = :estadoId")
    Page<Reserva> getReservasByState(
            @Param("estadoId") Long estadoId,
            Pageable pageable);

    @Query("SELECT r FROM Reserva r " +
            "WHERE r.estadoActual.idER = :estadoId " +
            "AND r.fechaInicio >= :fechaInicio " +
            "AND r.fechaFin <= :fechaFin")
    Page<Reserva> getReservasByState(
            @Param("estadoId") Long estadoId,
            @Param("fechaInicio") LocalDate fechaInicio,
            @Param("fechaFin") LocalDate fechaFin,
            Pageable pageable);

}

