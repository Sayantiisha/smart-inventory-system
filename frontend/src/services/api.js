// import axios from "axios";


// export default api;

// import axios from "axios";

// const api = axios.create({
//     baseURL: "https://smart-inventory-system-0snn.onrender.com",
// });

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "https://smart-inventory-system-0snn.onrender.com",
});

console.log("API Base URL:", api.defaults.baseURL);

export default api;