import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import PeopleList from "./components/people/PeopleList";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <PeopleList />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
