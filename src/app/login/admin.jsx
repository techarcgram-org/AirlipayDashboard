import React,{useState} from "react";
import Link from "next/link";
import images from "@/constant/images";
import { Tab } from "@/components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';


const Admin =()=>{
    const [email,setEmail]= useState('');
    const [password, setPassword]= useState('');
    

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email)
    }
    return(

    
    <>
    <h2 style={{color:'solid black', fontSize:40,textAlign:'center'}}>Log In</h2>
    {/* <Tab
    options={["Admin", "Employer"]}
    defaultTab="Admin">
        < Admin tab="Admin"/>
        < Employer tab= "Employer"/>
    </Tab> */}
    <form onSubmit={handleSubmit} style={{alignContent:'center', justifyContent:'center'}}>
            <div style={{justifyContent:'center', marginBottom:10}}>
            <FontAwesomeIcon icon={faEnvelope} style={{color:'gray'}} />
            <input  style={{border:4, borderColor:'solid gray', padding:6, borderRadius:4}}  
            value={email} 
            onChange={(e) =>setEmail(e.target.value)} 
            type="email" 
            placeholder="  Email" 
            id="email" 
            name="email"/>
            </div>
            <div style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30}}>
            <FontAwesomeIcon icon={faLock} style={{color:'gray'}}/>
            <input className="pass" 
             value={password}
             onChange={(e) =>setPassword(e.target.value)} 
             type="password" 
             placeholder="    Password" 
             id="password"
             name="password" 
             minLength={8}/>
            </div>
           
            

           <div style={{display:'flex',alignContent:'space-between',marginBottom:30}}>
           <h2  style={{}}><input type="checkbox" id="checkbox" name="checkbox" /> Remember me   
           <Link style={{color:'#063B87', flexDirection:'row',marginLeft:260}}href ="/ "> Forgot password ?</Link></h2>
           </div>
          
           <div style={{backgroundColor:'#063B87',color:'white', width:530,textAlign:'center', fontSize:20, marginTop:5, }}>
           <button type="submit"> 
           <Link href="/">Log In</Link></button>
           </div>
           



        </form>

        <div style={{position:"relative"}}>
        <button>Don't have an account?  
            <Link style={{color:'#063B87'}} href="/">   Contact Us</Link>
        </button>
        </div>
        </>
    );
};
export default Admin