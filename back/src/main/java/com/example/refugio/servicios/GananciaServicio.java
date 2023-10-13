package com.example.refugio.servicios;

import com.example.refugio.dto.salida.GananciaAnualDTO;
import com.example.refugio.dto.salida.GananciaMensualDTO;
import com.example.refugio.entidades.Ganancia;
import com.example.refugio.entidades.Rol;
import com.example.refugio.repositorios.GananciaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Month;
import java.time.MonthDay;
import java.util.*;

@Service
public class GananciaServicio {
    @Autowired
    private GananciaRepositorio gananciaRepositorio;

    public List<Ganancia> getGanancias(){
        return gananciaRepositorio.findAll();
    }


    public void saveOrUpdate(Ganancia ganancia){gananciaRepositorio.save(ganancia);
    }

    public void delete (Long id){
        gananciaRepositorio.deleteById(id);
    }


    public List<GananciaMensualDTO> getGananciaMensualDiaADia(int year, int month) {
        List<Map<String, Object>> results = gananciaRepositorio.getGananciaMensualDiaADia(year, month);

        Map<Integer, Double> gananciasPorDia = new HashMap<>();

        for (Map<String, Object> result : results) {
            int dia = (int) result.get("dia");
            double gananciaTotal = (double) result.get("gananciaTotal");
            gananciasPorDia.put(dia, gananciaTotal);
        }

        List<GananciaMensualDTO> gananciasMensualesDTO = new ArrayList<>();
        Month monthEnum = Month.of(month);
        for (int dia = 1; dia <= monthEnum.maxLength(); dia++) {
            GananciaMensualDTO dto = new GananciaMensualDTO();
            dto.setDia(MonthDay.of(monthEnum, dia));
            dto.setMonto(gananciasPorDia.getOrDefault(dia, 0.0));
            gananciasMensualesDTO.add(dto);
        }

        return gananciasMensualesDTO;
    }

    public List<GananciaAnualDTO> getGananciaAnualMesAMes(int year) {

        List<Object[]> results = gananciaRepositorio.getGananciaAnualMesAMes(year);

        Map<Integer, Double> gananciasPorMes = new HashMap<>();

        for (Object[] result : results) {
            int mes = (int) result[0];
            double gananciaTotal = (double) result[1];
            gananciasPorMes.put(mes, gananciaTotal);
        }

        List<GananciaAnualDTO> gananciasAnualesDTO = new ArrayList<>();
        for (int mes = 1; mes <= 12; mes++) {
            GananciaAnualDTO dto = new GananciaAnualDTO();
            dto.setMes(Month.of(mes));
            dto.setMonto(gananciasPorMes.getOrDefault(mes, 0.0));
            gananciasAnualesDTO.add(dto);
        }

        return gananciasAnualesDTO;
    }
}
