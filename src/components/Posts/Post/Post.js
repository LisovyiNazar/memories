import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, likePost } from '../../../store/actions/post.actions'
import { PostForEditContext } from '../../../store/context/postForEdit.context'
import { AiTwotoneSetting, AiOutlineHeart } from 'react-icons/ai'
import moment from 'moment'
import './index.scss'

const Post = ({ post, editMode = true }) => {
    const dispath = useDispatch()
    
    const { user } = useSelector(state => state.auth)

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)

    const { setPostForEdit } = useContext(PostForEditContext)

    const deletePostHandler = (id) => {
        dispath(deletePost(id))
    }

    const openSettingsHandler = () => {
        setIsSettingsOpen(prev => !prev)
    }

    const likePostHandler = (id) => {
        dispath(likePost(id, user.id))
    }

    return (
        <div className='post-wrapper'>
            <div className='post-container'>
                <div className='img-container'>
                    <img 
                        className='post-image'
                        alt=''
                        src={post.selectedFile ? post.selectedFile : 'https://dizziness-and-balance.com/treatment/images/airplane.jpg'} 
                    />
                    <div className='settings-container'>
                        <div className='settings'>
                            {
                                editMode ? <AiTwotoneSetting onClick={() => openSettingsHandler()}/> : <></>
                            }
                            {
                                isSettingsOpen && (
                                    <>
                                        { user.type !== 'admin' && <button type='button' onClick={() => { setPostForEdit(post) }}>Edit</button>}
                                        <button type='button' onClick={() => { deletePostHandler(post._id) }}>Delete</button>
                                    </>
                                )
                            }
                            
                        </div>
                    </div>
                </div>
                <div className='info-container'>
                    <strong className='title'>{post.title}</strong>
                    <div className='message'>
                        <span>{post.message}</span>
                    </div>
                    <div className='tags'>{post.tags.map((tag, i) => <span key={`${tag}-${i}`}>#{tag} </span>)}</div>
                    <div className='post-actions'>
                        <div className='like-container'>
                            <AiOutlineHeart 
                                className='like'
                                onClick={() => likePostHandler(post._id)}
                            />
                            <div>{post.likeCount}</div>
                        </div>
                        <span>Created by @{ post.creator.nickName } {moment(post.createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post