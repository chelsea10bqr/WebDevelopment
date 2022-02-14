import React, { Component } from 'react'
import { connect } from 'react-redux'

import Register from './register'
import Login from './login'

//Basic structure of the landing page
export const Landing = () => (
    <div>
        <h1>Welcome to 4everBlue Blog</h1>
        <table className="main">
            <tbody>
            <tr>
                <td>
                    <Login users=
                               {require('../../data/users.json').users}/>
                </td>
                <td>
                    <Register />
                </td>
            </tr>
            </tbody>
        </table>
    </div>
)

export default connect(
)(Landing)