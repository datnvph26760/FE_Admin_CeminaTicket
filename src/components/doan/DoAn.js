import { cilSwapVertical } from '@coreui/icons'
import { Link, NavLink, useLocation } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { CButton, CCol, CContainer, CFormInput, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import { CSmartPagination } from '@coreui/react-pro'
import React, { Component } from 'react'
import DoAnService from 'src/services/DoAnService'
class DoAn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            sortBy: "ten",
            sortDir: "ASC",
            doan: {},
            doans: [],
            panigation: [],
            currentPage: 1,
            searchtxt: ""
        }
        this.setCurrentPage = this.setCurrentPage.bind(this);
    }
    componentDidMount() {
        DoAnService.getPageNo(1, this.state.sortDir, this.state.sortBy).then(res => {
            this.setState({ doans: res.data });
        })
        DoAnService.getPanigation().then(res => {
            this.setState({ panigation: res.data });
        })
    }
    setCurrentPage(pageno) {
        this.setState({ currentPage: pageno })
        DoAnService.getPageNo(pageno, this.state.sortDir, this.state.sortBy).then(res => {
            this.setState({ doans: res.data })
        })
    }
    viewdetail(id) {
        DoAnService.getDoAnById(id).then(res => {
            console.log(res.data)
            this.setState({ doan: res.data })
        })
        this.setState({ visible: true })
    }
    deletebyId(id) {
        const continues = confirm("Bạn có chắc chắn muốn xóa Vé Này ???");
        if (continues) {
            DoAnService.setDeleteState(id).then(res => {
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
    setTxtSearch(txt) {
        this.setState({
            searchtxt: txt
        })
    }
    search() {
        DoAnService.searchDoAn(this.state.searchtxt).then(res => {
            if (res.data.length ==0) {
                alert("Không tìm thấy đồ ăn với tên là :" + this.state.searchtxt);
            } else {
                this.setState({
                    doans: res.data
                })
            }
        })
    }
    render() {
        return (
            <CContainer md>
                <CRow className="g-3 mb-5">
                    <CCol>
                        <CFormInput placeholder="search food" aria-label="Seach"
                            value={this.state.txt}
                            onChange={(event) => { this.setTxtSearch(event.target.value) }} />
                        <CButton onClick={() => { this.search() }}>Search</CButton>
                    </CCol>
                </CRow >
                <CModal scrollable visible={this.state.visible} onClose={() => this.setState({ visible: false })}>
                    <CModalHeader>
                        <CModalTitle>Foot Detail</CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                        {Object.keys(this.state.doan).length > 0 ? (
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
                                            Tên đồ ăn:
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.doan.ten}
                                        </CTableDataCell>
                                    </CTableRow>
                                    <CTableRow >
                                        <CTableDataCell>
                                            Giá Đồ Ăn:
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {this.state.doan.gia}
                                        </CTableDataCell>
                                    </CTableRow>
                                </CTableBody>
                            </CTable>
                        ) : (
                            <p>No doan details available.</p>
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
                            <CTableHeaderCell scope="col">Tên đồ ăn
                                <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("ten")} />
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">Giá
                                <CIcon icon={cilSwapVertical} size="md" onClick={() => this.setSortByAndDir("gia")} />
                            </CTableHeaderCell>
                            <CTableHeaderCell scope="col">Funtion</CTableHeaderCell>
                        </CTableRow>
                    </CTableHead>
                    <CTableBody>
                        {this.state.doans.map((doan, index) => (
                            <CTableRow key={doan.id}>
                                <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                                <CTableDataCell>{doan.ten}</CTableDataCell>
                                <CTableDataCell>{doan.gia}</CTableDataCell>
                                <CTableDataCell>
                                    <CButton color="secondary" onClick={() => this.viewdetail(doan.id)}>View</CButton>
                                    <CButton color="danger" onClick={() => this.deletebyId(doan.id)}>Delete</CButton>
                                    {/* <CButton color="success" onClick={() => this.deletebyId(doan.id)}>Update</CButton> */}
                                    <Link to={"/formdoan/" + doan.id} className='btn btn-success' >Update</Link>
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
                <Link to={"/formdoan/null"} className='btn btn-success' >New</Link>
            </CContainer>
        )
    }
}
export default DoAn;

// {
//     "id": "3be55afc-ee00-46c8-aefd-1a2932e88d82",
//     "ten": "DoAn 6",
//     "gia": 8.99,
//     "createAt": "2023-07-07T15:33:15.633",
//     "updateAt": null,
//     "updateBy": null,
//     "createBy": null,
//     "deleted": false
// },