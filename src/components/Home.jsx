import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div>
        <h1>Welocme to home page</h1>
        
          <Link className='btn1' to={"/"} > GO TO REGISTRATION PAGE</Link>
       
    </div>
    </>
  )
}

export default Home
