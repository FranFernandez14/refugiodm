package com.example.refugio.repositorios;

import com.example.refugio.entidades.Ganancia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public interface GananciaRepositorio extends JpaRepository<Ganancia, Long> {



    @Query("SELECT DAY(g.fecha) AS dia, SUM(g.monto) AS gananciaTotal " +
            "FROM Ganancia g " +
            "WHERE YEAR(g.fecha) = :year AND MONTH(g.fecha) = :month " +
            "GROUP BY DAY(g.fecha)")
    List<Map<String, Object>> getGananciaMensualDiaADia(@Param("year") int year, @Param("month") int month);

    @Query("SELECT MONTH(g.fecha) as month, SUM(g.monto) as totalEarnings " +
            "FROM Ganancia g " +
            "WHERE YEAR(g.fecha) = :year " +
            "GROUP BY MONTH(g.fecha)")
    List<Object[]> getGananciaAnualMesAMes(@Param("year") int year);
}
