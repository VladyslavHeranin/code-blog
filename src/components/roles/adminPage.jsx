import { React } from "react"
import { useSelector } from "react-redux"
import { UpdatesPost } from "../navigation-and-search-components/updatePost"
import { Users } from "../lists/users"
import { Route, Switch } from "react-router-dom"
import { Posts } from "../lists/posts"


export const Navigation = () => {

    const List = useSelector(state => state.user.list)

    const PostsList = useSelector(state => state.user.posts)

    return (
        <div>{!PostsList ? !List ? <Switch>
            <Route exact path="/">
                <UpdatesPost />
            </Route>
        </Switch> :
            <Switch>
                <Users />
            </Switch> :
            <Switch>
                <Posts />
            </Switch>
        }
        </div>
    )
}