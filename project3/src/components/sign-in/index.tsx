import "./styles.scss";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import Login from "../login";
import SignUp from "../sign-up";

const SignIn: React.FC = () => {
  const [selected, setSelected] = useState<any>("login");

  return (
    <div className="signin">
      <Card className="max-w-full w-[340px] h-[465px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
            classNames={{
              tabContent: "text-[black]",
            }}
          >
            <Tab key="login" title="Login" className="text-[black]">
              <Login setSelected={setSelected} />
            </Tab>
            <Tab key="sign-up" title="Sign up" className="text-[black]">
              <SignUp setSelected={setSelected} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignIn;
