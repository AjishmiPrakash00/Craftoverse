import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";

const sampleStyles = [
  "Cute",
  "Aesthetic",
  "Minimal",
  "Dark",
  "Anime",
  "Quotes",
];

export default function Catalogue() {
  const { products: allProducts } = useProduct();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("popularity");
  const [category, setCategory] = useState("all");
  const [styles, setStyles] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);

  const filtered = useMemo(() => {
    return allProducts
      .filter((p) =>
        category === "all" ? true : p.category === category
      )
      .filter((p) =>
        search
          ? p.title.toLowerCase().includes(search.toLowerCase())
          : true
      )
      .filter((p) =>
        styles.length ? styles.includes(p.style) : true
      )
      .filter((p) =>
        p.price >= priceRange[0] && p.price <= priceRange[1]
      );
  }, [category, search, styles, priceRange, allProducts]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    if (sort === "low") arr.sort((a, b) => a.price - b.price);
    if (sort === "high") arr.sort((a, b) => b.price - a.price);
    return arr;
  }, [filtered, sort]);

  function clearAll() {
    setSearch("");
    setCategory("all");
    setStyles([]);
    setPriceRange([0, 500]);
  }

  function toggleStyle(style) {
    setStyles((prev) =>
      prev.includes(style)
        ? prev.filter((s) => s !== style)
        : [...prev, style]
    );
  }

  return (
    <div className="catalogue section">
      <h1>Catalogue</h1>
      <p className="subtitle">Browse our collection of {allProducts.length} products</p>

      <div className="catalogue-controls">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="search-bar"
          />
        </div>
        <select
          className="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="popularity">Sort by Popularity</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="catalogue-body">
        <aside className="filters">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-all" onClick={clearAll}>Clear All</button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <label>
              <input
                type="radio"
                name="category"
                value="all"
                checked={category === "all"}
                onChange={() => setCategory("all")}
              />{' '}
              All
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="stickers"
                checked={category === "stickers"}
                onChange={() => setCategory("stickers")}
              />{' '}
              Stickers
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="posters"
                checked={category === "posters"}
                onChange={() => setCategory("posters")}
              />{' '}
              Posters
            </label>
          </div>

          <div className="filter-group">
            <h4>Style</h4>
            {sampleStyles.map((s) => (
              <label key={s}>
                <input
                  type="checkbox"
                  checked={styles.includes(s)}
                  onChange={() => toggleStyle(s)}
                />{' '}
                {s}
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Max Price</h4>
            <div className="price-range">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
              <div className="price-labels">
                <span>₹0</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="product-grid">
          <div className="grid-4">
            {sorted.map((p) => (
              <Link to={`/product/${p.id}`} key={p.id} className="product-card">
                <div className="product-image">
                  <img src={p.images && p.images.length > 0 ? p.images[0].url : (p.image || "https://via.placeholder.com/200")} alt={p.title} />
                  {p.badge && <span className="badge">{p.badge}</span>}
                </div>
                <h3>{p.title}</h3>
                <p className="category">{p.category}</p>
                <p className="price">₹{p.price}</p>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
