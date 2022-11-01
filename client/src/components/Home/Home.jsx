import React from "react";
import styles from './Home.module.css';
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterPokemonsTypes, filterPokemonsCreated, sortPokemonsAlphabetic, sortPokemonsAttack} from "../../redux/actions";

import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";

function Home() {

  const dispatch = useDispatch();
  const Allpokemons = useSelector(state => state.pokemons);
  const Alltypes = useSelector(state => state.types);
  //console.log(pokemons, types);

  /*paginado */
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(12)

  const indexLastPokemons = currentPage * pokemonsPerPage //12
  const indexFirstPokemons = indexLastPokemons - pokemonsPerPage //0
  const currentPokemons = Allpokemons.slice(indexFirstPokemons,indexLastPokemons)

  const [ /* order */, setOrder] = useState("");

  useEffect(()=>{
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch])
  
  /* Resetea todos los pokemones */
  function handlerReset(e) {
    e.preventDefault(); //para que no se recargue la pagina
    dispatch(getPokemons())
  }

  /* Paginado */
  const paginated = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  /* Ordenamiento alfabeticamente */
  function handlerSortAlpha(e) {
    e.preventDefault();
    dispatch(sortPokemonsAlphabetic(e.target.value))
    setCurrentPage(1) //setear el ordenamineto en la primera pagina
    setOrder(`Order ${e.target.value}`);
  }

  /* Ordenamiento por ataque */
  function handlerSortAttack(e) {
    e.preventDefault();
    dispatch(sortPokemonsAttack(e.target.value))
    setCurrentPage(1)
    setOrder(`Order ${e.target.value}`);
  }

  /* Filtrado por tipo de pokemon (2) */
  function handlerFilterTypes(e){
    e.preventDefault();
    dispatch(filterPokemonsTypes(e.target.value))
    //e.target.value es el valor del select que captura
  }

  /* Filtrado por creado(DB) o existente(API) */
  function handlerFilterCreated(e) {
    e.preventDefault();
    dispatch(filterPokemonsCreated(e.target.value))
  }



  return(
    <div>
      <NavBar />
        <div className={styles.gridContainer}>
          <button onClick={e=>handlerReset(e)}>Reset pokemons</button>
          <Search />
          {/* el value nos sirve para indicar que action se debe realizar al escoger una opcion */}
          <div className={styles.gridItem}>
            <label>Order Alphabetic: </label>
            <select onChange={(e)=> handlerSortAlpha(e)}>
              <option value="asc">A - Z</option>
              <option value="des">Z - A</option>
            </select>
            <label>Order by Attack: </label>
            <select onChange={(e)=> handlerSortAttack(e)}>
              <option value="asc">↑ Min - Max</option>
              <option value="des">↓ Max - Min</option>
            </select>
            <br />
            <label>Filter by type: </label>
            <select onChange={(e)=>handlerFilterTypes(e)}>
                <option value="All">All</option>
              {Alltypes?.map(type => (
                <option value={`${type.name}`} key={type.id}>{type.name}</option>
              ))}
            </select>
            <label>Filter by created: </label>
              <select onChange={(e)=>handlerFilterCreated(e)}>
                <option value="All">All</option>
                <option value="existing">Existing</option>
                <option value="created">Created</option>
              </select>
          </div>
        </div>
        <Pagination Allpokemons={Allpokemons.length} pokemonsPerPage={pokemonsPerPage} paginated={paginated}/>
        {/* cambio: en un principio se renderizaba Allpokemons todos los pokemones , pero en el paginado este no da una segmento del aaray de pokemones a mostrar */}
        <div className={styles.gridContainer}>
          {currentPokemons?.map((pokemon) => {
              return(
                <div className={styles.gridItem} key={pokemon.id} >
                  <Link to={`/pokemon/${pokemon.id}`}>
                  <Cards
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types.map((t)=>`${t.name} `)}
                    attack= {pokemon.attack}
                  />
                  </Link>
                </div>
              )
          })}
        </div>  
        <Pagination Allpokemons={Allpokemons.length} pokemonsPerPage={pokemonsPerPage} paginated={paginated}/>
    </div>
  )
};

export default Home; 