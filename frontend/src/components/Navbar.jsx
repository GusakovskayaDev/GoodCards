import { Container, Flex, Text, HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { FiPlus } from "react-icons/fi";
import { GoSun } from "react-icons/go";
import { LuMoon } from "react-icons/lu";

const Navbar = () => {

	const { colorMode, toggleColorMode } = useColorMode();
	
	return (
		<Container maxW={"1140px"} px={4}>
			<Flex justify={"space-between"} align={"center"} h={16} direction={{ base:"row", sm:"row" }}>
				<Text
					// fontSize={{ base: "md", sm: "100"}}
					fontSize={22}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient="to-r" gradientFrom="cyan.400" gradientTo="blue.500"
					bgClip={"text"}>
					<Link to={"/"}>Product Store</Link>
				</Text>
				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button 
							bg={{ base: "gray.200", _dark: "gray.800" }}
							color={{ base: "black", _dark: "white" }}
							mr={2}>
							<FiPlus />
						</Button>
					</Link>
						<Button onClick={toggleColorMode} 
							bg={{ base: "gray.200", _dark: "gray.800" }}
							color={{ base: "black", _dark: "white" }}
							>
							{colorMode === "light" ? <LuMoon /> : <GoSun />}
						</Button>
				</HStack>
			</Flex>
		</Container>
	)
}

export default Navbar;
