import React from 'react';
import classes from './BuildControl.css';
import propTypes from 'prop-types';

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
            className={classes.Less}
            onClick={props.removed} 
            disabled={props.disabled}>
            Menos
        </button>
        <button 
            className={classes.More} 
            onClick={props.added}>
            Mais
        </button>
    </div>
);

buildControl.propTypes = {
    label: propTypes.string.isRequired,
    removed: propTypes.func.isRequired,
    disabled:propTypes.bool.isRequired,
    added:propTypes.func.isRequired
}

export default buildControl;