import { Box, HStack, Heading, Text, Image, Button,} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useProductStore } from "../store/product";

const ProductCard = ({product}) => {

	const navigate = useNavigate();

    const {deleteProducts} = useProductStore();

    const handleDeleteProduct = async(pid) => {
        const {success, message} = await deleteProducts(pid);
        if (!success) {
            alert("Failed to delete the product");
           
        } else {
            alert("Product deleted");
        }
    }

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translateY(-5px)", shadow: "xl"}}
            bgColor={"gray.800"}
        >
            <Image src={product.image} alt={product.name} h={40} w={"full"} objectFit={"cover"}/>

            <Box p={2}>
                <Heading as={"h3"} size={"lg"} mb={1}>
                    { product.name }
                </Heading>

                <Text fontWeight={"bold"} fontSize={"sm"} color={"gray.200"} mb={3}>
                    ${ product.price }
                </Text>

                <HStack spacing={2}>
					
                    <Button onClick={() => navigate(`/update/${product._id}`)}>
                        <FaEdit/>
                    </Button>
					
                    <Button onClick={() => handleDeleteProduct(product._id)}>
                        <RiDeleteBin5Fill/>
                    </Button>     
                </HStack>
            </Box>

            

        </Box>
    )
}

export default ProductCard;