// React dom imports
import ReactDOM from "react-dom/client";

// React router dom imports
import { BrowserRouter } from "react-router-dom";

// Contexts
import AuthProvider from "./context/AuthContext";
import { QueryProvider } from "./lib/react-query/QueryProvider";

// Components
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<QueryProvider>
			<AuthProvider>
				<App />
			</AuthProvider>
		</QueryProvider>
	</BrowserRouter>
);
