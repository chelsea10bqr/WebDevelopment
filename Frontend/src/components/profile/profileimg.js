import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import {Headline} from "../main/headline";


export const Profileimg = ({user}) => {
    return (
        <div>
            <img src={user.picture}/>
            <br/>
            <input className="inputmsg" type="file"/>
            <br/><br/><br/>
        </div>
    )
}

Profileimg.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            user: state.user
        }
    },
)(Profileimg)