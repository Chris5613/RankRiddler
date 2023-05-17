import React from 'react'
import { useNavigate } from 'react-router-dom'

function Error() {
    const navigate = useNavigate();
    const goback = () => {
        navigate(-1);
    }
  return (
    <div style={{display:'flex',flexDirection:"column",gap:"10px",marginTop:"10rem",alignItems:"center"}}>
        <h1 style={{fontSize:"4rem",color:"#fff"}}>404-Page not found</h1>
        <p style={{fontSize:"1.2rem",color:"#fff"}}>The page you are looking for does not exist.</p>
        <button style={{backgroundColor:"#2d3436",padding:"8px",fontSize:"18px",color:"#fff"}} onclick={goback}>Go Back</button>
    </div>
  )
}

export default Error