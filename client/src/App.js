import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './main-css/App.css';

import Entrega from './components/pages/Entrega/Entrega';
import Entregas from './components/pages/Entregas/Entregas';
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
        <Route render={props => <Error {...props} error={"Página não encontrada..."}/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
