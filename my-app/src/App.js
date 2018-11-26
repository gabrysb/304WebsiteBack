//import react
import React, { Component } from 'react';
//import the css for the app
import './App.css';
//import the Header component
import Header from './components/header/Header';
//define a new class for the App
class App extends Component {

render() {

//this app will render the header component
return (
<div>
<Header />
</div>
);
}

}

//finally do not forget to export the component
export default App;