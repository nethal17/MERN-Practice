import { Button, Container, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FaPlusSquare } from "react-icons/fa";
import { useProductStore } from "../store/product";

const Navbar = () => {
	
	const { products } = useProductStore();

	return (
		<Container maxW={"1140px"} px={4} bg={"gray.800"}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"to-r"}
					gradientFrom={"cyan.400"}
					gradientTo={"blue.500"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>
				</Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<Icon>
							<FaPlusSquare/>
							</Icon>
						</Button>
					</Link>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;