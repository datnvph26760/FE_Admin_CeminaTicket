import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormSelect } from '@coreui/react'
import React from 'react'
import withRouter from 'src/hos'
import GheService from 'src/services/GheService'
import GiaVeLichChieuService from 'src/services/GiaVeLichChieuService'
import HoaDonService from 'src/services/HoaDonService'
import LichChieuService from 'src/services/LichChieuService'
import axios from 'axios';
const { Component } = require("react")
class FormTicket extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_ghe: this.props.params.id_ghe,
            id_lichChieu: this.props.params.id_lichChieu,
            id_hoadon: "",
            id_ghe: "",
            hoadondetail: {},
            ghes: [],
            lichChieus: [],
            hoaDon: [],
            hoaDonError: [],
            lichChieuError: [],
            gheError: [],
            gia: 0,
            lichChieu: {},
            ghe: {},
            trangThai: "0",
            function: "add"
        }
    }
    async componentDidMount() {
        if (this.state.id_ghe == "add") {
            this.setState({ function: "add" })
        } else {
            console.log(this.state.id_ghe);
            console.log(this.state.id_lichChieu);
            this.setState({ function: "update" })
        }

        try {
            const hoaDonResponse = await HoaDonService.getHoaDons();
            this.setState({ hoaDon: hoaDonResponse.data });

            const lichChieuResponse = await LichChieuService.getLichChieus();
            this.setState({ lichChieus: lichChieuResponse.data });
        } catch (error) {
            console.log(error);
            // Handle error if necessary
        }
    }
    async selectLichChieu(value) {
        const idphong = value;
        const errors = [];
        if (value.trim() == "Choose...") {
            errors.push("Vui lòng chọn Lich chieu");
        } else {
            try {
                const lichChieuResponse = await LichChieuService.getLichChieuById(idphong);
                this.setState({ lichChieu: lichChieuResponse.data });

                const gheResponse = await GheService.getGhes(lichChieuResponse.data.phongChieu.id);
                this.setState({ ghes: gheResponse.data, ghe: {} });
            } catch (error) {
                console.log(error);
                // Handle error if necessary
            }
        }
    }

    async selectHoaDon(value) {
        const idHoaDon = value;
        const errors = [];
        if (value.trim() == "Choose...") {
            errors.push("Vui lòng chọn hóa đơn");
        } else {
            try {
                const hoaDonResponse = await HoaDonService.getHoaDonById(idHoaDon);
                this.setState({ hoadondetail: hoaDonResponse.data, id_hoadon: hoaDonResponse.data.id });
            } catch (error) {
                console.log(error);
                // Handle error if necessary
            }
        }
    }

    async selectGhe(value) {
        const idghe = value;
        let ghedt = {};
        const errors = [];
        if (idghe.trim() == "Choose...") {
            errors.push("Vui lòng Chọn Ghế");
        } else {
            try {
                const gheResponse = await GheService.getGheById(idghe);
                ghedt = gheResponse.data;

                const giaVeLichChieuResponse = await GiaVeLichChieuService.getGiaVeLichChieuByLichChieuLoaiGhe(this.state.lichChieu.id, gheResponse.data.loaiGhe.id);
                this.setState({ gia: giaVeLichChieuResponse.data.gia, ghe: ghedt });
            } catch (error) {
                confirm("Do giá ghế chưa được set nên mặc định là 50k ");
                // Handle error from GiaVeLichChieuService call
                this.setState({ gia: 50000, ghe: ghedt, id_ghe: idghe });
            }
        }
        this.setState({ gheError: errors });
    }

    saveVe() {
        this.selectGhe(this.state.id_ghe);
        this.selectHoaDon(this.state.id_hoadon);
        this.selectLichChieu(this.state.id_lichChieu);
        if (
            typeof this.state.id_ghe !== "undefined" &&
            typeof this.state.id_lichChieu !== "undefined" &&
            Object.keys(this.state.hoaDon).length !== 0
        ) {
            if (
                this.state.lichChieuError.length === 0 &&
                this.state.gheError.length === 0 &&
                this.state.hoaDonError.length === 0
            ) {
                if (confirm("Bạn muốn thêm hoặc sửa vé này?")) {
                    if (this.state.function === "add") {
                        const addve = {
                            id_lich_chieu: this.state.lichChieu.id,
                            id_ghe: this.state.ghe.id,
                            gia: this.state.gia,
                            trangThai: this.state.trangThai,
                            hoaDon: this.state.hoadondetail,
                        };
                        console.log(addve);
                    } else if (this.state.function === "update") {
                        const updateve = {
                            id_lich_chieu: this.state.lichChieu.id,
                            id_ghe: this.state.ghe.id,
                            gia: this.state.gia,
                            trangThai: this.state.trangThai,
                            hoaDon: this.state.hoadondetail,
                        };
                        console.log(updateve);
                    }
                }
            }
        } else {
            confirm("Kiểm tra lại đầu vào");
        }
    }

    render() {
        return (
            <>
                <CForm className="row g-3">
                    <CCol xs={12}>
                        <CFormSelect id="inputState" label="Hóa Đơn" onChange={(event) => { this.selectHoaDon(event.target.value) }}>
                            <option>Choose...</option>
                            {this.state.hoaDon.map(hoadon => (
                                <option value={hoadon.id}>
                                    {hoadon.id}
                                </option>
                            ))}
                        </CFormSelect>
                        {this.state.hoaDonError.length > 0 ? (
                            this.state.hoaDonError.map((error, index) => (
                                <CCol md={12} key={index}>
                                    <p className="text-danger">{error}</p>
                                </CCol>
                            ))
                        ) : (
                            <></>
                        )}
                    </CCol>
                    <CCol xs={12}>
                        <CFormSelect id="inputState" label="Lịch Chiếu" onChange={(event) => { this.selectLichChieu(event.target.value) }}>
                            <option>Choose...</option>
                            {this.state.lichChieus.map(lichChieu => (
                                <option value={lichChieu.id}>
                                    {lichChieu.thongTinPhim.ten + " - " + lichChieu.gioiChieu + " - " + lichChieu.phongChieu.ten}
                                </option>
                            ))}
                        </CFormSelect>
                        {this.state.lichChieuError.length > 0 ? (
                            this.state.lichChieuError.map((error, index) => (
                                <CCol md={12} key={index}>
                                    <p className="text-danger">{error}</p>
                                </CCol>
                            ))
                        ) : (
                            <></>
                        )}
                    </CCol>
                    <CCol xs={6}>
                        <CFormSelect id="inputState" label="Ghế" onChange={(event) => { this.selectGhe(event.target.value) }}>
                            <option>Choose...</option>
                            {this.state.ghes.map(ghe => (
                                <option value={ghe.id}>
                                    {ghe.ten + " - " + ghe.loaiGhe.ten}
                                </option>
                            ))}
                        </CFormSelect>
                        {this.state.gheError.length > 0 ? (
                            this.state.gheError.map((error, index) => (
                                <CCol md={12} key={index}>
                                    <p className="text-danger">{error}</p>
                                </CCol>
                            ))
                        ) : (
                            <></>
                        )}
                    </CCol>
                    <CCol xs={12}>
                        <CFormInput type="email" id="inputEmail4" label="Giá" value={this.state.gia} disabled />
                    </CCol>
                    <CCol xs={12}>
                        <label>Trạng Thái</label>
                    </CCol>
                    <CCol xs={4}>
                        <CFormCheck type="radio" name="trangThai" id="trangThai2" value="0" label="Đang Đặt" onClick={(event) => (this.setState({ trangThai: event.target.value }))} checked={this.state.trangThai == "0"} />
                    </CCol>
                    <CCol xs={4}>
                        <CFormCheck type="radio" name="trangThai" id="trangThai1" value="1" label="Đã thanh toán" onClick={(event) => (this.setState({ trangThai: event.target.value }))} checked={this.state.trangThai == "1"} />
                    </CCol>
                    <CCol xs={4}>
                        <CFormCheck type="radio" name="trangThai" id="trangThai3" value="2" label="Đã hủy" onClick={(event) => (this.setState({ trangThai: event.target.value }))} checked={this.state.trangThai == "2"} />
                    </CCol>
                    {/* <CFormInput id="inputAddress" label="Ngày Đặt Vé" placeholder="" /> */}
                    <CCol xs={12}>
                        <CButton type="submit" onClick={() => { this.saveVe() }} >{this.state.function}</CButton>
                    </CCol>
                </CForm>
            </>
        )
    }
}
export default withRouter(FormTicket)

