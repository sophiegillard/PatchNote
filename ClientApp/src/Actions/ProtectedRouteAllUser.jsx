import { useAuthUser } from "react-auth-kit";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteAllUser = () => {
    const auth = useAuthUser();

    const [users, setUsers] = useState(
        auth().typeUtilisateur != null ? true : null
    );

    return users ? <Outlet /> : <Navigate to="/" />;
};
