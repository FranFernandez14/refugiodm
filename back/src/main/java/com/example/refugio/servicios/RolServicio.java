package com.example.refugio.servicios;

import com.example.refugio.dto.CambiarRolDTO;
import com.example.refugio.dto.RolPermisoDTO;
import com.example.refugio.entidades.Permiso;
import com.example.refugio.entidades.ReservaEstado;
import com.example.refugio.entidades.Rol;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.PermisoRepositorio;
import com.example.refugio.repositorios.ReservaEstadoRepositorio;
import com.example.refugio.repositorios.RolRepositorio;
import com.example.refugio.repositorios.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class RolServicio {

    @Autowired
    RolRepositorio rolRepositorio;

    @Autowired
    UsuarioRepositorio usuarioRepositorio;

    @Autowired
    PermisoRepositorio permisoRepositorio;


    public List<Rol> getRoles(){
        return rolRepositorio.findAll();
    }

    public Optional<Rol> getRol(Long id){
        return rolRepositorio.findById(id);
    }


    public void saveOrUpdate(Rol rol){rolRepositorio.save(rol);
    }

    public void delete (Long id){
        rolRepositorio.deleteById(id);
    }

    public void agregarPermiso(RolPermisoDTO rolPermisoDTO) {
        Permiso permiso = permisoRepositorio.getReferenceById(rolPermisoDTO.getIdPermiso());
        Rol rol = rolRepositorio.getReferenceById(rolPermisoDTO.getIdRol());
        rol.getPermisos().add(permiso);
        rolRepositorio.save(rol);
    }

    public void eliminarPermiso(RolPermisoDTO rolPermisoDTO){
        Permiso permiso = permisoRepositorio.getReferenceById(rolPermisoDTO.getIdPermiso());
        Rol rol = rolRepositorio.getReferenceById(rolPermisoDTO.getIdRol());
        rol.getPermisos().remove(permiso);
        rolRepositorio.save(rol);
    }

    public void crearRol(String nombre) {
        Rol rol = new Rol();
        rol.setNombre(nombre);
        rolRepositorio.save(rol);
    }

/*
    public void asignarUsuario(CambiarRolDTO cambiarRolDTO){
        Usuario usuario = usuarioRepositorio.getReferenceById(cambiarRolDTO.getIdUsuario());
        List<Rol> roles = new ArrayList<>();
        roles.add(rolRepositorio.findByNombre("usuario").get());
        usuari.setRoles(roles);
        usuarioRepositorio.save(usuario);
   }

    public void asignarEmpleado(CambiarRolDTO cambiarRolDTO){
        Usuario usuario = usuarioRepositorio.getReferenceById(cambiarRolDTO.getIdUsuario());
        List<Rol> roles = new ArrayList<>();
        roles.add(rolRepositorio.findByNombre("usuario").get());
        roles.add(rolRepositorio.findByNombre("empleado").get());
        usuario.setRoles(roles);
        usuarioRepositorio.save(usuario);
    }

    public void asignarAdministrador(CambiarRolDTO cambiarRolDTO){
        Usuario usuario = usuarioRepositorio.getReferenceById(cambiarRolDTO.getIdUsuario());
        List<Rol> roles = new ArrayList<>();
        roles.add(rolRepositorio.findByNombre("usuario").get());
        roles.add(rolRepositorio.findByNombre("empleado").get());
        roles.add(rolRepositorio.findByNombre("administrador").get());
        usuario.setRoles(roles);
        usuarioRepositorio.save(usuario);
    }

 */
}
