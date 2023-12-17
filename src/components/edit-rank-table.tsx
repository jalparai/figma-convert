import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ProductImg from "../asserts/imgs/product-add.png";
import "../asserts/css/category.css";
import { Button } from "react-bootstrap";
import LongMenu from "./three-dots-vertical-menu";
import EditAbleTableCell from "./EditAbleTableCell";
import { CircularProgress } from "@mui/material";

const EditRanktable = ({ categories }: any) => {
  return (
    <TableContainer component={Paper} className="product">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds" style={{ backgroundColor: "#fe7f7f" }}>
            <TableCell align="left" style={{ width: "100px", padding: "7px" }}>
              <div className="edit_rank_th">
                <h5>Rank</h5>
                <div className="d-flex">
      
                </div>
              </div>
            </TableCell>
            <TableCell align="left" style={{ width: "500px", padding: "7px" }}>
              <div className="edit_rank_th">
                <h5>Category</h5>
                <div className="d-flex">

                </div>
              </div>
            </TableCell>
            <TableCell align="left">
              <div className="edit_rank_th">
                <h5>Creation Date</h5>
                <div className="d-flex">
                                 </div>
              </div>{" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <CircularProgress />
            </TableRow>
          ) : (
            categories.map((category: any) => (
              <TableRow className="category_row" key={category.id}>
                {/* <TableCell align="center">{category.rank}</TableCell> */}
                <EditAbleTableCell
                  category={category}
                  handleRankChange={(rankValue: any) => console.log(rankValue)}
                />
                <TableCell align="center">
                  <img
                    src={category.image ? category.image : ProductImg}
                    alt="Category"
                    className="product_img category_img"
                  />
                  {category.title}
                </TableCell>
                <TableCell align="center">{category.createdAt}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditRanktable;
