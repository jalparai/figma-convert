import { useEffect, useState } from "react";
import "../../asserts/css/product.css";
import { useNavigate } from "react-router-dom";
import {
  getAllProducts,
  updateProductSettingAPI,
} from "../../pages/product/api/index";
import "../../asserts/css/edit-rank.css";
import EditRanktable from "../../components/edit-rank-table";
import { getAllCategories } from "../categorey/api";

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

const EditRank = () => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState<Categories[]>([]);

  const exportProducts = () => {
    downloadCSV(data);
  };

  const navigate = useNavigate();

  const handleUpdateProduct = async (id: string, status: boolean) => {
    await updateProductSettingAPI(id, status);
    await getAllProducts(setData);
  };

  useEffect(() => {
    (async function(){
      const allCat = await getAllCategories();
      setCategories(allCat)
    })()
    return () => {}
  }, [])

  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
            <h2 className="title_tag">Category List</h2>
          </div>
          <div className="Edit_rank_total_listing">
            <span>
              Total Categorie : <span>{categories.length}</span>
            </span>
          </div>
        </div>
        <EditRanktable categories={categories} />
      </div>
    </>
  );
};
export default EditRank;
