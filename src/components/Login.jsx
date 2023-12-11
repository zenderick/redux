import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { accederAccion } from '../redux/userDuck';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((store) => store.usuario.loading);
    const activo = useSelector((store) => store.usuario.activo);

    useEffect(() => {
        if (activo) {
            navigate('/');
        }
    }, [activo, navigate]);

    return (
        <div className="mt-5 text-center ">
            <h3>Ingreso de usuarios</h3>
            <hr />
            <button
                className="btn btn-dark"
                onClick={() => dispatch(accederAccion())}
                disabled={loading}
            >
                Google
            </button>
        </div>
    );
};

export default Login;
