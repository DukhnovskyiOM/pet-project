import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth";
import { useEffect } from "react";


const RequireAuth = ({children}) => {
    const navigate = useNavigate()
    const {isAuth} = useAuth()

    useEffect(() => {
        if (!isAuth) {
          navigate("/");
        }
      }, [isAuth, navigate]);

      return children
}

export { RequireAuth }