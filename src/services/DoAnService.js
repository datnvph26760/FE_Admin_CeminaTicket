import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/v1/api/persons";

class DoAnService {

    getDoAns(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createDoAn(person){
        return axios.post(EMPLOYEE_API_BASE_URL, person);
    }

    getDoAnById(personId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + personId);
    }

    updateDoAn(person, personId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + personId, person);
    }

    deleteDoAn(personId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + personId);
    }
}

export default new DoAnService();