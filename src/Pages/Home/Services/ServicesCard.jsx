import React from "react";
import { FaArrowRight } from "react-icons/fa";

const ServicesCard = ({ service }) => {
  const { img, title, price } = service;
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl p-5 border-2">
      <figure>
        <img src={img} alt="Shoes"/>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="flex justify-between">
        <h2 className="text-xl text-orange-500 font-bold">Price: ${price} </h2>
        <p className="text-orange-500"> <FaArrowRight/></p>
      </div>
    </div>
  );
};

export default ServicesCard;
