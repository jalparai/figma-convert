import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useFormik } from "formik";
import { useState } from "react";

import { getSectionById, updateSectionById } from "../../pages/section/api";

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

const SectionEdit: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [section, setSection] = React.useState({ id: sectionId, title: "" });

  const formik = useFormik({
    initialValues: {
      id: section.id,
      title: section.title,
    },
    onSubmit: async (values) => {
     
      await updateSectionById(values.id, { title: values.title });
      // Update local state with the edited values
      setSection({ ...section, title: values.title });
      handleClose();
      window.location.reload()
    },
    enableReinitialize: true,
  });

  React.useEffect(() => {
    getSectionById(sectionId, setSection);
  }, [sectionId]);

  return (
    <div>
      <button className="product_add add_opt_btn" onClick={handleOpen}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="opt_add_main section_add_popup">
          <button className="close-button close_btn" onClick={handleClose}>
            {/* Your close SVG icon */}
          </button>
          <form className="add_option_style" onSubmit={formik.handleSubmit}>
            <h4>Add Section</h4>
            <input
              type="text"
              name="title"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
              placeholder="Title"
              className="input"
            />
            <button className="btn_to_add_list mt-3" type="submit">
              Save
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default SectionEdit;
