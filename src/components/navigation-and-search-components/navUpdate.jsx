import { React } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { update } from "../../actions/user"
import { DeleteUser } from "../../actions/user"


export const NavUpdate = (props) => {
    const [reName, setReName] = useState({
        user: "",
    })


    const changeUser = event => {
        setReName({
            ...reName, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser.user)

    const updateName = () => {
        dispatch(update(user.id, reName.user, props.page))
    }


    return <div className="card">
        <div className="card-content">
            <div className="col s12 m6">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Welcome {user.name}</span>

                        {user.role === "admin" ?
                            <div> <h4> You have administrator rights for this application</h4>
                                <p>This is your working page and you have moderator rights, please deal
                                with the robot in good faith, and do not forget that your actions
                                     entail consequences</p></div>
                            :
                            <div><h4>Create your own groups communicate and spend time with interes</h4>
                                <p>This is your personal page, you can share your thoughts here and see what
                                other people are offering, we ask you to follow the rules of decency, in
                                order to avoid conflict situations, in case of multiple violations of the
                                      rules, delete your account,</p></div>}
                    </div>
                </div>
            </div>
        </div>

        <div className="card-content">
            <button className="waves-effect waves-light btn activator ">More detail</button>
        </div>
        <div className="card-reveal">
            <span className="card-title grey-text text-darken-4"><i className="right">close</i></span>
            <div className="row">
                <div className="card-content">
                    <div className="row">
                        <div className="card-content">
                            <h3>Update user</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quis, asperiores ipsum exercitationem omnis
                            libero a voluptate aliquam quae, eligendi eos quibusdam sit fuga nam, officiis
                            est laboriosam. Modi, laborum.
                    </p>
                            <h5>Update name</h5>
                            <div className="input-field ">
                                <input
                                    id="Update user"
                                    type="text"
                                    name="user"
                                    onChange={changeUser}
                                />
                                <label htmlFor="password">Update name</label>
                            </div>

                        </div>
                        <div className="card-content">
                            <button className="waves-effect waves-light btn activator"
                                onClick={updateName}
                            >Update</button>
                        </div>
                        <div className="card-content">
                            <h3>Delete user</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quis, asperiores ipsum exercitationem omnis
                            libero a voluptate aliquam quae, eligendi eos quibusdam sit fuga nam, officiis
                            est laboriosam. Modi, laborum.
                    </p>
                        </div>
                        <div className="card-content">
                            <button className="waves-effect red btn activator" onClick={() => dispatch(DeleteUser())} >Delete</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

}

