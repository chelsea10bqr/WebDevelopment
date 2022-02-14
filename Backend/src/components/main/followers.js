import React  from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import {Login} from "../auth/login";
import PropTypes from "prop-types";
import { addFollower } from "../../actions";


const userInfo = require('../../data/users.json').users;
const User = ({users, self}) => (
    <div>
        <br/>
        <img src={users.image} />
        <div>{users.username}</div>
        <div><b>{users.company.catchPhrase}</b></div>
        <button className='btn'
                onClick={() => remove(users.id, users,self)}>Unfollow</button>
        <br/>
        <br/>
        <br/>
    </div>
)


//build the basic structure for followers with the info
class Followers extends React.Component {
    errormessage;
    constructor(props) {
        super(props)
        this.state = {followerList: props.followerList,user: props.user}
    }
    render() {
        return(
            <div>
                <h3> Following Users </h3>
                <div>
                    {
                        this.state.followerList.map((users,index) => {
                            let temp = this.state.user.follower
                            for( let i =0 ; i< temp.length;i++){
                                if(users.id === (temp[i])){
                                    return (
                                        <User key={users.id} users={users} self={this}/>
                                    )
                                }
                            }
                        })
                    }
                </div>
                <div>
                    <input id='addFollowing' type='text' className="inputmsg2"
                           placeholder='Name' /><br/>
                    <button className='btn'
                            onClick={() =>
                                addFollowing(this)}> Add New Follewer</button>
                </div>
                <br/>
                <div className="alertmsg">
                     {this.errormessage}
                </div>
            </div>
        )
    }
}
// add a follower by changing the state
const addFollowing = (self) => {
    let flag = false;
    var name = document.getElementById('addFollowing').value
        for(let i = 0; i<10; i++) {
            if(name === userInfo[i].username) {
                self.setState({
                    followerList: [
                        ...self.state.followerList,
                        {
                            id: userInfo[i].id,
                            image: userInfo[i].image,
                            username: userInfo[i].username,
                            company: {
                                catchPhrase: userInfo[i].company.catchPhrase
                            }
                        }
                    ]
                })
                let follow = self.state.user.follower;
                follow.push(userInfo[i].id)
                let li =   [
                    ...self.state.followerList,
                    {
                        id: userInfo[i].id,
                        image: userInfo[i].image,
                        username: userInfo[i].username,
                        company: {
                            catchPhrase: userInfo[i].company.catchPhrase
                        }
                    }
                ];
                console.log(li)
                self.props.addFollower(follow,li);
                document.getElementById('addFollowing').value = '';
                flag = true;
                self.errormessage = "";
            }
     }
    if(flag === false){
        self.setState({
            followerList: [
                ...self.state.followerList
            ]
        })
        document.getElementById('addFollowing').value = ''
        self.errormessage = "user does not exist";
    }
}
//remove a follower by changing the state
const remove = (idrm, users,self) => {
    self.setState({
        followerList: self.state.followerList.filter((user) => user.id !== idrm)
    })
    let follow = self.state.user.follower;
    for( let i = 0; i < follow.length; i++){

        if ( follow[i] === idrm) {

            follow.splice(i, 1);
        }
    }
    let li = self.state.followerList.filter((user) => user.id !== idrm)
    self.props.addFollower(follow,li);
}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addFollower : (follower,list) => dispatch(addFollower(follower,list))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Followers);
