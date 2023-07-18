import { CButton, CCol, CContainer, CForm, CFormCheck, CFormInput, CFormSelect } from "@coreui/react"
import { Link } from "react-router-dom"
import withRouter from "src/hos"
import DoAnService from "src/services/DoAnService"

const { Component } = require("react")

class FormDoAn extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.params.id,
            gia: 0,
            ten: "",
            tenErrors: [],
            giaErrors: [],
            function: ""
        }
        this.validateTen = this.validateTen.bind(this);
    }
    componentDidMount() {
        if (this.state.id == "null") {
            this.setState({ function: "Add" })
        } else {
            DoAnService.getDoAnById(this.state.id).then(res => {
                this.setState({ function: "Update",gia:res.data.gia,ten:res.data.ten})
                console.log(res.data)
            })
        }
    }
    validateTen(value) {
        const errors = [];
        if (value.trim() === "") {
            errors.push("Tên không được trống !!!");
        }
        if (value.length > 50) {
            errors.push("Tên không được quá dài !!!");
        }
        this.setState({ ten: value, tenErrors: errors });
    }
    validateGia(value) {
        const errors = [];
        if (value.trim() === "") {
            errors.push("Giá không được trống !!!");
        }
        const numericValue = parseFloat(value);
        if (isNaN(numericValue)) {
            errors.push("Giá phải là một số !!!");
        } else if (numericValue <= 0) {
            errors.push("Giá phải lớn hơn 0 !!!");
        }
        this.setState({ gia: value, giaErrors: errors });
    }
    submitForm() {
        this.validateGia(this.state.gia)
        this.validateTen(this.state.ten)
        if (this.state.tenErrors.length == 0 && this.state.giaErrors.length == 0) {
            if (this.state.function == "Add") {
                if (confirm("Bạn muốn thêm đồ ăn này?")) {
                    DoAnService.createDoAn({
                        "ten": this.state.ten,
                        "gia": this.state.gia
                    })
                }
            } else {
                if (confirm("Bạn muốn update đồ ăn này?")) {
                    DoAnService.updateDoAn({
                        "id": this.state.id,
                        "ten": this.state.ten,
                        "gia": this.state.gia
                    },this.state.id)
                }
            }
        } else {
            confirm("Kiểm tra lại đầu vào")
        }
    }
    render() {
        return (
            <CContainer md>
                <Link to="/doan" className='btn btn-success'>Back</Link>
                <CForm className="row g-3">
                    <CCol md={12}>
                        <CFormInput
                            type="text"
                            id="inputEmail4"
                            onChange={(event) => { this.validateTen(event.target.value) }}
                            value={this.state.ten}
                            label="Tên đồ ăn"
                        />
                    </CCol>
                    {this.state.tenErrors.length > 0 ? (
                        this.state.tenErrors.map((error, index) => (
                            <CCol md={12} key={index}>
                                <p className="text-danger">{error}</p>
                            </CCol>
                        ))
                    ) : (
                        <></>
                    )}
                    <CCol md={12}>
                        <CFormInput
                            type="number"
                            id="giadoan"
                            label="Giá đồ ăn"
                            value={this.state.gia}
                            onChange={(event) => { this.validateGia(event.target.value) }}
                        />
                    </CCol>
                    {this.state.giaErrors.length > 0 ? (
                        this.state.giaErrors.map((error, index) => (
                            <CCol md={12} key={index}>
                                <p className="text-danger">{error}</p>
                            </CCol>
                        ))
                    ) : (
                        <></>
                    )}
                    <CCol xs={12}>
                        <CButton type="submit" onClick={()=> {this.submitForm()}} >{this.state.function}</CButton>
                    </CCol>
                </CForm>
            </CContainer >
        )
    }
}
export default withRouter(FormDoAn);