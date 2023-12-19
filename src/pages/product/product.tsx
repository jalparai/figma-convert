import React, { useEffect, useState } from "react";
import "../../asserts/css/product.css";
import BasicTable from "../../components/table";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import {
  getAllCategories,
  getAllProducts,
  updateProductSettingAPI,
} from "./api";

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

const Product = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  const exportProducts = () => {
    downloadCSV(data);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/productadd");
  };
  const handleClick = () => {
    navigate("/edit-rank-product");
  };
  // const [isAddProductFormVisible, setAddProductFormVisible] = useState(false);

  // const handleAddProductClick = () => {
  //   setAddProductFormVisible(true);
  // };

  const handleUpdateProduct = async (id: string, status: boolean) => {
    await updateProductSettingAPI(id, status);
    await getAllProducts(setData);
  };

  useEffect(() => {
    getAllProducts(setData);
    getAllCategories(setCategories);
  }, [data]);

  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
            <Button
              size="lg"
              className="product_add"
              onClick={handleButtonClick}
            >
         {t('addProductButtonText')}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1.5C9.22562 1.53347 6.57431 2.65047 4.61239 4.61239C2.65047 6.57431 1.53347 9.22562 1.5 12C1.53347 14.7744 2.65047 17.4257 4.61239 19.3876C6.57431 21.3495 9.22562 22.4665 12 22.5C14.7744 22.4665 17.4257 21.3495 19.3876 19.3876C21.3495 17.4257 22.4665 14.7744 22.5 12C22.4665 9.22562 21.3495 6.57431 19.3876 4.61239C17.4257 2.65047 14.7744 1.53347 12 1.5ZM18 12.75H12.75V18H11.25V12.75H6V11.25H11.25V6H12.75V11.25H18V12.75Z"
                  fill="white"
                />
              </svg>
            </Button>
            <Button size="lg" className="product_add" onClick={handleClick} style={{marginLeft:'5px'}}>
            {t('editRankButtonText')}
            </Button>
          </div>

          <div>
            <button onClick={exportProducts} className="export_btn">
            {t('exportButtonText')}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.5"
                  d="M4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12H4Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M15.5301 10.47C15.3895 10.3295 15.1988 10.2507 15.0001 10.2507C14.8013 10.2507 14.6107 10.3295 14.4701 10.47L12.7501 12.19V4C12.7501 3.80109 12.6711 3.61032 12.5304 3.46967C12.3898 3.32902 12.199 3.25 12.0001 3.25C11.8012 3.25 11.6104 3.32902 11.4698 3.46967C11.3291 3.61032 11.2501 3.80109 11.2501 4V12.19L9.53009 10.47C9.38792 10.3375 9.19987 10.2654 9.00557 10.2688C8.81127 10.2723 8.62588 10.351 8.48847 10.4884C8.35106 10.6258 8.27234 10.8112 8.26892 11.0055C8.26549 11.1998 8.33761 11.3878 8.47009 11.53L11.4701 14.53C11.6107 14.6705 11.8013 14.7493 12.0001 14.7493C12.1988 14.7493 12.3895 14.6705 12.5301 14.53L15.5301 11.53C15.6705 11.3894 15.7494 11.1988 15.7494 11C15.7494 10.8012 15.6705 10.6106 15.5301 10.47Z"
                  fill="white"
                />
              </svg>
            </button>
            <button className="export_btn import_btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="22"
                viewBox="0 0 21 22"
                fill="none"
              >
                <path
                  d="M10.3125 19.25C9.9275 19.25 9.625 18.9475 9.625 18.5625V7.5625C9.625 7.1775 9.9275 6.875 10.3125 6.875C10.6975 6.875 11 7.1775 11 7.5625V18.5625C11 18.9475 10.6975 19.25 10.3125 19.25Z"
                  fill="white"
                />
                <path
                  d="M14.4376 12.375C14.3474 12.3761 14.258 12.3583 14.1751 12.3228C14.0922 12.2873 14.0177 12.2348 13.9563 12.1687L10.3126 8.52499L6.66883 12.1687C6.39383 12.4437 5.96758 12.4437 5.69258 12.1687C5.41758 11.8937 5.41758 11.4675 5.69258 11.1925L9.81758 7.06749C10.0926 6.79249 10.5188 6.79249 10.7938 7.06749L14.9188 11.1925C15.1938 11.4675 15.1938 11.8937 14.9188 12.1687C14.7813 12.3062 14.6026 12.375 14.4376 12.375Z"
                  fill="white"
                />
                <path
                  d="M13.8462 17.7925C13.585 17.7925 13.3375 17.6413 13.2275 17.3938C13.0762 17.05 13.2275 16.6375 13.5712 16.4863C16.1975 15.29 17.8887 12.7188 17.8887 9.92751C17.8887 5.92626 14.4925 2.66751 10.3262 2.66751C6.15996 2.66751 2.74996 5.92626 2.74996 9.92751C2.74996 12.705 4.44121 15.29 7.06746 16.4863C7.41121 16.6375 7.56246 17.05 7.41121 17.3938C7.25996 17.7375 6.84746 17.8888 6.50371 17.7375C3.39621 16.3213 1.38871 13.255 1.38871 9.92751C1.37496 5.15626 5.38996 1.29251 10.3125 1.29251C15.235 1.29251 19.25 5.17001 19.25 9.92751C19.25 13.2413 17.2425 16.3075 14.135 17.7375C14.0387 17.7788 13.9425 17.8063 13.8462 17.8063V17.7925Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>


        <BasicTable data={data} handleUpdateProduct={handleUpdateProduct} />
      </div>
    </>
  );
};
export default Product;
