import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar'
import './index.scss'
import Post from '../Posts/Post/Post'
import { getUserPosts, getLikedPosts } from '../../store/actions/post.actions'
import Form from '../Form/Form'
import { useSelector } from 'react-redux'

const UserPage = () => {
    const { nickname } = useParams()

    const posts = useSelector(state => state.posts)
    
    const [screen, setScreen] = useState('posts');
    const [userPosts, setUserPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])

    const hangeleOptionChange = (screen) => {
        setScreen(screen)
    }

    useEffect(() => {
        getUserPosts(nickname, setUserPosts)
        getLikedPosts(nickname, setLikedPosts)
    }, [nickname, posts])

    return (
        <>
            <Navbar />
            <div className='user-page-conatainer'>
                <div className='sidebar'>
                    <div className='navigation'>
                        <div 
                            className={screen === 'posts' ? 'active': ''} 
                            onClick={() => hangeleOptionChange('posts')}
                        >
                            Posts
                        </div>
                        <div 
                            className={screen === 'liked-posts' ? 'active': ''} 
                            onClick={() => hangeleOptionChange('liked-posts')}
                        >
                            Liked Posts
                        </div>
                        {screen === 'posts' && (
                        <Form />
                    )}
                    </div>
                </div>
                <div className='content'>
                    {screen === 'posts' && (
                        <>
                            {
                                userPosts.map(post => (
                                    <Post key={post._id} post={post} />
                                ))
                            }
                        </>
                    )}
                    {screen === 'liked-posts' && likedPosts && (
                        <>
                        {
                            likedPosts.map(post => (
                                <Post key={post._id} post={post} editMode={false}/>
                            ))
                        }
                    </>
                    )}
                </div>
            </div>
        </>
    )
}

export default UserPage