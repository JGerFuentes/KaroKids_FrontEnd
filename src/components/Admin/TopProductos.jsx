
import { Chart } from "react-google-charts";
import axios from "axios";
import { useEffect } from "react";
 
const URL_PRODUCTS = import.meta.env.VITE_URL_PRODUCT;
 const data = [
  ["Productos", "Favoritos"],
  ["Producto 1", 2500], // RGB value
  ["Producto 2", 2000], // English color name
  ["Producto 3", 1500],
  ["Producto 4", 1000], 
  ["Producto 5", 800], // CSS-style declaration
];

 const options = {
  chart: {
    title: "Productos Favoritos de KaroKids",
    subtitle: "Top 5 de Productos Favoritos",
  },
};


export default function TopProductos() {

  // useEffect(() => {
  //   const fetchProductos = async () => {
  //       try {
  //         const body = {
  //           top:5
  //         }
  //           const response = await axios.get("URL_PRODUCTS/top",body);
  //          console.log('productos', response.data);
  
  //           if (response.data) {
  //               //setProductos(response.data);
  //              // setLoading(false)
  //           }
  //       } catch (error) {
  //           console.log('No fue posible cargar los productos', error);
  //       }
  //   };
  
  //   fetchProductos();
  // }, []);
  return (
    <dl className="flex shadow-xl hover:shadow-lg pl-5 mt-5 pr-5 focus:outline-none  border py-12 rounded-md justify-between sm: gap-y-6 lg:gap-y-10 text-center lg:grid-cols-3">
   
    <Chart chartType="Bar" width="100%" height="400px" data={data} options={options} />
    </dl>
 
  );
}