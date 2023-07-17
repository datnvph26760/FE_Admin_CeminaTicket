import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const AddLoaiGhe = ({ onUpdate }) => {
  const [ten, setTen] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/loaighe/add', {
        ten,
        trangThai,
      });

      setSuccessMessage('Thêm loại ghế thành công');
      setErrorMessage('');
      setTen('');
      setTrangThai(0);

      onUpdate(); // Fetch the updated list of records

    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Thêm loại ghế thất bại');
    }
  };

  return (
    <div className="container">
      <h2>Thêm loại ghế</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ten">
          <Form.Label>Tên loại ghế</Form.Label>
          <Form.Control
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="trangThai">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Control
            as="select"
            value={trangThai}
            onChange={(e) => setTrangThai(Number(e.target.value))}
            required
          >
            <option value={0}>Đang hoạt động</option>
            <option value={1}>Dừng hoạt động</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Thêm
        </Button>
      </Form>
    </div>
  );
};

export default AddLoaiGhe;
