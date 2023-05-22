import {useAuthUser} from "react-auth-kit";
import {useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

export const ProtectedRouteAllUser = () => {
    const auth = useAuthUser();

    const [users, setUsers] = useState(auth().typeUtilisateur <= 9 &&  auth().typeUtilisateur >= 6 ? true:null);

    return users ? <Outlet /> : <Navigate to="/" />;
}