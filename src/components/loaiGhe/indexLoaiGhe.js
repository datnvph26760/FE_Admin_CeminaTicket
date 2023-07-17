import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddLoaiGhe from './AddLoaiGhe';
import UpdateLoaiGhe from './UpdateLoaiGhe';

const LoaiGhe = () => {
  const [loaiGheList, setLoaiGheList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedLoaiGhe, setSelectedLoaiGhe] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchLoaiGheList();
  }, [currentPage, sortBy]);

  useEffect(() => {
    handleSearch();
  }, [keyword]);

  const fetchLoaiGheList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/loaighe/index?page=${currentPage}&size=5&sortBy=${sortBy}`
      );
      setLoaiGheList(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching loai ghe:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = async () => {
    if (keyword.trim() === '') {
      setSearchResults([]);
      setNoResults(false);
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8080/loaighe/search?keyword=${keyword}`
        );
        if (response.data.length > 0) {
          setSearchResults(response.data);
          setNoResults(false);
        } else {
          setSearchResults([]);
          setNoResults(true);
        }
      } catch (error) {
        console.error('Error searching loai ghe:', error);
      }
    }
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/loaighe/delete/${selectedLoaiGhe.id}`);
      fetchLoaiGheList();
      setShowDeleteModal(false);
      setSelectedLoaiGhe(null);
    } catch (error) {
      console.error('Error deleting loai ghe:', error);
    }
  };

  const getStatusText = (status) => {
    return status === 0 ? 'Đang hoạt động' : 'Dừng hoạt động';
  };

  const openDeleteModal = (loaiGhe) => {
    setSelectedLoaiGhe(loaiGhe);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedLoaiGhe(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openUpdateModal = (loaiGhe) => {
    setSelectedLoaiGhe(loaiGhe);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedLoaiGhe(null);
  };

  const handleUpdateLoaiGheList = (updatedLoaiGhe) => {
    const updatedList = loaiGheList.map((loaiGhe) => {
      if (loaiGhe.id === updatedLoaiGhe.id) {
        return updatedLoaiGhe;
      }
      return loaiGhe;
    });
    setLoaiGheList(updatedList);
  };

  return (
    <div className="container">
      <h2>Danh sách loại ghế</h2>
      <div className="mb-3">
        <Form.Control
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tìm kiếm theo tên loại ghế"
        />
        <Button variant="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Form.Select value={sortBy} onChange={handleSort}>
          <option value="">Sắp xếp theo</option>
          <option value="ten">Tên loại ghế</option>
          <option value="trangThai">Trạng thái</option>
        </Form.Select>
      </div>
      {noResults && <Alert variant="danger">Không tìm thấy kết quả phù hợp</Alert>}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {(searchResults.length > 0 ? searchResults : loaiGheList).map((loaiGhe) => (
            <tr key={loaiGhe.id}>
              <td>{loaiGhe.ten}</td>
              <td>{getStatusText(loaiGhe.trangThai)}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => openUpdateModal(loaiGhe)}>
                  Cập nhật
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openDeleteModal(loaiGhe)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            variant={currentPage === index + 1 ? 'primary' : 'outline-primary'}
          >
            {index + 1}
          </Button>
        ))}
      </div>
      <div>
        <Button variant="success" size="sm" onClick={openAddModal}>
          Thêm
        </Button>
      </div>

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa loại ghế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa loại ghế <strong>{selectedLoaiGhe?.ten}</strong>?
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
          <Modal.Title>Thêm loại ghế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddLoaiGhe onUpdate={fetchLoaiGheList} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật loại ghế</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLoaiGhe && (
            <UpdateLoaiGhe
              loaiGhe={selectedLoaiGhe}
              onClose={closeUpdateModal}
              onUpdate={handleUpdateLoaiGheList}
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

export default LoaiGhe;
