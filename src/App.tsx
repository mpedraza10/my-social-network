// React router imports
import { Route, Routes } from "react-router-dom";

// Shadcn components
import { Toaster } from "./components/ui/toaster";

// Components
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import { Home } from "./_root/pages/index";

// Styles import
import "./globals.css";

const App = () => {
	return (
		<main className="flex h-screen">
			<Routes>
				{/* Public Routes */}
				<Route element={<AuthLayout />}>
					<Route path="/sign-in" element={<SigninForm />} />
					<Route path="/sign-up" element={<SignupForm />} />
				</Route>

				{/* Private Routes */}
				<Route element={<RootLayout />}>
					<Route path="/" element={<Home />} />
				</Route>
			</Routes>

			<Toaster />
		</main>
	);
};

export default App;
