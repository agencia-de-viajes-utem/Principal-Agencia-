import Header from "../Header";
import "./Layout.css";
function Layout({ children }) {
	return (
		<>
			<Header />
			<main className="main">{children}</main>
		</>
	);
}

export default Layout;
