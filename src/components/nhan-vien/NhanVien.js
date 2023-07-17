import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddNV from "./AddNV";
import UpdateNV from './UpdateNV';

const NhanVien = () => {
  const [listNV, setListNV] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNhanVien, setSelectedNhanVien] = useState(null);

  useEffect(() => {
    loadDataNV();
  }, [currentPage]);

  const loadDataNV = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cemina/nhan-vien/hien-thi?page=${currentPage}`
      );
      setListNV(response.data.content);
      setTotalPages(response.data.totalPages);
      // Cập nhật totalPages nếu có
    } catch (error) {
      console.error("Error fetching nhan vien:", error);
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const openAddNV = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  //update
  const openUpdateModal = (nv) => {
    setSelectedNhanVien(nv);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedNhanVien(null);
  };
  //delete
  const openDeleteModal = (nv) => {
    setSelectedNhanVien(nv);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/cemina/nhan-vien/delete/${selectedNhanVien.id}`
      );
      setShowDeleteModal(false);
      setSelectedNhanVien(null);
      loadDataNV();
    } catch (error) {
      console.error("Error deleting nhan vien:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">DANH SÁCH NHÂN VIÊN</h2>
        <div>
          <button className="btn btn-primary" onClick={openAddNV}>
            Add
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Chức vụ</th>
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
              {listNV.map((nv, index) => (
                <tr key={nv.id}>
                  <td>{index + 1}</td>
                  <td>{nv.hoTen}</td>
                  <td>{nv.idCV.tenCV}</td>
                  <td>{nv.email}</td>
                  <td>{nv.sdt}</td>
                  <td>{nv.gioiTinh == true ? "Nam" : "Nữ"}</td>
                  <td>{nv.ngaySinh}</td>
                  <td>{nv.trangThai}</td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => openAddNV(nv)}>
                      Update
                    </Button>{' '}
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => openDeleteModal(nv)}
                    >
                      Delete
                    </button>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/nhan-vien/detail/${nv.id}`}
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
          <Modal.Title>Thêm nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddNV onUpdate={loadDataNV} />
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
          {selectedNhanVien && (
            <UpdateNV
              nhanVien={selectedNhanVien}
              onClose={closeUpdateModal}
              onUpdate={loadDataNV} />
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
          <Modal.Title>Xóa nhân viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa nhân viên{" "}
          <strong>{selectedNhanVien?.hoTen}</strong>?
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

export default NhanVien;
