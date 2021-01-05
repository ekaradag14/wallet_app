import React from 'react';
import AddExpensePage from '../components/AddExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import {NoMatch} from '../components/NoMatch';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path="/" exact={true} component={ExpenseDashboardPage} />
        {/* Si no usamos exact vamos a tener el componente ExpenseDashboardPage en todas las paginas */}
        <Route path="/create" component={AddExpensePage} />
        {/* Una ruta dinámica */}
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        {/* Router mira a todos las rutas y si no puede encontrar un partido va a server esta ruta  */}
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
