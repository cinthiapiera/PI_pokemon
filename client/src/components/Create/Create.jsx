import { React, useEffect, useState} from "react";
import styles from "./Create.module.css";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getTypes, postPokemon } from "../../redux/actions";

function validate(input) {
  let errors = {}
  const validateLetters = new RegExp ('^[a-z]+$')
  const validateDigits = new RegExp ('^[0-9]+$')

  if(!input.name || input.name=== "" || !validateLetters.test(input.name))  errors.name = "Name required and no spaces";
  if(!input.image)  errors.image = "Image requires a url";
  if(input.hp < 0 || input.hp > 300 || !validateDigits.test(input.hp))  errors.hp = "Health Points valid between 1 - 300";
  if(input.attack < 0 || input.attack > 200 || !validateDigits.test(input.attack))  errors.attack = "Attack valid between 1 - 200";
  if(input.defense < 0 || input.defense > 300 || !validateDigits.test(input.defense))  errors.defense = "Defense valid between 1 - 300";
  if(input.speed < 0 || input.speed > 200 || !validateDigits.test(input.speed))  errors.speed = "Speed valid between 1 - 200";
  if(input.height < 0 || input.height > 20 || !validateDigits.test(input.height))  errors.height = "Height valid between 1 - 20 m";
  if(input.weight < 0 || input.weight > 200 || !validateDigits.test(input.weight))  errors.weight = "Weight valid between  1 - 1000 kg";
  
  return errors;
}

function Create() {

  const dispatch = useDispatch();
  const Alltypes = useSelector(state => state.types);
  const [errors,setErrors] = useState({})
  const [input, setInput] = useState({
    name: "",
    image: "https://i.ibb.co/kJVn34n/videogames.jpg",
    hp: 1,
    attack: 1,
    defense: 1,
    speed: 1,
    height: 1,
    weight: 1,
    created: true,
    types: [],
  })
  
  useEffect(()=>{
    dispatch(getTypes());
  },[dispatch])

  //e.target.name (cajita del input) es el elemento que dispara el evento que tiene un atributo name
  //e = event , target = disparador
  //e.target.value , es elemento que dispara el evento con el valor ingresado
  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types:[...input.types, e.target.value]
    })
  }

  function handleDelete(e) {
    setInput({
      ...input,
      types: input.types.filter(type => type!== e)
    })
  }

  function handleSubmit(e) {
    e.preventDefault(); //para que no recargue la pagina al momento de submitear que por defecrto este evetno submit realiza
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
      created: true,
      types: [],
    })
  }

  return(
    <>
      <Link to="/home"><button>Regresar a Home</button></Link>
      <br /><br />
      <form onSubmit={handleSubmit} className={styles["form"]}>
          <legend className={styles["form-legend"]}>CREATE POKEMON</legend>
          <label htmlFor="name">Name : </label>
          <input className={errors.name && 'danger'} type="text" name="name" onChange={handleInputChange} value={input.name}/>
          {errors.name && (<p className="danger">{errors.name}</p>)}

          <label htmlFor="image">Image : </label>
          <input type="url" name="image" onChange={handleInputChange} value={input.image}/>
          {errors.image && (<p className="danger">{errors.image}</p>)}

          <label htmlFor="hp">Health Points :  </label>
          <input type="number" placeholder="between 1 - 300" name="hp" value={input.hp} onChange={handleInputChange}/>
          {errors.hp && (<p className="danger">{errors.hp}</p>)}

          <label htmlFor="attack">Attack : </label>
          <input type="number" placeholder="between 1 - 200" name="attack" value={input.attack} onChange={handleInputChange}/>
          {errors.attack && (<p className="danger">{errors.attack}</p>)}

          <label htmlFor="defense">Defense :</label>
          <input type="number" placeholder="between 1 - 300" name="defense" value={input.defense} onChange={handleInputChange}/>
          {errors.defense && (<p className="danger">{errors.defense}</p>)}

          <label htmlFor="speed">Speed : </label>
          <input type="number" placeholder="between 1 - 200" name="speed" value={input.speed} onChange={handleInputChange}/>
          {errors.speed && (<p className="danger">{errors.speed}</p>)}

          {/*Dato: la mayoria de los pokemones no superan los 2 metros | Comfey(0.1) -Wailord(14.5)*/}
          <label htmlFor="height">Height : </label>
          <input type="number" placeholder="between 0.1 - 15.0 m" name="height" value={input.height} onChange={handleInputChange}/>
          {errors.height && (<p className="danger">{errors.height}</p>)}

          {/*Dato: la mayoria de los pokemones no superan los 100 kilogramos | Cosmog(0.1) -Celesteela(999,9)*/}
          <label htmlFor="weight">Weight : </label> 
          <input type="number" placeholder="between 0.1 - 1.0000 kg" name="weight" value={input.weight} onChange={handleInputChange}/>
          {errors.weight && (<p className="danger">{errors.weight}</p>)}
          <br />

          <label htmlFor="weight">CHOOSE TYPES OF POKEMON</label> 
          <select name="types" onChange={handleSelect}>
            {Alltypes.length && Alltypes.map(type => {
                return(
                  <option key={type.id} value={type.name} >{type.name}</option>
                )
              })
            }
          </select>
          {/* {errors.weight && (<p className="danger">{errors.weight}</p>)} */}
          { input.types.map(e => {
              return(
                <div key={e}>
                  <h5>{e}</h5>
                  <button onClick={() => handleDelete(e)}>X</button>
                </div>
              )
            })
          }
      </form>
      <div>
          <button type="submit">SUBMIT</button>
        </div>
    </>
  )
};

export default Create;