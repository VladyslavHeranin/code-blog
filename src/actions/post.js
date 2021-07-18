import axios from 'axios'
import { setUser, setList, setPostsList } from "../reducers/userRed"


export function createDir(id, name, topik, discription, page) {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/post/createPosts?page=${page}&limit=3`, {
                id, name, topik, discription
            })
            dispatch(setUser(response.data))
            window.M.toast({ html: response.data.message })
            localStorage.setItem("token", response.data.token)

        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}




export function PostsList(page) {
    return async dispatch => {
        try {
            const response = await axios.get(`https://microbloggerplatformrm.herokuapp.com/api/post/postsList/?page=${page}&limit=3`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            dispatch(setPostsList(response.data))
            localStorage.setItem("token", response.data.token)
      
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}




export const followUser = (id, page, currentUserID, search) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/post/followUser?page=${page}&limit=3`, {
                id, currentUserID, search
            })

            window.M.toast({ html: response.data.message })
            dispatch(setList(response.data))
   
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}


export const unFollow = (id, page, currentUserID, search) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/post/unFollow?page=${page}&limit=3`, {
                id, currentUserID, search
            })

            dispatch(setList(response.data))
            window.M.toast({ html: response.data.message })

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}

