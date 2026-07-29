import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Prediction from "./pages/Prediction";
import Settings from "./pages/Settings";
import SalesReport from "./pages/SalesReport";
import InventoryReport from "./pages/InventoryReport";
import LowStock from "./pages/LowStock";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";


function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* =========================
                    LOGIN PAGE
                ========================= */}

                <Route
                    path="/login"
                    element={<Login />}
                />


                {/* =========================
                    PROTECTED LAYOUT
                ========================= */}

                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >

                    {/* Dashboard */}
                    <Route
                        index
                        element={<Dashboard />}
                    />

                    {/* Products */}
                    <Route
                        path="products"
                        element={<Products />}
                    />

                    {/* Analytics */}
                    <Route
                        path="analytics"
                        element={<Analytics />}
                    />

                    {/* Sales Report */}
                    <Route
                        path="sales-report"
                        element={<SalesReport />}
                    />

                    {/* Inventory Report */}
                    <Route
                        path="inventory-report"
                        element={<InventoryReport />}
                    />

                    {/* Prediction */}
                    <Route
                        path="prediction"
                        element={<Prediction />}
                    />

                    {/* Low Stock */}
                    <Route
                        path="low-stock"
                        element={<LowStock />}
                    />

                    {/* Settings */}
                    <Route
                        path="settings"
                        element={<Settings />}
                    />

                </Route>


                {/* =========================
                    INVALID ROUTE
                ========================= */}

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;