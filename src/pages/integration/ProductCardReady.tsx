import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import * as yup from "yup";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IHuginProduct {
  id: string;
  name: string;
  barcode: string;
  plu: string;
}

const ProductCardReady = ({ product }: { product: IHuginProduct }) => {
  // Define a yup schema for validation
  const validationSchema = yup.object().shape({
    barcode: yup
      .string()
      .trim()
      .max(20, "Barcode must be 20 characters or less")
      .matches(/^\d+$/, "Barcode must contain only numbers")
      .notRequired(),
    plu: yup
      .string()
      .trim()
      .max(6, "Plu must be 6 characters or less")
      .matches(/^\d+$/, "Plu must contain only numbers")
      .notRequired(),
  });

  const formik = useFormik({
    initialValues: {
      barcode: "",
      plu: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const barcode = values.barcode
      const plu = values.plu
      console.log("Saved", { barcode, plu });
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = (productId: string) => {
    console.log("productId", productId);
    formik.setValues({
      barcode: product.barcode,
      plu: product.plu,
    });
    setOpen(true);
  };
  const handleClose = async () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => handleOpen(product.id)}
        className="hugin_product_card"
      >
        <div className="Integration-card">
          <h2>{product.name}</h2>
          <div className="Integrationflex">
            <div>
              <span>Barcode:</span>
              <h5>{product?.barcode ? product.barcode : "Barcode missing"}</h5>
            </div>
            <div>
              <span>PLU:</span>
              <h5>{product?.plu ? product.plu : "PLU missing"}</h5>
            </div>
          </div>
          <h3>Ready for Integration</h3>
        </div>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="product_card_modal_hugin"
      >
        <Box sx={style} component="form" onSubmit={formik.handleSubmit}>
          {/* Close button */}
          <button
            className="close-button close_btn"
            onClick={() => setOpen(false)}
            type="button"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2C8.2 2 2 8.2 2 16C2 23.8 8.2 30 16 30C23.8 30 30 23.8 30 16C30 8.2 23.8 2 16 2ZM21.4 23L16 17.6L10.6 23L9 21.4L14.4 16L9 10.6L10.6 9L16 14.4L21.4 9L23 10.6L17.6 16L23 21.4L21.4 23Z"
                fill="#E31927"
                fill-opacity="0.5"
              />
            </svg>
          </button>
          <div className="device_setting_modal">
            <h4>{product.name}</h4>

            <input
              id="barcode"
              name="barcode"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.barcode}
              placeholder="Barcode "
              className="input"
            />
            <div>
              {formik.errors.barcode ? (
                <div>{formik.errors.barcode}</div>
              ) : null}
            </div>
            <input
              id="plu"
              name="plu"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.plu}
              placeholder="PLU "
              className="input"
            />
            <div>
              {formik.errors.plu ? <div>{formik.errors.plu}</div> : null}
            </div>
            <div>
              <p>
                All fields are optional. The fields you leave blank will be
                filled automatically according to their next number.
              </p>
            </div>

            <button type="submit">Save</button>
            <div className="mt-2">
              <button type="reset">Cancel</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductCardReady;
