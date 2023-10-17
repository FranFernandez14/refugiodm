import React from 'react';
import ReactStars from 'react-rating-stars-component';
import "./calificacion.css"

const Calificacion = ({ calificacion }) => {
    // Formatear la fecha en "dd-mm-yyyy"
    const date = new Date(calificacion.fecha);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Sumar 1 al mes y asegurarse de que tenga 2 dígitos
    const day = date.getDate().toString().padStart(2, '0');  // Asegurarse de que tenga 2 dígitos

    const fechaFormateada = `${day}/${month}/${year}`;

    return (
        <div className="calificacion">
            <div className="calificacion-puntaje">
                <ReactStars
                    count={5}
                    value={calificacion.puntaje}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                />
            </div>
            <div className="calificacion-info">
                <p className="calificacion-usuario">{calificacion.nombreUsuario}</p>
                <p className="calificacion-fecha">{fechaFormateada}</p>
                <p className="calificacion-reseña">{calificacion.reseña}</p>
            </div>
        </div>
    );
};

export default Calificacion;
