import React, {Component} from 'react';
import {connect} from 'react-redux';
import { addPosts } from "../../../actions";

const userInfo = require('../../../data/users.json').users;
const comments = require('../../../data/comments.json').comments;
const Card = ({posts}) => (
    <tbody>
    <tr>
        <td className="loginpage">
            <div className="note"><b>Author:</b>{posts.userId}
                <br/>
                <b>Title:</b> {posts.title}</div>
            <br/>
            <div>{posts.timestamp}</div>
            <div> { posts.body } </div>
            <br/>
            <br/>
            <b>Comments</b>
            <br/>
            <div><b>Comments: </b> { posts.comments}</div>
            <div><b>From user: </b> {posts.comauth} </div>
            <br/>
            <div><b>Comments: </b> { posts.comments2}</div>
            <div><b>From user: </b> {posts.comauth2} </div>
            <br/>
            <br/>
            <button type='button' className='btn'>Comment</button>
            <button type='button' className='btn'>Edit</button>
            <br/><br/>
        </td>
        {posts.picture ==="" ? (
            <td className="card3"></td>
        ) : (
            <td className="card3"><img src="https://y.qichejiashi.com/tupian/upload/230300918.jpg" /></td>
        )}
    </tr>
    </tbody>
)


class Poststable extends React.Component {
    constructor(props) {
        super(props)
        this.state = {posts: props.posts, searchposts: props.posts, users:props.user}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            posts: nextProps.posts,
            searchposts: nextProps.posts,
            users: nextProps.users,
        })
    }

    render() {
        return(
            <div>
                <div className='loginpage'>
                    <input id="yourFeed"className="inputmsg" type="text"
                           placeholder="search posts"
                           onChange={() => search(this)}/>
                </div>
                <div className='articlesView'>
                    <table>
                        {
                            this.state.searchposts.map((posts, index, user) => {
                                if(this.state.users==null){
                                    return (
                                        <Card key={index} posts={posts}
                                              index={index} user={user}/>
                                    )
                                } else {
                                    let yr = Math.floor((Math.random() * 21 + 2000));
                                    let mon = Math.floor((Math.random() * 12 + 1));
                                    let day = Math.floor((Math.random() * 28 + 1));
                                    let hour = Math.floor((Math.random() * 24));
                                    let min = Math.floor((Math.random() * 60));
                                    let sec = Math.floor((Math.random() * 60));
                                    posts.timestamp = mon + '/' + day + '/' + yr + ' ' + hour + ':' + min + ':' + sec;
                                    for (let i = 0; i < 10; i++) {
                                        if (userInfo[i].id === posts.userId) {
                                            posts.userId = userInfo[i].username;
                                        }
                                    }
                                    let rand = Math.floor((Math.random() * 500));
                                    posts.comauth = comments[rand].name;
                                    posts.comments = comments[rand].body;
                                    let rand2 = Math.floor((Math.random() * 500));
                                    posts.comauth2 = comments[rand2].name;
                                    posts.comments2 = comments[rand2].body;

                                    if(this.state.users!==null) {
                                        let follow = this.state.users.follower
                                        for (let i = 0; i < follow.length; i++) {
                                            if (posts.userId === userInfo[follow[i] - 1].username || posts.userId === this.state.users.name) {
                                                return (
                                                    <Card key={index} posts={posts}
                                                          index={index} user={user}/>
                                                )
                                            }
                                        }
                                    }else {
                                        if(posts.userId === this.props.user.name){
                                            return (
                                                <Card key={index} posts={posts}
                                                      index={index} user={user}/>
                                            )
                                        }
                                    }



                                }
                            })
                        }
                    </table>
                </div>
            </div>
        )
    }
}

const search = (self) => {
    var keyWord = document.getElementById('yourFeed').value
    if(keyWord === "") {
        self.setState({
            ...self.state,
            searchposts: self.state.posts
        })
    } else {
        self.setState({
            ...self.state,
            searchposts: self.state.posts.filter((posts) => {
                if(posts.userId.indexOf(keyWord) == -1
                    && posts.body.indexOf(keyWord) == -1) {
                    return false;
                }
                return true;
            })
        })
    }

}
export default connect(
    (state) => {
        return {
            posts: state.posts,
            user : state.user
        }
    },
    (dispatch) => {
        return {
        }
    }
)(Poststable)