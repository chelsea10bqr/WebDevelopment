import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export const Headline = ({headlineMsg,headlineInfo,user}) => {
    let headline;
    return(
        <div>
            <img src={user.picture}/>
            <div>{user.name}</div>
            <div><b>{user.catchPhrase}</b></div>
            <br/>
            <input className="inputmsg2" type="text"ref={(node)=>headline = node}/>
            <br/><br/>
            <input id="changeHl" className="btn" type="submit"
                   value="Change Headline" onClick={(event) =>
            {event.preventDefault();
                changeHeadline(headlineMsg,headline,headlineInfo,user)}
            }/>
            <br/>
        </div>
    )
}

const changeHeadline=(headlineMsg,headline,headlineInfo,user)=>{
    headlineInfo=headline.value;
    user.catchPhrase = headline.value;
    headlineMsg(headlineInfo);
}
//check the type
Headline.propTypes = {
    headlineMsg: PropTypes.func.isRequired,
    headlineInfo: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            headlineInfo: state.headlineInfo,
            user: state.user
        }
    },
    (dispatch) => {
        return {
            headlineMsg: (headlineInfo)=>
                dispatch({type: 'UPDATE_HEADLINE',headlineInfo})
        }
    }
)(Headline)