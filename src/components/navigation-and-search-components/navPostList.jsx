import { PostsList } from "../../actions/post"
import { useDispatch } from "react-redux"




export const NavPostList = () => {

    const dispatch = useDispatch()

    return (
        <div className="card" >
            <div className="card-content">

                <h2>Posts List</h2>
                <h5>
                    Here are all the posts this is a social network, you
                    can type a topic and see the suggestions, if there is
                    no post on this topic, you can be the first
                   </h5>

            </div>
            <div className="card-content">
                <button
                    className="waves-effect yellow btn activator black-text"
                    onClick={() => dispatch(PostsList(1))}
                >
                    OPEN
                    </button>

            </div>
        </div>
    )
}