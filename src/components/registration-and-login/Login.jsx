import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { login } from "../../actions/user"

export const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const changeHandler = event => {
        setForm({
            ...form, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    return (
        <div className="row">
            <div className="col s12 offset-s0">
                <h1>Log In</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>

                            <div className="input-field ">
                            <h3 className="input">Email</h3>
                                <input
                                    placeholder="Email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                               
                            </div>


                            <div className="input-field ">
                              <h3 className="input">Password</h3>
                                <input
                                    placeholder="password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                             
                            </div>

                        </div>
                    </div>
                    <div className="card-action">

                        {form.password.length < 6 ? <button
                            className=" btn greey "
                        >
                            OPEN
                    </button> :   <button
                            className=" btn yellow "
                            onClick={() => dispatch(login(form.email, form.password , 1))}
                        >
                           OPEN
                    </button>}
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

