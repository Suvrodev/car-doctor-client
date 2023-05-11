import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";

const CheckOut = () => {
  const { id } = useParams();
 // console.log("ID: ", id);
  const {user}=useContext(AuthContext);

  const [service, setService] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/services/${id}`)
      .then((res) => res.json())
      .then((data) => setService(data));
  }, []);

 // console.log(service);
  const { _id, title, img, price, service_id } = service;

  const handleBookService=event=>{
    event.preventDefault();
    const form=event.target;
    const name=form.name.value;
    const date=form.date.value;
    const email=form.email.value;
    const dueAmount=form.dueAmount.value;
    const phone=form.phone.value;
    const location=form.location.value;
    const message=form.message.value;

    const booking={
        service_id:_id,
        service_title:title,
        customer_name:name,
        date,
        email,
        dueAmount,
        phone,
        location,
        message,
        img,
        status:"not Confirms"
    
    }

    console.log(booking)
    fetch(`http://localhost:5000/bookings/`,{
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(booking)
        
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.insertedId){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Successfully Booked',
                showConfirmButton: false,
                timer: 1500
              })
        }
    })

  }

  return (
    <div>
      <h2 className="text-3xl text-center font-bold">Book Service : {title} </h2>
      <form onSubmit={handleBookService} className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-control">
                    <label className="label">
                    <span className="label-text">Name</span>
                    </label>
                    <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    defaultValue={user?.displayName}
                    className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Date</span>
                    </label>
                    <input
                    type="date"
                    name="date"
                    className="input input-bordered"
                    />
            </div>
            <div className="form-control">
                    <label className="label">
                    <span className="label-text">Email</span>
                    </label>
                    <input
                    type="email"
                    name="email"
                    defaultValue={user?.email}
                    placeholder="Email"
                    className="input input-bordered"
                    readOnly
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Due Amount</span>
                    </label>
                    <input
                    type="text"
                    name="dueAmount"
                    defaultValue={price}
                    className="input input-bordered"
                    />
            </div>
            <div className="form-control">
                    <label className="label">
                    <span className="label-text">Phone</span>
                    </label>
                    <input
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    className="input input-bordered"
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Location</span>
                    </label>
                    <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    className="input input-bordered"
                    />
            </div>
        </div>

        <div className="mt-5 form-control">
        <label className="label">
            <span className="label-text">Your Message</span>
        </label>

            <textarea name="message" 
             rows="10"
             className="w-full resize-none rounded-lg ps-5 pt-5">
            </textarea>
        </div>
            <div className="form-control mt-6">
                <input className="bg-orange-700 btn btn-block" type="submit" value="Order Confirm" />
            </div>
      </form>
           
    </div>
  );
};

export default CheckOut;
