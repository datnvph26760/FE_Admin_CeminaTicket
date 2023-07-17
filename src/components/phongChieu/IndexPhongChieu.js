import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AddPhongChieu from './AddPhongChieu';
import UpdatePhongChieu from './UpdatePhongChieu';

const PhongChieu = () => {
  const [phongChieuList, setPhongChieuList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPhongChieu, setSelectedPhongChieu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    fetchPhongChieuList();
  }, [currentPage, sortBy]);

  const fetchPhongChieuList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/phongchieu/index?page=${currentPage}&size=5&sortBy=${sortBy}`
      );
      setPhongChieuList(response.data.content);
      setTotalPages(response.data.totalPages);
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
        `http://localhost:8080/phongchieu/search?keyword=${keyword}`
      );
      if (response.data.length > 0) {
        setSearchResults(response.data);
        setNoResults(false);
      } else {
        setSearchResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error('Error searching phong chieu:', error);
    }
  };

  const handleSort = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/phongchieu/delete/${selectedPhongChieu.id}`);
      fetchPhongChieuList();
      setShowDeleteModal(false);
      setSelectedPhongChieu(null);
    } catch (error) {
      console.error('Error deleting phong chieu:', error);
    }
  };

  const getStatusText = (status) => {
    return status === 0 ? 'Đang hoạt động' : 'Dừng hoạt động';
  };

  const openDeleteModal = (phongChieu) => {
    setSelectedPhongChieu(phongChieu);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedPhongChieu(null);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  const openUpdateModal = (phongChieu) => {
    setSelectedPhongChieu(phongChieu);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedPhongChieu(null);
  };

  const handleUpdatePhongChieuList = (updatedPhongChieu) => {
    const updatedList = phongChieuList.map((phongChieu) => {
      if (phongChieu.id === updatedPhongChieu.id) {
        return updatedPhongChieu;
      }
      return phongChieu;
    });
    setPhongChieuList(updatedList);
  };

  return (
    <div className="container">
      <h2>Danh sách phòng chiếu</h2>
      <div className="mb-3">
        <Form.Control
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tìm kiếm theo tên phòng"
        />
        <Button variant="primary" onClick={handleSearch}>
          Tìm kiếm
        </Button>
        <Form.Select value={sortBy} onChange={handleSort}>
          <option value="">Sắp xếp theo</option>
          <option value="ten">Tên phòng</option>
          <option value="soLuongGhe">Số lượng ghế</option>
          <option value="trangThai">Trạng thái</option>
        </Form.Select>
      </div>
      {noResults && <Alert variant="danger">Không tìm thấy kết quả phù hợp</Alert>}
      <Table striped bordered>
        <thead>
          <tr>
            <th>Tên</th>
            <th>Số lượng ghế</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {(searchResults.length > 0 ? searchResults : phongChieuList).map((phongChieu) => (
            <tr key={phongChieu.id}>

              <td>{phongChieu.ten}</td>
              <td>{phongChieu.soLuongGhe}</td>
              <td>{getStatusText(phongChieu.trangThai)}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => openUpdateModal(phongChieu)}>
                  Cập nhật
                </Button>{' '}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => openDeleteModal(phongChieu)}
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
          <Modal.Title>Xóa phòng chiếu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phòng chiếu <strong>{selectedPhongChieu?.ten}</strong>?
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
          <Modal.Title>Thêm phòng chiếu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPhongChieu onUpdate={handleUpdatePhongChieuList} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật phòng chiếu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPhongChieu && (
            <UpdatePhongChieu
              phongChieu={selectedPhongChieu}
              onClose={closeUpdateModal}
              onUpdate={handleUpdatePhongChieuList}
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

export default PhongChieu;
