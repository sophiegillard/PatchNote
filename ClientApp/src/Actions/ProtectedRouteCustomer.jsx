import { useAuthUser } from "react-auth-kit";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRouteCustomer = () => {
    const auth = useAuthUser();

    const [customer, setCustomer] = useState(
        auth().typeUtilisateur === 1 ? true : null
    );

    return customer ? <Outlet /> : <Navigate to="/" />;
};
