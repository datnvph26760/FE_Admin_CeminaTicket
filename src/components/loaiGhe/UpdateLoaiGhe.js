import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const UpdateLoaiGhe = ({ loaiGhe, onClose, onUpdate }) => {
  const [ten, setTen] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTen(loaiGhe.ten);
    setTrangThai(loaiGhe.trangThai);
  }, [loaiGhe]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedLoaiGhe = {
        ...loaiGhe,
        ten,
        trangThai,
      };

      await axios.put(`http://localhost:8080/loaighe/update/${loaiGhe.id}`, updatedLoaiGhe);

      setSuccessMessage('Cập nhật loại ghế thành công');
      setErrorMessage('');

      onUpdate(updatedLoaiGhe); // Call the onUpdate function and pass the updated loaiGhe as a parameter

      onClose();
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Cập nhật loại ghế thất bại');
    }
  };

  return (
    <div className="container">
      <h2>Cập nhật loại ghế</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleUpdate}>
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
          Cập nhật
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
      </Form>
    </div>
  );
};

export default UpdateLoaiGhe;
