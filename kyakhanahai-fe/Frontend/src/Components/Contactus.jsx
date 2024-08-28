import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import "../App.css";
// import { styled } from "@mui/material/styles";
// import Button, { ButtonProps } from '@mui/material/Button';
// import "./CustomCursor.css";

const EMAILJS_API_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

export default function Messagesection() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData, EMAILJS_API_KEY)
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
      })
      .catch((error) => {
        console.log("FAILED...", error);
      });

    // Clear the form after submission
    setFormData({
      from_name: "",
      from_email: "",
      message: "",
    });
  };

  return (
    <form className={`h-80%`} onSubmit={handleSubmit}>
      <div className="sm-devices-textfields flex flex-col items mx-20 py-20">
        <TextField
          id="outlined-name"
          label="Name"
          variant="outlined"
          name="from_name"
          value={formData.from_name}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <TextField
          id="outlined-email"
          label="Email Id"
          variant="outlined"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          sx={{ mb: 2 }}
          className={""}
        />
        <TextField
          id="outlined-message"
          label="Message"
          variant="outlined"
          name="message"
          value={formData.message}
          onChange={handleChange}
          multiline
          rows={4}
          sx={{ mb: 2 }}
          className={""}
        />
        <Button
          variant="contained"
          className=""
          sx={{
            width: "12rem",
            backgroundColor: "#e53935",
            color: "#ffeb3b",
            fontWeight: "550",
            "&:hover": {
              backgroundColor: "#ffeb3b", // Darker background color on hover
              color: "#e53935", // Font color on hover (if needed)
            },
          }}
          onClick={handleSubmit}
        >
          Send Email
        </Button>
      </div>
    </form>
  );
}
