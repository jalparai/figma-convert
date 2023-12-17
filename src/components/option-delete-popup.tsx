import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import '../asserts/css/product.css';
import '../asserts/css/delete-popup.css';
import { deleteProductById } from '../pages/add-product/api';
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface BasicProps {
    optionId?: string;
}

const  DeleteMod: React.FC<BasicProps> = ({ optionId }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{
    setOpen(true);
  }
  const handleClose = async () => {
    await deleteProductById(optionId);
    setOpen(false);
  }

  return (
    <div>
      <button onClick={handleOpen} className='list_btn_edit_dlt delt '><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 21C6.45 21 5.979 20.804 5.587 20.412C5.195 20.02 4.99933 19.5493 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.804 20.021 18.412 20.413C18.02 20.805 17.5493 21.0007 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="white" />
      </svg>  </button>
      <Modal
        open={open}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Close button */}
          <button className='close-button close_btn' onClick={()=>setOpen(false)}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 2C8.2 2 2 8.2 2 16C2 23.8 8.2 30 16 30C23.8 30 30 23.8 30 16C30 8.2 23.8 2 16 2ZM21.4 23L16 17.6L10.6 23L9 21.4L14.4 16L9 10.6L10.6 9L16 14.4L21.4 9L23 10.6L17.6 16L23 21.4L21.4 23Z" fill="#E31927" fill-opacity="0.5"/>
</svg>

          </button>

          <div className='svg_delt'>
            <span>
            <svg width="38" height="40" viewBox="0 0 38 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 6.5V7H23V6.5C23 5.43913 22.5786 4.42172 21.8284 3.67157C21.0783 2.92143 20.0609 2.5 19 2.5C17.9391 2.5 16.9217 2.92143 16.1716 3.67157C15.4214 4.42172 15 5.43913 15 6.5ZM12.5 7V6.5C12.5 4.77609 13.1848 3.12279 14.4038 1.90381C15.6228 0.684819 17.2761 0 19 0C20.7239 0 22.3772 0.684819 23.5962 1.90381C24.8152 3.12279 25.5 4.77609 25.5 6.5V7H36.75C37.0815 7 37.3995 7.1317 37.6339 7.36612C37.8683 7.60054 38 7.91848 38 8.25C38 8.58152 37.8683 8.89946 37.6339 9.13388C37.3995 9.3683 37.0815 9.5 36.75 9.5H33.833L31.833 33.356C31.681 35.1676 30.854 36.856 29.5158 38.0866C28.1776 39.3172 26.426 40.0001 24.608 40H13.392C11.5742 39.9998 9.82277 39.3168 8.4848 38.0863C7.14683 36.8557 6.31994 35.1674 6.168 33.356L4.168 9.5H1.25C0.918479 9.5 0.600537 9.3683 0.366117 9.13388C0.131696 8.89946 0 8.58152 0 8.25C0 7.91848 0.131696 7.60054 0.366117 7.36612C0.600537 7.1317 0.918479 7 1.25 7H12.5ZM16.5 16.25C16.5 16.0858 16.4677 15.9233 16.4049 15.7716C16.342 15.62 16.25 15.4822 16.1339 15.3661C16.0178 15.25 15.88 15.158 15.7284 15.0951C15.5767 15.0323 15.4142 15 15.25 15C15.0858 15 14.9233 15.0323 14.7716 15.0951C14.62 15.158 14.4822 15.25 14.3661 15.3661C14.25 15.4822 14.158 15.62 14.0951 15.7716C14.0323 15.9233 14 16.0858 14 16.25V30.75C14 30.9142 14.0323 31.0767 14.0951 31.2284C14.158 31.38 14.25 31.5178 14.3661 31.6339C14.4822 31.75 14.62 31.842 14.7716 31.9049C14.9233 31.9677 15.0858 32 15.25 32C15.4142 32 15.5767 31.9677 15.7284 31.9049C15.88 31.842 16.0178 31.75 16.1339 31.6339C16.25 31.5178 16.342 31.38 16.4049 31.2284C16.4677 31.0767 16.5 30.9142 16.5 30.75V16.25ZM22.75 15C22.06 15 21.5 15.56 21.5 16.25V30.75C21.5 31.0815 21.6317 31.3995 21.8661 31.6339C22.1005 31.8683 22.4185 32 22.75 32C23.0815 32 23.3995 31.8683 23.6339 31.6339C23.8683 31.3995 24 31.0815 24 30.75V16.25C24 15.56 23.44 15 22.75 15Z" fill="white"/>
</svg>

            </span>
            <h4>Filtre Kahve</h4>
            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
          </div>

          <div className='delt_appy'>
            <button onClick={()=>setOpen(false)}>Cancal</button>
            <button onClick={()=>handleClose()}>Delete</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default DeleteMod;