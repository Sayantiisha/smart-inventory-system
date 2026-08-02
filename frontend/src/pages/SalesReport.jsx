import { useEffect, useState } from "react";
import api from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/salesReport.css";
import { useNavigate } from "react-router-dom";
 
function SalesReport() {
    const [search, setSearch] = useState("");
    const [sales, setSales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [summary , setSummary] = useState({
                total_sales : 0,
                total_orders : 0,
                total_quantity : 0,
                average_sale: 0,
            });

    const [category , setCategory] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

// ## PDF Export Function ##

    const exportPDF = () => {

        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Sales Report", 14, 20);

        autoTable(doc, {
            startY: 30,
            head : [[
                "Product",
                "Category",
                "Quantity",
                "Total Sale"
            ]],
            body: sales.map((item) => 
            [
                item.product_name,
                item.category,
                item.quantity_sold,
                item.total_sale
            ])
        });

        doc.save("sales_Report.pdf")
    }


    const filteredSales = sales.filter((item) => {
            const matchSearch = item.product_name.toLowerCase().includes(search.toLowerCase());
            const matchCategory = category === "" || item.category === category;
            const saleDate = item.sale_date;
            const matchFrom = fromDate === "" || saleDate >= fromDate;
            const matchTo = toDate === "" || saleDate <= toDate;

            return matchSearch && matchCategory &&  matchFrom && matchTo;
            });

    
    // ## Pagination Logic ##
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;

    const currentSales = filteredSales.slice( indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(filteredSales.length / rowsPerPage);



    useEffect(() => {
        fetchSales();
    },[]);

    const fetchSales = async () => {
        try {
            const response = await api.get("/sales-report");
            setSales(response.data);  
            
            const totalSales = response.data.reduce ((sum, item) => sum + item.total_sale, 0 );
            const totalOrders = response.data.length;
            const totalQuantity = response.data.reduce ((sum , item ) => sum + item.quantity_sold, 0);
            const averageSale = totalOrders > 0 ? (totalSales / totalOrders). toFixed(2) : 0;

            setSummary({
                total_sales : totalSales,
                total_orders : totalOrders,
                total_quantity : totalQuantity,
                average_sale : averageSale,
            });

        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        
    };

    if (loading) {
        return <h2>Loading Sales Report...</h2>
    }


   
    return (
    <div className="sales-report-container">
      <h1>Sales Report</h1>

      <div className="sales-summary">

            <div className="summary-card">
                <h3>Total Sales</h3>
                <p>₹ {summary.total_sales}</p>
            </div>

            <div className="summary-card">
                <h3>Total Orders</h3>
                <p>{summary.total_orders}</p>
            </div>

            <div className="summary-card">
                <h3>Total Quantity</h3>
                <p>{summary.total_quantity}</p>
            </div>

            <div className="summary-card">
                <h3>Average Sale</h3>
                <p>₹ {summary.average_sale}</p>
            </div>

            </div>



            <div className="sales-toolbar">

    <div className="sales-search">
        <input
            type="text"
            placeholder="Search Product..."
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
    </div>

    <div className="category-filter">
        <select
            value={category}
            onChange={(e)=>setCategory(e.target.value)}
        >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Furniture">Furniture</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Home">Home</option>
        </select>
    </div> 
</div>
      

      {/* <table className="sales-table">
        <thead>
          <tr>
            <th>Sale ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Qty Sold</th>
            <th>Unit Price</th>
            <th>Total Sale</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
           {currentSales.length > 0 ? (
            currentSales.map((sale) => (
                <tr key={sale.sale_id}>
                <td>{sale.sale_id}</td>
                <td>{sale.product_name}</td>
                <td>{sale.category}</td>
                <td>{sale.quantity_sold}</td>
                <td>₹ {sale.unit_price}</td>
                <td>₹ {sale.total_sale}</td>
                <td>{sale.sale_date}</td>
                </tr>
            ))
        ) : (
            <tr>
                <td colSpan="7" style={{textAlign: "center"}}>
                    No Sales record found.
                </td>
            </tr>
        )}
        </tbody>
      </table> */}
    <div className="table-wrapper">
        <table className="sales-table">
            <thead>
            <tr>
                <th>Sale ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Qty Sold</th>
                <th>Unit Price</th>
                <th>Total Sale</th>
                <th>Date</th>
            </tr>
            </thead>
    <tbody>
        {currentSales.length > 0 ? (
            currentSales.map((sale) => (
            <tr key={sale.sale_id}>
                <td data-label="Sale ID">{sale.sale_id}</td>
                <td data-label="Product">{sale.product_name}</td>
                <td data-label="Category">{sale.category}</td>
                <td data-label="Qty Sold">{sale.quantity_sold}</td>
                <td data-label="Unit Price">₹ {sale.unit_price}</td>
                <td data-label="Total Sale">₹ {sale.total_sale}</td>
                <td data-label="Date">{sale.sale_date}</td>
            </tr>
            ))
        ) : (
            <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
                No Sales Record Found
            </td>
            </tr>
        )}
         </tbody>
        </table>
        </div>
       

      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
            Previous
        </button>

        <span>Page {currentPage} of {totalPages}</span>

        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
            Next
        </button>

      </div>

      <button className="export-btn" onClick={exportPDF}>
        Export PDF
      </button>

     
    </div>
  );
}

export default SalesReport;
