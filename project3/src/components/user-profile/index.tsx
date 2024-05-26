import { useRecoilValue } from "recoil";
import "./styles.scss";
import React from "react";
import currentUserStateAtom from "../../states/current-user-state";

const UserProfile: React.FC = () => {
  const currentUser = useRecoilValue(currentUserStateAtom);

  const date = new Date(currentUser!.createdAt);
  const newDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <div className="flex w-full flex-col">
      <p>Name: {currentUser?.fullName}</p>
      <p>Email: {currentUser?.email}</p>
      <p>Client since: {newDate}</p>
    </div>
  );
};

export default UserProfile;
