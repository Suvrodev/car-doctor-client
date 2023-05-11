import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  //console.log(user.email);

  const [newBooking,setNewBooking]=useState(false)
  const [booking, setBooking] = useState([]);

  const url = `http://localhost:5000/bookings?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [newBooking]);


  const handleDelete=(id)=>{
    const proceed=confirm('Are you sure want to delete?')
    if(proceed){
      fetch(`http://localhost:5000/bookings/${id}`,{
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
    fetch(`http://localhost:5000/bookings/${id}`,{
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
