import axios from 'axios';

const GiaVeLichChieu_API_BASE_URL = "http://localhost:8080/cimena/gia-ve-lich-chieu";

class GiaVeLichChieuService {

    async getGiaVeLichChieuByLichChieuLoaiGhe(id_lichchieu, id_loaighe) {
        return await axios.get(`${GiaVeLichChieu_API_BASE_URL}/${id_lichchieu}/${id_loaighe}`);
    }

    async createGiaVeLichChieu(ghe) {
        return await axios.post(GiaVeLichChieu_API_BASE_URL, ghe);
    }

    async getGiaVeLichChieuById(gheId) {
        return await axios.get(GiaVeLichChieu_API_BASE_URL + '/' + gheId);
    }

    async updateGiaVeLichChieu(ghe, gheId) {
        return await axios.put(GiaVeLichChieu_API_BASE_URL + '/' + gheId, ghe);
    }

    async deleteGiaVeLichChieu(gheId) {
        return await axios.delete(GiaVeLichChieu_API_BASE_URL + '/' + gheId);
    }
}

export default new GiaVeLichChieuService();