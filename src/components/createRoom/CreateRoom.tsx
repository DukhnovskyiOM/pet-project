import React from "react";
import './createRoom.css'
import FormCountDesk from "../formCountDesk/FormCountDesk";

const CreateRoom: React.FC = () => {


  return (
    <div className="createRoom__container">
      <FormCountDesk />
    </div>
  )
}

export default CreateRoom