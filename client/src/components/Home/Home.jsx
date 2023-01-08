import React from "react";
import styles from './Home.module.css';
import { NavLink } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes, filterPokemonsTypes, filterPokemonsCreated, sortPokemonsAlphabetic, sortPokemonsAttack} from "../../redux/actions";

import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
// import Search from "../Search/Search";
import Pagination from "../Pagination/Pagination";
import Loading from "../Loading/Loading";

function Home() {

  const dispatch = useDispatch();
  const Allpokemons = useSelector(state => state.pokemons);
  const Alltypes = useSelector(state => state.types);

  /*paginado */
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(15)

  const indexLastPokemons = currentPage * pokemonsPerPage //12
  const indexFirstPokemons = indexLastPokemons - pokemonsPerPage //0
  const currentPokemons = Allpokemons.slice(indexFirstPokemons,indexLastPokemons)

  const [ /*order*/, setOrder] = useState("");

  useEffect(()=>{
    dispatch(getPokemons());
  },[dispatch])
  
  useEffect(()=>{
    dispatch(getTypes());
  },[dispatch])

  /* Resetea todos los pokemones */
  function handlerReset(e) {
    e.preventDefault(); 
    setCurrentPage(1)
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
    setCurrentPage(1)
    setOrder(`${e.target.value}`);
  }

  /* Ordenamiento por ataque */
  function handlerSortAttack(e) {
    e.preventDefault();
    dispatch(sortPokemonsAttack(e.target.value))
    setCurrentPage(1)
    setOrder(`${e.target.value}`);
  }

  /* Filtrado por tipo de pokemon (2) */
  function handlerFilterTypes(e){
    e.preventDefault();
    dispatch(filterPokemonsTypes(e.target.value))
    setCurrentPage(1)
  }

  /* Filtrado por creado(DB) o existente(API) */
  function handlerFilterCreated(e) {
    e.preventDefault();
    dispatch(filterPokemonsCreated(e.target.value))
    setCurrentPage(1)
  }

  return(
    <div>
      <NavBar />
      <div className={styles["grid-container"]}>
        <div className={styles["grid-item"]}>
          <button className={styles["button-reset"]} onClick={e=>handlerReset(e)}>Reset Pokemons</button>
        </div>
        {/* <div className={styles["grid-item"]}>
          <Search />
        </div> */}
        <div className={styles["grid-item"]}>
          <div className={styles["box"]}>
            <label>Order alphabetic: </label>
            <select onChange={(e)=> handlerSortAlpha(e)}>
              <option value="All">All</option>
              <option value="asc">A - Z</option>
              <option value="des">Z - A</option>
            </select>
          </div>
        </div>
        <div className={styles["grid-item"]}>
          <div className={styles["box"]}>
            <label>Order by attack: </label>
            <select onChange={(e)=> handlerSortAttack(e)}>
              <option value="All">All</option>
              <option value="asc">↑ Min - Max</option>
              <option value="des">↓ Max - Min</option>
            </select>
          </div>
        </div>
        <div className={styles["grid-item"]}>
          <div className={styles["box"]}>
            <label>Filter by types: </label>
            <select onChange={(e)=>handlerFilterTypes(e)}>
              <option value="All">All</option>
                {Alltypes?.map(type => (
                  <option value={`${type.name}`} key={type.id}>{type.name}</option>
                ))}
            </select>
          </div>
        </div>
        <div className={styles["grid-item"]}>
          <div className={styles["box"]}>
            <label>Filter by created: </label>
            <select onChange={(e)=>handlerFilterCreated(e)}>
              <option value="All">All</option>
              <option value="existing">Existing</option>
              <option value="created">Created</option>
            </select>
          </div>
        </div>
        </div>
        <div className={styles["grid-item"]}>
          <Pagination Allpokemons={Allpokemons.length} pokemonsPerPage={pokemonsPerPage} paginated={paginated}/>
        </div>
        <div className={styles["grid-container"]}>
          {currentPokemons.length ? 
            (currentPokemons.map((pokemon) => {
              return(
                <div className={styles["grid-item"]} key={pokemon.id}>
                  <NavLink to={`/pokemon/${pokemon.id}`} style={{ textDecoration: 'none'}}>
                    <Cards
                      id={pokemon.id}
                      name={pokemon.name}
                      image={pokemon.image}
                      types={pokemon.types.map((t)=>`${t.name}  `)}
                      attack= {pokemon.attack}
                    />
                  </NavLink>
                </div>
              )
            }))
            : (<Loading/>)
          }
        </div>
        <div className={styles["grid-item"]}>
          <Pagination Allpokemons={Allpokemons.length} pokemonsPerPage={pokemonsPerPage} paginated={paginated}/>
        </div>
    </div>
  )
};

export default Home; 