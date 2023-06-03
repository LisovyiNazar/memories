import React, { useEffect, useState } from 'react'
import Post from './Post'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../../store/actions/post.actions'
import './index.scss'

const Posts = () => {
    const dispath = useDispatch()
    const [page, setPage] = useState(1)

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispath(getPosts(page))
    }, [dispath, page])

    const posts = useSelector(state => state.posts)
    const pagination = useSelector(state => state.pagination)

    const pageButtons = Array.apply(null, Array(pagination.pageCount))
        .map((y, i) =>  i + 1)
        .map((pageNumber) => (
            <button 
                type='button' 
                key={pageNumber} 
                className={pageNumber === page ? 'active' : ''}
                onClick={() => setPage(pageNumber)}
            >
                {pageNumber}
            </button>
        ))

    const increasePage = () => {
        if (page < pageButtons.length) setPage(page + 1)
    }

    const decreasePage = () => {
        if (page > 1) setPage(page - 1)
    }

    return (
        !posts.length ? (
            <></>
        ) : (
            <>
                <div className='posts-wrapper'>
                    {
                        posts.map(post => (
                            <Post key={post._id} post={post} editMode={user?.type === 'admin' ? true : false} />
                        ))
                    }
                    <div className='pagination-wrapper'>
                        <button 
                            type='button' 
                            className='page-prev-button'
                            onClick={decreasePage}
                        >
                            <IoIosArrowBack />
                        </button>
                        <div className='page-numbers-wrapper'>
                            { pageButtons }
                        </div>
                        <div className='page-next-button-wrapper'>
                            <button 
                                type='button' 
                                className='page-next-button'
                                onClick={increasePage}
                            >
                                <IoIosArrowForward />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    )
}

export default Posts