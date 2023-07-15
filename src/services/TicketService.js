import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/cimena/ve";

class TicketService {

    getAllTickets() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    getPanigation() {
        return axios.get(EMPLOYEE_API_BASE_URL+"/panigation");
    }
    getCurrentpate() {
        return axios.get(EMPLOYEE_API_BASE_URL+"/currentpage");
    }
    getPageNo(pageno, sortdir, sortby) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/page?sortby=${sortby}&sortdir=${sortdir}&pageno=${pageno}`);
    }
    getPrevPage(sortdir, sortby) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/prev-page?sortdir=${sortdir}&sortby=${sortby}`);
    }
    setDeleteState(Id) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/delete/' + Id.id_ghe + "/" + Id.id_lich_chieu);
    }

    getNextPage(sortdir, sortby) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/next-page?sortdir=${sortdir}&sortby=${sortby}`);
    }

    createTicket(person) {
        return axios.post(EMPLOYEE_API_BASE_URL, person);
    }

    getTicketById(Id) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + Id.id_ghe + "/" + Id.id_lich_chieu);
    }

    updateTicket(person, Id) {
        return axios.put(EMPLOYEE_API_BASE_URL +'/' + Id.id_ghe + "/" + Id.id_lich_chieu, person);
    }

    deleteTicket(personId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + personId);
    }
}

export default new TicketService();