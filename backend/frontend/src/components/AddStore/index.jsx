import { Link } from 'react-router-dom';
import './index.css';
import {Component} from 'react'
import Cookies from 'js-cookie'



class AddStore extends Component {
  
  state={name:"",image:"",address:"",description:"",loading:false,storeList:[]}

  onChangeName=(event)=>{
    this.setState({name:event.target.value})
  }



  onChangeAddress=(event)=>{
    this.setState({address:event.target.value})
  }

  onChangeDescription=(event)=>{
    this.setState({description:event.target.value})
  }

  onAddImage= async (event)=>{
    this.setState({loading:true})
    const imageFile=event.target.files[0]
    if(!imageFile) return

    const formData=new FormData()
    formData.append("file", imageFile )
    formData.append("upload_preset","hemanth_sure")
    formData.append("cloud_name","darsfmavs")

    const imageResponse=await fetch("https://api.cloudinary.com/v1_1/darsfmavs/image/upload",{
      method:"POST",
      body:formData
    })

    const uploadImageUrl=await imageResponse.json()
    console.log(uploadImageUrl.url)
    this.setState({image:uploadImageUrl.url,loading:false})

    
  }


  postUserData=async (event)=>{
    event.preventDefault()
    const {name,image,address,description}=this.state
    console.log("Data successfully sent to databasse")
    console.log(name,image,address,description)
    const newStore={
      name,image,address,description
    }
    this.setState(prevState=>({storeList:[...prevState.storeList,newStore]}))


  }

  renderForm=()=>{
    const {name,address,description,loading}=this.state
    return(
      <form className="main-container" onSubmit={this.postUserData} >
         <h1 className='form-heading'>Add Store</h1>
         <input type="file" className="image-container" onChange={this.onAddImage}  />
         {loading?<p className='image-text' >Loading... Please Submit after uploading</p>:<p className='image-text'>upload image here</p>}
         <input type="text" className="name-container" placeholder='Name' value={name} onChange={this.onChangeName} />
         <input type="text" className='address-container' placeholder="Address" value={address} onChange={this.onChangeAddress} />        
         <input type="text" placeholder="Add Description" className="description-container"  value={description} onChange={this.onChangeDescription} />           
         <button className='submit-button' type='submit' >Submit</button>  
         <Link to="/"  className='back-link'>
            <button className='back' >Back to home</button>
         </Link>      
      </form>
    )
  }

  renderStoreCards=()=>{
    const {storeList}=this.state
    return(
      <div className='store-cards'>
        {storeList.map((eachItem)=>(
          <div className='store-card' key={eachItem.name}>
             <img src={eachItem.image} className='store-image' alt={eachItem.name}/>
             <h1 className='store-heading'>{eachItem.name}</h1>
             <p className='store-address'>{eachItem.address}</p>
             <p className='store-description'>{eachItem.description}</p> 
          </div>
        ))}
      </div>
    )
  }

  render(){
    return (
      <div className='add-view-stores'> 
        {this.renderForm()}
        {this.renderStoreCards()}
      </div>
    );
  }


  
}

export default AddStore;