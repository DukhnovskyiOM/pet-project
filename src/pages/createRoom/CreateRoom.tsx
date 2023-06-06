import React from "react";
import './createRoom.css'
import FormCountDesk from "../../components/formCountDesk/FormCountDesk";

const CreateRoom: React.FC = () => {


  return (
    <div className="createRoom__container">
      <h1>Create room</h1>
      <FormCountDesk />
    </div>
  )
}

export default CreateRoom