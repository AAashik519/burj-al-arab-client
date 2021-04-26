 import React, {  useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
 
 
 const Booking = () => {
    const [bookings,setBookings]= useState([])
    const [loggedInUser, setLoggedInUser] =  useContext( UserContext);

    useEffect(()=>{
       fetch('http://localhost:5000/booking?email='+loggedInUser.email,{
           method:'GET',
           headers:{
               'content-type': 'applications/json',
               authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
       })
       .then(res=> res.json())
       .then (data => setBookings(data)) 
    },[])
     return (
         <div>
             <h3>You have{bookings.length} bookings </h3>
             {
                 bookings.map( book => 
                  <li> {book.name} from:{(new Date(book.checkIn).toDateString('dd/MM/yyyy'))}  to:{new Date(book.checkOut).toDateString('dd/MM/yyyy')}  </li>)
                  
             }
         </div>
     );
 };
 
 export default Booking;