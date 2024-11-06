import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useProductStore } from '../../store/product';
import { Toaster, toaster } from "../components/ui/toaster"

const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: ""
	});

	const {createProduct} = useProductStore();

	const handleAddProduct = async () => {
		const {success, message} = await createProduct(newProduct);
		if(!success) {
			toaster.create({
				title: "Error",
				type: "error",
				description: "Error. Product DOESN'T created",
			})
		} else {
			toaster.create({
				title: "Success",
				type: "success",
				description: "Product created successfuly",
				action: {
					label: "Undo",
				},
			})
		}
		setNewProduct({name: "", price: "", image: ""});
	}

	return (
		<Container maxW={"xl"} pt={4}>
			<VStack>
				<Heading as="h1" size="2xl" textAlign="center" mb={4}>
					Create new product
				</Heading>

				<Box w="full" bg={{ base: "white", _dark: "gray.800" }}
				p={6} rounded="lg" shadow="md">
					<VStack gap="2">
						<Input 
							placeholder='Product name'
							name='name' 
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}/>
						<Input 
							placeholder='Price'
							name='price' 
							type='number'
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}/>
						<Input 
							placeholder='Image URL' 
							name='image' 
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}/>

							<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
								Add Product
							</Button>
					</VStack>
				</Box>
				<Toaster/>
			</VStack>
		</Container>
	)
}

export default CreatePage;
