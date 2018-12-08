import axios from 'axios';
import config from './config';

//this class will have all the methods that we need to connect to the API
class CallAPI {

    login(loginData, callback){

        if(loginData === null){
            callback("no login data were provided");
            return;
        }

        let url = config.api_get_login;
        axios.post(url,{
        },{ 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type' : 'application/json', 
                'Authorization' : 'Basic ' + window.btoa(loginData.username + ':' + loginData.password)       
            }
        }).then(res => {
            
            if(res.status === 201){

                callback(null, res.data);
            }

        }).catch( (error) => {
            console.log("the following error has occured:" + error);
            callback(error);
        });

    }
    logout(){

    }
    addUser(data){

    }
    getUser(data){

    }
    getUsers(data){

    }
    updateUSer(data){

    }
    deleteUser(data){

    }
    getBlogs(pageLength, pageNumber, callback){
        
        let url = config.api_get_blogs;
        axios.get(url,{ 
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type' : 'application/json'        
            }
        }).then(res => {
            
            console.log(res.data);
            callback(null, res.data);

        }).catch( (error) => {
            console.log("the following error has occured:" + error);
            callback(error);
        });
    }
    getBlog(id){

    }
    createBlog(data){

    }
    updateBlog(data){

    }
    deleteBlog(data){

    }
    addFavourite(data){

    }
    deleteFavourite(data){

    }
    getFavourites(data){
        
    }
    
}

export default CallAPI;

