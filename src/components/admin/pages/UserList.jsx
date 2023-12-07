import React, { useState, useEffect } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import { BaseUrl } from "../../../constants/constants";
function UserList() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = `${BaseUrl}/auth/userslist/`;

    axios
      .get(apiUrl)
      .then((response) => {
        const responseData = response.data;

        if (responseData.results && Array.isArray(responseData.results)) {
          setUserList(responseData.results);
        } else {
          console.error("Invalid API response:", responseData);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const handleBlockUnblock = (id, is_active) => {
    // Implement the logic to block or unblock the user based on is_active status
    const apiUrl = `${BaseUrl}/auth/usermanagent/${id}/`;
    axios
      .put(apiUrl, { is_active: !is_active })
      .then((response) => {
        // Update the user list after successful block/unblock
        setUserList((prevUserList) => {
          return prevUserList.map((user) => {
            if (user.id === id) {
              return { ...user, is_active: !is_active };
            }
            return user;
          });
        });
      })
      .catch((error) => {
        console.error("Error updating user status:", error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log(userList);

  return (
    <div style={{ marginLeft: "15rem" }}>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Email
                </Typography>
              </th>

              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Action
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  More Details
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {userList.map(({ id, username, email, is_active }, index) => {
              const isLast = index === userList.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {username}
                    </Typography>
                  </td>

                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Button
                      onClick={() => handleBlockUnblock(id, is_active)}
                      color={is_active ? "red" : "green"}
                      className={`w-1/2 ${is_active ? "" : "bg-green-500"}`}
                    >
                      {is_active ? "Block" : "Unblock"}
                    </Button>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      View
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export default UserList;
