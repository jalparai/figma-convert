import React, { useEffect, useState } from "react";
import '../../asserts/css/product.css';
import BasicTable from "../../components/table";
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getAllCategories, getAllProducts, updateProductSettingAPI } from "../../pages/product/api/index";
import Tableaddtable from "../../components/table-list-table";
import AddMultipleTables from "../../components/add-multiple-tables-popup";
import AddTables from "../../components/add-table-popus";


interface Categories {
  id: string;
  title: string;
  isSubCategory: string;
  rank: string;
}

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


const Table = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  const exportProducts = () => {
    downloadCSV(data);
  };


  const navigate = useNavigate();

  const handleButtonClick = () => {

    navigate('/edit-rank');
  };

  const handleUpdateProduct = async (id: string, status: boolean) => {

    await updateProductSettingAPI(id, status);
    await getAllProducts(setData);

  }




  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
          <select name="Categories" id="" className="category table_style">
                <option value="Categories">Section</option>
                <option value="English">English</option>
               </select>
         
          </div>



          <div className="d-flex">
          <AddMultipleTables />
          <AddTables />
          
          </div>
        </div>

     

   
        <Tableaddtable />
      </div>
    </>

  )
}
export default Table