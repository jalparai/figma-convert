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
import SectionEdit from "./section-setting/section-edit";
import { useTranslation } from 'react-i18next';

interface Sections {
  id: string;
  title: string;
  branch: string;
  createdAt: string;
}

interface SectionProps {
  data: Sections[];
  handleUpdateSection?: (id: string, status: boolean) => void;
}

const Sectiontable: React.FC<SectionProps> = ({ data }) => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper} className="product">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds">
            <TableCell align="center">{t('section')}</TableCell>
            <TableCell align="center">{t('creationdate')}</TableCell>
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
                  <TableCell align="center">{ele.title}</TableCell>
                  <TableCell align="center">{ele.createdAt}</TableCell>

                  <TableCell align="center">
                    <div className="setting_list">
        
                      <SectionEdit sectionId={ele.id} />
                      <DeleteMod productId={ele.id} object="section" />
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

export default Sectiontable;
