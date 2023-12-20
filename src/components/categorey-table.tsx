/* eslint-disable jsx-a11y/alt-text */
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
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<Categories[]>([]);

  useEffect(() => {
    // Filter data based on the search input
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchInput, data]);

  return (
    <>
      <div className="searchbar hugin_integration_search" style={{ position: "relative", top: "66px", left: '13px' }}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="27"
            height="27"
            viewBox="0 0 27 27"
            fill="none"
          >
            <path
              d="M17.4375 15.75H16.5488L16.2338 15.4463C17.3744 14.1233 18.0012 12.4343 18 10.6875C18 9.24123 17.5711 7.82743 16.7676 6.6249C15.9641 5.42236 14.8221 4.4851 13.4859 3.93163C12.1497 3.37817 10.6794 3.23336 9.2609 3.51551C7.84242 3.79767 6.53946 4.49411 5.51678 5.51678C4.49411 6.53946 3.79767 7.84242 3.51551 9.2609C3.23336 10.6794 3.37817 12.1497 3.93163 13.4859C4.4851 14.8221 5.42236 15.9641 6.6249 16.7676C7.82743 17.5711 9.24123 18 10.6875 18C12.4988 18 14.1638 17.3363 15.4463 16.2338L15.75 16.5488V17.4375L21.375 23.0513L23.0513 21.375L17.4375 15.75ZM10.6875 15.75C7.88625 15.75 5.625 13.4888 5.625 10.6875C5.625 7.88625 7.88625 5.625 10.6875 5.625C13.4888 5.625 15.75 7.88625 15.75 10.6875C15.75 13.4888 13.4888 15.75 10.6875 15.75Z"
              fill="#1E1E1E"
              fill-opacity="0.55"
            />
          </svg>
        </span>
        <input
          type="text"
          name=""
          id=""
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
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
            {filteredData.length === 0 ? (
              <TableRow>
                <CircularProgress />
              </TableRow>
            ) : (
              filteredData.map((ele, index) => {
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
    </>
  );
};

export default Categoreytable;
