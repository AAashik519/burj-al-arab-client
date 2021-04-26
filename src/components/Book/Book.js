import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import Button from '@material-ui/core/Button';
import { useState } from 'react';
import Booking from '../Bookings/Booking';
 


const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [selectedDate, setSelectedDate] =  useState ( {
        checkIn:new Date(),
        checkOut: new Date () 
    } )

    const handleCheckInDate = (date) => {
        const newDates={...selectedDate}
        newDates.checkIn=date;
        setSelectedDate(newDates);
    };
    
    const handleCheckOutDate = (date) => {
        const newDates={...selectedDate}
        newDates.checkOut=date;
        setSelectedDate(newDates);
    };
    const handelBooking =() =>{
        const newBooking = {...loggedInUser,...selectedDate}
        fetch ('http://localhost:5000/addBooking',{
            method:'POST',
            headers: {'content-type': 'application/json'},
            body:JSON.stringify(newBooking)
        })
        .then (res => res.json())
        .then (data => console.log(data))

    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>hello {loggedInUser.name}  Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="Check in date"
                        label="Date picker inline"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="check Out date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </Grid>


                <Button onClick={handelBooking} variant="contained" color="primary">
                   Book Now
                </Button>
            </MuiPickersUtilsProvider>
             <Booking />
        </div>
    );
};

export default Book;