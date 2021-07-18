import React, { useState } from "react"
import { registration } from "../../actions/user"
import { Countries } from "./countries"


export const Registration = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
        name: "",
        role: "",
        hight: "",
        countries: "",
        birthday: "",
        address: ""

    })

    const changeHandler = event => {

        setForm({
            ...form, [event.target.name]: event.target.value
        })

    }


  
    console.log("form",  ((form.email !== "")&&(form.password !=="")&&(form.name !=="")) || "ok")

    return (
        <div className="row">
            <div className="col s12 offset-s0">
                <h1>Registartion</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                    
                        <div>

                            <div className="input-field ">
                            <h3 className="input">email</h3>
                                <input
                                    placeholder="email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler}
                                />
                            </div>


                            <div className="input-field ">
                             <h3 className="input">password</h3>
                                <input
                                    placeholder="password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                
                            </div>

                            {/* <div className="input-field ">
                                <h3 className="input">role</h3>
                                <input
                                    placeholder="role"
                                    id="text"
                                    type="text"
                                    name="role"
                                    onChange={changeHandler}
                                />
                                
                            </div> */}



                            <div className="input-field ">
                                 <h3 className="input">name</h3>
                                <input
                                    placeholder="you name"
                                    id="text"
                                    type="text"
                                    name="name"
                                    onChange={changeHandler}
                                />      
                            </div>


                            <div className="input-field ">
                                 <h3 className="input">hight</h3>
                                <input
                                    placeholder="you hight"
                                    id="hight"
                                    type="number"
                                    name="hight"
                                    onChange={changeHandler}
                                />
                                
                            </div>


                            <div className="input-field ">
                                 <h3 className="input">address</h3>
                                <input
                                    placeholder="you address"
                                    id="address"
                                    type="text"
                                    name="address"
                                    onChange={changeHandler}
                                />
                               
                            </div>


                            <div className="input-field ">
                                 <h3 className="input">birthday</h3>
                                <input
                                    placeholder="birthday"
                                    id="birthday"
                                    type="date"
                                    name="birthday"
                                    onChange={changeHandler}
                                />
                              
                            </div>
                             <h3 className="input">countrie</h3>
                            <Countries changeHandler={changeHandler} />

                        </div>
                    </div>
                    <div className="card-action">
                    

                    {((form.email !== "")&&(form.password !=="")&&(form.name !=="")) ? <button
                            className="btn yellow"
                            onClick={() => {
                                registration(
                                    form.email,
                                    form.password,
                                    form.name,
                                    form.role,
                                    form.hight,
                                    form.countries,
                                    form.birthday,
                                    form.address
                                )

                            }}
                        >

                            Registration
                    </button> :<button
                            className="btn grey"
                            onClick={() =>      window.M.toast({ html: "filling in the field: e-mail, name, password" })}
                        >
                            Registration
                    </button>}
                      

                    </div>
                </div>
            </div>
        </div>
    )
}

