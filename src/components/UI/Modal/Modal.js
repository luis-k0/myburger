import React from "react";
import classes from "./Modal.css";
import Aux from "../../../hoc/Auxiliar/Auxiliar";
import Backdrop from "../Backdrop/Backdrop";

// class Modal extends Component {
const modal = props => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }

  // componentWillUpdate () {
  //     console.log ('[Modal] componentWillUpdate');
  // }

  // render() {
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
  // }
};

// React.memo updates only when component change
// React.memo substitute shouldComponentUpdate
// checking if props or state changed, if are equal then return without executing
export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
);
