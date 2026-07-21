import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Analytics from "./pages/Analytics";
import Prediction from "./pages/Prediction";
import Settings from "./pages/Settings";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<Products />} />
                    <Route path="analytics" element={<Analytics />} />
                    <Route path="prediction" element={<Prediction />} />
                    <Route path="settings" element={<Settings/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;