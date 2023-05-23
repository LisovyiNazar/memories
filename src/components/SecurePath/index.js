import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SecurePath = () => {
    const { authenticate } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (authenticate === false) {
            navigate('/auth')
        }
    }, [authenticate])
}

export default SecurePath