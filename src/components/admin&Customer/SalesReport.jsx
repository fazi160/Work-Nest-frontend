import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Typography, Button } from "@mui/material";
import Modal from "react-modal";
import jwtDecode from "jwt-decode";
import { User_url } from "../../constants/constants";
const SalesReport = () => {
  const [userType, setUserType] = useState("");
  const [premiumSalesReport, setPremiumSalesReport] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);

    if (decode.user_type === "admin") {
      setUserType("admin");
    } else if (decode.user_type === "customer") {
      setUserType("customer");
    } else {
      setUserType("");
    }

    axios.get(`${User_url}/premium/premiumsales/`).then((response) => {
      setPremiumSalesReport(response.data.results);
    });
  }, []);

  const openModal = (rowData) => {
    setSelectedData(rowData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  console.log(selectedData);
  console.log("modalIsOpen:", modalIsOpen);

  return (
    <div style={{ marginLeft: "16rem", marginRight: "1.5rem" }}>
      <Card>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Sales Report
        </Typography>
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="py-2">User Email</th>
              <th className="py-2">Package Name</th>
              <th className="py-2">Price</th>
              <th className="py-2">Exp Date</th>
              <th className="py-2">Details</th>
            </tr>
          </thead>
          <tbody>
            {premiumSalesReport.map((result) => (
              <tr key={result.id} className="border-t">
                <td className="py-3">{result.user_details.email}</td>
                <td className="py-3">{result.package_details.name}</td>
                <td className="py-3">{result.package_details.price}</td>
                <td className="py-3">{result.exp_date}</td>
                <td className="py-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openModal(result)}
                    sx={{ marginRight: 2 }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            height: 450,
            backgroundColor: "white",
            borderRadius: 8,
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            padding: 24,
            textAlign: "center",
          },
        }}
      >
        <Card sx={{ padding: 4 }}>
          <Typography variant="h5" sx={{ marginBottom: 3 }}>
            Details
          </Typography>
          {selectedData && (
            <div>
              <p>
                <strong>Start Date:</strong> {selectedData.start_date}
              </p>
              <p>
                <strong>Expire Date:</strong> {selectedData.exp_date}
              </p>
              <p>
                <strong>Active Status:</strong>{" "}
                {selectedData.is_active ? "Active" : "Inactive"}
              </p>

              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", fontSize: "1.2rem", marginTop: 2 }}
              >
                Plan Details
              </Typography>
              <p>
                <strong>Name:</strong> {selectedData.package_details.name}
              </p>
              <p>
                <strong>Price:</strong> {selectedData.package_details.price}
              </p>
              <p>
                <strong>Validity:</strong>{" "}
                {selectedData.package_details.validity}
              </p>
              <p>
                <strong>Description:</strong>{" "}
                {selectedData.package_details.description}
              </p>
            </div>
          )}
          <div className="mt-4">
            <Button onClick={closeModal} variant="contained" color="primary">
              Close
            </Button>
          </div>
        </Card>
      </Modal>
    </div>
  );
};

export default SalesReport;
