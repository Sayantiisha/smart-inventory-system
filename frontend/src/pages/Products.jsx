import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/products.css";
import ProductForm from "../components/ProductForm";

function Products() {


const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

const [searchTerm, setSearchTerm] = useState("");
const [selectedCategory, setSelectedCategory] = useState("");

// Edit Modal
const [editingProduct, setEditingProduct] = useState(null);
const [showEditModal, setShowEditModal] = useState(false);

// Delete Modal
const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedProductId, setSelectedProductId] = useState(null);

// Pagination
const [currentPage, setCurrentPage] = useState(1);
const productsPerPage  = 10;


// =========================
// Fetch Products
// =========================

const fetchProducts = async () => {

    setLoading(true);

    try {

        const res = await api.get("/products");

        setProducts(res.data);

    } catch (error) {

        console.error(error);

    } finally {

        setLoading(false);

    }
};


// =========================
// Load Products
// =========================

useEffect(() => {

    fetchProducts();

}, []);


// =========================
// Add Product
// =========================

const handleAddProduct = async (product) => {

    try {

        await api.post("/products", product);

        alert("Product Added Successfully!");

        fetchProducts();

    } catch (error) {

        console.error(error);

        alert("Failed to add product");

    }
};


// =========================
// Edit Product
// =========================

const handleEdit = (product) => {

    setEditingProduct(product);

    setShowEditModal(true);

};


// =========================
// Update Product
// =========================

const handleUpdateProduct = async (product) => {

    try {

        await api.put(
            `/products/${product.product_id}`,
            product
        );

        alert("Product Updated Successfully!");

        setShowEditModal(false);

        setEditingProduct(null);

        fetchProducts();

    } catch (error) {

        console.error(error);

        alert("Failed to Update Product");

    }
};


// =========================
// Delete Product
// =========================

const handleDelete = (productId) => {

    setSelectedProductId(productId);

    setShowDeleteModal(true);

};


// =========================
// Confirm Delete
// =========================

const confirmDelete = async () => {

    try {

        await api.delete(
            `/products/${selectedProductId}`
        );

        alert("Product Deleted Successfully!");

        fetchProducts();

    } catch (error) {

        console.error(error);

        alert("Failed to delete product.");

    }

    setShowDeleteModal(false);

    setSelectedProductId(null);

};


// =========================
// Loading
// =========================

if (loading) {

    return (
        <h2>Loading Products...</h2>
    );

}

// ## Pagination

const lastProductIndex = currentPage * productsPerPage;
const firstProductIndex = lastProductIndex - productsPerPage;

const currentProducts = products
    .filter((product) => {
        const matchSearch =
            String(product.product_name || "")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchCategory =
            selectedCategory === "" ||
            product.category === selectedCategory;

        return matchSearch && matchCategory;
    })
    .slice(firstProductIndex, lastProductIndex);


    // ==================
    // Total Page
    //===================
    const totalPages = Math.ceil(products.filter((product) =>
    {
        const matchSearch = String(product.product_name ||"").toLowerCase().includes(searchTerm.toLowerCase());
        const matchCategory = selectedCategory === "" ||
        product.category === selectedCategory;
        return matchSearch && matchCategory; 
    }).length / productsPerPage);

// =========================
// Return UI
// =========================

return (

    <div>

        <h1 className="page-title">
            Products
        </h1>


        {/* =========================
            Add Product Form
        ========================= */}

        <ProductForm
            onAdd={handleAddProduct}
            onUpdate={handleUpdateProduct}
            editingProduct={null}
        />


        {/* =========================
            Category Filter
        ========================= */}

        <div className="filter-container">

            <select
                value={selectedCategory}
                onChange={(e) =>
                    setSelectedCategory(e.target.value)
                }
            >

                <option value="">
                    All Categories
                </option>

                <option value="Electronics">
                    Electronics
                </option>

                <option value="Furniture">
                    Furniture
                </option>

                <option value="Clothing">
                    Clothing
                </option>

                <option value="Books">
                    Books
                </option>

            </select>

        </div>


        {/* =========================
            Search
        ========================= */}

        <div className="search-container">

            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(e.target.value)
                }
            />

        </div>


        {/* =========================
            Products Table
        ========================= */}

        <table className="product-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Actions</th>

                </tr>

            </thead>


            <tbody>

                {/* {products

                    .filter((product) => {

                        const matchSearch =
                            String(product.product_name || "")
                                .toLowerCase()
                                .includes(
                                    searchTerm.toLowerCase()
                                );


                        const matchCategory =
                            selectedCategory === "" ||
                            product.category === selectedCategory;


                        return (
                            matchSearch &&
                            matchCategory
                        );

                    }) */}

                    {currentProducts.map((product, index) => (

                        <tr
                            key={
                                product.product_id ??
                                `${product.product_name}-${index}`
                            }
                        >

                            <td>
                                {product.product_id}
                            </td>

                            <td>
                                {product.product_name}
                            </td>

                            <td>
                                {product.category}
                            </td>

                            <td>
                                ₹ {product.unit_price}
                            </td>

                            <td>

                                <button
                                    className="edit-btn"
                                    onClick={() =>
                                        handleEdit(product)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    className="delete-btn"
                                    onClick={() =>
                                        handleDelete(
                                            product.product_id
                                        )
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

            </tbody>

        </table>
     

     {/* // Pagination / */}
            <div className="pagination">

            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Previous
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>

        </div>

        {/* =========================
            Edit Modal
        ========================= */}

        {showEditModal && (

            <div className="modal-overlay">

                <div className="modal">

                    <h2>
                        Edit Product
                    </h2>


                    <ProductForm
                        onAdd={handleAddProduct}
                        onUpdate={handleUpdateProduct}
                        editingProduct={editingProduct}
                    />


                    <button
                        className="cancel-btn"
                        onClick={() => {

                            setShowEditModal(false);

                            setEditingProduct(null);

                        }}
                    >
                        Cancel
                    </button>

                </div>

            </div>

        )}


        {/* =========================
            Delete Modal
        ========================= */}

        {showDeleteModal && (

            <div className="modal-overlay">

                <div className="modal">

                    <h3>
                        Delete Product
                    </h3>


                    <p>
                        Are you sure you want to delete this product?
                    </p>


                    <button
                        className="cancel-btn"
                        onClick={() => {

                            setShowDeleteModal(false);

                            setSelectedProductId(null);

                        }}
                    >
                        Cancel
                    </button>


                    <button
                        className="confirm-btn"
                        onClick={confirmDelete}
                    >
                        Delete
                    </button>

                </div>

            </div>

        )}

    </div>

);


}

export default Products;
