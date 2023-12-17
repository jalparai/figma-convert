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

export default function SectionAdd() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
     
     <button className="product_add add_opt_btn add_cat_opt" onClick={handleOpen} >
          Receipt List
          <svg width="24" height="33" viewBox="0 0 24 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.2" d="M21 7.21875V26.8125L18 24.75L15 26.8125L12 24.75L9 26.8125L6 24.75L3 26.8125V7.21875C3 6.94525 3.07902 6.68294 3.21967 6.48955C3.36032 6.29615 3.55109 6.1875 3.75 6.1875H20.25C20.4489 6.1875 20.6397 6.29615 20.7803 6.48955C20.921 6.68294 21 6.94525 21 7.21875Z" fill="white"/>
<path d="M6.75 13.4062C6.75 13.1327 6.82902 12.8704 6.96967 12.677C7.11032 12.4836 7.30109 12.375 7.5 12.375H16.5C16.6989 12.375 16.8897 12.4836 17.0303 12.677C17.171 12.8704 17.25 13.1327 17.25 13.4062C17.25 13.6798 17.171 13.9421 17.0303 14.1355C16.8897 14.3289 16.6989 14.4375 16.5 14.4375H7.5C7.30109 14.4375 7.11032 14.3289 6.96967 14.1355C6.82902 13.9421 6.75 13.6798 6.75 13.4062ZM7.5 18.5625H16.5C16.6989 18.5625 16.8897 18.4539 17.0303 18.2605C17.171 18.0671 17.25 17.8048 17.25 17.5312C17.25 17.2577 17.171 16.9954 17.0303 16.802C16.8897 16.6086 16.6989 16.5 16.5 16.5H7.5C7.30109 16.5 7.11032 16.6086 6.96967 16.802C6.82902 16.9954 6.75 17.2577 6.75 17.5312C6.75 17.8048 6.82902 18.0671 6.96967 18.2605C7.11032 18.4539 7.30109 18.5625 7.5 18.5625ZM21.75 7.21875V26.8125C21.7499 26.9883 21.7172 27.1611 21.6549 27.3146C21.5926 27.468 21.5028 27.5971 21.394 27.6894C21.2853 27.7818 21.1611 27.8343 21.0334 27.8422C20.9057 27.85 20.7787 27.8128 20.6644 27.7342L18 25.9024L15.3356 27.7342C15.2314 27.8059 15.1165 27.8432 15 27.8432C14.8835 27.8432 14.7686 27.8059 14.6644 27.7342L12 25.9024L9.33563 27.7342C9.23143 27.8059 9.11652 27.8432 9 27.8432C8.88348 27.8432 8.76857 27.8059 8.66437 27.7342L6 25.9024L3.33563 27.7342C3.22131 27.8128 3.09427 27.85 2.96657 27.8422C2.83887 27.8343 2.71474 27.7818 2.60597 27.6894C2.49721 27.5971 2.40741 27.468 2.34511 27.3146C2.28281 27.1611 2.25007 26.9883 2.25 26.8125V7.21875C2.25 6.67174 2.40804 6.14714 2.68934 5.76034C2.97064 5.37355 3.35218 5.15625 3.75 5.15625H20.25C20.6478 5.15625 21.0294 5.37355 21.3107 5.76034C21.592 6.14714 21.75 6.67174 21.75 7.21875ZM20.25 7.21875H3.75V25.1445L5.66437 23.827C5.76857 23.7553 5.88349 23.718 6 23.718C6.11651 23.718 6.23143 23.7553 6.33563 23.827L9 25.6601L11.6644 23.827C11.7686 23.7553 11.8835 23.718 12 23.718C12.1165 23.718 12.2314 23.7553 12.3356 23.827L15 25.6601L17.6644 23.827C17.7686 23.7553 17.8835 23.718 18 23.718C18.1165 23.718 18.2314 23.7553 18.3356 23.827L20.25 25.1445V7.21875Z" fill="white"/>
</svg>

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
