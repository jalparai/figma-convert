import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteMod from "./delete-btn";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface BasicTableProps {
  data: Product[];
  handleUpdateProduct: (id: string, status: boolean) => void;
}

interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  date: string;
  status: boolean;
}

const BasicTable: React.FC<BasicTableProps> = ({
  data,
  handleUpdateProduct,
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredData = data.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="">
      <div className="categorey_search">
        <select name="Categories" id="" className="category">
          <option value="Categories">{t("categoriesText")}</option>
          <option value="English">{t("englishText")}</option>
        </select>
        <div className="searchbar hugin_integration_search" style={{position:"relative",top:"66px",left:'13px'}}>
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <TableContainer component={Paper} className="product table-container">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="th_hds">
              <TableCell>{t("productHeaderText")}</TableCell>
              <TableCell align="left">{t("nameHeaderText")}</TableCell>
              <TableCell align="left">{t("priceHeaderText")}</TableCell>
              <TableCell align="left">{t("dateHeaderText")}</TableCell>
              <TableCell align="left">{t("settingHeaderText")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <CircularProgress />
              </TableRow>
            ) : (
              filteredData.map((product, index) => (
                <TableRow key={index}><TableCell component="th" scope="row">
                                     <div>
                                     <img
                                         src={product.image}
                                         alt="Product"
                                        className="product_img"
                                       />
                                     </div>
                                   </TableCell>
                                   <TableCell align="left">{product.name}</TableCell>
                                   <TableCell align="left">{product.price}</TableCell>
                                   <TableCell align="left">{product.date}</TableCell>
                                   <TableCell align="left">
                                     <div className="setting_list">
                                       <div
                                         id={product.id}
                                         className={`ios-toggle-switch ${
                                          product.status ? "on" : "off"
                                         }`}
                                         key={product.id}
                                         onClick={() =>
                                           handleUpdateProduct(product.id, !product.status)
                                         }
                                       >
                                         <div className="slider"></div>
                                       </div>
                                       <Link to={`/products/edit/${product.id}`}>
                                         <button className="list_btn_edit_dlt edit">
                                           <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="24"
                                             height="24"
                                             viewBox="0 0 24 24"
                                             fill="none"
                                           >
                                             <path
                                               d="M7 7H6C5.46957 7 4.96086 7.21071 4.58579 7.58579C4.21071 7.96086 4 8.46957 4 9V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H15C15.5304 20 16.0391 19.7893 16.4142 19.4142C16.7893 19.0391 17 18.5304 17 18V17"
                                               stroke="white"
                                               strokeWidth="2"
                                               strokeLinecap="round"
                                               strokeLinejoin="round"
                                             />
                                             <path
                                               d="M16 5L19 8M20.385 6.585C20.7788 6.19115 21.0001 5.65698 21.0001 5.1C21.0001 4.54302 20.7788 4.00885 20.385 3.615C19.9912 3.22115 19.457 2.99989 18.9 2.99989C18.343 2.99989 17.8088 3.22115 17.415 3.615L9 12V15H12L20.385 6.585Z"
                                               stroke="white"
                                               strokeWidth="2"
                                               strokeLinecap="round"
                                               strokeLinejoin="round"
                                             />
                                           </svg>
                                         </button>
                                       </Link>
                                       <DeleteMod productId={product.id} key={index} />
                                    </div>
                                   </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BasicTable;
