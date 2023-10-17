package com.example.refugio.servicios;

import com.example.refugio.dto.ModificarDatosDTO;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServicio {
    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    public List<Usuario> getUsuarios(){
        return usuarioRepositorio.findAll();
    }

    public Optional<Usuario> getUsuario(Long id){
        return usuarioRepositorio.findById(id);
    }

    public Optional<Usuario> getUsuarioByEmail(String email){
        return usuarioRepositorio.findByEmail(email);
    }

    public void saveOrUpdate(Usuario usuario){
        usuarioRepositorio.save(usuario);
    }

    public void delete (Long id){
        usuarioRepositorio.deleteById(id);
    }

    public void modificarDatos(ModificarDatosDTO modificarDatosDTO) {

        Usuario usuario = usuarioRepositorio.getReferenceById(modificarDatosDTO.getIdUsuario());

        if(modificarDatosDTO.getDni()!=null){
            usuario.setDni(modificarDatosDTO.getDni());
        }
        if(modificarDatosDTO.getNombre()!=null){
            usuario.setNombre(modificarDatosDTO.getNombre());
        }
        if(modificarDatosDTO.getApellido()!=null){
            usuario.setApellido(modificarDatosDTO.getApellido());
        }
        if(modificarDatosDTO.getEmail()!=null){
            usuario.setEmail(modificarDatosDTO.getEmail());
        }
        if(modificarDatosDTO.getTelefono()!=null){
            usuario.setNroTelefono(modificarDatosDTO.getTelefono());
        }

        usuarioRepositorio.save(usuario);
    }

    public void cancelarBaja(Long id) {
        Usuario usuario = usuarioRepositorio.getReferenceById(id);
        if (usuario.getFechaHoraBaja()==null){
            usuario.setFechaHoraBaja(LocalDateTime.now());
            usuarioRepositorio.save(usuario);
        }
    }

    public void darDeBaja(Long id) {
        Usuario usuario = usuarioRepositorio.getReferenceById(id);
        if (usuario.getFechaHoraBaja()!=null){
            usuario.setFechaHoraBaja(null);
            usuarioRepositorio.save(usuario);
        }
    }
}
