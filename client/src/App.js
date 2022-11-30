import React from 'react';
import './App.css';
import { Route , Switch} from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Create from './components/Create/Create';
import Home from './components/Home/Home';
import Details from './components/Details/Details';
import Page404 from './components/Page404/Page404';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/"><Landing /></Route>
        <Route exact path="/home"><Home /></Route>
        <Route exact path="/create"><Create /></Route>
        <Route exact path="/pokemon/:id"><Details /></Route>
        
        <Route path="*"><Page404/></Route>
      </Switch>
    </div>
  );
}

export default App;