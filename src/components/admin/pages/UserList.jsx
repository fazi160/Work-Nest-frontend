// in this page show email and user and other user related data and add button to show more detailed data

import React, { useState, useEffect } from 'react';
import { Card, Typography } from "@material-tailwind/react";
import axios from 'axios';
function UserList() {
    const [userList, setUserList] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      // Define your Django API endpoint
      const apiUrl = 'http://127.0.0.1:8000/auth/userlist/';
    
      // Fetch user data from your Django API using Axios
      axios.get(apiUrl)
        .then(response => {
          const responseData = response.data;
    
          if (responseData.results && Array.isArray(responseData.results)) {
            setUserList(responseData.results);
          } else {
            console.error('Invalid API response:', responseData);
          }
    
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }, []);
  
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
                    Job
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Employed
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
              </tr>
            </thead>
            <tbody>
              {userList.map(({ id, username, user_type }, index) => {
                const isLast = index === userList.length - 1;
                const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
  
                return (
                  <tr key={id}>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {username}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {user_type}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography variant="small" color="blue-gray" className="font-normal">
                        {/* Add the 'Employed' data here if available */}
                      </Typography>
                    </td>
                    <td className={`${classes} bg-blue-gray-50/50`}>
                      <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                        Edit
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

export default UserList
