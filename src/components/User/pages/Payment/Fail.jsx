// CanceledPayment.js
import React from "react";
import { Link } from "react-router-dom";

function CanceledPayment() {
    return (
        <div>
          <h1>Payment Canceled</h1>
          <p>
            Your payment has been canceled. If you have any questions, please
            contact our support.
          </p>
          <Link to="/user">
            <button className="bg-white txt-black">Return To Home</button>
          </Link>
        </div>
      );
}

export default CanceledPayment
