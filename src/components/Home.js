import React from "react"
import Registration from "./auth/Registration"
import Login from "./auth/Login"
import Form from "./Form"

import axios from "axios"

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  handleSuccessfulAuth(data){
    this.props.handleLogin(data)
    this.props.history.push("./dashboard")
  }

  handleLogoutClick(){
    axios.delete("http://localhost:3001/logout", {withCredentials: true})
    .then(response => this.props.handleLogout())
    .catch(error => console.log("check loginout error", error))
  }

  render(){
    return(
      <div>
        <div>
          <h1>Home</h1>
          <h2>Status: {this.props.loggedInStatus}</h2>
          <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
          <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
          <button onClick={() => this.handleLogoutClick() }>Logout</button>
          <Form />
        </div>
      </div>
    )
  }
}
