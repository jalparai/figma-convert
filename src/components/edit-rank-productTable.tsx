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
import { CircularProgress } from "@mui/material";
import EditAbleTableCell from "./EditAbleTableCell";
import { useTranslation } from 'react-i18next';

const EditRankProductTable = ({ products }: any) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} className="product">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="th_hds" style={{ backgroundColor: "#fe7f7f" }}>
            <TableCell align="left" style={{ width: "100px", padding: "7px" }}>
              <div className="edit_rank_th">
                <h5>{t('rank')}</h5>
                <div className="d-flex">
                  <Button>
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9999 7.828V20H10.9999V7.828L5.63592 13.192L4.22192 11.778L11.9999 4L19.7779 11.778L18.3639 13.192L12.9999 7.828Z"
                        fill="#E31927"
                        fill-opacity="0.5"
                      />
                    </svg> */}
                  </Button>
                  {/* <LongMenu /> */}
                </div>
              </div>
            </TableCell>
            <TableCell align="left" style={{ width: "500px", padding: "7px" }}>
              <div className="edit_rank_th">
                <h5>Product Name</h5>
                <div className="d-flex">
                  <Button>
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9999 7.828V20H10.9999V7.828L5.63592 13.192L4.22192 11.778L11.9999 4L19.7779 11.778L18.3639 13.192L12.9999 7.828Z"
                        fill="#E31927"
                        fill-opacity="0.5"
                      />
                    </svg> */}
                  </Button>
                  {/* <LongMenu /> */}
                </div>
              </div>
            </TableCell>
            <TableCell align="left" style={{ width: "500px", padding: "7px" }}>
              <div className="edit_rank_th">
                <h5>Category</h5>
                <div className="d-flex">
                  <Button>
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9999 7.828V20H10.9999V7.828L5.63592 13.192L4.22192 11.778L11.9999 4L19.7779 11.778L18.3639 13.192L12.9999 7.828Z"
                        fill="#E31927"
                        fill-opacity="0.5"
                      />
                    </svg> */}
                  </Button>
                  {/* <LongMenu /> */}
                </div>
              </div>
            </TableCell>
            <TableCell align="left">
              <div className="edit_rank_th">
                <h5>Created At</h5>
                <div className="d-flex">
                  <Button>
                    {/* <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.9999 7.828V20H10.9999V7.828L5.63592 13.192L4.22192 11.778L11.9999 4L19.7779 11.778L18.3639 13.192L12.9999 7.828Z"
                        fill="#E31927"
                        fill-opacity="0.5"
                      />
                    </svg> */}
                  </Button>

                  {/* <LongMenu /> */}
                </div>
              </div>{" "}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <CircularProgress />
            </TableRow>
          ) : (
            products.map((product: any) => (
              <TableRow className="category_row" key={product.id}>
                <EditAbleTableCell
                  category={product}
                  handleRankChange={(rankValue: any) => console.log(rankValue)}
                >
                  {product.rank}
                </EditAbleTableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">
                  <img
                    src={product.image ? product.image : ProductImg}
                    alt="Product Rank"
                    className="product_img category_img"
                  />
                </TableCell>

                <TableCell align="center">{product.date}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EditRankProductTable;
