import { useEffect, useState } from "react";
import "../../asserts/css/product.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../../pages/categorey/api";
import Categoreytable from "../../components/categorey-table";
import CategoryAdd from "../../components/add-category-popup";
import { useTranslation } from 'react-i18next';

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

const Category = () => {
  const [data, setData] = useState([]);

  const exportProducts = () => {
    downloadCSV(data);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/edit-rank");
  };

  const handleUpdateProduct = async (id: string, status: boolean) => {
    // await updateProductSettingAPI(id, status);
    const allCat = await getAllCategories();
    setData(allCat)
  };

  const fetchData = async () => {
    const allCat = await getAllCategories();
    setData(allCat)
  };

  useEffect(() => {
    fetchData();
  }, []);
  const { t } = useTranslation();

  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
            <h2 className="title_tag"> {t('catergoryListt')} </h2>
          </div>
          <div className="d-flex">
            <Button
              size="lg"
              className="product_add edit_rant_btn"
              onClick={handleButtonClick}
            >
            {t('editRankButtonText')} 
            </Button>
            <CategoryAdd />
          </div>
        </div>
        <Categoreytable data={data} />
      </div>
    </>
  );
};
export default Category;
