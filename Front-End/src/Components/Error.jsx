import React from 'react'
import {useNavigate} from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  }
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",flexDirection:"column",marginTop:"10rem",gap:"18px"}}>
        <h1 style={{color:"#fff", fontSize:"4rem"}}>404-Page not found</h1>
        <p style={{color:"#fff", fontSize:"1.2rem"}}>The page you are looking for does not exist</p>
        <button style={{backgroundColor:"#2d3436",padding:"8px",fontSize:"18px",color:"#fff",cursor:"pointer"}} onClick={goBack}>Go Back</button>
    </div>
  )
}

export default Error