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

class AddTodo extends Component {
  state = {
    Title: "",
    Description: "",
    completed: false,
    toggle: true
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();

    let task = {
      title: this.state.Title,
      description: this.state.Description,
      completed: this.state.completed
    };
    //add the todo item via the API
    axios
      .post(`http://localhost:8000/api/add`, qs.stringify(task), {
        headers: {
          "Content-type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .catch(err => console.log(err));

    this.setState({ toggle: false });
  }

  cancelSubmit = () => {
    this.setState({ toggle: false });
  };

  render() {
    return (
      <Modal isOpen={this.state.toggle}>
        <ModalHeader> Todo Task </ModalHeader>
        <ModalBody>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="Title">Title</Label>
              <Input
                type="text"
                name="Title"
                value={this.state.Title}
                onChange={this.handleChange}
                placeholder="Enter Todo Title"
                required={true}
              />
            </FormGroup>
            <FormGroup>
              <Label for="Description">Description</Label>
              <Input
                type="text"
                name="Description"
                value={this.state.Description}
                onChange={this.handleChange}
                placeholder="Enter Todo Description"
                required={true}
              />
            </FormGroup>
            <FormGroup check>
              <Label for="completed">
                <Input
                  type="checkbox"
                  name="completed"
                  checked={this.state.completed}
                  onChange={this.handleChange}
                />
                Completed
              </Label>
            </FormGroup>
            <ModalFooter>
              <Button onClick={this.cancelSubmit} color="danger">
                {" "}
                Cancel{" "}
              </Button>
              <Button color="success" onClick={this.handleSubmit}>
                {" "}
                Save{" "}
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    );
  }
}

export default AddTodo;
