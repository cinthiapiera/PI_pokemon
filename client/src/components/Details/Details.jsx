import {React, useEffect} from "react";
import styles from "./Details.module.css";
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
    <>
        { //simepre se pregunta si hay algo dentro del array o esta vacio (!!negacion): pokemon && si es 0 me da falso pero si contiene algo me da true
          pokemon &&
          <div className={styles["blog-container"]}>
            <Link to="/home"><button className={styles["blog-button"]}>Back to home</button></Link>
            <div className={styles["left"]}>
              <img src={pokemon.image} alt={`${pokemon.name} pokemon`} />
            </div>
            <div className={styles["right"]}>
                <div className={styles["blog-info"]}>
                  <div className={styles["blog-name"]}>
                    <h1>{pokemon.name}</h1>
                  </div>
                  <div className={styles["blog-details"]}>
                      <hr/>
                        <span><strong>Data in general</strong></span>
                      <hr/>
                      <p>Id: {pokemon.id}</p>
                      <p>Height: {pokemon.height}</p>
                      <p>Weight: {pokemon.weight}</p>
                      <p>Types: {pokemon.types?.map(t=>`${t.name}  `)}</p>
                      <hr/>
                        <span><strong>Stats data</strong> </span>
                      <hr/>
                      <p>Health Points (hp): {pokemon.hp}</p>
                      <p>Attack: {pokemon.attack}</p>
                      <p>Defense: {pokemon.defense}</p>
                      <p>Speed: {pokemon.speed}</p>
                    </div>
                </div>
            </div>
          </div>
        }
    </>
  )
};

export default Details; 
