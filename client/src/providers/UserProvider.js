// import React, { createContext, useState, useEffect } from "react";
// import Axios from "axios";

// const context = createContext(null);

// const UserProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     Axios.get(`/api/users/me`).then(
//       ({ data }) => console.log(data)
//       // setUserData({
//       //   email: data.email
//       // })
//     );
//   }, []);

//   return <context.Provider value={userData}>{children}</context.Provider>;
// };

// UserProvider.context = context;

// export default UserProvider;
