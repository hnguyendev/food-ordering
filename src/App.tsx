import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/Signup";
import Food from "./pages/Food";
import Drink from "./pages/Drink";
import Results from "./pages/Results";
import ResetPassword from "./pages/ResetPassword";
import NewPassword from "./pages/NewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "food",
        element: <Food />,
      },
      {
        path: "drink",
        element: <Drink />,
      },
      {
        path: "users",
        element: <Users />,
      },

      {
        path: "search",
        element: <Results />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "reset-password",
    element: <ResetPassword />,
  },
  {
    path: "new-password",
    element: <NewPassword />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        theme="light"
        position="bottom-center"
        toastOptions={{ duration: 2000 }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
