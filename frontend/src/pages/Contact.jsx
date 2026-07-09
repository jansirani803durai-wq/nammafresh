import React, { useState } from 'react';
import { toast } from "react-toastify";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [errors, setErrors] = useState({});

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email is required";
    if (!/^[6-9]\d{9}$/.test(form.phone))
      e.phone = "Valid 10 digit phone number required";
    if (form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();

    if (!validate()) return;

    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <main className="page contactPage">
      <form className="form contactForm" onSubmit={submit} data-aos="fade-right">
        <h2>Send Message</h2>

        <input name="name" value={form.name} onChange={change} placeholder="Name" />
        {errors.name && <small>{errors.name}</small>}

        <input name="email" value={form.email} onChange={change} placeholder="Email" />
        {errors.email && <small>{errors.email}</small>}

        <input name="phone" value={form.phone} onChange={change} placeholder="Phone" />
        {errors.phone && <small>{errors.phone}</small>}

        <textarea name="message" value={form.message} onChange={change} placeholder="Message" />
        {errors.message && <small>{errors.message}</small>}

        <button type="submit" className="full">Submit Message</button>
      </form>
    
        <div className="summary" data-aos="fade-left">
          <h2>Support Details</h2>
          <p><b>Email:</b> support@nammafresh.local</p><p><b>Phone:</b> +91 98765 43210</p><p><b>Delivery:</b> Chennai, Coimbatore, Madurai and major Tamil Nadu cities.</p><p><b>Hours:</b> 8:00 AM - 9:00 PM</p>
          <h3>Why contact us?</h3><p>Ask about product availability, delivery slots, payment status, order support and bulk grocery baskets.</p>
        </div>
      </main>

  );
}
