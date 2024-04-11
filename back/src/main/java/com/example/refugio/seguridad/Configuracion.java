package com.example.refugio.seguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class Configuracion {


    private JwtAuthEntryPoint jwtAuthEntryPoint;
    private CustomUserDetailsService userDetailsService;

    @Autowired
    public Configuracion(CustomUserDetailsService userDetailsService, JwtAuthEntryPoint jwtAuthEntryPoint) {
        this.userDetailsService = userDetailsService;
        this.jwtAuthEntryPoint = jwtAuthEntryPoint;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthEntryPoint)
                .and()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/*").permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/crear")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/buscar")).hasAnyAuthority("BUSCAR_CABAÑA")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/{id}/imagenes")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/{cabañaId}/imagenes/{imagenId}")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/estados}")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/{idCabaña}/estados")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/{idCabaña}/mantenimiento")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/{idCabaña}/cambiarTipo")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/darDeBaja/{id}")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/cancelarBaja/{id}")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/estados/*")).hasAnyAuthority("GESTIONAR_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/calificaciones")).hasAnyAuthority("VER_OPINIONES")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/calificaciones/calificar/{id}")).hasAnyAuthority("GESTIONAR_MI_RESERVA")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/calificaciones/editar/{id}")).hasAnyAuthority("GESTIONAR_MI_RESERVA")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/tipos/costos/*")).hasAnyAuthority("GESTIONAR_TIPO_CABAÑA")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/tipos/caracteristicas/*")).hasAnyAuthority("GESTIONAR_TIPO_CABAÑA")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/tipos/*")).hasAnyAuthority("GESTIONAR_TIPO_CABAÑA")
                        .requestMatchers(new AntPathRequestMatcher("/api/cabañas/tipos/nuestrasCabañas")).hasAnyAuthority("VER_NUESTRAS_CABAÑAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/ganancias/*")).hasAnyAuthority("VER_GANANCIAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/permisos/*")).hasAnyAuthority("GESTIONAR_ROLES")
                        .requestMatchers(new AntPathRequestMatcher("api/usuarios/roles/*")).hasAnyAuthority("GESTIONAR_ROLES")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/pendientes")).hasAnyAuthority("VER_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/aceptadas")).hasAnyAuthority("VER_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/canceladas")).hasAnyAuthority("VER_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/finalizadas")).hasAnyAuthority("VER_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/iniciadas")).hasAnyAuthority("VER_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/byState")).hasAnyAuthority("VER_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/{id}")).hasAnyAuthority("GESTIONAR_MI_RESERVA")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/{id}")).hasAnyAuthority("GESTIONAR_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/reservar")).hasAnyAuthority("RESERVAR_CABAÑA")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/cancelarByUsuario/{id}")).hasAnyAuthority("GESTIONAR_MI_RESERVA")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/cancelarByAdmin/{id}")).hasAnyAuthority("GESTIONAR_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/aceptarByAdmin/{id}")).hasAnyAuthority("GESTIONAR_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/finalizarByAdmin/{id}")).hasAnyAuthority("GESTIONAR_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/iniciarByAdmin/{id}")).hasAnyAuthority("GESTIONAR_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/reservas/misreservas/{idUsuario}")).hasAnyAuthority("GESTIONAR_MI_RESERVA")
                        .requestMatchers(new AntPathRequestMatcher("api/estados")).hasAnyAuthority("GESTIONAR_RESERVAS")
                        .requestMatchers(new AntPathRequestMatcher("/api/usuarios/modificarDatos")).hasAnyAuthority("GESTIONAR_MIS_DATOS")
                        .requestMatchers(new AntPathRequestMatcher("/api/usuarios/darDeBaja/*")).hasAnyAuthority("GESTIONAR_USUARIOS")
                        .requestMatchers(new AntPathRequestMatcher("/api/usuarios/cancelarBaja/*")).hasAnyAuthority("GESTIONAR_USUARIOS")
                        .requestMatchers(new AntPathRequestMatcher("/api/usuarios")).hasAnyAuthority("GESTIONAR_USUARIOS")
                        .anyRequest().authenticated()
                )
                .cors(withDefaults())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic();
        http.addFilterBefore(jwtAuthFIlter(), UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public JwtAuthFIlter jwtAuthFIlter() {
        return new JwtAuthFIlter();
    }

    /*@Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.addExposedHeader("Access-Control-Allow-Origin");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

     */
}
