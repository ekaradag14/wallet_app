import React from "react";
import { Link } from "react-router-dom";
export const NoMatch = ({ location })  => {
  //Utilizamos locación para utilizar pathname abajo
  return (
    <h3>
      No match for <code>{location.pathname}</code>
      <Link to="/">Go Home </Link> or Go Hard
    </h3>
  );
}
