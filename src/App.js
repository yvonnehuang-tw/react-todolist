import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Root from "./routes/Root";
import ErrorPage from "./ErrorPage";
// import TodoDemo from "./components/todo/TodoDemo";
// import TableDemo from "./components/table/TableDemo";

// function App() {
//   const router = createBrowserRouter([
//     {
//       path: "/",
//       element: <Root />,
//       errorElement: <ErrorPage />,
//       children: [
//         {
//           path: "todolist",
//           element: <TodoDemo />,
//         },
//         {
//           path: "table",
//           element: <TableDemo />,
//           errorElement: <div>Oops! There was an error.</div>,
//         },
//       ],
//     },
//   ]);

//   return (
//     <div className="App">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

// import TodoDemo from "./components/todo/TodoDemo";
// import TableDemo from "./components/table/TableDemo";
const TodoDemo = lazy(() => import("./components/todo/TodoDemo"));
const TableDemo = lazy(() => import("./components/table/TableDemo"));

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/todolist" element={<TodoDemo />} />
            <Route path="/table" element={<TableDemo />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
