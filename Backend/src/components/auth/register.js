import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


export const Register = ({addUser,errorMsg, errRegInfo,toMainPage}) => {
    let name;
    let email;
    let phone;
    let zipcode;
    let pw1;
    let pw2;
    let birthday;
    let follower = [1];
    return(
        <div>
            <h2>Register</h2>
            <div className="loginpage">
                <form>
                    Account Name:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="inputmsg" type="text" placeholder="your user name"
                           ref={(node)=>name = node} id="Name"/>
                    <br/>
                    <br/>
                    Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="inputmsg" type="text" placeholder = "123@123.com"
                           ref={(node)=>email = node} id="Email" />
                    <br/>
                    <br/>
                    Date of Birth:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="inputmsg" type="date"
                           ref={(node)=>birthday = node} id="Birthday" />
                    <br/>
                    <br/>
                    Phone:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="inputmsg" type="text" placeholder = "123-456-7890"
                           ref={(node)=>phone = node} id="Phone" />
                    <br/>
                    <br/>
                    Zipcode:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="inputmsg" type="text" placeholder = "5-digit zipcode"
                           ref={(node)=>zipcode = node} id="Zipcode" />
                    <br/>
                    <br/>
                    Password:&nbsp;&nbsp;&nbsp;&nbsp;
                    <input className="inputmsg" type="password" placeholder = "Your password"
                           ref={(node)=>pw1 = node} id="YourPassword" />
                    <br/>
                    <br/>
                    Password Confirmation:&nbsp;
                    <input className="inputmsg" type="password" placeholder = "Password Confirmation"
                           ref={(node)=>pw2 = node} id="PasswordConfirmation" />
                    <br/>
                    <br/>
                    <input id="login" className="btn" type="submit" value="Register"
                           onClick={(event) =>
                           {event.preventDefault();
                               validateInfo(addUser,errorMsg,toMainPage,
                                   pw1,pw2,name,email,phone,zipcode,birthday,follower)}
                           }/>
                    <input className="btn" type="reset" value="Clear"/>
                    <div className="alertmsg">{errRegInfo}</div>
                </form>
            </div>
        </div>
    )
}


const validateInfo=(addUser,errorMsg,toMainPage,Pw1,Pw2,
                    Name,Email,Phone,Zipcode,Birthday,follower)=>{
    var flag=true;
    var str="Alert: "
    errorMsg("")

    if(!checkempty(Name)){
        str += "Name cannot be empty. ";
        flag = false;
    }
    else if(!validateAccountName(Name)){
        str += "Name can only be upper or lower case letters and numbers, but may not start with a number.";
        flag = false;
    }
    if(!checkempty(Email)){
        str += "Email cannot be empty. ";
        flag = false;
    }
    else if(!validateEmail(Email)){
        str += "The Email format is not correct. ";
        flag = false;
    }
    if(!checkempty(Birthday)){
        str += "DOB cannot be empty. ";
        flag = false;
    }
    else if(!validateDOB(Birthday)){
        str += "You have to be 18 or older. ";
        flag = false;
    }
    //validate phone
    if(!checkempty(Phone)){
        str+="Phone number cannot be empty. ";
        flag = false;
    }
    else if(!validatePhone(Phone)){
        str+="The Phone Number format should be 123-123-1234(10 digits). ";
        flag = false;
    }

    if(!checkempty(Zipcode)){
        str += "Zipcode cannot be empty. ";
        flag = false;
    }
    else if(!validateZipCode(Zipcode)){
        str += "Please enter 5-digit zipcode. ";
        flag = false;
    }

    if(!checkempty(Pw1)){
        str += "Password cannot be empty. ";
        flag = false;
    }
    if(!checkempty(Pw2)){
        str += "Password Confirmation cannot be empty. ";
        flag = false;
    }
    if(!validatePassword(Pw1,Pw2)){
        str += "Two passwords are not the same. ";
        flag = false;
    }

    if(flag){
        addthisOne(addUser,errorMsg,toMainPage,Pw1,Pw2,
            Name,Email,Phone,Zipcode,Birthday,follower);
    }
    else{
        errorMsg(str);
    }
}

const checkempty=(element)=>{
    if(element.value == ""||element.value == null){
        return false;
    }
    return true;
}


const addthisOne=(addUser,errorMsg,toMainPage,Pw1,Pw2,
                  Name,Email,Phone,Zipcode,Birthday,follower)=>{
    var user={
        name:Name.value,
        email:Email.value,
        phone:Phone.value,
        zipcode:Zipcode.value,
        password:Pw1.value,
        birthday:Birthday.value,
        catchPhrase: "4ever Blue!",
        picture: "https://editorial.uefa.com/resources/025a-0e9f81caa5d0-49ca1322926a-1000/frank_lampard_with_the_trophy_after_chelsea_s_2012_final_win_against_bayern.jpeg",
        follower:follower
    }
    addUser(user,follower)
    toMainPage(user)
}

const validateAccountName=(element)=>{
    let valaccount=/^([a-zA-Z]{1})([a-zA-Z0-9]{1})+$/;
    if(element.value.match(valaccount)||!(checkempty(element))){
        return true;
    }
    return false;
}

const validateEmail=(element)=>{
    let valemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(element.value.match(valemail)||(!checkempty(element))){
        return true;
    }
    return false;
}

const validateDOB=(element)=>{
    let dob = element.value;           //get the input date
    let yr = dob.substring(0,4);
    let mon = dob.substring(5,7);
    let day = dob.substring(8,10);
    let now = new Date();		//get the current date
    let nowyr = now.getFullYear();
    let nowmon = now.getMonth()+1;
    let nowday = now.getDate();
    if ((nowyr-yr)<18){			//if smaller than 18, alert directly.
        return false;
    }else if ((nowyr-yr)==18){			//if equals to 18, compare the month first.
        if((nowmon-mon)<0){
            return false;
        }else if((nowmon-mon)==0){		  //if months are equal, compare the day.
            if((nowday-day)<0){
                return false;
            }
        }
    }
    return true;
}

const validatePhone=(element)=>{
    let valtel = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
    if(element.value.match(valtel)||(!checkempty(element))){
        return true;
    }
    return false;
}

const validateZipCode=(element)=>{
    let valzip = /^([0-9]{5})$/;
    if(element.value.match(valzip)||(!checkempty(element))){
        return true;
    }
    return false;
}

const validatePassword=(element1,element2)=>{
    if(element1.value!=element2.value
        && checkempty(element1) && checkempty(element2)){
        return false;
    }
    return true;
}
//check the type
Register.propTypes = {
    addUser: PropTypes.func.isRequired,
    errorMsg: PropTypes.func.isRequired,
    errRegInfo: PropTypes.string.isRequired,
    toMainPage: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}
export default connect(
    (state) => {
        return {
            errRegInfo: state.errRegInfo,
            user: state.user
        }
    },
    (dispatch) => {
        return {
            addUser: (user,follower)=>
                dispatch({type: 'REGISTER',user,follower}),
            errorMsg: (errRegInfo)=>
                dispatch({type: 'IS_REG_ERROR', errRegInfo}),
            toMainPage: (user)=>
                dispatch({type: 'TO_MAIN_PAGE'},user)
        }
    }
)(Register)