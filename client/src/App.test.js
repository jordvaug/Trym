import React from "react";
import ReactDOM from "react-dom";
import ModalHeader from "reactstrap";
import { configure, shallow, mount } from "enzyme";
import { expect } from "chai";
import { spy } from "sinon";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
import AddTodo from "./Components/addTodo";
import EditTodo from "./Components/editTodo";

configure({ adapter: new Adapter() });
describe("App component testing", function() {
  it("renders welcome message", function() {
    const wrapper = shallow(<App />);
    const welcome = (
      <h1 className="text-white text-uppercase text-center my-4">
        Trym Todo app
      </h1>
    );
    expect(wrapper.contains(welcome)).to.equal(true);
  });
});

//2 initial renders in dev mode to avoid getting warnings about mismatched client/server markup
spy(App.prototype, "componentDidMount");
describe("<App /> mount", () => {
  it("calls componentDidMount", () => {
    const wrapper = mount(<App />);
    expect(App.prototype.componentDidMount).to.have.property("callCount", 2);
  });
});

describe("<EditTodo/>", function() {
  it("should have 2 buttons", function() {
    const wrapper = mount(<EditTodo />);
    expect(wrapper.find("button")).to.have.length(2);
  });

  it("should have prop for task", function() {
    const wrapper = shallow(<EditTodo />);
    expect(wrapper).to.have.prop("task", "undefined");
  });
});
