import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createDir } from "../../actions/post"



export const NavCreatePost = (props) => {
    const [groupInf, setGroupInf] = useState({
        name: "",
        topik: "",
        discription: ""
    })

    const createGroupInf = (event) => {
        setGroupInf({
            ...groupInf, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    const user = useSelector(state => state.user.currentUser.user)

    const createGroup = () => {
        dispatch(createDir(user.id, groupInf.name, groupInf.topik, groupInf.discription, props.page))
    }

    return <div className="card blue-grey darken-1 white-text">
        <div className="card-content "  >
            <h2>Rules for creating</h2>
            <h5>Here you can find people who are interested in your problems, if your social circle is not great then you can start communicating with people here virtually through posts</h5>
        </div>
        <div className="card-content">
            <h2>Why create posts?</h2>
            <h5>Your post can be seen by hundreds of people, rate it and add to your news feed, and you can also track all topics of interest to you</h5>
        </div>
        <div className="card-content">
            <h2>Information exchange</h2>
            <h5>A person who subscribes more than 1000 users will receive a golden button from Micro-blogging platforms, not a bad prize right?</h5>
        </div>
        <div className="card-content">
            <button className="waves-effect waves-light btn activator ">CREATE GROUP</button>

        </div>
        <div className="card-reveal">
            <span className="card-title grey-text text-darken-4"><i className="right">close</i></span>
            <div className="row">
                <div className="col s12 offset-s0">
                    <h1>Create Group</h1>
                    <div className="card blue darken-1">
                        <div className="card-content white-text">
                            <div>

                                <div className="input-field ">
                                      <h3 className="input">post name</h3>
                                    <input
                                        placeholder="post name"
                                        id="name"
                                        type="text"
                                        name="name"
                                        onChange={createGroupInf}
                                    />
                                   
                                </div>


                                <div className="input-field ">
                                <h3 className="input">topik</h3>
                                    <input
                                        placeholder="topik"
                                        id="topik"
                                        type="text"
                                        name="topik"
                                        onChange={createGroupInf}
                                    />
                                 
                                </div>
                                <div className="input-field">
                                 <h3 className="input">description</h3>
                                    <textarea id="textarea1"
                                        className="materialize-textarea"
                                        name="discription"
                                        id="discription"
                                        onChange={createGroupInf}
                                        placeholder="discription">
                                    </textarea>
                               
                                </div>

                            </div>
                        </div>

                     
                       {((groupInf.name !== "")&&(groupInf.topik !=="")&&(groupInf.discription !=="")) ?    <div className="card-action">
                            <button
                                className="btn yellow"
                                onClick={() => createGroup()}
                            >
                                ADD
                            </button>

                        </div>: 
                        <div className="card-action">
                            <button
                                className="btn grey"
                                onClick={() =>  window.M.toast({ html: "filling in the field: name, topik, discription" }) }
                            >
                                ADD
                    </button>

                        </div>
                        }
             
                     
                    </div>
                </div>
            </div>
        </div>
    </div>
}