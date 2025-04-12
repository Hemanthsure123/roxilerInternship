import { Component } from "react";
import './index.css'

class GetStore extends Component{

    state={storeDetails:[],isLoading:false}

    componentDidMount(){
        this.getStoreDetails()
    }

    async getStoreDetails() {
        try {
          const response = await fetch('http://localhost:3000/store');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          this.setState({storeDetails:data})
        } catch (error) {
          console.error('Failed to fetch store details:', error);
        }
      }
      

    render(){
        const {storeDetails}=this.state        
        return(
            <div className="get-component">
            {storeDetails.map((eachItem)=>{
                <div key={eachItem.name}>
                    <img src={eachItem.image} className="store-image" alt="stores"/>            
                    <h1 className="store-name">{eachItem.name}</h1>
                    <p className="store-email">{eachItem.description}</p>
                    <p className="store-address">{eachItem.address}</p>
                </div>
            })}           
            {storeDetails.length===0 && <p>No store items add some</p>}
            </div>
        )
    }
}


export default GetStore