import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//basic structure of the login module

export const Login = ({addUser,errorMsg, errLogInfo,toMainPage}) => {
    let username;
    let password;
    let email;
    let phone;
    let zipcode;
    let id;
    let picturesrc;
    let catchPhrase;
    let flag = false;
    let users= require('../../data/users.json').users;
    let follower;
    return(
        <div>
            <h2>Login</h2>
            <br/>
            <div className="loginpage">
                <form id="loginform">
                    User Name:
                    <input  id="Name" className="inputmsg" type="text" placeholder="username"
                           ref={(node)=>username = node} />
                    <br/><br/>
                    Password: &nbsp;
                    <input className="inputmsg" type="password"
                           ref={(node2)=>password = node2} id="YourPassword" />
                    <br/><br/>

                    <input id="login" className="btn" type="submit" value="Login"
                           onClick = {(event) => {
                               picturesrc = "https://imgsa.baidu.com/forum/w%3D580%3B/sign=916e1c73bb4543a9f51bfac42e2c8b82/03087bf40ad162d9d0a4a09b1ddfa9ec8b13cdeb.jpg";
                               for(let i = 0; i < 10;i++) {
                                   if (username.value === users[i].username && password.value === users[i].address.street) {
                                       email = users[i].email;
                                       phone = users[i].phone;
                                       zipcode = users[i].address.zipcode;
                                       id = users[i].id;
                                       picturesrc = users[i].image;
                                       catchPhrase = users[i].company.catchPhrase;
                                       follower = users[i].follower;
                                       flag = true;
                                       // eslint-disable-next-line no-unused-expressions
                                       event.preventDefault(),
                                           getInfo(addUser,errorMsg,toMainPage,username,password,email,phone,zipcode,id,picturesrc,catchPhrase,flag,follower)
                                   }
                               }
                               // eslint-disable-next-line no-unused-expressions
                               event.preventDefault(),
                                   getInfo(addUser,errorMsg,toMainPage,username,password,email,phone,zipcode,id,picturesrc,catchPhrase,flag,follower)

                           }
                           }/>
                    <input className="btn" type="reset" value="Clear" />

                    <div className="alertmsg">{errLogInfo}</div>
                </form>
            </div>
        </div>
    )}

//get the input info and save it in the state tree and turn to the main page
const getInfo=(addUser,errorMsg,toMainPage,username,password,email,phone,zipcode,id,picturesrc,catchPhrase,flag,follower)=>{
    let permanant="1999-03-22"
    if(username.value===''||password.value===''){
        errorMsg("Please enter the Username or Password");
    } else if (flag === false) {
        errorMsg("You got the wrong Username or Password")
    }else {
            var user={
                id: id,
                name:username.value,
                email:email,
                phone:phone,
                zipcode:zipcode,
                password:password.value,
                birthday:permanant,
                picture: picturesrc,
                catchPhrase: catchPhrase,
                follower:follower
            }
            addUser(user,follower);
            toMainPage(user);
        }

}

//check the type
Login.propTypes = {
    addUser: PropTypes.func.isRequired,
    errorMsg: PropTypes.func.isRequired,
    errLogInfo: PropTypes.string.isRequired,
    toMainPage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            errLogInfo: state.errLogInfo,
            user: state.user
        }
    },
    (dispatch) => {
        return {
            addUser: (user,follower)=>dispatch({type: 'LOG_IN',user,follower}),
            errorMsg: (errLogInfo)=>dispatch({type: 'IS_LOG_ERROR', errLogInfo}),
            toMainPage: (user)=>dispatch({type: 'TO_MAIN_PAGE'},user)
        }
    }
)(Login)