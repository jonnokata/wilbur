import React from "react";

const UserProfileCard = () => {
  return (
    <div className="">
      <div className="">
        <div
          style={{
            background: `url(https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png)`,
            backgroundSize: "",
            height: "200px",
            width: "200px",
          }}
          className=""
        ></div>
        <div className="">
          <h2 className="text-2xl font-semibold">Wilbur</h2>
          <h3 className="italic">hello@wilbur.com</h3>
        </div>
      </div>
      <button className="">Sign out</button>
    </div>
  );
};
export { UserProfileCard };
