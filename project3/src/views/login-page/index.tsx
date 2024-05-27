import "./styles.scss";
import SignIn from "../../components/sign-in";
import { Divider } from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import thankYouStateAtom from "../../states/thank-you-state";
import tokenStateAtom from "../../states/token-state";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginPage: React.FC = () => {
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  const token = useRecoilValue(tokenStateAtom);
  const navigate = useNavigate();
  if (thankYouValue) {
    setThankYou(false);
  }

  useEffect(() => {
    if (token !== null && token !== undefined) {
      navigate("/home");
    }
  }, []);

  return (
    <main className="login-page">
      <h1 className="login-page__title login-page__title--big login-page__title--bold">
        Sign In
      </h1>
      <Divider className="login-page__divider" />
      <SignIn />
    </main>
  );
};

export default LoginPage;
