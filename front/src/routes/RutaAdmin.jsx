import React from 'react';
import Sidebar from '../components/admin/Sidebar';
import { Routes, Route } from 'react-router-dom';
import ReservaContainer from '../components/admin/containers/ReservaContainer';
import UsuarioContainer from '../components/admin/containers/UsuarioContainer';
import CabañaContainer from '../components/admin/containers/CabañaContainer';
import TipoCabañaContainer from '../components/admin/containers/TipoCabañaContainer';
import CaracteristicaContainer from '../components/admin/containers/CaracteristicaContainer';

export default function RutaAdmin() {
    return (
        <div>
            <Sidebar/>
        </div>
    )
}

