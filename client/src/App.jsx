import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import GamePage from "./Pages/GamePage";

const router = createBrowserRouter([
  { element: <HomePage />, path: "/" },
  { element: <GamePage />, path: "/game" },
  { element: <div>404</div>, path: "*" },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
