import { Select, SelectProps } from "@chakra-ui/react";
import React from "react";

interface MySelectProps extends SelectProps {}

export const MySelect = (props: MySelectProps) => {
	return (
		<Select fontSize={["xs", "sm", "md", "lg"]} {...props}>
			{props.children}
		</Select>
	);
};
export default MySelect;
