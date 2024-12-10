import { Box, Button, Container, Heading, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {

    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    //const toast = useToast();
    const { createProduct } = useProductStore();

    const handleProduct = async() => {
        const {success, message} = await createProduct(newProduct);
       if (!success) {
            alert("Failed to add new product!");

        } else {
            alert("New product added!");
            navigate("/");
        } 
        setNewProduct({ name: "", price: "", image: "" });
    };

    return <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                Create New Product
            </Heading>

            <Box w={"full"} bg={"gray.800"} p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>

                    <Input 
                        placeholder="Product Name" 
                        name="name" 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})}
                    />

                    <Input 
                        placeholder="Price" 
                        name="price" 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})}
                    />

                    <Input 
                        placeholder="Image URL" 
                        name="image" 
                        value={newProduct.image}
                        onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})}
                    />

                    <Button bg={"blue.500"} onClick={handleProduct} w={"full"}>
                        Add Product
                    </Button>

                </VStack>
            </Box>
        </VStack>
        
    </Container>
}

export default CreatePage;