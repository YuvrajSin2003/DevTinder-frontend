import React from "react";

const UserCard = ({user}) => {
    const {firstName , lastName , photoUrl , age , gender , about } = user; 
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src= {user.photoUrl}
          alt="User photo"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p>
          {about}
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary"></button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
