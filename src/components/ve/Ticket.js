import React from 'react'
import { CRow } from '@coreui/react'
import PersonService from 'src/services/PersonService';
const Ticket = () => {
    PersonService.getPersons().then((res) => {
        console.log(res.data );
    });
    return (<CRow></CRow>)}
export default Ticket
