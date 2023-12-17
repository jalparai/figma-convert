 import { useEffect, useState } from "react";
 import "../../asserts/css/product.css";
 import {
   getAllProducts,
   updateProductSettingAPI,
 } from "../../pages/product/api/index";
 import "../../asserts/css/edit-rank.css";
 import EditRankProductTable from "../../components/edit-rank-productTable";

 const convertToCSV = (data: any[]) => {
   const header = Object.keys(data[0]).join(",");
   const csv = data.map((row) => Object.values(row).join(",")).join("\n");

   return `${header}\n${csv}`;
 };

 const downloadCSV = (data: any[]) => {
   const csvData = convertToCSV(data);
   const blob = new Blob([csvData], { type: "text/csv" });

   const a = document.createElement("a");
   a.href = URL.createObjectURL(blob);
   a.download = "products.csv";
   document.body.appendChild(a);
   a.click();
   document.body.removeChild(a);
 };

 const EditRankProduct = () => {
   const [products, setProducts] = useState<any[]>([]);

   const exportProducts = () => {
     downloadCSV(products);
   };

   const handleUpdateProduct = async (id: string, status: boolean) => {
     await updateProductSettingAPI(id, status);
     await getAllProducts(setProducts);
   };

   useEffect(() => {
     getAllProducts(setProducts)
     return () => {}
   }, [])

   return (
     <>
       <div>
         <div className="import_strip ">
           <div>
             <h2 className="title_tag">Product List</h2>
           </div>
           <div className="Edit_rank_total_listing">
             <span>
               Total Product : <span>{products.length}</span>
             </span>
           </div>
         </div>
         <EditRankProductTable products={products} />
       </div>
     </>
   );
 };
export default EditRankProduct;



