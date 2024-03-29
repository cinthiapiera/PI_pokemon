import { React, useEffect, useState} from "react";
import styles from "./Create.module.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../../redux/actions";
import Validate from "./Validate";

function Create() {

  const dispatch = useDispatch();
  const Alltypes = useSelector(state => state.types);

  const [errors,setErrors] = useState({})
  const [input, setInput] = useState({
    name: '',
    image: '',
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    height: '',
    weight: '',
    types: [],
  })

  useEffect(()=>{
    dispatch(getTypes());
  },[dispatch])

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(Validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e) {  
    if(input.types.length < 2){
      setInput({
        ...input,
        types:[...input.types, e.target.value]
      })
    }else{
      alert("Dear user can only choose one or two types for your Pokémon")
    }
  }

  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter(type => type!== e)
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input))
    setInput({
      name: "",
      image: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    })
  }

  return(
    <> 
      <form onSubmit={handleSubmit} className={styles["form"]}>
          <div className={styles["form-header"]}>
            <legend className={styles["form-legend"]}>Customize Your Pokémon </legend>
            <Link to="/home">
              <button className={styles["form-button-back"]}>Go Back</button>
            </Link>
          </div>
          <label htmlFor="name">Name : </label>
          <input type="text" name="name" value={input.name} onChange={handleInputChange} className={errors.name && styles["border-error"]}/>
          {errors.name && (<p className={styles["danger-error"]}>{errors.name}</p>)}

          <label htmlFor="image">Image : </label>
          <input type="url" name="image" value={input.image} onChange={handleInputChange} className={errors.image && styles["border-error"]}/>
          {errors.image && (<p className={styles["danger-error"]}>{errors.image}</p>)}

          <label htmlFor="hp">Health Points :  </label>
          <input type="number" name="hp" value={input.hp} onChange={handleInputChange} className={errors.hp && styles["border-error"]}/>
          {errors.hp && (<p className={styles["danger-error"]}>{errors.hp}</p>)}

          <label htmlFor="attack">Attack : </label>
          <input type="number" name="attack" value={input.attack} onChange={handleInputChange} className={errors.attack && styles["border-error"]}/>
          {errors.attack && (<p className={styles["danger-error"]}>{errors.attack}</p>)}

          <label htmlFor="defense">Defense :</label>
          <input type="number" name="defense" value={input.defense} onChange={handleInputChange} className={errors.defense && styles["border-error"]}/>
          {errors.defense && (<p className={styles["danger-error"]}>{errors.defense}</p>)}

          <label htmlFor="speed">Speed : </label>
          <input type="number" name="speed" value={input.speed} onChange={handleInputChange} className={errors.speed && styles["border-error"]}/>
          {errors.speed && (<p className={styles["danger-error"]}>{errors.speed}</p>)}

          {/*Dato: la mayoria de los pokemones no superan los 2 metros | Comfey(0.1) -Wailord(14.5)*/}
          <label htmlFor="height">Height : </label>
          <input type="number" name="height" value={input.height} onChange={handleInputChange} className={errors.height && styles["border-error"]}/>
          {errors.height && (<p className={styles["danger-error"]}>{errors.height}</p>)}

          {/*Dato: la mayoria de los pokemones no superan los 100 kilogramos | Cosmog(0.1) -Celesteela(999,9)*/}
          <label htmlFor="weight">Weight : </label> 
          <input type="number" name="weight" value={input.weight} onChange={handleInputChange} className={errors.weight && styles["border-error"]}/>
          {errors.weight && (<p className={styles["danger-error"]}>{errors.weight}</p>)}
          <br />

          <label htmlFor="weight">CHOOSE ONLY TWO TYPES</label> 
          <select name="types" onChange={handleSelect}>
            {Alltypes?.map(type => {
                return(
                  <option key={type.id} value={type.name}>{type.name}</option>
                )
            })}
          </select>
          {input.types.map(e => {
              return(
                <div key={e}>
                  <button onClick={() => handleDelete(e)} className={styles["form-button-delete"]}>x</button><span> {e} </span>
                </div>
              )
            })
          }
          <br />
        <div>
        <button type="submit" className={styles["form-button"]}>Submit</button>
        </div>
      </form>
    </>
  )
};

export default Create;