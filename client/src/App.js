import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import './main-css/App.css';

import Entrega from './pages/Entrega/Entrega';
import Entregas from './pages/Entregas/Entregas';
import Error from './pages/Error';

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
