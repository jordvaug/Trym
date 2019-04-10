import React, { Component } from "react";
import AddTodo from "./Components/addTodo";
import axios from "axios";
import EditTodo from "./Components/editTodo";

class App extends Component {
  state = {
    viewCompleted: false,
    todoList: [],
    viewAdd: false,
    viewEdit: false,
    task: ""
  };

  componentDidMount() {
    //get all the todos from the API
    axios
      .get(`/api/todos/`)
      .then(res => {
        const todos = res.data;
        this.setState({ todoList: todos });
      })
      .catch(err => console.log(err));
  }

  refreshList = () => {
    axios
      .get(`/api/todos/`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json"
        }
      })
      .then(res => {
        const todos = res.data;
        this.setState({ todoList: todos });
      })
      .catch(err => console.log(err));
  };

  refreshCallback = value => {
    if (value) {
      this.refreshList();
    }
    this.setState({ viewAdd: false, viewEdit: false });
  };

  handleEdit = item => {
    this.setState({ viewEdit: true });
    this.setState({ task: item });
  };

  handleDelete = item => {
    console.log(item);
    axios
      .delete(`http://localhost:8000/api/todos/` + item.item.id + `/`, item)
      .then(res => this.refreshList())
      .catch(err => console.log(err));
  };

  handleClick = () => {
    this.setState({ viewAdd: true });
  };

  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed === viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => {
              this.handleEdit({ item });
            }}
          >
            {" "}
            Edit{" "}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.handleDelete({ item });
            }}
          >
            Delete{" "}
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <div>
        <main className="content">
          <h1 className="text-white text-uppercase text-center my-4">
            Trym Todo app
          </h1>
          <div className="row ">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
              <div className="card p-3">
                <div className="">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleClick}
                  >
                    Add task
                  </button>
                </div>
                {this.renderTabList()}
                <ul className="list-group list-group-flush">
                  {this.renderItems()}
                </ul>
              </div>
            </div>
          </div>
          {this.state.viewAdd ? (
            <div>
              <AddTodo appCallback={this.refreshCallback} />
            </div>
          ) : null}
          {this.state.viewEdit ? (
            <EditTodo
              appCallback={this.refreshCallback}
              task={this.state.task}
            />
          ) : null}
        </main>
      </div>
    );
  }
}
export default App;
