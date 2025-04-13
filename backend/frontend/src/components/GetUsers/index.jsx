import { Component } from "react";
import './index.css'
import { Link } from "react-router-dom";

class GetUsers extends Component {

    state={userDetails:[],isLoading:false}

    componentDidMount(){
        this.getUserDetails()
    }
    

    getUserDetails = async() => {
        this.setState({isLoading:true})
        const url = "http://localhost:3000/usercard"
        const options = {
            method: 'GET',
        }
        
        const response = await fetch(url,options);
        const data = await response.json();
        console.log(data);
        
        this.setState({ userDetails: data ,isLoading:false})
        
        
        
        
    }

        render(){  
        const {isLoading,userDetails}=this.state 
        console.log(userDetails)    
        return(
            <div className="get-component">
                <h1 className="user-heading">All Users</h1>
                {isLoading?<p className="loading-text" >loading....</p>:
                    <div className="all-users" >  
                        {userDetails.map((eachItem)=>(
                            <div key={eachItem.email} className="user-card" >         
                                <h1 className="user-name">Name : {eachItem.name}</h1>
                                <p className="user-name">Email : {eachItem.email}</p>
                                <p className="user-name">Address : {eachItem.address}</p>
                                <p className="user-name" >Role : {eachItem.role}</p>
                            </div>
                        ))}
                        {userDetails.length===0 && <p className="loading-text">No users available add some!</p>}
                    </div>}
                <Link to="/home">
                    <button>Back to Home</button>
                </Link>    
            </div>
        )
    }
}


export default GetUsers