// {
//     "id": "872aa6c4-61b6-45c7-ab82-01031d59e3e8",
//     "phongChieu": {
//         "id": "2e404dce-a1de-4a28-86af-d787b9cd9792",
//         "ten": "Room A",
//         "soLuongGhe": 100,
//         "trangThai": 1,
//         "updateAt": null,
//         "createAt": "2023-07-13T13:05:08.303",
//         "createBy": null,
//         "updateBy": null,
//         "deleted": false
//     },
//     "thongTinPhim": {
//         "id": "b1b5c65b-0957-454b-9db0-7baa19a32d70",
//         "ten": "Movie 1",
//         "daoDien": "Director 1",
//         "nhaSanXuat": "Producer 1",
//         "dienVien": "Actor 1, Actress 1",
//         "namPhatHanh": 2022,
//         "thoiLuong": 120,
//         "tuoiGioiHan": 18,
//         "noiDung": "This is the plot of Movie 1.",
//         "trailer": null,
//         "poster": null,
//         "quocGia": null,
//         "ngonNgu": null,
//         "createAt": "2023-07-13T12:56:42.283",
//         "updateAt": null,
//         "deleted": false
//     },
//     "gioiChieu": "19:00:00",
//     "gioiKetThuc": "21:00:00",
//     "ngayChieu": "2023-07-13",
//     "trangThai": 1,
//     "createAt": "2023-07-13T23:38:00.817",
//     "updateAt": null,
//     "updateBy": null,
//     "createBy": null,
//     "deleted": false
// },
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