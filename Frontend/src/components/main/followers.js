import React  from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

var id = 11;
var count = 4;
var add = 0;

const User = ({users, self}) => (
    <div>
        <br/>
        <img src={users.image} />
        <div>{users.name}</div>
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
    constructor(props) {
        super(props)
        this.state = {followerList: props.users,user: props.user}
    }
    render() {
        return(
            <div>
                <h3> Following Users </h3>
                <div>
                    {
                        this.state.followerList.map((users,index) => {

                            let temp = this.state.user.id-1;
                            if(temp < 7) {
                                if (index > temp && index < temp + count) {
                                        return (
                                            <User key={users.id} users={users} self={this}/>
                                        )
                                }
                            }else if (temp === 7){
                                if (index < 1 || index > 7){
                                    return (
                                        <User key={users.id} users={users} self={this}/>
                                    )
                                }
                            }else if (temp === 8){
                                if (index < 2 || index > 8){
                                    return (
                                        <User key={users.id} users={users} self={this}/>
                                    )
                                }
                            }else{
                                if (index < (count-1)){
                                    return (
                                        <User key={users.id} users={users} self={this}/>
                                    )
                                }
                            }
                            if(add>0){
                                if (index>id-2-add){
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
            </div>
        )
    }
}
// add a follower by changing the state
const addFollowing = (self) => {
    var name = document.getElementById('addFollowing').value
    if(name !== '') {
        self.setState({
            followerList: [
                ...self.state.followerList,
                {
                    id: id,
                    image:"https://img.i-scmp.com/cdn-cgi/image/fit=contain,width=1098,format=auto/sites/default/files/styles/1200x800/public/d8/images/methode/2020/10/16/41e9b47c-07af-11eb-afc8-92e0da0ef1c3_image_hires_155550.jpg?itok=ihKswLDq&v=1602834958",
                    name: name,
                    company: {
                        catchPhrase:"BlackPink in Your Area!"
                    }
                }
            ]
        })
        id++;
        add++;
        document.getElementById('addFollowing').value = ''
    }
}
//remove a follower by changing the state
const remove = (idrm, users,self) => {
    if(users.id<(11-add)){
        count--;
    }else{
        add--;
    }
    self.setState({
        followerList: self.state.followerList.filter((user) => user.id !== idrm)
    })
    id--;
}

export default Followers