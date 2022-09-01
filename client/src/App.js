import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import { ItemProvider } from "./contexts/ItemContext";

import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Catalog from "./components/Catalog/Catalog";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { PrivateRoute, NonPrivateRoute } from "./components/common/RouteGuards";
import CreateItem from "./components/CreateItem/CreateItem";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <AuthProvider>
            <div id="box">
                <Header />
                <ItemProvider>
                    <main id="main-content">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalog" element={<Catalog />} />
                            <Route element={<NonPrivateRoute />} >
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Register />} />
                            </Route>
                            <Route element={<PrivateRoute />} >
                                <Route path="/create" element={<CreateItem />} />
                            </Route>
                            <Route path="/catalog/:itemId" element={<ItemDetails />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </ItemProvider>
            </div>
        </AuthProvider>
    );
}

export default App;
