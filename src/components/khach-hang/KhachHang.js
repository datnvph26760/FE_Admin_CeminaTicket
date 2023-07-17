import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddKhachHang from "./AddKH";
import UpdateKH from './UpdateKH';

const KhachHang = () => {
  const [listKH, setListKH] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedKhachHang, setSelectedKhachHang] = useState(null);

  useEffect(() => {
    loadDataKH();
  }, [currentPage]);

  const loadDataKH = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cemina/khach-hang/hien-thi?page=${currentPage}`
      );
      setListKH(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching khach hang:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //add
  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  //update
  const openUpdateModal = (kh) => {
    setSelectedKhachHang(kh);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedKhachHang(null);
  };
  //delete
  const openDeleteModal = (kh) => {
    setSelectedKhachHang(kh);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/cemina/khach-hang/delete/${selectedKhachHang.id}`
      );
      setShowDeleteModal(false);
      setSelectedKhachHang(null);
      loadDataKH();
    } catch (error) {
      console.error("Error deleting khach hang:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">DANH SÁCH KHÁCH HÀNG</h2>
        <div>
          <Button variant="success" size="sm" onClick={openAddModal}>
            Thêm
          </Button>
        </div>
        <br />
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
                {/* Thêm các cột khác nếu cần */}
              </tr>
            </thead>
            <tbody>
              {listKH.map((kh, index) => (
                <tr key={kh.id}>
                  <td>{(currentPage - 1) * 10 + index + 1}</td>
                  <td>{kh.hoTen}</td>
                  <td>{kh.email}</td>
                  <td>{kh.sdt}</td>
                  <td>{kh.gioiTinh === true ? "Nam" : "Nữ"}</td>
                  <td>{kh.ngaySinh}</td>
                  <td>
                    {kh.trangThai === 0 ? "Đang Hoạt Động" : "Dừng Hoạt Động"}
                  </td>
                  <td>
                  <Button variant="warning" size="sm" onClick={() => openUpdateModal(kh)}>
                  Update
                </Button>{' '}
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => openDeleteModal(kh)}
                    >
                      Delete
                    </button>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/khach-hang/detail/${kh.id}`}
                    >
                      Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <nav>
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index + 1}
                  className={`page-item ${currentPage === index + 1 ? "active" : ""
                    }`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${currentPage === totalPages ? "disabled" : ""
                  }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <Modal show={showAddModal} onHide={closeAddModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Khách Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddKhachHang onUpdate={loadDataKH} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* update */}
      <Modal show={showUpdateModal} onHide={closeUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedKhachHang && (
            <UpdateKH
              khachHang={selectedKhachHang}
              onClose={closeUpdateModal}
              onUpdate={loadDataKH}  />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeUpdateModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      {/* confirm */}

      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa Khách Hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa Khách Hàng{" "}
          <strong>{selectedKhachHang?.hoTen}</strong>?
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
    </>
  );
};

export default KhachHang;
