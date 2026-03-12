import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Custom from "./pages/Custom";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Checkout from "./pages/Checkout";
import Tracking from "./pages/Tracking";
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import RatingModal from "./components/RatingModal";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { OrderProvider } from "./context/OrderContext";

export default function App() {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const location = useLocation();

  // Show rating modal if url is /rating
  useEffect(() => {
    if (location.pathname === "/rating") {
      setIsRatingOpen(true);
    } else {
      setIsRatingOpen(false);
    }
  }, [location.pathname]);

  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <OrderProvider>
            <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/product/:id" element={<Product />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/rating" element={<Home />} /> {/* Just showing homepage underneath */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminHome />} />
          </Routes>
          <RatingModal isOpen={isRatingOpen} onClose={() => window.history.back()} />
          <Footer />
          </OrderProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}
