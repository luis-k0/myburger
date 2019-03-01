import React, { useState } from "react";
import { connect } from "react-redux";

import Aux from "../Auxiliar/Auxiliar";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

// class Layout extends Component {
const layout = props => {
  // state = {
  //   showSideDrawer: false
  // };
  const [showSideDrawer, setShowSideDrawer] = useState(false); 

  const sideDrawerClosedHandler = () => {
    // this.setState({ showSideDrawer: false });
    setShowSideDrawer(false);
  };

  const sideDrawerToogleHandler = () => {
    // this.setState(prevState => {
    //   return { showSideDrawer: !prevState.showSideDrawer };
    // });
    setShowSideDrawer(!showSideDrawer);
  };

  // render() {
    return (
      <Aux>
        <Toolbar
          isAuth={props.isAuthenticated}
          drawerToogleClicked={sideDrawerToogleHandler}
        />
        <SideDrawer
          open={showSideDrawer}
          closed={sideDrawerClosedHandler}
          isAuth={props.isAuthenticated}
        />
        <main className={classes.Content}>{props.children}</main>
      </Aux>
    );
  // }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(layout);
