import { Outlet } from "react-router";

export default function Layout() {
    return (
        <>
            <header>ini header</header>
            <main>
                <Outlet />
            </main>
            <footer>ini footer</footer>
        </>
    );
}
