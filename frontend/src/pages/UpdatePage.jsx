import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProductStore } from "../store/product";

const UpdatePage = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const { products, fetchProducts, updateProducts } = useProductStore();
    const [updatedProduct, setUpdatedProduct] = useState(null);

    useEffect(() => {
        if (!id) {
            alert("Invalid Product ID");
            navigate("/"); // Redirect to home or a valid page
            return;
        }

        const product = products.find((p) => p._id === id);
        if (product) {
            setUpdatedProduct(product);
        } else {
            fetchProducts(); // Fetch if product isn't in state
        }
    }, [id, products, fetchProducts, navigate]);

    if (!updatedProduct) return <div>Loading...</div>;
        
    
    const handleUpdateProduct = async (pid, updatedProduct) => {
		const { success, message } = await updateProducts(pid, updatedProduct);
		if (!success) {
			alert("Failed to update product");

		} else {
			alert("Product updated");
            navigate("/");
		}
	};

    return <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Update Product
            </Heading>

            <Box w={"full"} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>

                    <Input 
                        placeholder="Product Name" 
                        name="name" 
                        value={updatedProduct.name}
                        onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                    />

                    <Input 
                        placeholder="Price" 
                        name="price"
                        type="number" 
                        value={updatedProduct.price}
						onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                    />

                    <Input 
                        placeholder="Image URL" 
                        name="image" 
                        value={updatedProduct.image}
						onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                    />

                    <Button bg={"blue.500"} onClick={() => handleUpdateProduct(updatedProduct._id, updatedProduct) } w={"full"}>
                        Update Product
                    </Button>

                </VStack>
            </Box>
        </VStack>
        
    </Container>
}

export default UpdatePage;