import './App.css';

// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Root from "./routes/Root";
// import ErrorPage from "./ErrorPage";
// import TodoDemo from "./components/todo/TodoDemo";
// import TableUseStateDemo from "./components/table/TableUseStateDemo";
// import TableUseReducerDemo from "./components/table/TableUseReducerDemo";

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
//           path: "table-use-state",
//           element: <TableUseStateDemo />,
//           errorElement: <div>Oops! There was an error.</div>,
//         },
//         {
//           path: "table-use-reducer",
//           element: <TableUseReducerDemo />,
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

import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Loading from './components/common/Loading';
import ErrorPage from './ErrorPage';
// import TodoDemo from "./components/todo/TodoDemo";
// import TableUseStateDemo from "./components/table/TableUseStateDemo";
const TodoDemo = lazy(() => import('./components/todo/TodoDemo'));
const TableUseStateDemo = lazy(() =>
  import('./components/table/TableUseStateDemo')
);
const TableUseReducerDemo = lazy(() =>
  import('./components/table/TableUseReducerDemo')
);

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/todolist" element={<TodoDemo />} />
            <Route path="/table-use-state" element={<TableUseStateDemo />} />
            <Route
              path="/table-use-reducer"
              element={<TableUseReducerDemo />}
            />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
