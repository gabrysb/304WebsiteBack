import React, { Component } from 'react';
import './Header.css';
import react_logo from '../../img/logo.svg';

class Header extends Component {

    handleSearchSubmit(event){

        //prevent the form to be submitted to its action url
        event.preventDefault();
        console.log("search button was clicked");
    }

    render() {

        return (

        //this is JSX code which is very similar to HTML we already know 

        <div className="header">
            <img src={react_logo} alt="React logo" /><a href="#default" className="logo"> React App Header</a>
            <div className="header-right">
                <div className="search-container">
                    <form action="">
                        <input type="text" placeholder="Search.." name="txtSearch" onChange={this.handleInputChange} />
                        <button type="submit" onClick={this.handleSearchSubmit}>Search</button>
                    </form>
                </div>
            </div>
        </div>
        );
    }
}
export default Header;