import { Divider } from "@nextui-org/react";
import "./styles.scss";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import LoadingCircle from "../../components/loading-circle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tokenStateAtom from "../../states/token-state";
import ProfileTable from "../../components/profile-table";

const ProfilePage: React.FC = () => {
  const [token, setToken] = useRecoilState(tokenStateAtom);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<number>();

  const fetchUser = async () => {
    try {
      const user = await axios.get<number>(
        `http://localhost:8080/users/me/role`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserRole(user.data);
      console.log(user.data);
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
    setLoading(false);
  }, []);

  return (
    <div className="user-profile-page">
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          <h1 className="profile-page__title profile-page__title--bold profile-page__title--big">
            Profile
          </h1>
          <Divider className="profile-page__divider" />
          <ProfileTable role={userRole} />
        </>
      )}
    </div>
  );
};

export default ProfilePage;
