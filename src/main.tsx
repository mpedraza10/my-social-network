// React dom imports
import ReactDOM from "react-dom/client";

// React router dom imports
import { BrowserRouter } from "react-router-dom";

// Components
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
