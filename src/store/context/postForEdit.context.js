import React, { createContext, useState } from 'react'

export const PostForEditContext = createContext()

export const PostForEditProvider = ({ children }) => {
    const [postForEdit, setPostForEdit] = useState()

    return (
        <PostForEditContext.Provider value={{ postForEdit, setPostForEdit }}>
            {children}
        </PostForEditContext.Provider>
    )
}
