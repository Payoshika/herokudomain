import React from "react"


const Dashboard = (props) => {
  return(
    <div>
      <div>
        <h1>dashboard</h1>
        <h1>Status: {props.loggedInStatus} </h1>
      </div>
    </div>
  )
}

export default Dashboard
