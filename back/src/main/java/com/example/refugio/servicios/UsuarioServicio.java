package com.example.refugio.servicios;

import com.example.refugio.dto.CambiarRolDTO;
import com.example.refugio.dto.ModificarDatosDTO;
import com.example.refugio.dto.salida.VerUsuariosDTO;
import com.example.refugio.entidades.Rol;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.RolRepositorio;
import com.example.refugio.repositorios.UsuarioRepositorio;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioServicio {
    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    @Autowired
    EntityManager entityManager;

    @Autowired
    RolRepositorio rolRepositorio;

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
        if (usuario.getFechaHoraBaja()!=null){
            usuario.setFechaHoraBaja(null);
            usuarioRepositorio.save(usuario);
        }
    }

    public void darDeBaja(Long id) {
        Usuario usuario = usuarioRepositorio.getReferenceById(id);
        if (usuario.getFechaHoraBaja()==null){
            usuario.setFechaHoraBaja(LocalDateTime.now());
            usuarioRepositorio.save(usuario);
        }
    }

    public Page<VerUsuariosDTO> buscar(Pageable pageable){
        Page<Usuario> usuarios = usuarioRepositorio.buscar(pageable);
        List<VerUsuariosDTO> dtos = usuarios.stream()
                .map(this::convertToVerUsuariosDTO)
                .collect(Collectors.toList());
        return new PageImpl<>(dtos, pageable, usuarios.getTotalElements());

    }
    public Page<VerUsuariosDTO> buscarUsuarios(List<String> parametros, Pageable pageable) {
        String jpql = "SELECT u FROM Usuario u WHERE ";

            for (int i = 0; i < parametros.size(); i++) {
                if (i > 0) {
                    jpql += "OR ";
                }
                jpql += "LOWER(u.nombre) LIKE CONCAT('%', LOWER(:parametro" + i + "), '%') OR ";
                jpql += "LOWER(u.apellido) LIKE CONCAT('%', LOWER(:parametro" + i + "), '%') OR ";
                jpql += "LOWER(u.rol.nombre) LIKE CONCAT('%', LOWER(:parametro" + i + "), '%') ";
            }

            TypedQuery<Usuario> query = entityManager.createQuery(jpql, Usuario.class);
            for (int i = 0; i < parametros.size(); i++) {
                query.setParameter("parametro" + i, parametros.get(i));
            }
            query.setFirstResult((int) pageable.getOffset());
            query.setMaxResults(pageable.getPageSize());
            List<Usuario> usuarios = query.getResultList();



        List<VerUsuariosDTO> dtos = usuarios.stream()
                .map(this::convertToVerUsuariosDTO)
                .collect(Collectors.toList());

        long totalUsuarios = usuarios.size();

        return new PageImpl<>(dtos, pageable, totalUsuarios);
    }

    private VerUsuariosDTO convertToVerUsuariosDTO(Usuario usuario){
        return new VerUsuariosDTO(usuario.getId(), usuario.getNombre(), usuario.getApellido(), usuario.getEmail(),
                usuario.getDni(), usuario.getRol().getNombre(), usuario.getNroTelefono(), usuario.getFechaHoraAlta(),
                usuario.getFechaHoraBaja());
    }

    public void cambiarRol(CambiarRolDTO cambiarRolDTO) {
        Usuario usuario = usuarioRepositorio.getReferenceById(cambiarRolDTO.getIdUsuario());
        Rol rol = rolRepositorio.getReferenceById(cambiarRolDTO.getIdRol());
        usuario.setRol(rol);
        usuarioRepositorio.save(usuario);
    }
}
