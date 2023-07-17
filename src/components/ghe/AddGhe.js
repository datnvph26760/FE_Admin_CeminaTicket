import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';

const AddGhe = ({ onUpdate }) => {
  const [ten, setTen] = useState('');
  const [trangThai, setTrangThai] = useState(0);
  const [loaiGheList, setLoaiGheList] = useState([]);
  const [selectedLoaiGhe, setSelectedLoaiGhe] = useState('');
  const [phongChieuList, setPhongChieuList] = useState([]);
  const [selectedPhongChieu, setSelectedPhongChieu] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchLoaiGheList();
    fetchPhongChieuList();
  }, []);

  const fetchLoaiGheList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/loaighe/index?size=1000');
      setLoaiGheList(response.data.content);
    } catch (error) {
      console.error('Error fetching loai ghe:', error);
    }
  };

  const fetchPhongChieuList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/phongchieu/index?size=1000');
      setPhongChieuList(response.data.content);
    } catch (error) {
      console.error('Error fetching phong chieu:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/ghe/add', {
        ten,
        trangThai,
        loaiGhe: { id: selectedLoaiGhe },
        phongChieu: { id: selectedPhongChieu }
      });

      setSuccessMessage('Thêm ghế thành công');
      setErrorMessage('');
      setTen('');
      setTrangThai(0);
      setSelectedLoaiGhe('');
      setSelectedPhongChieu('');

      onUpdate();

    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Thêm ghế thất bại');
    }
  };

  return (
    <div className="container">
      <h2>Thêm ghế</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
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
            <option value="">Chọn loại ghế</option>
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
            <option value="">Chọn phòng chiếu</option>
            {phongChieuList.map((phongChieu) => (
              <option key={phongChieu.id} value={phongChieu.id}>
                {phongChieu.ten}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">
          Thêm
        </Button>
      </Form>
    </div>
  );
};

export default AddGhe;