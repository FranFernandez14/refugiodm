package com.example.refugio.servicios;


import com.example.refugio.dto.CambiarEstadoReservaDTO;
import com.example.refugio.dto.ReservaDTO;
import com.example.refugio.dto.salida.ReservaEstadoDTO;
import com.example.refugio.dto.salida.VerReservaDTO;
import com.example.refugio.dto.salida.VerReservasDTO;
import com.example.refugio.entidades.*;
import com.example.refugio.repositorios.EstadoCabañaRepositorio;
import com.example.refugio.repositorios.EstadoReservaRepositorio;
import com.example.refugio.repositorios.GananciaRepositorio;
import com.example.refugio.repositorios.ReservaRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ReservaServicio {


    @Autowired
    ReservaRepositorio reservaRepositorio;

    @Autowired
    GananciaServicio gananciaServicio;

    @Autowired
    private CabañaServicio cabañaServicio;

    @Autowired
    private UsuarioServicio usuarioServicio;

    @Autowired
    private ReservaEstadoServicio reservaEstadoServicio;

    @Autowired
    private EstadoReservaRepositorio estadoReservaRepositorio;

    @Autowired
    private EstadoCabañaRepositorio estadoCabañaRepositorio;

    @Autowired
    private CabañaEstadoServicio cabañaEstadoServicio;

    public List<VerReservasDTO> getReservasPendientes(){

        List<Reserva> reservas = reservaRepositorio.findAll();

        List<VerReservasDTO> reservasDTO = new ArrayList<>();

        for (Reserva reserva : reservas) {
            String estadoActual = null;

            for (ReservaEstado reservaEstado : reserva.getReservasEstado()) {
                if (reservaEstado.getFechafinRE() == null) {
                    EstadoReserva estadoReserva = reservaEstado.getEstadoReserva();
                    if (estadoReserva != null) {
                        estadoActual = estadoReserva.getNombreER();
                        break;
                    }
                }
            }

            if ("Pendiente".equals(estadoActual)) {
                VerReservasDTO reservaDTO = new VerReservasDTO();
                reservaDTO.setIdReserva(reserva.getIdReserva());
                reservaDTO.setIdCabaña(reserva.getCabaña().getIDCabaña());
                reservaDTO.setCantPersonas(reserva.getCantPersonas());
                reservaDTO.setFechaInicio(reserva.getFechaInicio());
                reservaDTO.setFechaFin(reserva.getFechaFin());
                reservaDTO.setMontoTotal(reserva.getMontoTotal());
                reservaDTO.setEstadoActual(estadoActual);
                reservasDTO.add(reservaDTO);
            }
        }
        return reservasDTO;
    }

    public List<VerReservasDTO> getReservasAceptadas(){

        List<Reserva> reservas = reservaRepositorio.findAll();

        List<VerReservasDTO> reservasDTO = new ArrayList<>();

        for (Reserva reserva : reservas) {
            String estadoActual = null;

            for (ReservaEstado reservaEstado : reserva.getReservasEstado()) {
                if (reservaEstado.getFechafinRE() == null) {
                    EstadoReserva estadoReserva = reservaEstado.getEstadoReserva();
                    if (estadoReserva != null) {
                        estadoActual = estadoReserva.getNombreER();
                        break;
                    }
                }
            }

            if ("Aceptada".equals(estadoActual)) {
                VerReservasDTO reservaDTO = new VerReservasDTO();
                reservaDTO.setIdReserva(reserva.getIdReserva());
                reservaDTO.setIdCabaña(reserva.getCabaña().getIDCabaña());
                reservaDTO.setCantPersonas(reserva.getCantPersonas());
                reservaDTO.setFechaInicio(reserva.getFechaInicio());
                reservaDTO.setFechaFin(reserva.getFechaFin());
                reservaDTO.setMontoTotal(reserva.getMontoTotal());
                reservaDTO.setEstadoActual(estadoActual);

                reservasDTO.add(reservaDTO);
            }
        }
        return reservasDTO;
    }



    public VerReservaDTO getReserva(Long id){

        Reserva reserva = reservaRepositorio.getReferenceById(id);
        VerReservaDTO verReservaDTO = new VerReservaDTO();

        verReservaDTO.setIdCabaña(reserva.getCabaña().getIDCabaña());
        verReservaDTO.setCantPersonas(reserva.getCantPersonas());
        verReservaDTO.setMontoTotal(reserva.getMontoTotal());
        verReservaDTO.setFechaReserva(reserva.getFechaReserva());
        verReservaDTO.setFechaInicio(reserva.getFechaInicio());
        verReservaDTO.setFechaFin(reserva.getFechaFin());

        List<ReservaEstado> reservaEstados = reserva.getReservasEstado();

        for (ReservaEstado reservaEstado: reservaEstados ) {
            ReservaEstadoDTO reservaEstadoDTO = new ReservaEstadoDTO();
            reservaEstadoDTO.setFechaInicioRE(reservaEstado.getFechaInicioRE());
            reservaEstadoDTO.setFechaFinRE(reservaEstado.getFechafinRE());
            reservaEstadoDTO.setNombre(reservaEstado.getEstadoReserva().getNombreER());
            verReservaDTO.getEstados().add(reservaEstadoDTO);

            if (reservaEstado.getFechafinRE() == null){
                verReservaDTO.setEstadoActual(reservaEstado.getEstadoReserva().getNombreER());
            }
        }

        verReservaDTO.setNombreUsuario(reserva.getUsuario().getNombre()+" "+reserva.getUsuario().getApellido());
        verReservaDTO.setDni(reserva.getUsuario().getDni());
        verReservaDTO.setEmail(reserva.getUsuario().getEmail());
        verReservaDTO.setTelefono(reserva.getUsuario().getNroTelefono());
        return verReservaDTO;
    }


    public void saveOrUpdate(Reserva reserva){
        reservaRepositorio.save(reserva);
    }

    public void delete (Long id){
        reservaRepositorio.deleteById(id);
    }

    public ResponseEntity<String> reservar( ReservaDTO reservaDTO){
        try{
            if(reservaDTO.getCantPersonas() > cabañaServicio.getCabaña(reservaDTO.getIDCabaña()).get().getTamaño()){
                return new ResponseEntity<>("La cabaña no admite tantas personas", HttpStatus.BAD_REQUEST);
            }

            Reserva reserva = new Reserva();
            reserva.setMontoTotal(reservaDTO.getMontoTotal());
            reserva.setFechaInicio(reservaDTO.getFechaInicio());
            reserva.setFechaFin(reservaDTO.getFechaFin().minusDays(1));
            reserva.setCantPersonas(reservaDTO.getCantPersonas());

            Usuario usuario = usuarioServicio.getUsuario(reservaDTO.getIDUsuario()).get();

            reserva.setUsuario(usuario);

            Cabaña cabaña = cabañaServicio.getCabaña(reservaDTO.getIDCabaña()).get();
            reserva.setCabaña(cabaña);

            ReservaEstado reservaEstado = new ReservaEstado();
            reservaEstado.setEstadoReserva(estadoReservaRepositorio.findByNombreER("Pendiente").get());
            reserva.setReservasEstado(Collections.singletonList(reservaEstado));
            reserva.setEstadoActual(estadoReservaRepositorio.findByNombreER("Pendiente").get());

            reserva.setFechaReserva(LocalDateTime.now());

            reservaRepositorio.save(reserva);
            usuario.getReservas().add(reserva);
            usuarioServicio.saveOrUpdate(usuario);

            reservaEstado.setFechaInicioRE(LocalDateTime.now());
            reservaEstado.setReserva(reserva);
            reservaEstadoServicio.saveOrUpdate(reservaEstado);

            cabaña.getReservas().add(reserva);

            CabañaEstado cabañaEstado = new CabañaEstado();
            cabañaEstado.setEstadoCabaña(estadoCabañaRepositorio.findByNombreEC("Ocupada").get());
            cabañaEstado.setFechaInicioCE(reserva.getFechaInicio());
            cabañaEstado.setFechaFinCE(reserva.getFechaFin().minusDays(1));
            cabañaEstado.setCabaña(cabaña);
            cabaña.getEstados().add(cabañaEstado);
            cabañaEstadoServicio.saveOrUpdate(cabañaEstado);
            cabaña.getEstados().add(cabañaEstado);

            cabañaServicio.saveOrUpdate(cabaña);


            return new ResponseEntity<>("Reserva realizada correctamente", HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(reservaDTO.toString() , HttpStatus.BAD_REQUEST);
        }

    }

    public void cancelarByUsuario(Long id) {
        Reserva reserva = reservaRepositorio.getReferenceById(id);
        List<ReservaEstado> reservasEstado = reserva.getReservasEstado();

        reservasEstado.forEach(re -> {
            if (re.getFechafinRE() != null) {
                re.setFechafinRE(LocalDateTime.now());
            }
        });

        ReservaEstado reservaEstado = new ReservaEstado();
        reservaEstado.setEstadoReserva(estadoReservaRepositorio.findByNombreER("Cancelada por el cliente").get());
        reservaEstado.setFechaInicioRE(LocalDateTime.now());
        reservaEstado.setReserva(reserva);
        reservaEstadoServicio.saveOrUpdate(reservaEstado);

        reserva.setEstadoActual(estadoReservaRepositorio.findByNombreER("Cancelada por el cliente").get());

        reservaRepositorio.save(reserva);

    }

    public void cancelarByAdmin(Long id) {

        Reserva reserva = reservaRepositorio.getReferenceById(id);
        List<ReservaEstado> reservasEstado = reserva.getReservasEstado();

        reservasEstado.forEach(re -> {
            if (re.getFechafinRE() == null) {
                re.setFechafinRE(LocalDateTime.now());
            }
        });

        ReservaEstado reservaEstado = new ReservaEstado();
        reservaEstado.setEstadoReserva(estadoReservaRepositorio.findByNombreER("Cancelada por el administrador").get());
        reservaEstado.setFechaInicioRE(LocalDateTime.now());
        reservaEstado.setReserva(reserva);
        reservaEstadoServicio.saveOrUpdate(reservaEstado);

        reserva.setEstadoActual(estadoReservaRepositorio.findByNombreER("Cancelada por el administrador").get());

        reserva.getReservasEstado().add(reservaEstado);

        reservaRepositorio.save(reserva);

    }

    public void aceptarByAdmin(Long id) {
        Reserva reserva = reservaRepositorio.getReferenceById(id);
        List<ReservaEstado> reservasEstado = reserva.getReservasEstado();

        reservasEstado.forEach(re -> {
            if (re.getFechafinRE() == null) {
                re.setFechafinRE(LocalDateTime.now());
            }
        });

        ReservaEstado reservaEstado = new ReservaEstado();
        reservaEstado.setEstadoReserva(estadoReservaRepositorio.findByNombreER("Aceptada").get());
        reservaEstado.setFechaInicioRE(LocalDateTime.now());
        reservaEstado.setReserva(reserva);
        reservaEstadoServicio.saveOrUpdate(reservaEstado);

        reserva.setEstadoActual(estadoReservaRepositorio.findByNombreER("Aceptada").get());

        reserva.getReservasEstado().add(reservaEstado);

        reservaRepositorio.save(reserva);
    }

    public void iniciarByAdmin(Long id) {
        Reserva reserva = reservaRepositorio.getReferenceById(id);
        List<ReservaEstado> reservasEstado = reserva.getReservasEstado();

        reservasEstado.forEach(re -> {
            if (re.getFechafinRE() == null) {
                re.setFechafinRE(LocalDateTime.now());
            }
        });

        ReservaEstado reservaEstado = new ReservaEstado();
        reservaEstado.setEstadoReserva(estadoReservaRepositorio.findByNombreER("Iniciada").get());
        reservaEstado.setFechaInicioRE(LocalDateTime.now());
        reservaEstado.setReserva(reserva);
        reservaEstadoServicio.saveOrUpdate(reservaEstado);

        reserva.getReservasEstado().add(reservaEstado);
        reserva.setEstadoActual(estadoReservaRepositorio.findByNombreER("Iniciada").get());

        reservaRepositorio.save(reserva);
    }

    public void finalizarByAdmin(Long id) {
        Reserva reserva = reservaRepositorio.getReferenceById(id);
        List<ReservaEstado> reservasEstado = reserva.getReservasEstado();

        reservasEstado.forEach(re -> {
            if (re.getFechafinRE() == null) {
                re.setFechafinRE(LocalDateTime.now());
            }
        });

        ReservaEstado reservaEstado = new ReservaEstado();
        reservaEstado.setEstadoReserva(estadoReservaRepositorio.findByNombreER("Finalizada").get());
        reservaEstado.setFechaInicioRE(LocalDateTime.now());
        reservaEstado.setReserva(reserva);
        reservaEstadoServicio.saveOrUpdate(reservaEstado);

        reserva.getReservasEstado().add(reservaEstado);
        reserva.setEstadoActual(estadoReservaRepositorio.findByNombreER("Finalizada").get());

        reservaRepositorio.save(reserva);

        Ganancia ganancia = new Ganancia();
        ganancia.setFecha(LocalDate.now());
        ganancia.setMonto(reserva.getMontoTotal());
        gananciaServicio.saveOrUpdate(ganancia);
    }


    public List<VerReservasDTO> getReservasCanceladas() {


        List<Reserva> reservas = reservaRepositorio.findAll();

        List<VerReservasDTO> reservasDTO = new ArrayList<>();

        for (Reserva reserva : reservas) {
            String estadoActual = null;

            for (ReservaEstado reservaEstado : reserva.getReservasEstado()) {
                if (reservaEstado.getFechafinRE() == null) {
                    EstadoReserva estadoReserva = reservaEstado.getEstadoReserva();
                    if (estadoReserva != null) {
                        estadoActual = estadoReserva.getNombreER();
                        break;
                    }
                }
            }

            if (estadoActual != null && estadoActual.startsWith("Cancelada")) {
                VerReservasDTO reservaDTO = new VerReservasDTO();
                reservaDTO.setIdReserva(reserva.getIdReserva());
                reservaDTO.setIdCabaña(reserva.getCabaña().getIDCabaña());
                reservaDTO.setCantPersonas(reserva.getCantPersonas());
                reservaDTO.setFechaInicio(reserva.getFechaInicio());
                reservaDTO.setFechaFin(reserva.getFechaFin());
                reservaDTO.setMontoTotal(reserva.getMontoTotal());
                reservaDTO.setEstadoActual(estadoActual);

                reservasDTO.add(reservaDTO);
            }
        }
        return reservasDTO;

    }

    public List<VerReservasDTO> getReservasFinalizadas() {

        List<Reserva> reservas = reservaRepositorio.findAll();

        List<VerReservasDTO> reservasDTO = new ArrayList<>();

        for (Reserva reserva : reservas) {
            String estadoActual = null;

            for (ReservaEstado reservaEstado : reserva.getReservasEstado()) {
                if (reservaEstado.getFechafinRE() == null) {
                    EstadoReserva estadoReserva = reservaEstado.getEstadoReserva();
                    if (estadoReserva != null) {
                        estadoActual = estadoReserva.getNombreER();
                        break;
                    }
                }
            }

            if ("Finalizada".equals(estadoActual)) {
                VerReservasDTO reservaDTO = new VerReservasDTO();
                reservaDTO.setIdReserva(reserva.getIdReserva());
                reservaDTO.setIdCabaña(reserva.getCabaña().getIDCabaña());
                reservaDTO.setCantPersonas(reserva.getCantPersonas());
                reservaDTO.setFechaInicio(reserva.getFechaInicio());
                reservaDTO.setFechaFin(reserva.getFechaFin());
                reservaDTO.setMontoTotal(reserva.getMontoTotal());
                reservaDTO.setEstadoActual(estadoActual);

                reservasDTO.add(reservaDTO);
            }
        }
        return reservasDTO;
    }

    public List<VerReservasDTO> getReservasByUsuario(Long id) {
        List<Reserva> reservas =  reservaRepositorio.getReservasByUsuario(id);

        List<VerReservasDTO> reservasDTOS = new ArrayList<>();

        for (Reserva reserva: reservas) {
            VerReservasDTO reservaDTO = new VerReservasDTO();
            reservaDTO.setIdReserva(reserva.getIdReserva());
            reservaDTO.setIdCabaña(reserva.getCabaña().getIDCabaña());
            reservaDTO.setFechaInicio(reserva.getFechaInicio());
            reservaDTO.setFechaFin(reserva.getFechaFin());
            reservaDTO.setCantPersonas(reserva.getCantPersonas());
            reservaDTO.setMontoTotal(reserva.getMontoTotal());
            if(reserva.getEstadoActual()!=null){
                reservaDTO.setEstadoActual(reserva.getEstadoActual().getNombreER());
            }

            reservasDTOS.add(reservaDTO);
        }
        
        return reservasDTOS;
    }

    public List<VerReservasDTO> getReservasIniciadas() {
        List<Reserva> reservas = reservaRepositorio.findAll();

        List<VerReservasDTO> reservasDTO = new ArrayList<>();

        for (Reserva reserva : reservas) {
            String estadoActual = null;

            for (ReservaEstado reservaEstado : reserva.getReservasEstado()) {
                if (reservaEstado.getFechafinRE() == null) {
                    EstadoReserva estadoReserva = reservaEstado.getEstadoReserva();
                    if (estadoReserva != null) {
                        estadoActual = estadoReserva.getNombreER();
                        break;
                    }
                }
            }

            if ("Iniciada".equals(estadoActual)) {
                VerReservasDTO reservaDTO = new VerReservasDTO();
                reservaDTO.setIdReserva(reserva.getIdReserva());
                reservaDTO.setIdCabaña(reserva.getCabaña().getIDCabaña());
                reservaDTO.setCantPersonas(reserva.getCantPersonas());
                reservaDTO.setFechaInicio(reserva.getFechaInicio());
                reservaDTO.setFechaFin(reserva.getFechaFin());
                reservaDTO.setMontoTotal(reserva.getMontoTotal());
                reservaDTO.setEstadoActual(estadoActual);
                reservasDTO.add(reservaDTO);
            }
        }
        return reservasDTO;
    }


}
