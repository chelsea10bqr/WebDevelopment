import React, {Component} from 'react';
import {connect} from 'react-redux';

const userInfo = require('../../../data/users.json').users;


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
            <button type='button' className='btn'>Comment</button>
            <button type='button' className='btn'>Edit</button>
            <br/><br/>
        </td>
        {posts.picture == "" ? (
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
        this.state = {posts: props.posts, searchposts: props.posts}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            posts: nextProps.posts,
            searchposts: nextProps.posts
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
                                let yr = Math.floor((Math.random()*21+2000));
                                let mon = Math.floor((Math.random()*12+1));
                                let day = Math.floor((Math.random()*28+1));
                                let hour = Math.floor((Math.random()*24));
                                let min = Math.floor((Math.random()*60));
                                let sec = Math.floor((Math.random()*60));
                                posts.timestamp = mon + '/'+ day + '/'+ yr +' ' + hour + ':' + min + ':' + sec;
                                for(let i = 0; i < 10; i ++){
                                        if(userInfo[i].id === posts.userId){
                                            posts.userId = userInfo[i].name;
                                        }

                                }

                                return (
                                    <Card key={index} posts={posts}
                                          index={index} user={user}/>
                                )
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