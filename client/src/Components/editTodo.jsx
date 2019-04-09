import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label
} from "reactstrap";

//pass title, description, and completed from parent prop to populate form
class EditTodo extends Component {
  state = {
    task: this.props.task.item,
    Title: this.props.task.item.title,
    Description: this.props.task.item.description,
    completed: this.props.task.item.completed,
    toggle: true
  };

  componentDidMount() {}

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEdit = item => {
    axios
      .put(
        `http://localhost:8000/api/todos/` + this.state.task.id + `/`,
        item,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };

  cancelSubmit = () => {
    this.setState({ toggle: false });
  };

  handleSubmit(event) {
    let task = {
      id: this.state.task.id,
      title: this.state.Title,
      description: this.state.Description,
      completed: this.state.completed
    };
    //edit the item
    this.handleEdit(task);
  }

  render() {
    return (
      <Modal isOpen={this.state.toggle}>
        <ModalHeader> Edit Task </ModalHeader>
        <ModalBody>
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="Title">Title</Label>
              <Input
                type="text"
                name="Title"
                value={this.state.Title}
                onChange={this.handleChange}
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
              <Button
                color="success"
                onClick={() => {
                  this.handleSubmit();
                }}
              >
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

export default EditTodo;
