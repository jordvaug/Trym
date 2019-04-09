import React, { Component } from "react";
import axios from "axios";
import qs from "qs";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

//pass title, description, and completed from parent prop to populate form
class EditTodo extends Component {
  state = {};

  handleSubmit(event) {
    event.preventDefault();

    let task = {
      title: this.state.Title,
      description: this.state.Description,
      completed: this.state.completed
    };
    //edit the item
    axios
      .put(`http://localhost:8000/api/todos/` + task.id, qs.stringify(task), {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .catch(err => console.log(err));
    alert("Task deleted");
    this.setState({ toggle: false });
  }

  render() {
    return <p>edit</p>;
  }
}

export default EditTodo;
