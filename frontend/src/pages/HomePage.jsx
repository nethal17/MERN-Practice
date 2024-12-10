import { Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {

    const { fetchProducts, products} = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    console.log("products", products);

    return (
        <Container maxW={"container.xl"} py={12}>
            <VStack spacing={8}>
                
                <Text
                    fontSize={25}
                    fontWeight={"bold"}
                    bgGradient={"to-r"}
					gradientFrom={"cyan.400"}
					gradientTo={"blue.500"}
					bgClip={"text"}
                    textAlign={"center"}
                >
                    Current Products 🚀
                </Text>

                <SimpleGrid
                    columns={4}
                    w={"full"}
                    height={"580px"}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product}/>
                    ))}
                </SimpleGrid>

                {products.length === 0 && (
                    <Text fontSize={"sm"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                        No products found 😪{" "}
                    <Link to={"/create"}>
                        <Text as={"span"} color={"blue.500"} _hover={{ textDecoration: "underline" }}>
                            Create a product
                        </Text>
                    </Link>
                    </Text>
                )}

            </VStack>
        </Container>
    )
}

export default HomePage;