import React from "react";
import styles from './Pagination.module.css';

function Pagination({ Allpokemons, pokemonsPerPage, paginated}) {
  const pageNumber = []
  for (let i = 1; i <= Math.ceil(Allpokemons/pokemonsPerPage); i++) {
    pageNumber.push(i)
  }
  return(
    <div>
      <ul className={styles.pagination}>
        { pageNumber && pageNumber.map(number => {
          return(
            <li className={styles.page} key={number}>
              <button onClick={()=> paginated(number)}>{number}</button>
            </li>
          )  
        })}
      </ul>
    </div>
  )
};

export default Pagination; 