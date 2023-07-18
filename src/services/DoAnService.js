import axios from 'axios';

const DOAN_API_BASE_URL = "http://localhost:8080/cimena/do-an";

class DoAnService {

    getDoAns(){
        return axios.get(DOAN_API_BASE_URL);
    }

    createDoAn(doan){
        return axios.post(DOAN_API_BASE_URL, doan);
    }

    getDoAnById(id){
        return axios.get(DOAN_API_BASE_URL + '/' + id);
    }

    updateDoAn(doan, id){
        return axios.put(DOAN_API_BASE_URL + '/' + id, doan);
    }

    deleteDoAn(Id){
        return axios.delete(DOAN_API_BASE_URL + '/' + Id);
    }
    searchDoAn(txt){
        return axios.get(`${DOAN_API_BASE_URL}/search?name=${txt}`)
    }
    getPanigation(){
        return axios.get(DOAN_API_BASE_URL + '/panigation');
    }
    getPageNo(pageno, sortdir, sortby) {
        return axios.get(`${DOAN_API_BASE_URL}/page?sortby=${sortby}&sortdir=${sortdir}&pageno=${pageno}`);
    }
}

export default new DoAnService();