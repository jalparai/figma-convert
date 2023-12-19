import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
import '../asserts/css/product.css';
import '../asserts/css/delete-popup.css';

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

export default function ReceiptView() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
     
     <button className="product_add add_opt_btn add_cat_opt" onClick={handleOpen} >
     View
       

            </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      
      >
        <Box sx={style}   className='receipt_list'>
          {/* Close button */}
          <button className='close-button close_btn' onClick={handleClose}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 2C8.2 2 2 8.2 2 16C2 23.8 8.2 30 16 30C23.8 30 30 23.8 30 16C30 8.2 23.8 2 16 2ZM21.4 23L16 17.6L10.6 23L9 21.4L14.4 16L9 10.6L10.6 9L16 14.4L21.4 9L23 10.6L17.6 16L23 21.4L21.4 23Z" fill="#E31927" fill-opacity="0.5"/>
</svg>

          </button>
<div className='add_option_style'>
<h4>
Fiş Detayı
</h4>

<div className="cards_selected">
<div className="row">
<div className="col-md-6">
<div className="card_text_area">
<div className="hding">
<h3>Payments</h3>
</div>
<ul>
    <li>Payment Type</li>
    <li>Amount</li>
    <li>Currency</li>

</ul>
<ul className='bold_data'>
    <li>Total</li>
    <li>Total</li>
    <li>Total</li>
</ul>
</div>

<div className="card_text_area">
<div className="hding">
<h3>Products Cancelled</h3>
</div>
<ul>
    <li>Payment Type</li>
    <li>Amount</li>
    <li>Currency</li>

</ul>
<ul className='bold_data'>
    <li>Total</li>
    <li>Total</li>
    <li>Total</li>
</ul>
</div>
</div>
<div className="col-md-6">
<div className="card_text_area">
<div className="hding">
<h3>Caterings</h3>
</div>
<ul>
    <li>Payment Type</li>
    <li>Amount</li>
    <li>Currency</li>

</ul>
<ul className='bold_data'>
    <li>Total</li>
    <li>Total</li>
    <li>Total</li>
</ul>
</div>
<div className="card_text_area">
<div className="hding">
<h3>Products Sold</h3>
</div>
<ul>
    <li>Payment Type</li>
    <li>Amount</li>
    <li>Currency</li>

</ul>
<ul className='bold_data'>
    <li>Total</li>
    <li>Total</li>
    <li>Total</li>
</ul>
</div>
<div className="card_text_area">
<div className="hding">
<h3>Discounts Applied</h3>
</div>
<ul>
    <li>Payment Type</li>
    <li>Amount</li>
    <li>Currency</li>

</ul>
<ul className='bold_data'>
    <li>Total</li>
    <li>Total</li>
    <li>Total</li>
</ul>
</div>
</div>
</div>

</div>

                 
    </div>
         
        </Box>
      </Modal>
    </div>
  );
}
