import { Divider } from "@nextui-org/react";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import LoadingCircle from "../../components/loading-circle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tokenStateAtom from "../../states/token-state";
import ProfileTable from "../../components/profile-table";
import currentUserStateAtom from "../../states/current-user-state";

const ProfilePage: React.FC = () => {
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const setCurrentUser = useSetRecoilState(currentUserStateAtom);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const user = await axios.get(`http://localhost:8080/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(user.data);
      setLoading(false);
    } catch (error: any) {
      console.log(`El error: ${error.response.data.description}`);
      if (error.response && error.response.status === 440) {
        setToken(null);
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <main className="profile-page">
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          <h1 className="profile-page__title profile-page__title--bold profile-page__title--big">
            Profile
          </h1>
          <Divider className="profile-page__divider" />
          <ProfileTable />
        </>
      )}
    </main>
  );
};

export default ProfilePage;
