package com.example.refugio.controladores;

import com.example.refugio.dto.AuthResponseDTO;
import com.example.refugio.dto.CambiarContraseñaDTO;
import com.example.refugio.dto.LoginDTO;
import com.example.refugio.dto.RegistroDTO;
import com.example.refugio.entidades.Rol;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.RolRepositorio;
import com.example.refugio.repositorios.UsuarioRepositorio;
import com.example.refugio.seguridad.JwtGenerator;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.IllegalFormatCodePointException;

@RestController
@RequestMapping("api/auth")
public class AutenticacionControlador {

    private AuthenticationManager authenticationManager;
    private UsuarioRepositorio usuarioRepositorio;
    private RolRepositorio rolRepositorio;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;

    @Autowired
    public AutenticacionControlador(AuthenticationManager authenticationManager, UsuarioRepositorio usuarioRepositorio,
                                    RolRepositorio rolRepositorio, PasswordEncoder passwordEncoder, JwtGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.usuarioRepositorio = usuarioRepositorio;
        this.rolRepositorio = rolRepositorio;
        this.passwordEncoder = passwordEncoder;
        this.jwtGenerator = jwtGenerator;
    }


    @PostMapping ("login")
        public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDTO){
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = jwtGenerator.generateToken(authentication);

            return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);
    }

    @PostMapping ("registro")
    public ResponseEntity<String> registro(@RequestBody RegistroDTO registroDTO){
        if (usuarioRepositorio.existsByEmail(registroDTO.getEmail())){
            return new ResponseEntity<>("Email ya registrado", HttpStatus.BAD_REQUEST);
        }
        Usuario usuario = new Usuario();
        usuario.setEmail(registroDTO.getEmail());
        usuario.setPassword(passwordEncoder.encode(registroDTO.getPassword()));
        usuario.setNombre(registroDTO.getNombre());
        usuario.setApellido(registroDTO.getApellido());
        usuario.setDni(registroDTO.getDni());
        usuario.setNroTelefono(registroDTO.getNroTelefono());

       Rol roles = rolRepositorio.findByNombre("usuario").get();
       usuario.setRoles(Collections.singletonList(roles));

        usuarioRepositorio.save(usuario);

        return new ResponseEntity<>("Usuario registrado correctamente", HttpStatus.OK);
    }


    @PostMapping("cambiarContraseña")
    public ResponseEntity<String> cambiarContraseña(@RequestBody CambiarContraseñaDTO cambiarContraseñaDTO){
        Usuario usuario = usuarioRepositorio.getReferenceById(cambiarContraseñaDTO.getIdUsuario());
        if(passwordEncoder.matches(cambiarContraseñaDTO.getContraseñaActual(), usuario.getPassword())){
            usuario.setPassword(passwordEncoder.encode(cambiarContraseñaDTO.getContraseñaNueva()));
            usuarioRepositorio.save(usuario);
            return new ResponseEntity<>("Contraseña cambiada correctamente", HttpStatus.OK);
        }else{
            return new ResponseEntity<>("Contraseña actual incorrecta" , HttpStatus.BAD_REQUEST);
        }
    }

}