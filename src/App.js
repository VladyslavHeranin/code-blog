import React, { useEffect, useState } from "react"
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom"
import { Registration } from "./components/registration-and-login/registration.jsx"
import { Login } from "./components/registration-and-login/Login.jsx"
import { Header } from "./components/navigation-and-search-components/header.jsx"
import "materialize-css"
import { useDispatch, useSelector } from "react-redux"
import { Auth } from "./actions/user"
import { Navigation } from "./components/roles/adminPage"

function App() {

  const dispatch = useDispatch()

  const isAuth = useSelector(state => state.user.isAuth)

  useEffect(() => {
    dispatch(Auth())
  }, [])

  return (
    <BrowserRouter>
      <div className="container" >
        <Header />
        {!isAuth ?
          <Switch>
            <Route to="#" exact path={"/registartion"} component={Registration} />
            <Route  to="#"   exact path={"/login"} component={Login} />
            <Redirect to={"/login"} />
          </Switch>
          :
          <Switch exact path={"/"} >
                <Route to="#" exact path={"/"} component={Navigation}/>
                <Redirect to={"/"} /> 
          </Switch>
        }
      </div>
    </BrowserRouter >
  );
}

export default App;
