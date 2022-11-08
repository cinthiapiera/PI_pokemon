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
    <div>
        { //simepre se pregunta si hay algo dentro del array o esta vacio (!!negacion): pokemon && si es 0 me da falso pero si contiene algo me da true
          pokemon &&
            <div className={styles.blogPost}>
                <div className={styles.blogPostImage}>
                  <img src={pokemon.image} alt={`${pokemon.name} pokemon`} />
                </div>
              <div className={styles.blogPostInfo}>
                <div className={styles.blogPostId}>
                  <p>id: {pokemon.id}</p>
                  <h4 className={styles.blogPostTitle}>name: {pokemon.name}</h4>
                  <div className={styles.blogPostText}>
                    <p>types: {pokemon.types?.map(t=>`${t.name}  `)}</p>
                    <p>hp: {pokemon.hp}</p>
                    <p >attack: {pokemon.attack}</p>
                    <p >defense: {pokemon.defense}</p>
                    <p>speed: {pokemon.speed}</p>
                    <p>height: {pokemon.height}</p>
                    <p>weight: {pokemon.weight}</p>
                  </div>              
                  <Link to="/home" >
                    <button className={styles.blogPostCta}>Regresar a Home</button>
                  </Link>
                </div >
              </div>
            </div>
        }
    </div>
  )
};

export default Details; 