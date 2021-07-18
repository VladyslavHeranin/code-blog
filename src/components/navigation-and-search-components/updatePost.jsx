import { Post } from "../lists/post"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Auth } from "../../actions/user"
import { NavCreatePost } from "../navigation-and-search-components/navCreatePost"
import { NavUpdate } from "../navigation-and-search-components/navUpdate"
import { NavUsersList } from "../navigation-and-search-components/navUsersList"
import { NavPostList } from "../navigation-and-search-components/navPostList"


export const UpdatesPost = () => {

    const [current, setCurrent] = useState([])
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()
    const posts = useSelector(state => state.user.currentUser.posts)
    const user = useSelector(state => state.user.currentUser.user)


    const disableButton = Math.ceil(user.lenght / 3)

    useEffect(() => {
        setCurrent([...current, ...posts])
        dispatch(Auth(page))
    }, [page])


    const scrolleHendler = () => {
        setPage(prevPage => prevPage + 1)
    }

    return <div>

        <NavUpdate page={page} />

        <NavUsersList />

        <NavPostList />

        <NavCreatePost page={page} />

        {current.map((group, id) => { return <Post key={id} group={group} /> })}

        {disableButton >= page
            ?
            <button className="button" onClick={() => scrolleHendler()}> Load More  </button>
            :
            <div className="buttonNotActive" onClick={() => window.M.toast({ html: "These are all posts" })}>These are all posts</div>}
    </div >
}