import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AddCV from "./AddCV";
const ChucVu = () => {
  const [listCV, setListCV] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCV, setSelectedCV] = useState(null);

  useEffect(() => {
    loadDataCV();
  }, []);

  const loadDataCV = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/cemina/chuc-vu/hien-thi?page=${currentPage}`
      );
      setListCV(response.data.content);
      setTotalPages(response.data.totalPages);
      // Cập nhật totalPages nếu có
    } catch (error) {
      console.error("Error fetching chuc vu:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  //update
  const openUpdateModal = (cv) => {
    setSelectedCV(cv);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedCV(null);
  };
  //delete
  const openDeleteModal = (kh) => {
    setSelectedCV(kh);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/cemina/chuc-vu/delete/${selectedCV.id}`
      );
      setShowDeleteModal(false);
      setSelectedCV(null);
      loadDataCV();
    } catch (error) {
      console.error("Error deleting chuc vu:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center">DANH SÁCH CHỨC VỤ</h2>
        <div>
          <button className="btn btn-primary" onClick={openAddModal}>
            Add
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên chức vụ</th>
                <th>Trạng thái</th>
                <th>Hành động</th>

              </tr>
            </thead>
            <tbody>
              {listCV.map((cv, index) => (
                <tr key={cv.id}>
                  <td>{index + 1}</td>
                  <td>{cv.tenCV}</td>
                  <td>{cv.trangThai}</td>
                  <td>
                    <Link
                      className="btn btn-warning mx-2"
                      to={`/update/${cv.id}`}
                    >
                      {" "}
                      Update
                    </Link>
                    <button
                      className="btn btn-danger mx-2"

                    >
                      Delete
                    </button>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/player/${cv.id}`}
                    >
                      Detail
                    </Link>
                  </td>
                </tr>

              ))}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
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
          <Modal.Title>Thêm chức vụ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddCV onUpdate={loadDataCV} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChucVu;
