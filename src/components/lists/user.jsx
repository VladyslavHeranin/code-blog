import { useState } from "react"
import { useDispatch } from "react-redux"
import { delListItem } from "../../actions/user"
import { Update } from "../../actions/user"
import { followUser } from "../../actions/post"
import { unFollow } from "../../actions/post"


export const User = (props) => {
    const [reName, setReName] = useState({
        user: props.user.name,
        role: props.user.role
    })

    const user = props.user

    const searchResult = props.search === undefined ? [] : props.search;

    const changeUser = event => {
        setReName({
            ...reName, [event.target.name]: event.target.value
        })
    }

    const dispatch = useDispatch()

    const currentUser = user._id === props.current.id

    const unique = (arr) => {
        let result = [];

        for (let str of arr) {
            if (!result.includes(str)) {
                result.push(str);
            }
        }

        return result;
    }


    const arr = unique(props.current.subscribe)


    const check = (arr) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === user._id) {
                return true;
            }
        }
        return false;
    }


    const volid = () => {
        dispatch(delListItem(user._id, props.current.id, props.page, searchResult))
        props.delItem(user._id)
    }


    const changeUserButton = () => {
        dispatch(Update(reName.user, reName.role, props.current.email, user._id, props.page, searchResult))
    }



    return <div className="card">
        <div className="card-content">

            {props.current.role === "admin" && <h5 >  {user.role}</h5>}
            <h2 className="width__name">{user.name}</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quis, asperiores ipsum exercitationem omnis
                libero a voluptate aliquam quae, eligendi eos quibusdam sit fuga nam, officiis
                est laboriosam. Modi, laborum.
            </p>
            <ul>
                <li className="width__name" ><h5>email: {user.email}</h5></li>

                {props.current.role === "admin"
                    &&
                    <div>
                        {user.countries === "" || <li className="width__name"><h5 >countrie: {user.countries}</h5></li>}
                        {user.address === "" || <li className="width__name"><h5 >address: {user.address}</h5></li>}
                        {user.birthday === "" || <li className="width__name"><h5 >birthday: {user.birthday}</h5></li>}
                        {user.followers.length === 0 || <li><h5>followers:  {user.followers.length}</h5></li>}
                    </div>
                }
            </ul>

        </div>

        <div className="card-content">


            {currentUser ? <button className="waves-effect waves-light btn activator ">More detail</button> :
                <span>
                    <button className="waves-effect waves-light btn activator">More detail</button>
                    {check(arr) ? <span>   <button className="grey btn" onClick={() => dispatch(unFollow(user._id, props.page, props.current.id, searchResult))} >nsubscribe</button> </span> :
                        <span>  <button className="green btn" onClick={() => dispatch(followUser(user._id, props.page, props.current.id, searchResult))} > Subscribe </button>  </span>
                    }</span>}
        </div>


        <div className="card-reveal">

            <div className="card-title grey-text text-darken-4">close</div>

            {props.current.role === "admin"
                &&
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

                        <h5>Role user</h5>

                        <select

                            className="browser-default"
                            onChange={changeUser}
                            name="role">
                            <option defaultValue={user.role} disabled selected>role user</option>
                            <option value="admin">admin</option>
                            <option value="User">User</option>

                        </select>

                    </div>
                    <div className="card-content">
                        <button className="waves-effect waves-light btn activator" onClick={changeUserButton}>Update</button>
                    </div>

                    <div className="card-content">
                        {currentUser || <div>
                            <div className="card-content">
                                <h3>Delete user</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quis, asperiores ipsum exercitationem omnis
                                    libero a voluptate aliquam quae, eligendi eos quibusdam sit fuga nam, officiis
                                    est laboriosam. Modi, laborum.
                                </p>
                            </div>
                            <button className="waves-effect red btn activator" onClick={volid}>Delete</button>
                        </div>}

                    </div>
                </div>
            }

            <div className="row">
                <div className="card">
                    <div className="card-content">
                        <h3>Users Posts</h3>


                        {user.postsId.length !== 0 ? <div>
                            {user.postsId.map((group, id) => {
                                return <div key={id} >
                                    <h2 className="width__name">{group.name}</h2>
                                    <h5 className="width__name">{group.topik}</h5>
                                    <p className="width__name">{group.discription}</p>

                                    <h6>the author of this article has an email <span className="blue-text">{group.user}</span> you can subscribe to it and read his publications</h6>

                                </div>

                            })}</div> :
                            <div> {user.name} did not posts</div>}
                    </div>
                </div>
            </div>
        </div>
    </div >
}


