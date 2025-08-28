import { NavLink, Outlet } from "react-router-dom";

function Layout() {

    return (
        <>
            <NavLink to="/auth">Login/registration</NavLink>

            <Outlet />
        </>
    );
}

export default Layout
