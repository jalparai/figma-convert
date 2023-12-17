import React from "react";
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
import UserUpdate from "./user-update-popup";

interface User {
  id: string;
  lastName: string;
  createdAt: string;
}

interface UserProps {
  data: User[];
  handleUpdateUser?: (id: string, status: boolean) => void;
}

const Userstable: React.FC<UserProps> = ({ data }) => {
  return (
    <TableContainer component={Paper} className="product">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds">
            <TableCell align="center">EMPLOYEE</TableCell>
            <TableCell align="center">CREATION DATE</TableCell>
            <TableCell align="center">Setting</TableCell>
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
                  <TableCell align="center">{ele.lastName}</TableCell>
                  <TableCell align="center">{ele.createdAt}</TableCell>

                  <TableCell align="center">
                    <div className="setting_list">
                      <UserUpdate userId={ele.id} />
                      <DeleteMod object="user" productId={ele.id} />
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

export default Userstable;