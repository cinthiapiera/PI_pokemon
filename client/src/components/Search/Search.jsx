import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName } from "../../redux/actions";


function Search() {

  const dispatch = useDispatch();
  const [name, setName] =useState("");

  function handlerInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name)
  }

  function handlerSubmit(e) {
    e.preventDefault();
    if(name === "") return alert ("Please enter a valid recipe name");
    dispatch(getPokemonName(name))
    setName("")
  }

  return(
    <div>
      <form onSubmit={(e)=> handlerSubmit(e)}>
        <input type="text" placeholder="Search pokemon..." value={name} onChange={(e)=>handlerInputChange(e)}/>
        <button type="submit" value="Search">Search</button>
      </form>
    </div>
  )
};

export default Search; 