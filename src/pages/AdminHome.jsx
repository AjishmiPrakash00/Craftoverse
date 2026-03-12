import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Package, DollarSign, LayoutDashboard, LogOut, ArrowLeft, Plus, Edit, Trash2, CheckCircle, X } from "lucide-react";
import { useProduct } from "../context/ProductContext";
import { useOrder } from "../context/OrderContext";

export default function AdminHome() {
    const navigate = useNavigate();
    const { products, addProduct, updateProduct, deleteProduct } = useProduct();
    const { orders, markOrderCompleted } = useOrder();
    const [activeTab, setActiveTab] = useState("dashboard"); // 'dashboard', 'products', 'form', 'orders'
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({ title: "", category: "stickers", price: "", style: "Cute", badge: "", images: [] });
    
    // States for adding a new image to the current form
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newImageCaption, setNewImageCaption] = useState("");

    useEffect(() => {
        const isAdmin = localStorage.getItem("adminAuth");
        if (!isAdmin) {
            navigate("/admin-login");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        navigate("/admin-login");
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title || "",
            category: product.category || "stickers",
            price: product.price || "",
            style: product.style || "Cute",
            badge: product.badge || "",
            images: product.images || (product.image ? [{url: product.image, caption: ""}] : []),
        });
        setNewImageUrl("");
        setNewImageCaption("");
        setActiveTab("form");
    };

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            deleteProduct(id);
        }
    };

    const handleAddImage = () => {
        if (newImageUrl.trim()) {
            setFormData(prev => ({
                ...prev,
                images: [...prev.images, { url: newImageUrl.trim(), caption: newImageCaption.trim() }]
            }));
            setNewImageUrl("");
            setNewImageCaption("");
        }
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // If there is an unsaved image in the input and the user submits, auto-add it
        let finalImages = [...formData.images];
        if (newImageUrl.trim()) {
            finalImages.push({ url: newImageUrl.trim(), caption: newImageCaption.trim() });
            setNewImageUrl("");
            setNewImageCaption("");
        }

        // Apply a fallback if no images exist
        if (finalImages.length === 0) {
            finalImages = [{ url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop", caption: "Fallback Image" }];
        }

        const payload = {
            title: formData.title,
            category: formData.category,
            price: Number(formData.price),
            style: formData.style,
            badge: formData.badge,
            images: finalImages,
        };
        
        // Remove legacy image properly if saving
        if (payload.image !== undefined) delete payload.image;

        if (editingProduct) {
            updateProduct(editingProduct.id, payload);
        } else {
            addProduct(payload);
        }
        setActiveTab("products");
        setEditingProduct(null);
        setFormData({ title: "", category: "stickers", price: "", style: "Cute", badge: "", images: [] });
    };

    return (
        <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto", minHeight: "calc(100vh - 80px)" }}>
            {/* Admin Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px", paddingBottom: "20px", borderBottom: "1px solid #eee" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <LayoutDashboard size={32} color="#2f9e91" />
                    <div>
                        <h1 style={{ margin: 0, color: "#1f3f3b" }}>Admin Dashboard</h1>
                        <p style={{ margin: "5px 0 0 0", color: "#666" }}>Welcome back, Craftoverse Administrator</p>
                    </div>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    {activeTab !== "dashboard" && (
                        <button
                            onClick={() => { setActiveTab("dashboard"); setEditingProduct(null); }}
                            style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", color: "#333", border: "1px solid #ddd", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", transition: "all 0.2s" }}
                        >
                            <ArrowLeft size={18} /> Back to Dashboard
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{ display: "flex", alignItems: "center", gap: "8px", background: "#fff5f5", color: "#e74c3c", border: "1px solid #ffdbdb", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", transition: "all 0.2s" }}
                    >
                        <LogOut size={18} /> Logout
                    </button>
                </div>
            </div>

            {activeTab === "dashboard" && (
                <>
                    {/* Stats Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "40px" }}>
                        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "20px" }}>
                            <div style={{ background: "#e0f2f1", padding: "15px", borderRadius: "12px" }}>
                                <DollarSign size={28} color="#2f9e91" />
                            </div>
                            <div>
                                <p style={{ margin: "0 0 5px 0", color: "#777", fontSize: "0.9rem", fontWeight: "600" }}>Total Revenue</p>
                                <h2 style={{ margin: 0, color: "#333", fontSize: "1.8rem" }}>₹42,500</h2>
                            </div>
                        </div>
                        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "20px" }}>
                            <div style={{ background: "#fff0f3", padding: "15px", borderRadius: "12px" }}>
                                <Package size={28} color="#f98ca4" />
                            </div>
                            <div>
                                <p style={{ margin: "0 0 5px 0", color: "#777", fontSize: "0.9rem", fontWeight: "600" }}>Active Products</p>
                                <h2 style={{ margin: 0, color: "#333", fontSize: "1.8rem" }}>{products.length}</h2>
                            </div>
                        </div>
                        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: "20px" }}>
                            <div style={{ background: "#e8f0fe", padding: "15px", borderRadius: "12px" }}>
                                <Users size={28} color="#4285f4" />
                            </div>
                            <div>
                                <p style={{ margin: "0 0 5px 0", color: "#777", fontSize: "0.9rem", fontWeight: "600" }}>Total Users</p>
                                <h2 style={{ margin: 0, color: "#333", fontSize: "1.8rem" }}>892</h2>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <h3 style={{ margin: "0 0 20px 0", color: "#1f3f3b" }}>Quick Actions</h3>
                        <div style={{ display: "flex", gap: "15px" }}>
                            <button onClick={() => setActiveTab("products")} style={{ background: "#2f9e91", color: "white", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>Manage Products</button>
                            <button onClick={() => setActiveTab("orders")} style={{ background: "white", color: "#2f9e91", border: "1px solid #2f9e91", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>View Pending Orders</button>
                            <button style={{ background: "white", color: "#333", border: "1px solid #ddd", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>System Settings</button>
                        </div>
                    </div>
                </>
            )}

            {activeTab === "products" && (
                <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                        <h2 style={{ margin: 0, color: "#1f3f3b" }}>Product Management</h2>
                        <button 
                            onClick={() => { setEditingProduct(null); setFormData({ title: "", category: "stickers", price: "", style: "Cute", badge: "", images: [] }); setActiveTab("form"); }}
                            style={{ display: "flex", alignItems: "center", gap: "8px", background: "#2f9e91", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
                        >
                            <Plus size={18} /> Add New Product
                        </button>
                    </div>
                    
                    <div style={{ overflowX: "auto" }}>
                        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                            <thead>
                                <tr style={{ borderBottom: "2px solid #eee" }}>
                                    <th style={{ padding: "15px 10px", color: "#666" }}>ID</th>
                                    <th style={{ padding: "15px 10px", color: "#666" }}>Image</th>
                                    <th style={{ padding: "15px 10px", color: "#666" }}>Title</th>
                                    <th style={{ padding: "15px 10px", color: "#666" }}>Category</th>
                                    <th style={{ padding: "15px 10px", color: "#666" }}>Price</th>
                                    <th style={{ padding: "15px 10px", color: "#666", textAlign: "right" }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) => {
                                    // Handle legacy single-image data for the thumbnail display robustly
                                    const primaryImage = p.images && p.images.length > 0 ? p.images[0].url : (p.image || "https://via.placeholder.com/50");

                                    return (
                                    <tr key={p.id} style={{ borderBottom: "1px solid #eee", transition: "background 0.2s" }}>
                                        <td style={{ padding: "15px 10px", color: "#333", fontWeight: "600" }}>#{p.id}</td>
                                        <td style={{ padding: "15px 10px" }}>
                                            <img src={primaryImage.startsWith("data:") || primaryImage.startsWith("http") || primaryImage.includes("/") ? primaryImage : "https://via.placeholder.com/50"} alt={p.title} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }} />
                                        </td>
                                        <td style={{ padding: "15px 10px", color: "#333" }}>{p.title}</td>
                                        <td style={{ padding: "15px 10px", color: "#666", textTransform: "capitalize" }}>{p.category}</td>
                                        <td style={{ padding: "15px 10px", color: "#2f9e91", fontWeight: "600" }}>₹{p.price}</td>
                                        <td style={{ padding: "15px 10px", textAlign: "right" }}>
                                            <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                                                <button onClick={() => handleEdit(p)} style={{ display: "flex", alignItems: "center", gap: "5px", background: "#f8f9fa", color: "#4285f4", border: "1px solid #e8eaed", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                                                    <Edit size={16} /> Edit
                                                </button>
                                                <button onClick={() => handleDelete(p.id)} style={{ display: "flex", alignItems: "center", gap: "5px", background: "#fff5f5", color: "#e74c3c", border: "1px solid #ffdbdb", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}>
                                                    <Trash2 size={16} /> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )})}
                                {products.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ padding: "30px", textAlign: "center", color: "#888" }}>
                                            No products found. Add your first product!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "form" && (
                <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", maxWidth: "800px", margin: "0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
                        <h2 style={{ margin: 0, color: "#1f3f3b" }}>{editingProduct ? "Edit Product" : "Add New Product"}</h2>
                        <button 
                            onClick={() => setActiveTab("products")}
                            style={{ display: "flex", alignItems: "center", gap: "8px", background: "white", color: "#666", border: "1px solid #ddd", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600" }}
                        >
                            Cancel
                        </button>
                    </div>

                    <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>Product Title *</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.title} 
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }}
                                    placeholder="e.g., Cute Cat Stickers"
                                />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>Price (₹) *</label>
                                <input 
                                    type="number" 
                                    required 
                                    min="0"
                                    value={formData.price} 
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }}
                                    placeholder="e.g., 149"
                                />
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>Category *</label>
                                <select 
                                    value={formData.category} 
                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }}
                                >
                                    <option value="stickers">Stickers</option>
                                    <option value="posters">Posters</option>
                                </select>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>Style</label>
                                <select 
                                    value={formData.style} 
                                    onChange={(e) => setFormData({...formData, style: e.target.value})}
                                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }}
                                >
                                    <option value="Cute">Cute</option>
                                    <option value="Aesthetic">Aesthetic</option>
                                    <option value="Minimal">Minimal</option>
                                    <option value="Dark">Dark</option>
                                    <option value="Anime">Anime</option>
                                    <option value="Quotes">Quotes</option>
                                </select>
                            </div>
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                                <label style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>Badge (Optional)</label>
                                <input 
                                    type="text" 
                                    value={formData.badge} 
                                    onChange={(e) => setFormData({...formData, badge: e.target.value})}
                                    style={{ padding: "12px", borderRadius: "8px", border: "1px solid #ddd", fontSize: "1rem" }}
                                    placeholder="e.g., Bestseller, New"
                                />
                            </div>
                        </div>

                        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", background: "#f9f9f9" }}>
                            <h4 style={{ margin: "0 0 15px 0", color: "#333" }}>Product Images</h4>
                            
                            <div style={{ display: "flex", gap: "10px", marginBottom: "15px", alignItems: "flex-start" }}>
                                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
                                    <input 
                                        type="text" 
                                        value={newImageUrl} 
                                        onChange={(e) => setNewImageUrl(e.target.value)}
                                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }}
                                        placeholder="Paste Image URL or Upload File ->"
                                    />
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setNewImageUrl(reader.result);
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        style={{ fontSize: "0.85rem", color: "#666" }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <input 
                                        type="text" 
                                        value={newImageCaption} 
                                        onChange={(e) => setNewImageCaption(e.target.value)}
                                        style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ddd", width: "100%", boxSizing: "border-box" }}
                                        placeholder="Caption (Optional)"
                                    />
                                </div>
                                <button 
                                    type="button" 
                                    onClick={handleAddImage}
                                    style={{ background: "#2f9e91", color: "white", border: "none", padding: "0 20px", borderRadius: "6px", fontWeight: "600", cursor: "pointer", whiteSpace: "nowrap", height: "42px" }}
                                >
                                    Add Image
                                </button>
                            </div>

                            {formData.images.length > 0 && (
                                <div>
                                    <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "#666", fontWeight: "600" }}>Uploaded Images Preview:</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
                                        {formData.images.map((img, idx) => (
                                            <div key={idx} style={{ position: "relative", width: "120px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden", background: "white", padding: "5px" }}>
                                                <button 
                                                    type="button"
                                                    onClick={() => handleRemoveImage(idx)}
                                                    style={{ position: "absolute", top: "5px", right: "5px", background: "rgba(255,255,255,0.9)", color: "#e74c3c", border: "none", borderRadius: "50%", width: "24px", height: "24px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 10 }}
                                                >
                                                    <X size={14} strokeWidth={3} />
                                                </button>
                                                <img src={img.url} alt={`Preview ${idx}`} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "4px" }} />
                                                <p style={{ margin: "5px 0 0 0", fontSize: "0.75rem", color: "#666", textAlign: "center", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                                    {img.caption || "No caption"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {formData.images.length === 0 && (
                                <p style={{ margin: 0, fontSize: "0.9rem", color: "#888", fontStyle: "italic" }}>No images uploaded yet. Please add at least one image.</p>
                            )}
                        </div>

                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px", gap: "15px" }}>
                            <button 
                                type="button"
                                onClick={() => setActiveTab("products")}
                                style={{ background: "white", color: "#666", border: "1px solid #ddd", padding: "12px 24px", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit"
                                style={{ background: "#2f9e91", color: "white", border: "none", padding: "12px 30px", borderRadius: "8px", fontWeight: "600", cursor: "pointer", fontSize: "1rem" }}
                            >
                                {editingProduct ? "Save Changes" : "Save Product"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {activeTab === "orders" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
                    
                    {/* Pending Orders Section */}
                    <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
                        <h2 style={{ margin: "0 0 20px 0", color: "#f39c12", display: "flex", alignItems: "center", gap: "10px" }}>
                            <Package size={24} /> Pending Orders
                        </h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid #eee" }}>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Order ID</th>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Customer</th>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Products</th>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Total</th>
                                        <th style={{ padding: "15px 10px", color: "#666", textAlign: "right" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.filter(o => o.status === "pending").map((order) => (
                                        <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                                            <td style={{ padding: "15px 10px", color: "#333", fontWeight: "600" }}>{order.id}</td>
                                            <td style={{ padding: "15px 10px", color: "#333" }}>{order.customerName}</td>
                                            <td style={{ padding: "15px 10px", color: "#666" }}>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} style={{ fontSize: "0.9rem" }}>
                                                        {item.quantity}x {item.title}
                                                    </div>
                                                ))}
                                            </td>
                                            <td style={{ padding: "15px 10px", color: "#2f9e91", fontWeight: "600" }}>₹{order.totalPrice}</td>
                                            <td style={{ padding: "15px 10px", textAlign: "right" }}>
                                                <button 
                                                    onClick={() => markOrderCompleted(order.id)}
                                                    style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: "#e0f2f1", color: "#2f9e91", border: "none", padding: "8px 12px", borderRadius: "6px", cursor: "pointer", fontWeight: "600" }}
                                                >
                                                    <CheckCircle size={16} /> Mark as Completed
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.filter(o => o.status === "pending").length === 0 && (
                                        <tr><td colSpan="5" style={{ padding: "30px", textAlign: "center", color: "#888" }}>No pending orders at the moment.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Completed Orders Section */}
                    <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", opacity: "0.8" }}>
                        <h2 style={{ margin: "0 0 20px 0", color: "#2ecc71", display: "flex", alignItems: "center", gap: "10px" }}>
                            <CheckCircle size={24} /> Completed Orders
                        </h2>
                        <div style={{ overflowX: "auto" }}>
                            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                <thead>
                                    <tr style={{ borderBottom: "2px solid #eee" }}>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Order ID</th>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Customer</th>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Products</th>
                                        <th style={{ padding: "15px 10px", color: "#666" }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.filter(o => o.status === "completed").map((order) => (
                                        <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                                            <td style={{ padding: "15px 10px", color: "#333", fontWeight: "600" }}>{order.id}</td>
                                            <td style={{ padding: "15px 10px", color: "#333" }}>{order.customerName}</td>
                                            <td style={{ padding: "15px 10px", color: "#666" }}>
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} style={{ fontSize: "0.9rem" }}>
                                                        {item.quantity}x {item.title}
                                                    </div>
                                                ))}
                                            </td>
                                            <td style={{ padding: "15px 10px", color: "#2f9e91", fontWeight: "600" }}>₹{order.totalPrice}</td>
                                        </tr>
                                    ))}
                                    {orders.filter(o => o.status === "completed").length === 0 && (
                                        <tr><td colSpan="4" style={{ padding: "30px", textAlign: "center", color: "#888" }}>No completed orders yet.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
}
