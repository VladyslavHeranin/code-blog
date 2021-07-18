import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { User } from "./user"
import { Auth } from "../../actions/user"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { ListUser } from "../../actions/user"
import { Input } from "../navigation-and-search-components/input"


export const Users = () => {

    const [valueInp, setValInp] = useState("")
    const [current, setCurrent] = useState([])
    const [page, setPage] = useState(1)

    const value = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch()

 
  
  const scrolleHendler = () => {
        setPage(prevPage => prevPage  + 1)
    }



       useEffect(() => {
         dispatch(ListUser(page))
          setCurrent([...current, ...value.users])
    }, [page])


    const delItem = (user) => {
        setCurrent(current.filter(item => user !== item._id))
    }

    return (
        <div className="card" >
            <NavLink to="/login"><button className="close_button" onClick={() => dispatch(Auth())}> &#8592; </button></NavLink>

            <Input setValInp={setValInp} valueInp={valueInp} setPage={setPage} setCurrent={setCurrent} page={page} />

            {value.search.map((user, id) => <User user={user} delItem={delItem} current={value.user} key={id} page={page} search={value.search} />)}

            {value.search.length === 0 || <div className="search_results"> search results {value.search.length} account </div>}

            {current.map((user, id) => <User user={user} delItem={delItem} current={value.user} key={id} page={page} setPage={setPage} />)}

        {value.users.map((user, id) => <User user={user} delItem={delItem} current={value.user} key={id} page={page} setPage={setPage} />)}  

            {value.userAll > page
                ?
                <button className="button" onClick={() => scrolleHendler()}> Load More  </button>
                :
                <div className="buttonNotActive" onClick={() => window.M.toast({ html: "These are all users" })}>These are all users</div>}
        </div>
    )
}