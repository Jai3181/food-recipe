import React from 'react';
import { Form } from "react-bootstrap"

function Input({ label, placeholder, type, onClick, className, value, onChange }) {
  return (
    <Form.Group className={`mb-3 ${className}`} controlId="formBasicEmail" >
      <Form.Label>{label}</Form.Label>
      <Form.Control type={type} placeholder={placeholder} onClick={onClick} value={value} onChange={onChange} />
    </Form.Group >
  );
}

export default Input;