import { Box, Button, Dialog, DialogBackdrop, Field, Heading, HStack, Image, Input, Stack, Text } from "@chakra-ui/react"
import { useColorModeValue } from "./ui/color-mode";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { chakra } from "@chakra-ui/react"
import { useProductStore } from "../../store/product";
import { Toaster, toaster } from "../components/ui/toaster"
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { useState } from "react";

const ProductCard = ({product}) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const { deleteProduct, updateProduct } = useProductStore();

	const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

	const handleDeleteProduct = async (pid) => {
		const {success, message} = await deleteProduct(pid)
		if(!success) {
			toaster.create({
				title: "Error",
				type: "error",
				description: message,
			})
		} else {
			toaster.create({
				title: "Success",
				type: "success",
				description: message,
				action: {
					label: "Undo",
				},
			})
		}
	};

	const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProduct(pid, updatedProduct);

		if(!success) {
			toaster.create({
				title: "Error",
				type: "error",
				description: message,
			})
		} else {
			toaster.create({
				title: "Success",
				type: "success",
				description: "Product updated successfully",
				action: {
					label: "Undo",
				},
			})
		}
	}

	return (
		<Box
			width='full'
			height={342}
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
			>

			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
			
			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text
					fontWeight={"bold"}
					fontSize={24}
					color={textColor}
					mb={4}>
						{product.price}₽
				</Text>

				<HStack>
					
					<DialogRoot>
						<DialogTrigger asChild>
							<Button 
								variant="outline"
								bg={{ base: "blue.100", _dark: "blue.200" }} 
								color={{ base: "gray.600", _dark: "gray.800" }} m={0} p={0}>
									{<MdEdit />}
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Dialog Header</DialogTitle>
							</DialogHeader>
							<DialogBody pb="4">
								<Stack gap="4">
								
										<Input placeholder="Product Name" 
											name = 'name'
											value={updatedProduct.name}
											onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
											/>
										<Input placeholder="Price" 
											name = 'price'
											value={updatedProduct.price}
											onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
											/>
										<Input placeholder="Image URL" 
											name = 'image'
											value={updatedProduct.image}
											onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
											/>

								</Stack>
							</DialogBody>
							<DialogFooter>
								<DialogActionTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</DialogActionTrigger>
								<Button
								onClick={() => handleUpdateProduct(product._id, updatedProduct)}
								>Save</Button>
							</DialogFooter>
						</DialogContent>
					</DialogRoot>

					<Button 
						onClick={() => handleDeleteProduct(product._id)}
						bg={{ base: "red.100", _dark: "red.200" }} 
						color={{ base: "gray.600", _dark: "gray.800" }} m={0} p={0}>
							{<MdDelete />}
					</Button>
					
					{/* <IconButton icon={<MdEdit />} colorScheme='blue' />
					<IconButton icon={<MdDelete />} colorScheme='red'/> */}
				</HStack>
				<Toaster/>
			</Box>
		</Box>
	)
}

export default ProductCard
