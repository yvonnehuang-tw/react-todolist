import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
import TodoDemo from "./components/todo/TodoDemo";
import TableDemo from "./components/table/TableDemo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "todolist",
          element: <TodoDemo />,
        },
        {
          path: "table",
          element: <TableDemo />,
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
