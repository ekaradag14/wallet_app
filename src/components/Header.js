import React from "react";
import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <h1>Expensify</h1>
      {/* ActiveClassName para cambiar css clase de pagina corriente */}
      <NavLink activeClassName="is-active-nav-link" exact={true} to="/">
        Dashboard
      </NavLink>
      <NavLink activeClassName="is-active-nav-link" to="/create">
        Create
      </NavLink>
      <NavLink activeClassName="is-active-nav-link" to="/edit">
        Edit
      </NavLink>
      <NavLink activeClassName="is-active-nav-link" to="/help">
        Help
      </NavLink>
    </header>
  );
}
