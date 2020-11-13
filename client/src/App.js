import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './App.css';

import Entrega from './components/pages/Entrega';
import Entregas from './components/pages/Entregas';
import Sobre from './components/pages/Sobre';
import Error from './components/pages/Error';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/entregas"/>
        </Route>
        <Route exact path="/entrega" component={Entrega}/>
        <Route exact path="/entregas" component={Entregas}/>
        <Route exact path="/sobre" component={Sobre}/>
        <Route render={props => <Error {...props} error={"Página não encontrada..."}/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
