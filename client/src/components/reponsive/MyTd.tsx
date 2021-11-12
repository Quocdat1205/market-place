import { Td, TableCellProps } from "@chakra-ui/react";
import React from "react";

interface MyTableCellProps extends TableCellProps {}

export const MyTd = (props: MyTableCellProps) => {
	return (
		<Td fontSize={["xs", "sm", "md", "lg"]} {...props}>
			{props.children}
		</Td>
	);
};
export default MyTd;
