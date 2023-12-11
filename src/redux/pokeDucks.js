
import axios from 'axios'

//constantes 
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}

//types
const OBTENER_POKEMON = 'OBTENER_POKEMON_EXITO'
const SIGUIENTE_POKEMON = 'SIGUIENTE_POKEMON_EXITO'
const POKE_INFO_POKEMON = 'POKE_INFO_POKEMON_EXITO'



//reducer  
export default function pokeReducer(state = dataInicial, action){
    switch(action.type){
        case OBTENER_POKEMON:
            return {...state, ...action.payload}
        case SIGUIENTE_POKEMON:
            return {...state, ...action.payload}
        case POKE_INFO_POKEMON:
            return {...state, unPokemon: action.payload}
        default:
            return state    
    }

}

//actions
export const unPokemonDetail = (url = "https://pokeapi.co/api/v2/pokemon/1/") => async(dispatch) => {
    
    if(localStorage.getItem(url)){
        dispatch({
            type: POKE_INFO_POKEMON,
            payload: JSON.parse(localStorage.getItem(url))
        })
    
        return
    }

    try {
        const res = await axios.get(url)
        dispatch({
            type: POKE_INFO_POKEMON,
            payload: {
                nombre: res.data.name,
                ancho: res.data.weight,
                alto: res.data.height,
                foto: res.data.sprites.front_default,

            }
        })
        localStorage.setItem(url, JSON.stringify(
            {
                nombre: res.data.name,
                ancho: res.data.weight,
                alto: res.data.height,
                foto: res.data.sprites.front_default,
            }
        ))
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPokemones = () => async(dispatch, getState) => {

    if(localStorage.getItem('offset=0')){
        dispatch({
            type:   OBTENER_POKEMON,
            payload: JSON.parse(localStorage.getItem('offset=0'))
        })
        return
    }

    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        dispatch({
            type:   OBTENER_POKEMON,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }
}

export const siguientePokemones = () => async (dispatch, getState) => {

    const {next} = getState().pokemones

    if(localStorage.getItem(next)){
        dispatch({
            type:   OBTENER_POKEMON,
            payload: JSON.parse(localStorage.getItem(next))
        })
        return
    }

    try {
        const res = await axios.get(next)
        dispatch({
            type:   SIGUIENTE_POKEMON,
            payload: res.data
        })

        localStorage.setItem(next, JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }

}

export const anteriorPokemones = () => async (dispatch, getState) => {

    const {previous} = getState().pokemones

    if(localStorage.getItem(previous)){
        dispatch({
            type:   OBTENER_POKEMON,
            payload: JSON.parse(localStorage.getItem(previous))
        })
        return
    }

    try {
        const res = await axios.get(previous)
        dispatch({
            type:   SIGUIENTE_POKEMON,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))

    } catch (error) {
        console.log(error)
    }

}