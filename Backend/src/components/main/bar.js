import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


export const Bar = ({location,toProfilePage,toLandingPage,user}) => {
    let headline;
    return(
        <div className="toProfile">
            <input id="goProfile" className="btn" type="submit" value="Edit Profile"
                   onClick={(event) =>
                   {event.preventDefault();
                       goProfile(location,toProfilePage,user)}
                   }/>
            <input id="goLanding" className="btn" type="submit" value="Log Out"
                   onClick={(event) =>
                   {event.preventDefault();
                       goLanding(location,toLandingPage)}
                   }/>
            <br/>
        </div>
    )
}
//go to the profile page
const goProfile=(location,toProfilePage,user)=>{
    location='PROFILE_PAGE'
    toProfilePage(user)
}
//go to the landing page
const goLanding=(location,toLandingPage)=>{
    location='LANDING_PAGE'
    toLandingPage()
}
//check the type
Bar.propTypes = {
    toLandingPage: PropTypes.func.isRequired,
    toProfilePage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            location:state.location,
            user: state.user
        }
    },
    (dispatch) => {
        return {
            toLandingPage: ()=>dispatch({type: 'TO_OUT'}),
            toProfilePage :(user)=>dispatch({type: 'TO_PROFILE_PAGE'},user)
        }
    }
)(Bar)