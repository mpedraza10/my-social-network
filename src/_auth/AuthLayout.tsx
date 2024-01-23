// React router dom imports
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
	// We use the outlet to render either components depending on which pages
	// are inside the auth layout
	const isAuthenticated = false;

	return (
		<>
			{isAuthenticated ? (
				<Navigate to="/" />
			) : (
				<section>
					<Outlet />
				</section>
			)}
		</>
	);
};

export default AuthLayout;
