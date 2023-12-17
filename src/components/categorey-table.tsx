import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteMod from "./delete-btn";
import CircularProgress from "@mui/material/CircularProgress";
import "../asserts/css/category.css";
import CategoryEdit from "./categorey-setting/categorey-edit";
import { useTranslation } from 'react-i18next';


interface Categories {
  id: string;
  title: string;
  isSubCategory: string;
  rank: string;
  image: string;
  createdAt: string;
}

interface CategoryProps {
  data: Categories[];
  handleUpdateCategory?: (id: string, status: boolean) => void;
}

const Categoreytable: React.FC<CategoryProps> = ({
  
  data,
  handleUpdateCategory,
}) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper} className="product">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds">
            <TableCell align="center"> {t('category')}</TableCell>
            <TableCell align="center"> {t('creationdate')}</TableCell>
            <TableCell align="center">{t('settingHeaderText')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <CircularProgress />
            </TableRow>
          ) : (
            data.map((ele, index) => {
              return (
                <TableRow className="category_row" key={index}>
                  <TableCell align="center">
                    <div className="categroy_product">
                    <img src={ele.image} className="product_img category_img" />
                    {ele.title}
                    </div>
                   
                  </TableCell>
                  <TableCell align="center">{ele.createdAt}</TableCell>

                  <TableCell align="center">
                    <div className="setting_list">
                      <CategoryEdit categoryId={ele.id} />
                      <DeleteMod productId={ele.id} object="category" />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Categoreytable;
