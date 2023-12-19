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
import ReceiptView from "./receipt-list";
const ReceiptList = () => {
    const { t } = useTranslation();

  return (
    <div className="">
  
    <TableContainer component={Paper} className="product table-container receipt_list_table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds">
            <TableCell align="left">CUSTOMER/WAITER NAME</TableCell>
            <TableCell align="left">	TABLE</TableCell>
            <TableCell align="left">SECTION</TableCell>
            <TableCell align="left">DATE</TableCell>
            <TableCell align="left">PRICE</TableCell>
            <TableCell align="left">PAYMENT TYPE	</TableCell>
            <TableCell align="left">ACTIONS</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
      
              <TableRow >
           
                                 <TableCell align="left">DigigarsoN Teknikss</TableCell>
                                 <TableCell align="left">1</TableCell>
                                 <TableCell align="left">Bahçe66</TableCell>
                                 <TableCell align="left">5 Eylül 2023 16:58	</TableCell>
                                 <TableCell align="left">13.92 TL
</TableCell>

                                 <TableCell align="left">Cash</TableCell>
                                 <TableCell align="left"><ReceiptView /></TableCell>
              </TableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
  </div>
  )
}

export default ReceiptList
