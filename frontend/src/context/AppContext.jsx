// import axios from "axios";
// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser, useAuth } from "@clerk/clerk-react";
// import { toast } from "react-hot-toast";

// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const currency = import.meta.env.VITE_CURRENCY || "$";
//   const navigate = useNavigate();
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   // let [jetskii, setJetskii] = useState([])

//   const [isOwner, setIsOwner] = useState(false);
//   const [showJetskii, setShowJetskii] = useState(false);

//   // let fetchSkii = async () => {
//   //       try {
//   //           let {data} = await axios.get('/api/jetskii')
//   //           if(data.success){
//   //               setJetskii(data.jetskii)
//   //           }else{
//   //               toast.error(data.message)
//   //           }
//   //       } catch (error) {
//   //            toast.error(error.message)
//   //       }
//   // }

//   const fetchUser = async () => {
//     try {
//       const token = await getToken();
//       if (!token) return;

//       const { data } = await axios.get("/api/user", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (data.success) {
//         setIsOwner(data.role === "owner");
//       }
//     } catch (e) {
//       toast.error(e.message);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchUser();
//   }, [user]);

//   const value = {
//     currency,
//     navigate,
//     user,
//     isOwner,
//     setIsOwner,
//     axios,
//     showJetskii,
//     setShowJetskii,
//     // jetskii,
//     // setJetskii
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);


////


import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();
  const { user } = useUser();
  const { getToken, isLoaded } = useAuth(); // ✅ ADD isLoaded

  const [isOwner, setIsOwner] = useState(false);
  const [showJetskii, setShowJetskii] = useState(false);

  const fetchUser = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setIsOwner(data.role === "owner");
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    if (user && isLoaded) {
      fetchUser();
    }
  }, [user, isLoaded]);

  const value = {
    currency,
    navigate,
    user,
    isOwner,
    setIsOwner,
    axios,
    showJetskii,
    setShowJetskii,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
