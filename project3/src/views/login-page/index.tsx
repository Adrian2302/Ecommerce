import "./styles.scss";
import SignIn from "../../components/sign-in";
import { Divider } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import thankYouStateAtom from "../../states/thank-you-state";

const LoginPage: React.FC = () => {
  const [thankYouValue, setThankYou] =
    useRecoilState<boolean>(thankYouStateAtom);
  if (thankYouValue) {
    setThankYou(false);
  }
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
