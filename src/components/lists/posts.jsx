
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { Auth } from "../../actions/user"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Post } from "./post"
import { Input } from "../navigation-and-search-components/input"
import { PostsList } from "../../actions/post"


export const Posts = () => {

    const [valueInp, setValInp] = useState('')
    const [current, setCurrent] = useState([])
    const [page, setPage] = useState(1)

    const user = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(PostsList(page))
        setCurrent([...current, ...user.posts])
    }, [page])

    console.log("current" , current , "page" , page , "user.posts" ,  user.posts)

    const scrolleHendler = () => {
        setPage(prevPage => prevPage + 1)
    }

    return (
        <div className="card" >

            <NavLink to="/login"><button className="close_button" onClick={() => dispatch(Auth())}> &#8592; </button></NavLink>

            <Input setValInp={setValInp} valueInp={valueInp} page={page} setCurrent={setCurrent} />

            {user.search.map((group, id) => { return <Post key={id} group={group} /> })}

            {user.search.length === 0 || <div className="search_results"> search results {user.search.length} posts </div>}

            {current.map((group, id) => { return <Post key={id} group={group} /> })}

            {/* {user.posts.map((group, id) => { return <Post key={id} group={group} /> })} */}

            {user.postsAll >= page
                ?
                <button className="button" onClick={() => scrolleHendler()}> Load More  </button>
                :
                <div className="buttonNotActive" onClick={() => window.M.toast({ html: "These are all posts" })}>These are all posts</div>}
        </div>
    )
}