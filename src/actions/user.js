import axios from "axios"
import { setUser, setList, logOut } from "../reducers/userRed"
import { setPostsList } from "../reducers/userRed"



export const registration = async (email, password, name, role, hight, countries, birthday, address) => {

    try {
        const response = await axios.post("https://microbloggerplatformrm.herokuapp.com/api/auth/registration", {
            email,
            password,
            name,
            role,
            hight,
            countries,
            birthday,
            address
        })

        window.M.toast({ html: response.data.message })

    } catch (error) {
        window.M.toast({ html: error.response.data.message })
    }

}

export const Auth = (page) => {
    return async dispatch => {
        try {
            const response = await axios.get(`https://microbloggerplatformrm.herokuapp.com/api/auth/auth?page=${page}&limit=3`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })

            console.log("Auth",response.data)

            dispatch(setUser(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}


export const login = (email, password , page) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/auth/login/?page=${page}&limit=3`, {
                email, password
            })

              dispatch(setList(response.data))
              
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}

// постараися зайти через Auth


export const Update = (name, role, currentId, id, page, search) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/auth/update/?page=${page}&limit=3`, {
                name, role, currentId, id, search
            })
            window.M.toast({ html: response.data.message })
            dispatch(setList(response.data))
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}



export const delListItem = (id, currentId, page, search) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/auth/delItem/?page=${page}&limit=3`, {
                id, currentId, search
            })

            window.M.toast({ html: response.data.message })
            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            alert(error)
        }
    }
}









export const ListUser = (page) => {

    return async dispatch => {

        try {
            const response = await axios.get(`https://microbloggerplatformrm.herokuapp.com/api/auth/users?page=${page}&limit=3`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })

            dispatch(setList(response.data))

            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}



export const DeleteUser = () => {
    return async dispatch => {
        try {
            const response = await axios.delete("https://microbloggerplatformrm.herokuapp.com/api/auth/delete", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            })
            dispatch(logOut(response.data.user))
            window.M.toast({ html: response.data.message })
            localStorage.setItem("token", response.data.token)

        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}



export const update = (id, name, page) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/auth/updateName?page=${page}&limit=3`, {
                id, name
            })

            dispatch(setUser(response.data))

            window.M.toast({ html: response.data.message })
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}



export const Search = (value, state, id, page) => {
    return async dispatch => {
        try {
            const response = await axios.post(`https://microbloggerplatformrm.herokuapp.com/api/auth/search?page=${page}&limit=3`, {
                value, state, id
            })

            if (state === "list") {
                dispatch(setList(response.data))
            } if (state === "posts") {
                dispatch(setPostsList(response.data))
            }

            window.M.toast({ html: response.data.message })
            localStorage.setItem("token", response.data.token)
        } catch (error) {
            localStorage.removeItem("token")
        }
    }
}






