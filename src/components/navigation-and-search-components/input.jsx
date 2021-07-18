import { useDispatch, useSelector } from "react-redux"
import { Search } from "../../actions/user"

export const Input = (props) => {

    const dispatch = useDispatch()

    const isAuth = useSelector(state => state.user)

    const id = isAuth.currentUser.user.id

    const lists = () => {
        for (const key in isAuth) {
            if ((isAuth[key] === true) && (key !== "isAuth")) {
                return key
            }
        }
        return "isAuth"
    }


    return <div className="card">
        <div className="card-content">
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">


                            {lists() === "list" ? <h2>FIND A USER</h2> : <h2>FIND A POST</h2>}
                            <input id="text" type="text" className="validate" onChange={(event) => props.setValInp(event.target.value)} />
                        </div>
                    </div>
                </form>
            </div>
            {props.valueInp === ""
                ?
                <button className="waves-effect grey btn activator black-text" onClick={() => window.M.toast({ html: "Enter text" })}>Search</button>
                :
                <button className="waves-effect yellow btn activator black-text" onClick={() => {
                    dispatch(Search(props.valueInp, lists(), id, props.page))
                }}>Search</button>}
        </div>
    </div>
}