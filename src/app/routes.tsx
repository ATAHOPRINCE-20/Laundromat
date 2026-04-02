import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import Pickup from "./components/Pickup";
import Delivery from "./components/Delivery";
import Customer from "./components/Customer";
import Staff from "./components/Staff";
import Settings from "./components/Settings";
import Expenses from "./components/Expenses";
import Reports from "./components/Reports";
import CustomerPortal from "./components/customer/CustomerPortal";
import CustomerDashboard from "./components/customer/CustomerDashboard";
import PlaceOrder from "./components/customer/PlaceOrder";
import TrackOrders from "./components/customer/TrackOrders";
import RequestPickup from "./components/customer/RequestPickup";
import Landing from "./components/auth/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

// Initialize demo accounts
const initializeDemoAccounts = () => {
  const users = localStorage.getItem('users');
  if (!users) {
    const demoUsers = [
      {
        id: '1',
        name: 'Admin User',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        name: 'Client User',
        email: 'client@demo.com',
        password: 'client123',
        role: 'client',
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
};

initializeDemoAccounts();

export const router = createBrowserRouter([
  {
    path: "/landing",
    Component: Landing,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "orders", Component: Orders },
      { path: "pickup", Component: Pickup },
      { path: "delivery", Component: Delivery },
      { path: "customer", Component: Customer },
      { path: "staff", Component: Staff },
      { path: "expenses", Component: Expenses },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "/customer-portal",
    Component: CustomerPortal,
    children: [
      { index: true, Component: CustomerDashboard },
      { path: "place-order", Component: PlaceOrder },
      { path: "track-orders", Component: TrackOrders },
      { path: "request-pickup", Component: RequestPickup },
    ],
  },
]);