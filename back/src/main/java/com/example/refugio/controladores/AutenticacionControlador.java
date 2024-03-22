package com.example.refugio.controladores;

import com.example.refugio.dto.*;
import com.example.refugio.entidades.Rol;
import com.example.refugio.entidades.Usuario;
import com.example.refugio.repositorios.RolRepositorio;
import com.example.refugio.repositorios.UsuarioRepositorio;
import com.example.refugio.seguridad.JwtGenerator;
import com.example.refugio.servicios.EmailServicio;
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
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.IllegalFormatCodePointException;
import java.util.Optional;
import java.util.Random;

@RestController
@RequestMapping("api/auth")
public class AutenticacionControlador {

    private AuthenticationManager authenticationManager;
    private UsuarioRepositorio usuarioRepositorio;
    private RolRepositorio rolRepositorio;
    private PasswordEncoder passwordEncoder;
    private JwtGenerator jwtGenerator;

    @Autowired
    private EmailServicio emailService;

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

       Rol rol = rolRepositorio.findByNombre("usuario").get();
       usuario.setRol(rol);

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

    @PostMapping("/generarToken")
    public ResponseEntity<String> enviarToken(@RequestParam("email") String email) {
        try {
            Optional<Usuario> usuario = Optional.of(usuarioRepositorio.findByEmail(email).get());
            if (usuario != null) {
                Usuario usuario1 = usuario.get();
                String resetToken = generateResetToken();
                usuario1.setTokenRecuperacion(resetToken);
                usuarioRepositorio.save(usuario1);
                emailService.sendPasswordResetEmail(email, "Restablecer contraseña - Refugio de Montaña", "Este es tú codigo de reseteo de contraseña: " + resetToken);
            }
            return new ResponseEntity<String>("Token enviado correctamente", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Error: " + e, HttpStatus.BAD_REQUEST);
        }


    }

    private String generateResetToken() {
        Random random = new Random();
        int token = 100000 + random.nextInt(900000); // Genera un número de 6 dígitos
        return String.valueOf(token);
    }

    @PostMapping("/verificarToken")
    private ResponseEntity<String> verificarToken(@RequestParam("token") String token, @RequestParam("email") String email) {
        try {
            Optional<Usuario> usuario = Optional.of(usuarioRepositorio.findByEmail(email).get());
            if (usuario != null) {
                Usuario usuario1 = usuario.get();
                if (token.equals(usuario1.getTokenRecuperacion())) {
                    return new ResponseEntity<String>("Token correcto", HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("Token incorrecto", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<String>("Correo electrónico incorrecto", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("Error: " + e, HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/resetearContraseña")
    public ResponseEntity<String> resetearContraseña(@RequestBody ResetearContraseñaDTO resetearContraseñaDTO) {
        try {
            Optional<Usuario> usuario = Optional.of(usuarioRepositorio.findByEmail(resetearContraseñaDTO.getEmail()).get());
            if (usuario != null) {
                Usuario usuario1 = usuario.get();
                if (resetearContraseñaDTO.getToken().equals(usuario1.getTokenRecuperacion())) {
                    usuario1.setPassword(passwordEncoder.encode(resetearContraseñaDTO.getContraseñaNueva()));
                    usuario1.setTokenRecuperacion(null);
                    usuarioRepositorio.save(usuario1);
                    return new ResponseEntity<String>("Contraseña cambiada correctamente", HttpStatus.OK);
                } else {
                    return new ResponseEntity<String>("Token incorrecto", HttpStatus.BAD_REQUEST);
                }
            } else {
                return new ResponseEntity<String>("Correo electrónico incorrecto", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<String>("Error: " + e, HttpStatus.BAD_REQUEST);
        }
    }

}