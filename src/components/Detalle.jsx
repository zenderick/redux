
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { unPokemonDetail } from '../redux/pokeDucks';

const Detalle = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {
        const fetchData = () => {
            dispatch(unPokemonDetail())
        }
        fetchData()
    }, [dispatch])

    const pokemon = useSelector(store => store.pokemones.unPokemon)

  return pokemon ? (
    <div className='card mt-5 text-center'>
        <div className='card-body'>
            <img src={pokemon.foto} className='img-fluid' alt='' />
            <div className='card-title text-uppercase'>{pokemon.nombre}</div>
            <p className='card-text'>Alto: {pokemon.alto} | Ancho: {pokemon.ancho} </p>
        </div>
    </div>
  ) : null
}

export default Detalle