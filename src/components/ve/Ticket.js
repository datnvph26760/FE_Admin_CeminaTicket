import { CButton, CContainer, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TicketService from 'src/services/TicketService'

class Ticket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tickets: []
        }
    }
    componentDidMount() {
        TicketService.getAllTickets().then(res => {
            this.setState({ tickets: res.data });
            console.log(res.data);
        })
    }
    viewdetail(id) {
        TicketService.getTicketById(id).then(res => {
            console.log(res.data)
        })
    }
    deletebyId(id) {
        TicketService.getPersonById(id).then(res => {
            console.log(res.data)
        })
    }
    render() {
        return (
            <CContainer md>
                <CTable>
                    <CTableHead>
                        <CTableRow>
                            <CTableHeaderCell scope="col">#</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ghế </CTableHeaderCell>
                            <CTableHeaderCell scope="col">Phòng Chiếu</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Giờ bắt đầu</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Giờ kết thúc</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ngày Chiếu</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Giá vé</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Ngày đặt</CTableHeaderCell>
                            <CTableHeaderCell scope="col">Funtion</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {this.state.tickets.map((ticket, index) => (
                            <CTableRow key={ticket.id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{ticket.ghe.ten}</CTableDataCell>
                                <CTableDataCell>{ticket.lichChieu.phongChieu.ten}</CTableDataCell>
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
                                    <CButton color="danger" onClick={() => this.viewdetail(ticket.id)}>View</CButton>
                                </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
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