// BookingModal.jsx
import React from 'react';
import Modal from 'react-modal';

const BookingModal = ({ isOpen, handleClose, bookingDetails, handleCheckout }) => {
  // Check if bookingDetails is defined before accessing its properties
  if (!bookingDetails) {
    return null; // or handle the case when bookingDetails is not available
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Booking Details</h2>
        <p>
          <strong>Date:</strong> {bookingDetails.booking_date?.toLocaleDateString()}
        </p>
        <p>
          <strong>Hall:</strong> {bookingDetails.hall?.name || 'N/A'}
        </p>
        <p>
          <strong>Price:</strong> ₹{bookingDetails.price}
        </p>
        <button
          onClick={handleCheckout}
          className="bg-blue-500 text-white p-2 rounded-md mr-2"
        >
          Proceed to Checkout
        </button>
        <button
          onClick={handleClose}
          className="bg-gray-300 text-gray-700 p-2 rounded-md"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default BookingModal;
