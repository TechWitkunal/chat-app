import React, {useEffect } from "react";
import axios from "axios";
// import styled from "styled-components";
// import { useNavigate } from "react-router-dom";
// import Logo from "../assets/logo.svg";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { MakeFriendUrlRoute } from "../utils/APIRoutes";

export default function MakeFriendUrl() {
  // const navigate = useNavigate();
  // const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  // useEffect(() => {
  //   if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
  //     navigate("/");
  //   }
  // }, []);

  const handleSubmit = async () => {
    // event.preventDefault();
    var currentUrl = window.location.href.split("/");
    let url = currentUrl[currentUrl.length - 1];
    const userId = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY))._id;
    // console.log(url, JSON.parse(userId)._id);

    const { data } = await axios.post(`http://localhost:5000/url/makefriend/${userId}/${url}`, {});
    if (data.status === false) {
      toast.error(data.msg, toastOptions);
    }
    if (data.status === true) {
      toast.error(data.msg, toastOptions);
    };

    //   navigate("/");

    // }
  };
  useEffect(()=> {
    handleSubmit()
  }, [])

  return (
    <>
  <div>Hello</div>
    </>
  );
}

// const FormContainer = styled.div`
//   height: 100vh;
//   width: 100vw;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   gap: 1rem;
//   align-items: center;
//   background-color: #131324;
//   .brand {
//     display: flex;
//     align-items: center;
//     gap: 1rem;
//     justify-content: center;
//     img {
//       height: 5rem;
//     }
//     h1 {
//       color: white;
//       text-transform: uppercase;
//     }
//   }

//   form {
//     display: flex;
//     flex-direction: column;
//     gap: 2rem;
//     background-color: #00000076;
//     border-radius: 2rem;
//     padding: 5rem;
//   }
//   input {
//     background-color: transparent;
//     padding: 1rem;
//     border: 0.1rem solid #4e0eff;
//     border-radius: 0.4rem;
//     color: white;
//     width: 100%;
//     font-size: 1rem;
//     &:focus {
//       border: 0.1rem solid #997af0;
//       outline: none;
//     }
//   }
//   button {
//     background-color: #4e0eff;
//     color: white;
//     padding: 1rem 2rem;
//     border: none;
//     font-weight: bold;
//     cursor: pointer;
//     border-radius: 0.4rem;
//     font-size: 1rem;
//     text-transform: uppercase;
//     &:hover {
//       background-color: #4e0eff;
//     }
//   }
//   span {
//     color: white;
//     text-transform: uppercase;
//     a {
//       color: #4e0eff;
//       text-decoration: none;
//       font-weight: bold;
//     }
//   }
// `;
