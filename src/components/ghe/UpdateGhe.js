import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const UpdateGhe = ({ ghe, onClose, onUpdate }) => {
  const [ten, setTen] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [loaiGheList, setLoaiGheList] = useState([]);
  const [phongChieuList, setPhongChieuList] = useState([]);
  const [selectedLoaiGhe, setSelectedLoaiGhe] = useState('');
  const [selectedPhongChieu, setSelectedPhongChieu] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setTen(ghe.ten);
    setTrangThai(ghe.trangThai);
    setSelectedLoaiGhe(ghe.loaiGhe.id);
    setSelectedPhongChieu(ghe.phongChieu.id);
    fetchLoaiGheList();
    fetchPhongChieuList();
  }, [ghe]);

  const fetchLoaiGheList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/loaighe/index');
      setLoaiGheList(response.data.content);
    } catch (error) {
      console.error('Error fetching loai ghe:', error);
    }
  };

  const fetchPhongChieuList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/phongchieu/index');
      setPhongChieuList(response.data.content);
    } catch (error) {
      console.error('Error fetching phong chieu:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedGhe = {
        ...ghe,
        ten,
        trangThai,
        loaiGhe: { id: selectedLoaiGhe },
        phongChieu: { id: selectedPhongChieu },
      };

      await axios.put(`http://localhost:8080/ghe/update/${ghe.id}`, updatedGhe);

      setSuccessMessage('Cập nhật ghế thành công');
      setErrorMessage('');

      onUpdate(updatedGhe); // Call the onUpdate function and pass the updated ghe as a parameter

      onClose();
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Cập nhật ghế thất bại');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/ghe/delete/${ghe.id}`);
      onClose();
    } catch (error) {
      console.error('Error deleting ghe:', error);
    }
  };

  return (
    <div className="container">
      <h2>Cập nhật ghế</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="ten">
          <Form.Label>Tên ghế</Form.Label>
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
            <option value={0}>Hoạt Động</option>
            <option value={1}>Đang Hoạt Động</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="loaiGhe">
          <Form.Label>Loại ghế</Form.Label>
          <Form.Control
            as="select"
            value={selectedLoaiGhe}
            onChange={(e) => setSelectedLoaiGhe(e.target.value)}
            required
          >
            {loaiGheList.map((loaiGhe) => (
              <option key={loaiGhe.id} value={loaiGhe.id}>
                {loaiGhe.ten}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="phongChieu">
          <Form.Label>Phòng chiếu</Form.Label>
          <Form.Control
            as="select"
            value={selectedPhongChieu}
            onChange={(e) => setSelectedPhongChieu(e.target.value)}
            required
          >
            {phongChieuList.map((phongChieu) => (
              <option key={phongChieu.id} value={phongChieu.id}>
                {phongChieu.ten}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Cập nhật
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Xóa
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Hủy
        </Button>
      </Form>
      
    </div>
  );
};

export default UpdateGhe;
