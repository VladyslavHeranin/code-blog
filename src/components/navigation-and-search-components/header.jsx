import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logOut } from "../../reducers/userRed"


export const Header = () => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()
    return <div className="card">
        <div className="card-content nav-wrapper blue-grey darken-1">

            <nav className="header__nav blue-grey darken-1">
                <div > <span className="logo">Micro-blog platform</span></div>

                {!isAuth && <div className="button__nav">
                    <button className="btn"><NavLink to="/login">Log in</NavLink></button>
                    <button className="btn"><NavLink to="/registartion">Registartion</NavLink></button>
                </div>
                }

                {isAuth && <div className="button__nav">
                    <button className="btn" onClick={() => dispatch(logOut())} >Log out</button>
                </div>}
            </nav>
        </div>
    </div>
}