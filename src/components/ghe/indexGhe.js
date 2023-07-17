import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert, Modal, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddGhe from './AddGhe';
import UpdateGhe from './UpdateGhe';
import './Ghe.css';

const Ghe = () => {
  const [gheList, setGheList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedGhe, setSelectedGhe] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [phongChieuId, setPhongChieuId] = useState('');
  const [phongChieuList, setPhongChieuList] = useState([]);

  useEffect(() => {
    fetchGheList();
    fetchPhongChieuList();
  }, [currentPage, keyword, phongChieuId]);

  const fetchGheList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/ghe/index?page=${currentPage}&sortBy=ten&phongChieuId=${phongChieuId}`
      );
      setGheList(response.data.content);
    } catch (error) {
      console.error('Error fetching ghe list:', error);
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/ghe/search?keyword=${keyword}&phongChieuId=${phongChieuId}`
      );
      if (response.data.length > 0) {
        setSearchResults(response.data);
        setNoResults(false);
      } else {
        setSearchResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error searching ghe:', error);
    }
  };

  const handleSort = (event) => {
    fetchGheList();
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/ghe/delete/${selectedGhe.id}`);
      fetchGheList();
      setShowDeleteModal(false);
      setSelectedGhe(null);
    } catch (error) {
      console.error('Error deleting ghe:', error);
    }
  };

  const getStatusText = (status) => {
    return status === 1 ? 'Trống' : 'Đã chọn';
  };

  const openDeleteModal = (ghe) => {
    setSelectedGhe(ghe);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedGhe(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openUpdateModal = (ghe) => {
    setSelectedGhe(ghe);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedGhe(null);
  };

  const handleUpdateGheList = async (updatedGhe) => {
    try {
      // Fetch the updated ghe list from the server
      const response = await axios.get(
        `http://localhost:8080/ghe/index?page=${currentPage}&sortBy=ten&phongChieuId=${phongChieuId}`
      );
      setGheList(response.data.content);
    } catch (error) {
      console.error('Error fetching updated ghe list:', error);
    }

    // Close the update modal and reset the selectedGhe
    closeUpdateModal();
  };

  return (
    <div className="container">
      <h2>Quản lý ghế</h2>
      <div className="mb-3">
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Tìm kiếm theo tên ghế"
          />
          <Button variant="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>
        </InputGroup>
        <Form.Select value={phongChieuId} onChange={(event) => setPhongChieuId(event.target.value)}>
          <option value="">Lọc theo phòng chiếu</option>
          {phongChieuList.map((phongChieu) => (
            <option key={phongChieu.id} value={phongChieu.id}>
              {phongChieu.ten}
            </option>
          ))}
        </Form.Select>
        <Form.Select value="" onChange={handleSort}>
          <option value="">Sắp xếp theo</option>
          <option value="ten">Tên ghế</option>
          <option value="trangThai">Trạng thái</option>
        </Form.Select>
      </div>
      {noResults && <Alert variant="danger">Không tìm thấy kết quả phù hợp</Alert>}
      <div className="ghe-container">
        {(searchResults.length > 0 ? searchResults : gheList).map((ghe) => (
          <div
            key={ghe.id}
            className={`ghe ghe-trang-thai-${ghe.trangThai}`}
            onClick={() => openUpdateModal(ghe)}
          >
            <div className="ghe-name">{ghe.ten}</div>
            <div className="ghe-status custom-ghe-status">{ghe.loaiGhe && ghe.loaiGhe.ten}</div>
            {ghe.trangThai === 2 && (
              <div className="ghe-actions">
                <Button variant="warning" size="sm" onClick={() => openUpdateModal(ghe)}>
                  Sửa
                </Button>
                <Button variant="danger" size="sm" onClick={() => openDeleteModal(ghe)}>
                  Xóa
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
      <Button variant="success" onClick={openAddModal}>Thêm</Button>

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa ghế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa ghế <strong>{selectedGhe?.ten}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Hủy
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm ghế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddGhe onUpdate={fetchGheList} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật ghế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedGhe && (
            <UpdateGhe
              ghe={selectedGhe}
              onClose={closeUpdateModal}
              onUpdate={handleUpdateGheList}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Ghe;
