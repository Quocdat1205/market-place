import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface MyButtonProps extends ButtonProps {}

export const MyButton = (props: MyButtonProps) => {
	return (
		<Button fontSize={["xs", "sm", "md", "lg"]} {...props}>
			{props.children}
		</Button>
	);
};
export default MyButton;
