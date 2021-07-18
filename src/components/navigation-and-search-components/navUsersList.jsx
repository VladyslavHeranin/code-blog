import { useDispatch } from "react-redux"
import { ListUser } from "../../actions/user"


export const NavUsersList = () => {


    const dispatch = useDispatch()

    return (
        <div className="card" >
            <div className="card-content">

                <h2>User List</h2>
                <h5>
                    here are all the users of this social network, you can find
                    a person by search, subscribe to him, read his posts rate his
                    robot
                   </h5>

            </div>
            <div className="card-content">
                <button className="waves-effect yellow btn activator black-text" onClick={() => dispatch(ListUser())} > OPEN </button>

            </div>
        </div>
    )
}