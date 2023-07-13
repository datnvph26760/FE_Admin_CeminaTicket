import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/v1/api/persons";

class PersonService {

    getPersons(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createPerson(person){
        return axios.post(EMPLOYEE_API_BASE_URL, person);
    }

    getPersonById(personId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + personId);
    }

    updatePerson(person, personId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + personId, person);
    }

    deletePerson(personId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + personId);
    }
}

export default new PersonService();