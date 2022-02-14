import React, { Component } from 'react'
import { connect } from 'react-redux'
import HeadLine from './headline'
import Bar from './bar'
import Followers from './followers'
import Posts from './posts/posts'
import {Profileimg} from "../profile/profileimg";
import PropTypes from "prop-types";
//basic structure for main page
export const Main = ({user,followerList}) => (
    <div>
        <header>
            <Bar />
        </header>
        <h1>User's Post</h1>
        <table className="main">
            <tbody>
            <tr>
                <td className='maintable'>
                    <div className="mainpage">
                        <HeadLine/>
                    </div>
                    <div className="mainpage">
                        <Followers users={require('../../data/users.json').users} user={user} followerList={followerList} />
                    </div>
                </td>
                <td className='maintable'>
                    <div className="mainpage">
                        <Posts/>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
)

Main.propTypes = {
    user: PropTypes.object.isRequired
}

export default connect(
    (state) => {
        return {
            user: state.user,
            followerList:state.followerList
        }
    },
)(Main)