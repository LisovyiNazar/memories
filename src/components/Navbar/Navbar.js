import React from 'react'
import { Link } from 'react-router-dom'
import { FcPicture } from 'react-icons/fc'
import { logout } from '../../store/actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import './index.scss'

const Navbar = () => {
    const dispath = useDispatch()
    const { user } = useSelector(state => state.auth)

    return (
        <div className='navbar-container'>
            <div className='navbar-brand-container'>
                <Link to='/' className='brand-logo'>
                    <h2 className='brand-name'>
                        Memories
                    </h2>
                    <FcPicture className='brand-icon' />
                </Link>
            </div>
            <div className='navbar-info-container'>
                <div className='profile-container'>
                    <Link to={`/user/${ user?.nickName }`} className='user-name'>
                    @{ user?.nickName }
                    </Link>
                    <button 
                        type='button' 
                        className='logout-button'
                        onClick={() => dispath(logout())}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Navbar