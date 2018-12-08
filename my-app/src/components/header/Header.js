import React, { Component } from 'react';
import './Header.css';
import FontAwesome from 'react-fontawesome';

class Header extends Component {
  
    constructor(props){
        super(props);

        this.state = {
            searchTerm : "",
            headerStyle:{backgroundColor:this.props.backgroundColor}
        };
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTitleClick = this.handleTitleClick.bind(this);
    }

    handleTextChange(event){
        this.setState({searchTerm: event.target.value})
    }
    handleSearchSubmit(event){
        
        //prevent the form to be submitted to its action url
        event.preventDefault();
        this.props.onSearchClick(this.state.searchTerm);  
    }

    handleTitleClick(event){

        if(this.props.onClickTitle != null){
            this.props.onClickTitle();
        }
            
    }
  
    render() {

        return (

            //this is JSX code which is very similar to HTML we already know
            <div className="header" style={this.state.headerStyle}>
                <img src={this.props.logo} alt="React logo" /><a href="#default" className="logo" onClick={this.handleTitleClick}> {this.props.title}</a>
                <div className="header-right">
                    <div className="search-container">
                        <form action="">
                            <input type="text" placeholder="Search.." name="txtSearch" onChange={this.handleTextChange} value={this.state.searchTerm}/>
                            <button type="submit" onClick={(e) =>{ e.preventDefault(); this.props.onSearchClick(this.state.searchTerm)} }><FontAwesome name='fas fa-search' /></button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Header;