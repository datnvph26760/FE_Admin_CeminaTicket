import axios from 'axios';

const HOADON_API_BASE_URL = "http://localhost:8080/cimena/hoa-don";

class HoaDonService {
  async getHoaDons() {
    return await axios.get(HOADON_API_BASE_URL);
  }

  async createHoaDon(hoaDon) {
    return await axios.post(HOADON_API_BASE_URL, hoaDon);
  }

  async getHoaDonById(hoaDonId) {
    return await axios.get(HOADON_API_BASE_URL + '/' + hoaDonId);
  }

  async updateHoaDon(hoaDon, hoaDonId) {
    return await axios.put(HOADON_API_BASE_URL + '/' + hoaDonId, hoaDon);
  }

  async deleteHoaDon(hoaDonId) {
    return await axios.delete(HOADON_API_BASE_URL + '/' + hoaDonId);
  }
}

export default new HoaDonService();
