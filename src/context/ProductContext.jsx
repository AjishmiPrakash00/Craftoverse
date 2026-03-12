import { createContext, useContext, useState, useEffect } from "react";
import product1 from "../assets/home-car.jpeg";
import product2 from "../assets/home-anime.jpeg";
import product3 from "../assets/home-van-gogh.jpeg";
import product4 from "../assets/home-stranger-things.jpeg";

const ProductContext = createContext();

export const useProduct = () => {
    return useContext(ProductContext);
};

const defaultProducts = [
    { id: 1, title: "Cute Cat Collection", category: "stickers", price: 99, 
      images: [{ url: product1, caption: "Front View" }], badge: "Bestseller", style: "Cute" },
    { id: 2, title: "Dark Mode Vibes", category: "stickers", price: 149, 
      images: [{ url: product2, caption: "Default Style" }], badge: "Bestseller", style: "Dark" },
    { id: 3, title: "Pastel Dreams", category: "stickers", price: 119, 
      images: [{ url: product3, caption: "Pastel colors" }], badge: "", style: "Aesthetic" },
    { id: 4, title: "Minimalist Mountains", category: "posters", price: 349, 
      images: [{ url: product4, caption: "Wall Art" }], badge: "", style: "Minimal" },
    { id: 5, title: "Van Gogh Collection", category: "stickers", price: 199, 
      images: [{ url: product3, caption: "" }], badge: "Bestseller", style: "Aesthetic" },
    { id: 6, title: "Supercars Collection", category: "stickers", price: 199, 
      images: [{ url: product1, caption: "" }], badge: "", style: "Cute" },
    { id: 7, title: "Stranger Things Stickers", category: "posters", price: 49, 
      images: [{ url: product4, caption: "" }], badge: "Bestseller", style: "Anime" },
    { id: 8, title: "Anime Characters", category: "stickers", price: 149, 
      images: [{ url: product2, caption: "" }], badge: "", style: "Anime" },
    { id: 9, title: "Vintage Cameras", category: "stickers", price: 129, 
      images: [{ url: product1, caption: "" }], badge: "New", style: "Aesthetic" },
    { id: 10, title: "Neon City Nights", category: "posters", price: 399, 
      images: [{ url: product2, caption: "" }], badge: "", style: "Dark" },
    { id: 11, title: "Cute Animal Pals", category: "stickers", price: 89, 
      images: [{ url: product3, caption: "" }], badge: "", style: "Cute" },
    { id: 12, title: "Motivational Quotes", category: "posters", price: 249, 
      images: [{ url: product4, caption: "" }], badge: "Limited", style: "Quotes" },
    { id: 13, title: "Gothic Typography", category: "stickers", price: 159, 
      images: [{ url: product2, caption: "" }], badge: "", style: "Dark" },
    { id: 14, title: "Kawaii Food", category: "stickers", price: 109, 
      images: [{ url: product1, caption: "" }], badge: "Bestseller", style: "Cute" },
    { id: 15, title: "Vaporwave Aesthetics", category: "posters", price: 299, 
      images: [{ url: product3, caption: "" }], badge: "", style: "Aesthetic" },
    { id: 16, title: "Abstract Geometrics", category: "posters", price: 329, 
      images: [{ url: product4, caption: "" }], badge: "New", style: "Minimal" },
    { id: 17, title: "Retro Gaming", category: "stickers", price: 139, 
      images: [{ url: product1, caption: "" }], badge: "", style: "Anime" },
    { id: 18, title: "Botanical Charts", category: "posters", price: 450, 
      images: [{ url: product2, caption: "" }], badge: "", style: "Aesthetic" },
    { id: 19, title: "Funny Sayings", category: "stickers", price: 79, 
      images: [{ url: product4, caption: "" }], badge: "", style: "Quotes" },
    { id: 20, title: "Cyberpunk Characters", category: "posters", price: 379, 
      images: [{ url: product2, caption: "" }], badge: "Bestseller", style: "Anime" }
];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem("craftoverse-products");
        if (savedProducts) {
            try {
                const parsedProducts = JSON.parse(savedProducts);
                if (parsedProducts && parsedProducts.length > 0) {
                    // Backwards compatibility mapper
                    return parsedProducts.map(p => {
                        if (!p.images && p.image) {
                            return {
                                ...p,
                                images: [{ url: p.image, caption: "" }]
                            };
                        }
                        return p;
                    });
                }
                return defaultProducts;
            } catch (e) {
                return defaultProducts;
            }
        }
        return defaultProducts;
    });

    useEffect(() => {
        localStorage.setItem("craftoverse-products", JSON.stringify(products));
    }, [products]);

    const addProduct = (newProduct) => {
        setProducts((prev) => {
            const nextId = prev.length > 0 ? Math.max(...prev.map(p => p.id)) + 1 : 1;
            return [...prev, { ...newProduct, id: nextId }];
        });
    };

    const updateProduct = (id, updatedFields) => {
        setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
    };

    const deleteProduct = (id) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductContext.Provider>
    );
};
