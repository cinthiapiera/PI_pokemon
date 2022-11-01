import {React, useEffect} from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPokemonId } from "../../redux/actions";


function Details() {
  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.detail)

  console.log(pokemon);

  const {id} = useParams()

  useEffect(()=>{
    dispatch(getPokemonId(id))
  },[dispatch, id])

  return(
    <div>
        {
          pokemon && pokemon? 
          <div>
            <img src={pokemon.image} alt={`${pokemon.name} pokemon`} />
            <p>id: {pokemon.id}</p>
            <p>name: {pokemon.name}</p>
            <p>types: {pokemon.types?.map(t=>t.name)}</p>
            <p>hp: {pokemon.hp}</p>
            <p>attack: {pokemon.attack}</p>
            <p>defense: {pokemon.defense}</p>
            <p>speed: {pokemon.speed}</p>
            <p>height: {pokemon.height}</p>
            <p>weight: {pokemon.weight}</p>
          </div>
          : 
          <div>
            ...loading
          </div>
        }
        <div>
          <Link to="/home"><button>Regresar a Home</button></Link>
        </div>  
    </div>
  )
};

export default Details; 