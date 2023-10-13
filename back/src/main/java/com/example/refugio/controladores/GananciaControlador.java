    package com.example.refugio.controladores;

    import com.example.refugio.dto.salida.GananciaAnualDTO;
    import com.example.refugio.dto.salida.GananciaMensualDTO;
    import com.example.refugio.entidades.Ganancia;
    import com.example.refugio.servicios.GananciaServicio;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @RequestMapping("/api/ganancias")
    public class GananciaControlador {
        @Autowired
        private GananciaServicio gananciaServicio;

        @GetMapping("/mensual")
        public List<GananciaMensualDTO> getGananciaMensualDiaADia(@RequestParam("year") int year, @RequestParam("month") int month) {
            return gananciaServicio.getGananciaMensualDiaADia(year, month);
        }

        @GetMapping("/anual")
        public List<GananciaAnualDTO> getGananciaAnualMesAMes(@RequestParam("year") int year) {
            return gananciaServicio.getGananciaAnualMesAMes(year);
        }

        @PostMapping("")
        public void save(Ganancia ganancia){
            gananciaServicio.saveOrUpdate(ganancia);
        }

        @DeleteMapping("/{id}")
        public void delete(@RequestParam("id") Long id){
            gananciaServicio.delete(id);
        }
    }

