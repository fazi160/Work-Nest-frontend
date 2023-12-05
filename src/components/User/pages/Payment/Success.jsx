import React, { useEffect, useLayoutEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User_url } from "../../../../constants/constants";

function SuccessfulPayment() {
  const queryParameters = new URLSearchParams(window.location.search);
  const userId = queryParameters.get("userId");
  const planId = queryParameters.get("planId");
  const date = queryParameters.get("date");
  const spaceType = queryParameters.get("type");
  console.log(userId, planId, date, spaceType);
  const isInitializedRef = useRef(false);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useLayoutEffect(() => {
    console.log("useLayoutEffect - Component mounted");
    return () => {
      console.log("useLayoutEffect - Component unmounted");
    };
  }, []);

  useEffect(() => {
    console.log("useEffect - Component rendered");

    if (!isInitializedRef.current) {
      console.log("useEffect - Running fetchData");
      const fetchData = async () => {
        try {
          const response = await axios.post(`${User_url}/space/${spaceType}/booking/register/`, {
            userId,
            planId,
            date,
          });

          if (response.status === 201) {
            setSuccess(true);
          } else {
            setSuccess(false);
          }
        } catch (error) {
          console.error("Error:", error);
          setSuccess(false);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
      isInitializedRef.current = true;
    }

    return () => {
      console.log("useEffect - Cleanup");
    };
  }, [userId, planId, date]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className={`w-16 h-16 mx-auto my-6 ${
            success ? "text-green-600" : "text-red-600"
          }`}
        >
          <text
            x="50%"
            y="50%"
            dominantBaseline="middle"
            textAnchor="middle"
            fontSize="20"
          >
            {success ? "✅" : "❌"}
          </text>
        </svg>
        <div className="text-center">
          {loading && <p>Loading...</p>}
          {!loading && success && (
            <>
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Done!
              </h3>
              <p className="text-gray-600 my-2">
                Thank you for doing business with us.
              </p>
              <p> Have a great day! </p>
              <div className="py-10 text-center">
                <Link to="/customer">
                  <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </button>
                </Link>
              </div>
            </>
          )}
          {!loading && !success && (
            <>
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Payment Failed
              </h3>
              <p>
                There was an issue processing your payment. Please try again
                later.
              </p>
              <div className="py-10 text-center">
                <Link to="/customer">
                  <button className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3">
                    GO BACK
                  </button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuccessfulPayment;
