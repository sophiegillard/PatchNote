import { useAuthUser } from "react-auth-kit";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteAdmin = () => {
    const auth = useAuthUser();

    const [admin, setAdmin] = useState(
        auth().typeUtilisateur === 2 ? true : null
    );

    return admin ? <Outlet /> : <Navigate to="/" />;
};
