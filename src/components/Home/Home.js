import React from 'react'
import Posts from '../Posts'
import Navbar from '../Navbar'
import './index.scss'

const Home = () => {
    
    return (
        <>
            <Navbar/>
            <div className='home-wrapper'>
                <Posts />
            </div>
        </>
    )
}

export default Home