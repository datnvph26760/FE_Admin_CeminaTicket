import axios from 'axios';

const LICHCHIEU_API_BASE_URL = "http://localhost:8080/cimena/lich-chieu";

class LichChieuService {

    getLichChieus(){
        return axios.get(LICHCHIEU_API_BASE_URL);
    }

    createLichChieu(lichChieu){
        return axios.post(LICHCHIEU_API_BASE_URL, lichChieu);
    }

    getLichChieuById(lichChieuId){
        return axios.get(LICHCHIEU_API_BASE_URL + '/' + lichChieuId);
    }

    updateLichChieu(lichChieu, lichChieuId){
        return axios.put(LICHCHIEU_API_BASE_URL + '/' + lichChieuId, lichChieu);
    }

    deleteLichChieu(lichChieuId){
        return axios.delete(LICHCHIEU_API_BASE_URL + '/' + lichChieuId);
    }
}

export default new LichChieuService();