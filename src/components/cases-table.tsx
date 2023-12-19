import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../asserts/css/category.css";
import "../asserts/css/cases.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { useTranslation } from 'react-i18next';

const Casestable = ({ cases }: {cases: any[]}) => {
  const navigate = useNavigate();

  const handleButtonClick = (caseId: string) => {
    navigate(`/case/${caseId}`);
  };
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} className="product">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds">
            <TableCell align="left">            <h4>{t('caseOwner')}</h4></TableCell>
            <TableCell align="left"> {t('openingDate')}</TableCell>
            <TableCell align="left">  {t('updateDate')}</TableCell>
            <TableCell align="left"> {t('status')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cases.length === 0 ? (
            <TableRow>
              <CircularProgress />
            </TableRow>
          ) : (
            cases.map((el: any) => (
              <TableRow className="category_row" key={el._id}>
                <TableCell align="left">Digigarson Teknikss</TableCell>
                <TableCell align="left">10 Ağustos 2023 12:56</TableCell>
                <TableCell align="left">10 Ağustos 2023 12:56</TableCell>

              
                <TableCell align="left">
  <div className="cases_status">
    <span className={`status ${el.is_open ? "open" : "close"}`}>
      {el.is_open ? "Open" : "Close"}
    </span>
    <button onClick={() => handleButtonClick(el._id)}>Select</button>
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

export default Casestable;
