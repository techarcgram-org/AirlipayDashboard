import React,{useState} from "react";
import Link from "next/link";
import images from "@/constant/images";
import { Tab } from "@/components";


const Admin =()=>{
    const [email,setEmail]= useState('');
    const [password, setPassword]= useState('');
    

    const handleSubmit =(e)=>{
        e.preventDefault();
        console.log(email)
    }
    return(

    
    <>
    <h2 style={{color:'solid black', fontSize:40}}>Log In</h2>
    {/* <Tab
    options={["Admin", "Employer"]}
    defaultTab="Admin">
        < Admin tab="Admin"/>
        < Employer tab= "Employer"/>
    </Tab> */}
    <form onSubmit={handleSubmit}>
            <div style={{justifyContent:'center'}}>
            <img src={images.email}/>
            <input  style={{border:2, borderColor:'gray'}}  value={email} onChange={(e) =>setEmail(e.target.value)} type="email" placeholder="Email" id="email" name="email"/>
            </div>
            <div style={{flexDirection:'row', justifyContent:'space-between'}}>
                <img src={images.pass}/>
            <input className="pass" 
           value={password}  onChange={(e) =>setPassword(e.target.value)} type="password" placeholder="Password" id="password" name="password" minLength={8}/>
            </div>
           
            

           <div style={{alignContent:'space-between'}}>
           <h2  style={{}}><input type="checkbox" id="checkbox" name="checkbox" /> Remember me</h2>
           <Link style={{color:'#063B87', flexDirection:'column'}}href ="/ ">Forgot password ?</Link>
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