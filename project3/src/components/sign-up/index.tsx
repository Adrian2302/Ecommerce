import "./styles.scss";
import React, { FormEvent, useState } from "react";
import { Input, Link, Button } from "@nextui-org/react";
import { useSetRecoilState } from "recoil";
import tokenStateAtom from "../../states/token-state";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

interface SignUpProps {
  setSelected: (selected: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setSelected }) => {
  const setToken = useSetRecoilState(tokenStateAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const notEmptyRegex = /^.+$/;

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (password === confirmPassword) {
        await axios.post("http://localhost:8080/auth/signup", {
          email,
          password,
          fullName,
        });
        toast.success("Signup succesful!");
        setToken(null);
        setError("");
      } else {
        setError("Passwords don't match");
      }
    } catch (error: any) {
      setError(error.response.data.description);
    }
  };

  const validateEmail = (input: string) => {
    if (!emailRegex.test(input)) {
      setError("Invalid email format.");
    } else {
      setError("");
    }
    setEmail(input);
  };

  const validatePassword = (input: string) => {
    if (!passwordRegex.test(input)) {
      setError(
        "Password must contain at least 1 number, lowercase and uppercase letters and at least 8 characters."
      );
    } else {
      setError("");
    }
    setPassword(input);
  };

  const validateConfirmPassword = (input: string) => {
    setConfirmPassword(input);
  };

  const validateName = (input: string) => {
    if (!notEmptyRegex.test(input)) {
      setError("Invalid name.");
    } else {
      setError("");
    }
    setFullName(input);
  };

  return (
    <div className="signup">
      <form className="flex flex-col gap-4 h-[300px]">
        <Input
          isRequired
          label="Name"
          placeholder="Enter your name"
          type="text"
          value={fullName}
          onChange={(e) => validateName(e.target.value)}
        />
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
          onChange={(e) => validatePassword(e.target.value)}
        />
        <Input
          isRequired
          label="Confirm Password"
          placeholder="Confirm your password"
          type="password"
          onChange={(e) => validateConfirmPassword(e.target.value)}
        />
        {error && <p className="text-[#bb2c2c] text-[0.8rem]">{error}</p>}
        <p className="text-center text-small">
          Already have an account?{" "}
          <Link size="sm" onPress={() => setSelected("login")}>
            Login
          </Link>
        </p>
        <div className="flex gap-2 justify-end">
          <Button
            fullWidth
            className="signup__btn bg-[$stockx-color] text-[$white]"
            onClick={handleSignup}
          >
            Sign up
          </Button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default SignUp;
