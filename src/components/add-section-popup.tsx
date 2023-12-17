import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from 'formik';
import { useState } from "react";

import "../asserts/css/product.css";
import "../asserts/css/delete-popup.css";
import { addNewSection } from "../pages/section/api";
import { useTranslation } from 'react-i18next';

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

export default function SectionAdd() {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    onSubmit: async (values) => {
     
      await addNewSection(values)
      handleClose()
      window.location.reload()
    },
  })
  const { t } = useTranslation();

  return (
    <div>
      <button
        className="product_add add_opt_btn add_cat_opt"
        onClick={handleOpen}
      >
      {t('addSection')}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1.5C9.22562 1.53347 6.57431 2.65047 4.61239 4.61239C2.65047 6.57431 1.53347 9.22562 1.5 12C1.53347 14.7744 2.65047 17.4257 4.61239 19.3876C6.57431 21.3495 9.22562 22.4665 12 22.5C14.7744 22.4665 17.4257 21.3495 19.3876 19.3876C21.3495 17.4257 22.4665 14.7744 22.5 12C22.4665 9.22562 21.3495 6.57431 19.3876 4.61239C17.4257 2.65047 14.7744 1.53347 12 1.5ZM18 12.75H12.75V18H11.25V12.75H6V11.25H11.25V6H12.75V11.25H18V12.75Z"
            fill="white"
          />
        </svg>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="opt_add_main section_add_popup">
          {/* Close button */}
          <button className="close-button close_btn" onClick={handleClose}>
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
          <form className="add_option_style" onSubmit={formik.handleSubmit}>
            <h4>{t('addSection')}</h4>

            <input
              type="text"
              name="title"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Tilte"
              className="input"
            />
            <button className="btn_to_add_list mt-3" type="submit">      {t('save')}</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
