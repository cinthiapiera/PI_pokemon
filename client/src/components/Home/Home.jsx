import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, getTypes } from "../../redux/actions";
import Cards from "../Cards/Cards";
import NavBar from "../NavBar/NavBar";
import Search from "../Search/Search";
import styles from './Home.module.css';

function Home() {

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons);
  console.log(pokemons);
  const types = useSelector(state => state.types);
  console.log(types);

  useEffect(()=>{
    dispatch(getPokemons());
    dispatch(getTypes());
  },[dispatch])

  function handlerReset(e) {
    e.preventDefault(); //para que no se recargue la pagina
    dispatch(getPokemons())
  }

  return(
    <div>
      <NavBar />
      <p>Home</p>
      <div>
        <Search />
        <button onClick={e=>handlerReset(e)}>Reset pokemons</button>
        <div className={styles.gridContainer}>
          {/* el value nos sirve para indicar que action se debe realizar al escoger una opcion */}
          <div className={styles.gridItem}>
            <label>Order Alphabetic: </label>
            <select >
              <option value="asc">A - Z</option>
              <option value="desc">Z - A</option>
            </select>
          </div>
          <div className={styles.gridItem}>
            <label>Order by Attack: </label>
            <select >
              <option value="max">↑ Max</option>
              <option value="min">↓ Min</option>
            </select>
          </div>
          <div className={styles.gridItem}>
            <label>Filter by type pokemons: </label>
            <select >
              {types?.map(type => (
                <option value={`${type.name}`} key={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.gridItem}>
          <label>Filter by created: </label>
            <select >
              <option value="existing">Existing</option>
              <option value="desc">Created</option>
            </select>
          </div>
        </div>
        <div className={styles.gridContainer}>
          {pokemons?.map((pokemon) => {
              return(
                <div className={styles.gridItem} key={pokemon.id} > 
                  <Cards
                    id={pokemon.id}
                    name={pokemon.name}
                    image={pokemon.image}
                    types={pokemon.types.map((t)=>`${t.name} `)}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
};

export default Home; 