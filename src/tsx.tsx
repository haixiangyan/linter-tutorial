import React, { FC } from "react";

interface Props {
  name: string;
}

const Button: FC<Props> = (props) => {
  console.log("porps", props);
  return <div>hello</div>;
};

export default Button;
