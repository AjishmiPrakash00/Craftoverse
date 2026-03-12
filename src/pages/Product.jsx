import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingCart, Package } from "lucide-react";
import sparkleIcon from "../assets/sparkle.svg";
import { useCart } from "../context/CartContext";
import { useProduct } from "../context/ProductContext";

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { products: allProducts } = useProduct();

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);
    const [showError, setShowError] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    // Find the product based on ID in URL
    const product = useMemo(() => {
        return allProducts.find((p) => p.id === parseInt(id));
    }, [id, allProducts]);

    // Make sure we have a valid images array locally
    const productImages = useMemo(() => {
        if (!product) return [];
        return product.images && product.images.length > 0 
               ? product.images 
               : [{ url: product.image || "https://via.placeholder.com/500", caption: "Default Image" }];
    }, [product]);

    // Find 4 random products for "You May Also Like"
    const suggestedProducts = useMemo(() => {
        return [...allProducts]
            .filter((p) => p.id !== parseInt(id))
            .sort(() => 0.5 - Math.random())
            .slice(0, 4);
    }, [id, allProducts]);

    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        setSelectedSize(null);
        setShowError(false);
        setActiveImageIndex(0);
    }, [id]);

    const handleAddToCart = () => {
        if (!selectedSize) {
            setShowError(true);
            return;
        }
        setShowError(false);
        
        // Ensure legacy format matches when adding to cart
        const cartProduct = { ...product, image: productImages[0].url };
        addToCart(cartProduct, selectedSize, quantity);
        navigate("/cart");
    };

    if (!product) {
        return (
            <div className="section">
                <h2>Product not found</h2>
                <button className="btn" onClick={() => navigate("/catalogue")}>
                    Return to Catalogue
                </button>
            </div>
        );
    }

    return (
        <div className="product-page">
            {/* Top Navigation */}
            <div className="product-nav">
                <button className="back-btn" onClick={() => navigate("/catalogue")}>
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>

            <div className="product-main-container">
                {/* Left Side: Product Image Gallery */}
                <div className="product-image-container" style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ position: "relative" }}>
                        <img src={productImages[activeImageIndex].url} alt={product.title} className="product-main-img" />
                        {product.badge && <span className="product-main-badge">{product.badge}</span>}
                    </div>
                    {productImages[activeImageIndex].caption && (
                        <p style={{ textAlign: "center", fontStyle: "italic", color: "#666", margin: "0" }}>
                            {productImages[activeImageIndex].caption}
                        </p>
                    )}
                    
                    {/* Render thumbnails if multiple images exist */}
                    {productImages.length > 1 && (
                        <div style={{ display: "flex", gap: "10px", overflowX: "auto", padding: "5px 0" }}>
                            {productImages.map((img, idx) => (
                                <img 
                                    key={idx} 
                                    src={img.url} 
                                    alt={`Thumbnail ${idx}`} 
                                    onClick={() => setActiveImageIndex(idx)}
                                    style={{ 
                                        width: "80px", 
                                        height: "80px", 
                                        objectFit: "cover", 
                                        borderRadius: "8px", 
                                        cursor: "pointer", 
                                        border: activeImageIndex === idx ? "2px solid #2f9e91" : "2px solid transparent",
                                        opacity: activeImageIndex === idx ? 1 : 0.6,
                                        transition: "all 0.2s ease-in-out"
                                    }} 
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Side: Product Details */}
                <div className="product-details-container">
                    <p className="product-category-label">{product.category}</p>
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-price">₹{product.price}</p>

                    <p className="product-description">
                        {product.category === "stickers"
                            ? "Set of 10 adorable stickers perfect for decorating your laptop, journal, or water bottle. Waterproof and weather-resistant."
                            : "High-quality poster printed on 300GSM premium art paper with a matte finish. Perfect for giving your room a new vibe."}
                    </p>

                    {/* Size Selection */}
                    <div className="product-options">
                        <h4>Select Size</h4>
                        <div className="size-selector">
                            {product.category === "stickers" ? (
                                <>
                                    <button
                                        className={`size-btn ${selectedSize === "3x3 inch" ? "active" : ""}`}
                                        onClick={() => setSelectedSize("3x3 inch")}
                                    >
                                        3x3 inch
                                    </button>
                                    <button
                                        className={`size-btn ${selectedSize === "4x4 inch" ? "active" : ""}`}
                                        onClick={() => setSelectedSize("4x4 inch")}
                                    >
                                        4x4 inch
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className={`size-btn ${selectedSize === "A4" ? "active" : ""}`}
                                        onClick={() => setSelectedSize("A4")}
                                    >
                                        A4
                                    </button>
                                    <button
                                        className={`size-btn ${selectedSize === "A3" ? "active" : ""}`}
                                        onClick={() => setSelectedSize("A3")}
                                    >
                                        A3
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quantity Selection */}
                    <div className="product-options">
                        <h4>Quantity</h4>
                        <div className="quantity-selector">
                            <button className="qty-btn" onClick={handleDecrease}>
                                <Minus size={16} />
                            </button>
                            <span className="qty-value">{quantity}</span>
                            <button className="qty-btn" onClick={handleIncrease}>
                                <Plus size={16} />
                            </button>
                        </div>
                        <p className="stock-status">✓ In Stock</p>
                    </div>

                    {/* Add to Cart Button */}
                    <div className="add-to-cart-container">
                        {showError && <p className="size-error">Please select a size before adding to cart.</p>}
                        <button className="add-to-cart-btn-large" onClick={handleAddToCart}>
                            <ShoppingCart size={20} />
                            Add to Cart
                        </button>
                    </div>

                    {/* Features */}
                    <div className="product-features">
                        <div className="feature-item">
                            <Package size={20} className="feature-icon" />
                            <div className="feature-text">
                                <span className="feature-title">Premium Quality</span>
                                <span className="feature-subtitle">High-quality materials that last long</span>
                            </div>
                        </div>
                        <div className="feature-item">
                            <img src={sparkleIcon} alt="Sparkle" className="feature-icon" style={{ width: 20, height: 20 }} />
                            <div className="feature-text">
                                <span className="feature-title">Fast Delivery</span>
                                <span className="feature-subtitle">Delivered within 5-7 business days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Suggested Products Section */}
            <div className="suggested-products-section">
                <h2>You May Also Like</h2>
                <div className="grid-4 suggested-grid">
                    {suggestedProducts.map((p) => {
                        const sugImg = p.images && p.images.length > 0 ? p.images[0].url : (p.image || "https://via.placeholder.com/500");
                        return (
                        <Link to={`/product/${p.id}`} key={p.id} className="product-card">
                            <div className="product-image">
                                <img src={sugImg} alt={p.title} />
                            </div>
                            <h3>{p.title}</h3>
                            <p className="price">₹{p.price}</p>
                        </Link>
                    )})}
                </div>
            </div>
        </div>
    );
}
