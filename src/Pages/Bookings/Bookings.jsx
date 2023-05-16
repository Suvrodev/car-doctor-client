import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Bookings = () => {
  
  const navigate=useNavigate();

  const { user } = useContext(AuthContext);
  //console.log(user.email);

  const [newBooking,setNewBooking]=useState(false)
  const [booking, setBooking] = useState([]);

  ///Data load according to Email
  const url = `https://car-doctor-server-tan-nine.vercel.app/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(url,{
      method: 'GET',
      headers:{
        authorization: `Bearer ${localStorage.getItem('car-access-token')}`
      }
    })
      .then((res) => res.json())
      .then((data) =>{
        if(!data.error){
          setBooking(data)
        }else{
          console.log('Time end')
          navigate('/')
        }
       
      });
  }, [newBooking,navigate]);


  const handleDelete=(id)=>{
    const proceed=confirm('Are you sure want to delete?')
    if(proceed){
      fetch(`https://car-doctor-server-tan-nine.vercel.app/bookings/${id}`,{
         method: 'DELETE'
      })
      .then(res=>res.json())
      .then(data=>{
         if(data.deletedCount){
             console.log(data)
             setNewBooking(!newBooking)
             Swal.fire({
                 position: 'top-end',
                 icon: 'success',
                 title: 'Delete Successfully',
                 showConfirmButton: false,
                 timer: 1500
               })
         }
      })
    }
 }

 const handleBookingConfirm=(id)=>{
    fetch(`https://car-doctor-server-tan-nine.vercel.app/bookings/${id}`,{
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({status:'confirm'})

    })
    .then(res=>res.json())
    .then(data=>{
        setNewBooking(!newBooking)
        console.log(data)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Updated Successfully',
            showConfirmButton: false,
            timer: 1500
          })
    })
 }

  return (
    <div>
      <h1>Bookings: {booking.length} </h1>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>
                {/* <label>
                  <input type="checkbox" className="checkbox" />
                </label> */}
              </th>
              <th>Image</th>
              <th>Service Title</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Email</th>
              <th>Due Amount</th>
              <th>Mesage</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
                booking.map(b=> <BookingRow
                key={b._id}
                b={b}
                handleDelete={handleDelete}
                handleBookingConfirm={handleBookingConfirm}
                ></BookingRow> )
            }
             
          
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Bookings;
