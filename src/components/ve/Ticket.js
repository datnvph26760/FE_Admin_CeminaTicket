import { cilCloudDownload, cilSwapVertical } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { CSmartPagination } from '@coreui/react-pro'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TicketService from 'src/services/TicketService'
class Ticket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            sortBy: "ngayDatVe",
            sortDir: "ASC",
            ticket: {},
            tickets: [],
            panigation: [],
            currentPage: 1,
        }
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }
    componentDidMount() {
        TicketService.getPageNo(1, this.state.sortDir, this.state.sortBy).then(res => {
            this.setState({ tickets: res.data });
        })
        TicketService.getPanigation().then(res => {
            this.setState({ panigation: res.data });
        })
    }
    setCurrentPage(pageno) {
        this.setState({ currentPage: pageno })
        TicketService.getPageNo(pageno, this.state.sortDir, this.state.sortBy).then(res => {
            this.setState({ tickets: res.data })
        })
    }
    getPageNo(pageno) {
        console.log(pageno);
    }
    viewdetail(id) {
        TicketService.getTicketById(id).then(res => {
            console.log(res.data)
            this.setState({ ticket: res.data })
        })
        this.setState({ visible: true })
    }
    deletebyId(id) {
        const continues = confirm("Bạn có chắc chắn muốn xóa Vé Này ???");
        if (continues) {
            TicketService.setDeleteState(id).then(res => {
                console.log(res.data)
            })
        }
    }
    setSortByAndDir(sort) {
        if (sort == this.state.sortBy) {
            if (this.state.sortDir == "ASC") {
                this.setState({ sortDir: "DESC" })
            } else {
                this.setState({ sortDir: "ASC" })
            }
        } else {
            this.setState({ sortDir: "DESC" })
            this.setState({ sortBy: sort })
        }
        this.setCurrentPage(1, this.state.sortDir, this.state.sortBy);
    }
    render() {
        return (
            <CContainer fluid>

                <CRow className="g-3 mb-5">
                    <CCol xs>
                        <CFormInput placeholder="First name" aria-label="First name" />
                    </CCol>
                    <CCol xs>
                        <CFormInput placeholder="Last name" aria-label="Last name" />
                    </CCol>
                    <CCol xs>
                        <CFormInput placeholder="Last name" aria-label="Last name" />
                    </CCol>
                </CRow >

                <CModal scrollable visible={this.state.visible} onClose={() => this.setState({ visible: false })}>
                    <CModalHeader>
                        <CModalTitle></CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {Object.keys(this.state.ticket).length > 0 ? (
                            <CTable>
                                <CTableHead>
                                    <CTableRow>
                                        <CTableHeaderCell scope="col">Field</CTableHeaderCell>
                                        <CTableHeaderCell scope="col">Value</CTableHeaderCell>
                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Tên Phim:
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.lichChieu.thongTinPhim.ten}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Ghế :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.ghe.ten}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Phòng Chiếu :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.lichChieu.phongChieu.ten}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Giá vé :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.gia} VNĐ
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Ngày chiếu :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.lichChieu.ngayChieu}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Giờ chiếu :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.lichChieu.gioiChieu}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Giờ kết thúc :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.lichChieu.gioiKetThuc}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Ngày đặt :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.ngayDatVe}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Trạng thái :
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.ticket.trangThai}
                                        </CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        ) : (
                            <p>No ticket details available.</p>
                        )}
                    </CModalBody>
                    <CModalFooter>
                        <CButton color="secondary" onClick={() => this.setState({ visible: false })}>
                            Close
                        </CButton>
                    </CModalFooter>
                </CModal>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ghế
                                <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("ghe.ten")} />
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">Loại Ghế
                                <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("ghe.loaiGhe.ten")} />
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">Phòng Chiếu <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("lichChieu.phongChieu.ten")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Tên Phim <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("lichChieu.phongChieu.ten")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Giờ bắt đầu <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("lichChieu.gioiChieu")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Giờ kết thúc <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("lichChieu.gioiKetThuc")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ngày Chiếu <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("lichChieu.ngayChieu")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Giá vé <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("gia")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Trạng thái <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("trangThai")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ngày đặt <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("ngayDatVe")} /></CTableHeaderCell>
                            <CTableHeaderCell scope="col">Funtion</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {this.state.tickets.map((ticket, index) => (
                            <CTableRow key={ticket.id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{ticket.ghe.ten}</CTableDataCell>
                                <CTableDataCell>{ticket.ghe.loaiGhe.ten}</CTableDataCell>
                                <CTableDataCell>{ticket.lichChieu.phongChieu.ten}</CTableDataCell>
                                <CTableDataCell>{ticket.lichChieu.thongTinPhim.ten}</CTableDataCell>
                                <CTableDataCell>{ticket.lichChieu.gioiChieu}</CTableDataCell>
                                <CTableDataCell>{ticket.lichChieu.gioiKetThuc}</CTableDataCell>
                                <CTableDataCell>{ticket.lichChieu.ngayChieu}</CTableDataCell>
                                <CTableDataCell>{ticket.gia}</CTableDataCell>
                                <CTableDataCell>{ticket.trangThai}</CTableDataCell>
                                <CTableDataCell>{ticket.ngayDatVe}</CTableDataCell>
                                <CTableDataCell>
                                    {/* <Link to={}> View </Link>
                                    <Link to={}> Edit </Link>
                                    <Link to={}> Delete </Link> */}
                                    <CButton color="secondary" onClick={() => this.viewdetail(ticket.id)}>View</CButton>
                                    <CButton color="danger" onClick={() => this.deletebyId(ticket.id)}>Delete</CButton>
                                    <Link to={"/formve/" + ticket.id.id_ghe+"/"+ticket.id.id_lich_chieu} className='btn btn-success' >Update</Link>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
                <CSmartPagination
                    align="center"
                    activePage={this.state.currentPage}
                    pages={this.state.panigation.length}
                    onActivePageChange={this.setCurrentPage}
                />
                <Link to={"/formve/add/add"} className='btn btn-success' >Add</Link>
            </CContainer>
        )
    }
}
export default Ticket;

// {
//     "id": {
//         "id_lich_chieu": "92726cd6-3212-4dca-98c6-1c08ac63e39a",
//         "id_ghe": "443a5f94-7766-4171-aa6d-035fc287d9ca"
//     },
//     "lichChieu": {
//         "id": "92726cd6-3212-4dca-98c6-1c08ac63e39a",
//         "phongChieu": {
//             "id": "c05b59a7-2126-4905-8df7-58c8e38264b6",
//             "ten": "Room D",
//             "soLuongGhe": 90,
//             "trangThai": 1,
//             "updateAt": null,
//             "createAt": "2023-07-13T13:05:08.303",
//             "createBy": null,
//             "updateBy": null,
//             "deleted": false
//         },
//         "thongTinPhim": {
//             "id": "4d7d0ac7-9be0-4917-9c5e-6a02aa89b73f",
//             "ten": "Movie 4",
//             "daoDien": "Director 4",
//             "nhaSanXuat": "Producer 4",
//             "dienVien": "Actor 4, Actress 4",
//             "namPhatHanh": 2020,
//             "thoiLuong": 110,
//             "tuoiGioiHan": 14,
//             "noiDung": "This is the plot of Movie 4.",
//             "trailer": null,
//             "poster": null,
//             "quocGia": null,
//             "ngonNgu": null,
//             "createAt": "2023-07-13T12:56:42.283",
//             "updateAt": null,
//             "deleted": false
//         },
//         "gioiChieu": "1900-01-01T19:00:00",
//         "gioiKetThuc": "1900-01-01T21:00:00",
//         "ngayChieu": "1900-01-01T13:09:14.2333333",
//         "trangThai": 1,
//         "createAt": "2023-07-13T13:09:14.233",
//         "updateAt": null,
//         "updateBy": null,
//         "createBy": null,
//         "deleted": false
//     },
//     "ghe": {
//         "id": "443a5f94-7766-4171-aa6d-035fc287d9ca",
//         "ten": "Seat 2",
//         "loaiGhe": {
//             "id": "b3175ce1-6af1-4e54-aa51-36df58c8939b",
//             "ten": "Executive",
//             "trangThai": 1,
//             "updateAt": null,
//             "createAt": "2023-07-13T13:41:05.42",
//             "createBy": null,
//             "updateBy": null,
//             "deleted": false
//         },
//         "phongChieu": {
//             "id": "bf359cf1-ffec-48d8-ba1f-3922fa1c0298",
//             "ten": "Room E",
//             "soLuongGhe": 150,
//             "trangThai": 1,
//             "updateAt": null,
//             "createAt": "2023-07-13T13:05:08.303",
//             "createBy": null,
//             "updateBy": null,
//             "deleted": false
//         },
//         "trangThai": 1,
//         "updateAt": null,
//         "createAt": "2023-07-13T13:43:17.613",
//         "deleted": false
//     },
//     "gia": 100000,
//     "trangThai": 1,
//     "ngayDatVe": "2023-07-13",
//     "createAt": "2023-07-13T13:55:09.567",
//     "updateAt": null,
//     "updateBy": null,
//     "createBy": null,
//     "deleted": false,
//     "hoaDon": {
//         "id": "58b08909-4292-450e-a47d-02efedb03b2d",
//         "ghiChu": "Ghi chú 14",
//         "tongGia": 130,
//         "tongGiaSauGiam": "117.0000",
//         "thoiGianThanhToan": "2023-07-06T22:17:30.297",
//         "trang_Thai": 1,
//         "createAt": null,
//         "updateAt": null,
//         "updateBy": null,
//         "createBy": null,
//         "deleted": false,
//         "nhanVien": null,
//         "khachHang": null
//     }
// }