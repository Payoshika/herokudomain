import React from "react"
import {BrowserRouter, Switch, Route } from "react-router-dom"
import Home from "./Home"
import Dashboard from "./Dashboard"
import axios from "axios"

export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loggedInStatus : "Not_Logged_In",
      user: {}
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.checkLoginStatus = this.checkLoginStatus.bind(this)
  }

  handleLogin(data){
    this.setState({
      loggedInStatus: "Logged_In",
      user: data.user
    })
  }

  checkLoginStatus(){
    axios.get("http://localhost:3001/logged_in", {withCredentials: true})
    .then(response => this.handleLogin(response.data))
    .catch(error => console.log("check login error", error))
  }

  componentDidMount(){
    this.checkLoginStatus()
  }

  handleLogout(){
    this.setState({
      loggedInStatus: "Not_Logged_In",
      user: {}
    })
  }

  render(){
    return(
      <div className="app">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path={"/"}
              render = {props => (<Home {...props} loggedInStatus= {this.state.loggedInStatus}
              handleLogin = {this.handleLogin}
              handleLogout={this.handleLogout}/>)}
              ></Route>
            <Route
              exact
              path={"/dashboard"}
              render = {props => (<Dashboard {...props} loggedInStatus= {this.state.loggedInStatus}/>)}
              ></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
