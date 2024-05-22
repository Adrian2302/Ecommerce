import "./styles.scss";
import React, { FormEvent, useState } from "react";
import { Input, Link, Button } from "@nextui-org/react";
// import useFetch from "../../utils/useFetch";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";

interface LoginProps {
  setSelected: (selected: string) => void;
}

const Login: React.FC<LoginProps> = ({ setSelected }) => {
  const setToken = useSetRecoilState(tokenStateAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const { data, loading } = useFetch("/data/users.json");
  const navigate = useNavigate();
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      setToken(response.data.token);
      navigate("/home");
    } catch (error: any) {
      // console.error("Error fetching user info:", error);
      setError(error.response.data.description);
    }
  };

  // const handleLogin = () => {
  //   if (!loading && data) {
  //     const user = data.find((user) => user.email === email);
  //     if (user) {
  //       if (user.password === password) {
  //         localStorage.setItem("isLoggedIn", "true");
  //         navigate("/home");
  //       } else {
  //         setError("Invalid email or password.");
  //       }
  //     } else {
  //       setError("Invalid email or password.");
  //     }
  //   } else {
  //     setError("Error fetching user data");
  //   }
  // };

  const validateEmail = (input: string) => {
    if (!emailRegex.test(input)) {
      setError("Invalid email format.");
    } else {
      setError("");
    }
    setEmail(input);
  };

  return (
    <div className="login">
      <form className="flex flex-col gap-4">
        <Input
          isRequired
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => validateEmail(e.target.value)}
        />
        <Input
          isRequired
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-[#bb2c2c] text-[0.8rem]">{error}</p>}
        <p className="text-center text-small">
          Need to create an account?{" "}
          <Link size="sm" onPress={() => setSelected("sign-up")}>
            Sign up
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            fullWidth
            className="login__btn bg-[$stockx-color] text-[$white]"
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
