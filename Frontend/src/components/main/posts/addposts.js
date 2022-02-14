import React from 'react'
import {connect} from 'react-redux'
import $ from "jquery"

//Add a new article which the contents are from the textarea.
const Addposts = ({addNew,user}) => {
    return(
        <div className='loginpage'>
            New Posts<br/><br/>
            <textarea className="inputmsg" cols="40" rows='8' id='newArticle'
                      placeholder='Put your text here! '/>
            <br/><br/>
            Upload Picture:&nbsp;&nbsp;
            <input className='btn' type='file' id="uploadimg"/>
            <br/><br/>
            <button type='button' className='btn' onClick={() => {
                let time=new Date().toLocaleString()
                addNew(user.name,document.getElementById('newArticle').value,time)
                document.getElementById("newArticle").value=''
            }}>Post</button>
            <button type='button' className='btn' onClick={() => {
                document.getElementById('newArticle').value = ''}
            }>Clear</button>
        </div>
    )
}


export default connect(
    (state) => {
        return {
            user : state.user
        }
    },
    (dispatch) => {
        return {
            addNew: (username,text,time,img) =>
                dispatch({type: 'ADD_ARTICLE',username, text, time,img})
        }
    }
)(Addposts)