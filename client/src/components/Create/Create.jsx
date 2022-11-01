import { React, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getTypes } from "../../redux/actions";

function Create() {
  const dispatch = useDispatch();
  const Alltypes = useSelector(state => state.types);

  useEffect(()=>{
    dispatch(getTypes());
  },[dispatch])

  return(
    <div>
        <p>Create</p>
        <div>
          <Link to="/home"><button>Regresar a Home</button></Link>
        </div>
        <br />
        <form>
            <label>Name: <input type="text" /></label>
            <br />
            <label>height: <input type="number" min="1"  max="5"/></label>
            <label>weight: <input type="number" min="1"  max="100"/></label>
            <br />
            <label>hp: <input type="number" min="1"  max="300" /></label>
            <label>attack: <input type="number" min="1"  max="300"/></label>
            <br />
            <label>defense: <input type="number" min="1"  max="300"/></label>
            <label>speed: <input type="number" min="1"  max="300"/></label>
            <br />
            <label>types checkbox: <input type="checkbox" value={`${type.name}`} key={type.id}/>{type.name}</label>
            <label>types:
              <select>
                  <option value="All">All</option>
                  {Alltypes?.map(type => (
                  <option value={`${type.name}`} key={type.id}>{type.name}</option>
                ))}
              </select>
            </label>
            <br />
            <input type="submit" />
        </form>
    </div>
  )
};

export default Create; 