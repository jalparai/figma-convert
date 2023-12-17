import React, { useEffect, useState } from "react";
import "../../asserts/css/product.css";
import { useNavigate } from "react-router-dom";
import {
  getAllCategories,
  getAllProducts,
  updateProductSettingAPI,
} from "../../pages/product/api/index";
import Sectiontable from "../../components/section-table";
import SectionAdd from "../../components/add-section-popup";
import { getAllSections } from "./api";

interface Sections {
  id: string;
  title: string;
  branch: string;
  createdAt: string;
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

const Section = () => {
  const [data, setData] = useState<Sections[]>([]);

  const exportProducts = () => {
    downloadCSV(data);
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/edit-rank");
  };

  const fetchData = () => {
    getAllSections(setData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <div className="import_strip ">
          <div>
            <h2 className="title_tag">Section List</h2>
          </div>
          <div className="d-flex">
            <SectionAdd />
          </div>
        </div>
        <Sectiontable data={data} />
      </div>
    </>
  );
};
export default Section;
