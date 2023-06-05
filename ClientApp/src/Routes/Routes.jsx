import { useRoutes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { Home } from "../Pages/Home.jsx";
import { RequireAuth } from "react-auth-kit";
import { ProtectedRouteAdmin } from "../Actions/ProtectedRouteAdmin";
import { ProtectedRouteCustomer } from "../Actions/ProtectedRouteCustomer.jsx";
import { Mailbox } from "../Pages/AdminPages/Mailbox/Mailbox.jsx";
import { LeaveMessage } from "../Pages/CustomerPages/LeaveMessage.jsx";
import { PatchNoteHandler } from "../Pages/AdminPages/Article/PatchNoteHandler.jsx";
import { NewsletterHandler } from "../Pages/AdminPages/Newsletter/NewsletterHandler.jsx";
import { AddArticle } from "../Pages/AdminPages/Article/AddArticle";
import { IndiviualArticle } from "../Pages/AdminPages/Article/IndiviualArticle.jsx";
import { UpdateArticle } from "../Pages/AdminPages/Article/UpdateArticle.jsx";
import { UpdateNewsletter } from "../Pages/AdminPages/Newsletter/UpdateNewsletter.jsx";
import { IndividualNewsletter } from "@/Pages/AdminPages/Newsletter/IndividualNewsletter.jsx";
import { ProtectedRouteAllUser } from "@/Actions/ProtectedRouteAllUser.jsx";

export const Routes = () => {
    let route = useRoutes([
        //Access to all users
        {
            path: "/login",
            element: <LoginPage />,
        },

        //Pages accessible by all users
        {
            path: "/",
            element: (
                <RequireAuth loginPath="/login">
                    <ProtectedRouteAllUser />
                </RequireAuth>
            ),
            children: [
                {
                    path: "/",
                    element: <Home />,
                },
            ],
        },

        //Pages accessibles by authorized customers (school admin)
        {
            path: "/",
            element: (
                <RequireAuth loginPath="/login">
                    <ProtectedRouteCustomer />
                </RequireAuth>
            ),
            children: [
                {
                    path: "contact",
                    element: <LeaveMessage />,
                },
            ],
        },

        //Pages accessibles by APSCHOOL staff
        {
            path: "/",
            element: (
                <RequireAuth loginPath="/login">
                    <ProtectedRouteAdmin />
                </RequireAuth>
            ),
            children: [
                {
                    path: "messagerie",
                    element: <Mailbox />,
                },
                {
                    path: "newsletter",
                    element: <NewsletterHandler />,
                },
                {
                    path: "/newsletter/:id",
                    element: <IndividualNewsletter />,
                },
                {
                    path: "/newsletter/update/:id",
                    element: <UpdateNewsletter />,
                },
                {
                    path: "patchNote",
                    element: <PatchNoteHandler />,
                },
                {
                    path: "/article/:id",
                    element: <IndiviualArticle />,
                },
                {
                    path: "/article/update/:id",
                    element: <UpdateArticle />,
                },
                {
                    path: "addArticle",
                    element: <AddArticle />,
                },
            ],
        },
    ]);

    return <>{route}</>;
};
