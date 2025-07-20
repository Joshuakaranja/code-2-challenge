import React, {useState} from "react"
function Goal() {

  const [ goal,setGoal]= useState();

  
  function addGoal(event){
    setGoal(event.target.value);
  }
  return (
   
  )
}

export default Goal