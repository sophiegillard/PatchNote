import {useAuthUser} from "react-auth-kit";
import {useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRouteAdmin = () => {
    const auth = useAuthUser();

    const [admin, setAdmin] = useState(auth().typeUtilisateur === 9  ?true:null);

    return admin ? <Outlet /> : <Navigate to="/" />;
}