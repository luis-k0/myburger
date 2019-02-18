import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });

  it("should render 2 <NavigationItem /> elements if not authenticated", () => {
    // const wrapper = shallow(<NavigationItems />); // beforeEach executa para cada teste
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render 3 <NavigationItem /> elements if authenticated", () => {
    // const wrapper = shallow(<NavigationItems isAuthenticated />);
    wrapper.setProps({ isAuthenticated: true }); // passa props
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render 1 <NavigationItem link='/logout'>Logout</NavigationItem> elements if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true }); // passa props
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
