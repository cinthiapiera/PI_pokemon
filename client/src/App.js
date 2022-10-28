import React from 'react';
import './App.css';

import { Route , Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Create from './components/Create/Create';
import Home from './components/Home/Home';
import Details from './components/Details/Details';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Landing /></Route>
        <Route path="/home"><Home /></Route>
        <Route path="/pokemon/:id"><Details /></Route>
        <Route path="/pokemonCreate"><Create /></Route>
      </Switch>
    </div>
  );
}

export default App;
