// import React from "react"
// import {Switch , Route , Redirect} from "react-router-dom"
// import {LinksPages} from  "./pages/LinksPages"
// import {CreatePages} from  "./pages/CreatePages"
// import {DetailPages} from  "./pages/DetailPages"
// import {AuthPage} from  "./pages/AuthPage"

// export const useRoutes = isAuthenticated => {
  
//     if(isAuthenticated){
//         return (
//             <Switch>
//                 <Route  path="/links"  exact>
//                    <LinksPages/>
//                 </Route>
//                 <Route  path="/create"  exact>
//                    <CreatePages/>
//                 </Route>
//                 <Route  path="/detail:id" >
//                    <DetailPages/>
//                 </Route>
//                 <Redirect to="/create"  />
//             </Switch>
//         )
//     }
    

//     return(
//           <Switch>
//               <Route  path="/"  exact>
//                    <AuthPage/>
//                 </Route>
//                 <Redirect to="/"  />
//          </Switch>
//     )
// }