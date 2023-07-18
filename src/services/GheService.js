import axios from 'axios';

const GHE_API_BASE_URL = "http://localhost:8080/cimena/ghe";

class GheService {

    getGhes(id_phongchieu){
        return axios.get(`${GHE_API_BASE_URL}?id_phongchieu=${id_phongchieu}`);
    }

    createGhe(ghe){
        return axios.post(GHE_API_BASE_URL, ghe);
    }

    getGheById(gheId){
        return axios.get(GHE_API_BASE_URL + '/' + gheId);
    }

    updateGhe(ghe, gheId){
        return axios.put(GHE_API_BASE_URL + '/' + gheId, ghe);
    }

    deleteGhe(gheId){
        return axios.delete(GHE_API_BASE_URL + '/' + gheId);
    }
}

export default new GheService();