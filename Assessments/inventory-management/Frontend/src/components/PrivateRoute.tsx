import { useSelector } from "react-redux"
import { rootState } from "../store/store"
import { protectedRotesPropsTypes } from "../types/components-props-types/protectedRoutesPropsTypes"
import { useNavigate } from "react-router"
import { useEffect } from "react"


const PrivateRoute = ({page, allowedRoles}:protectedRotesPropsTypes) => {

   const {userDetails} = useSelector((state:rootState)=>state.auth)

   const navigate = useNavigate()

   if(userDetails && allowedRoles.includes(userDetails.role)){
    return (
        page
      )
   }else{
    useEffect(()=>{navigate('/')},[])
   }

  
}

export default PrivateRoute