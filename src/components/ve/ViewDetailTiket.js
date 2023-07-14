import { CButton, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TicketService from 'src/services/TicketService'

class ViewDetailTicket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ticket: []
        }
    }
    componentDidMount() {
        TicketService.getAllTickets().then(res => {
            this.setState({ tickets: res.data });
            console.log(res.data);
        })
    }
    viewdetail(id){
        TicketService.getPersonById(id).then(res =>{
            console.log(res.data)
        })
    }
    render() {
        return (
            <div>
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
                                <CTableHeaderCell scope="row">{index+1}</CTableHeaderCell>
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
                                    <CButton color="secondary"  onClick={() => this.viewdetail(ticket.id)}>View</CButton>
                                    <CButton color="danger"  onClick={() => this.viewdetail(ticket.id)}>View</CButton>
                                    </CTableDataCell>
                            </CTableRow>
                        ))}
                    </CTableBody>
                </CTable>
            </div>
        )
    }
}
export default ViewDetailTicket;
