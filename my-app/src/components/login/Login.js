import React, { Component } from 'react';
import './Login.css';
import login_avatar from './img/login_avatar.png'

class Login extends Component {
  
    constructor(props){
        super(props);

        this.state = {
            loginButtonColor:{backgroundColor:this.props.loginButtonColor},
            txtUsername: '',
            txtPassword: '',
            errors : {
                txtUsername: false,
                txtPassword: false
            }
        };
        
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleInputChange(event){

        const target = event.target;
        
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleLoginClick(event){

        //prevent form submission
        event.preventDefault();

        //create new object to assign new error values
        let newErrors = {};

        newErrors.txtUsername = this.state.txtUsername === '' ? true:false;
        newErrors.txtPassword = this.state.txtPassword === '' ? true:false;    
        
       if(newErrors.txtUsername === false && newErrors.txtPassword === false){
            this.props.onSubmit({
                username: this.state.txtUsername,
                password: this.state.txtPassword,
                rememberMe: false
            })
       }
       else{
            this.setState({errors:newErrors});
       }

       
    }

    render() {

        return (

            <div className="loginForm">
                <form action="action_page.php">
                    <div className="imgcontainer">
                        <img src={login_avatar} alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        {this.props.loginError ? <div className="error">Wrong username or password</div>: null}
                        <label htmlFor="txtUsername"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="txtUsername" onChange={this.handleInputChange} value={this.state.txtUsername} />
                         {this.state.errors.txtUsername ? <div className="error">Username is required</div>: null}

                        <label htmlFor="txtPassword" ><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="txtPassword" onChange={this.handleInputChange} value={this.state.txtPassword} />
                        {this.state.errors.txtPassword ? <div className="error">password is required</div>: null}

                        <button type="submit" style={this.state.loginButtonColor} onClick={this.handleLoginClick}>Login</button> 
                        
                        <label>
                            <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
                        </label>
                    </div>
                    <div className="container" style={{backgroundColor: '#f1f1f1'}}>
                        <span className="psw">Forgot <a href="#signup">password?</a></span>
                    </div>
                </form>
            </div>
            
        );
    }
}
export default Login;