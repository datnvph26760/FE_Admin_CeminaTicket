import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const AddPhongChieu = () => {
  const [ten, setTen] = useState('');
  const [soLuongGhe, setSoLuongGhe] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/phongchieu/add', {
        ten,
        soLuongGhe,
        trangThai,
      });

      setSuccessMessage('Thêm phòng chiếu thành công');
      setErrorMessage('');
      setTen('');
      setSoLuongGhe('');
      setTrangThai(0);
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Thêm phòng chiếu thất bại');
    }
  };

  return (
    <div className="container">
      <h2>Thêm phòng chiếu</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="ten">
          <Form.Label>Tên phòng</Form.Label>
          <Form.Control
            type="text"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="soLuongGhe">
          <Form.Label>Số lượng ghế</Form.Label>
          <Form.Control
            type="number"
            value={soLuongGhe}
            onChange={(e) => setSoLuongGhe(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="trangThai">
          <Form.Label>Trạng thái</Form.Label>
          <Form.Control
            as="select"
            value={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
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

export default AddPhongChieu;
