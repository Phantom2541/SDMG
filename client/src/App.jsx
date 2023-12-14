import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Platforms from "./pages/platforms";
import Home from "./pages/home";
import Registration from "./pages/sessions/registration";

export default function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Registration} />
      <Platforms />
    </Switch>
  );
}
