import React from "react";
import ReactDOM from "react-dom";
import { configure, shallow } from "enzyme";
import { expect } from "chai";
import App from "./App";
import Adapter from "enzyme-adapter-react-16";
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
