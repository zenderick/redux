import React from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { anteriorPokemones, obtenerPokemones, siguientePokemones, unPokemonDetail } from '../redux/pokeDucks';
import Detalle from './Detalle';

const Pokemones = () => {

    const dispatch = useDispatch();

    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(obtenerPokemones())
        }
        fetchData()
    }, [dispatch])


  return (
    <div className='row mt-5'>
        <div className="col-md-6">
        <h3>Lista de Pokemones</h3>

        <ul className="list-group mt-5">
            {
                pokemones.map((item) => (
                    <li key={item.name} className="list-group-item text-uppercase  d-flex justify-content-between" >
                        {item.name} 
                        <button className="btn btn-dark btn-sm " onClick={() => dispatch(unPokemonDetail(item.url))}>Info</button>
                        </li>
                ))
            }
        </ul>

            <br />

        <div className="d-flex justify-content-between">
            {
                pokemones.length === 0 &&
                <button onClick={() => dispatch(obtenerPokemones())} className="btn btn-dark">Get Pokemons</button>
            }

            {
                next &&
                <button onClick={() => dispatch(siguientePokemones())} className="btn btn-dark">Siguiente</button>
            }

            {
                previous &&
                <button onClick={() => dispatch(anteriorPokemones())} className="btn btn-dark">Anterior</button>
            }
        </div>


        </div>

        <div className="col-md-6">
            <h3>Detalle Pokemon</h3>
            <Detalle/>
        </div>
    </div>
  )
}

export default Pokemones