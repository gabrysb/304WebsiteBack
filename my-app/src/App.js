//import react
import React, { Component } from 'react';
//import the css for the app
import './App.css';

//import the app components
import Header from './components/header/Header';
import Grid from './components/grid/Grid';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';

import CallAPI from './CallAPI';

import logo from './img/logo.png';

//define a new class for the App
class App extends Component {

  api = new CallAPI();

  constructor(props){

    super(props);

    //we setup our initial state in the constuctor
    //by default we will show login component at the first time the app starts
    this.state = {
      currentView : "login",
      items : [],
      homeItems: [],
      currentArticle: null,
      user_data: {
        username: '',
        password: ''
      },
      loginError: false
    };

    //bind all the functions in the class so that the keyword "this"
    //will not change its context and points to another object
    this.onSearch = this.onSearch.bind(this);
    this.handleThumbnailClicked = this.handleThumbnailClicked.bind(this);
    this.updateBlogsData = this.updateBlogsData.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.showHome = this.showHome.bind(this);

  }
  //this function will be called by the header component when the user click search button
  onSearch(term){
    console.log("search on term:" + term);
  }
  
  //we will pass this function to card component so we will handle which thumbnail was clicked
  handleThumbnailClicked(key){
    
    //ignore if we are showing something else otherthan the grid of thumbnails 
    if(this.state.currentView !== "home")
      return;
    
    let len = this.state.items.length;
    
    //iterate through the items and find the one matching the clicked id
    for(let i = 0; i < len ; i++){

      if(this.state.items[i].id === key){
        
        let item = Object.assign({}, this.state.items[i]);

        this.setState({
          currentView: "article",
          currentArticle: item
        });
      }
    }
  }

  //we will call this function to create a copy of the data and set our state to home
  updateBlogsData(err, data){

    if(err){
        return;
    }
    //when displaying home screen we need to show only portion of the body
    //so we create a new data and map the new items to exactly the same 
    //however we extract just a portion of the original body and use this array
    //to display home thumbnails
    let data2 = data.map( item => {

      let shortBody = item.body.substring(0, 128);

      return {
        id: item.id,
        title: item.title,
        authorId : item.authorId,
        body: shortBody,
        registrationDate: item.registrationDate,
        photo: item.photo
      }
    });

    this.setState({
      items : data,
      homeItems: data2,
    });

    this.showHome();

  }

  //this function will be called by the login component when the usre tries to sign in
  loginUser(userData){

    this.api.login(userData, (err, data) => {

        if(err){
          //we need to notify the login component to display error in username or password
          this.setState({loginError: true})
          console.log('error')
          return;
        }
        
        //if login successful we need to keep track of username and password 
        //and show user home screen
       this.api.getBlogs(12, 1, this.updateBlogsData);

    });

  }
  //this will show the home
  showHome(){
    
    //in case we were showing an article, remove it from the state
    if(this.state.currentArticle !== null)
      this.setState({currentArticle: null});
    
    this.setState({currentView:"home"});
     
   
  }

  //we will use this life cycle method to call the data
  //we need to call the data once the component is ready
  //otherwise setting state will not work properly
  componentDidMount(){

      //window.history.pushState("object or string", "Title", "/test");
    
  }

  render() {
    
    let whatToRender;

    if(this.state.currentView === "home"){
      whatToRender = <Grid items={this.state.homeItems} colClass="col-m-3" onClick={this.handleThumbnailClicked} rowLength={4} />
    }
    //becuase our grid component expects an array but we need to show only one item
    //so we will add that item to an array and send the array to the grid
    else if(this.state.currentView === "article"){
      let tempArr = [this.state.currentArticle];
      whatToRender = <Grid items={tempArr} colClass="col-m-6" onClick={this.handleThumbnailClicked} rowLength={1} />;
    }
    else if(this.state.currentView === "login"){
      whatToRender = <Login loginButtonColor="#800000" onSubmit={this.loginUser} loginError={this.state.loginError}/>;
    }
    else if(this.state.currentView === "logout"){
      whatToRender = null;
    }
    else if(this.state.currentView === "profile"){
      whatToRender = null;
    }
    else if(this.state.currentView === "signup"){
      whatToRender = <Signup />;
    }
    //after rendering the header, render the grid
    // pass the thumbnails and set the css responsive class
    return (
      <div>
        <Header title="My Own Blog" logo={logo} onSearchClick={this.onSearch} backgroundColor="#800000" onClickTitle={this.showHome} />
        {whatToRender}
      </div>
    );
  }
  
}

//finally do not forget to export the component
export default App;
