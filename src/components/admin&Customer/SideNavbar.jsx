import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Person,
  Assessment,
  Notifications,
  ExitToApp,
} from "@mui/icons-material";
import ListIcon from "@mui/icons-material/List";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";
import { Icon } from "@iconify/react";
import { useCustomerData } from "../../context/ContextCustomer";

function SideNavbar({ onPageSelect }) {
  const userData = useCustomerData();
 console.log(userData);
  const navigate = useNavigate();
  const [isPremium, setisPremium] = useState(false);


  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/user/login");
    return null;
  }
  const decode = jwtDecode(token);

  const handleItemClick = (text) => {
    onPageSelect(text);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentPage");
    if (decode.user_type === "customer") {
      navigate("/customer/login");
    } else if (decode.user_type === "admin") {
      navigate("/admin/login");
    } else {
      navigate("/user/");
    }
  };

  useEffect(() => {
    if (
      userData &&
      userData.premium_customer_data &&
      userData.premium_expired === false
    ) {
      setisPremium(true);
    } else {
      setisPremium(false);
    }
  }, [userData]);
console.log(isPremium);
  return (
    <div
      className="fixed transition-all duration-500 w-60 bg-gray-800 text-white"
      style={{ height: "100%" }}
    >
      <ul>
        <ListItem
          text="Dashboard"
          icon={<Home style={{ fontSize: 32 }} />}
          onItemClick={() => handleItemClick("Dashboard")}
        />

        {decode.user_type === "customer" && (
          <>
            {!isPremium ? (
              <ListItem
                text="Premium Plans"
                icon={<Icon icon="mdi:crown" style={{ fontSize: 32 }} />}
                onItemClick={() => handleItemClick("Premium Plans")}
              />
            ) : null}
            <ListItem
              text="Co-Working Space"
              icon={<ListIcon style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("Co-Working Space")}
            />
            <ListItem
              text="Conference Hall"
              icon={<ListIcon style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("Conference Hall")}
            />
            <ListItem
              text="User Info"
              icon={<PersonIcon style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("User Info")}
            />
            <ListItem
              text="Chat"
              icon={<ChatIcon style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("Chat")}
            />
            {/* <ListItem
              text="Premium Plans"
              icon={<Icon icon="mdi:crown" style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("Premium Plans")}
            /> */}
          </>
        )}
        {decode.user_type === "admin" && (
          <>
            <ListItem
              text="Customer List"
              icon={<Person style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("Customer List")}
            />
            <ListItem
              text="User List"
              icon={<Person style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("User List")}
            />
            <ListItem
              text="Premium"
              icon={<Person style={{ fontSize: 32 }} />}
              onItemClick={() => handleItemClick("Premium")}
            />
          </>
        )}
        <ListItem
          text="Sales Report"
          icon={<Assessment style={{ fontSize: 32 }} />}
          onItemClick={() => handleItemClick("Sales Report")}
        />
        <ListItem
          text="Notification"
          icon={<Notifications style={{ fontSize: 32 }} />}
          onItemClick={() => handleItemClick("Notification")}
        />

        <ListItem
          text="Log Out"
          icon={<ExitToApp style={{ fontSize: 32 }} />}
          onItemClick={() => handleLogout()}
        />
      </ul>
    </div>
  );
}

function ListItem({ text, icon, onItemClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`py-4 px-4 flex items-center focus:outline-none transition ${
        isHovered ? "text-gray-500 cursor-pointer" : "text-white cursor-auto"
      }`}
      onClick={onItemClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <span className="pl-2">{text}</span>
    </button>
  );
}

SideNavbar.propTypes = {
  onPageSelect: PropTypes.func.isRequired, // 'func' prop type, required
};

export default SideNavbar;
