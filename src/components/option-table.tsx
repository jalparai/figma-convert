import React, { useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteMod from "./delete-btn";
import OptionEdit from "./option-setting/edit-option-popup";
import { useTranslation } from 'react-i18next';

interface Option {
  id: string;
  special_name: string;
  date: string; // Assuming the price is a number based on your API response
}

interface OptionTableProp {
  data: Option[];
  handleUpdateOption: (id: string, status: boolean) => void;
}

const OptionTable: React.FC<OptionTableProp> = ({
  data,
  handleUpdateOption,
}) => {
  useEffect(() => {
    // You can add any additional logic here if needed
  }, [data]);
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} className="product">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds">
            <TableCell align="left">{t('nameHeaderText')}</TableCell>
            <TableCell align="left">{t('priceHeaderText')}</TableCell>
            <TableCell align="left">{t('settingHeaderText')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <CircularProgress />
            </TableRow>
          ) : (
            data.map((option, index) => (
              <TableRow key={index}>
                <TableCell align="left">{option.special_name}</TableCell>
                <TableCell align="left">{option.date}</TableCell>
                <TableCell align="left">
                  <div className="setting_list">
                    <OptionEdit optionId={option.id} />
                    <DeleteMod productId={option.id} object="option" />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OptionTable;
