import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const UpdatePhongChieu = ({ phongChieu, onClose, onUpdate }) => {
  const [ten, setTen] = useState(phongChieu.ten);
  const [soLuongGhe, setSoLuongGhe] = useState(phongChieu.soLuongGhe);
  const [trangThai, setTrangThai] = useState(phongChieu.trangThai);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedPhongChieu = {
        ...phongChieu,
        ten,
        soLuongGhe,
        trangThai,
      };

      await axios.put(`http://localhost:8080/phongchieu/update/${phongChieu.id}`, updatedPhongChieu);

      setSuccessMessage('Cập nhật phòng chiếu thành công');
      setErrorMessage('');

      onUpdate(updatedPhongChieu); // Gọi hàm onUpdate và truyền phòng chiếu đã cập nhật làm tham số

      onClose();
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Cập nhật phòng chiếu thất bại');
    }
  };

  return (
    <div className="container">
      <h2>Cập nhật phòng chiếu</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleUpdate}>
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
          Cập nhật
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
      </Form>
    </div>
  );
};

export default UpdatePhongChieu;
