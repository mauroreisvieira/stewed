import React, { useState } from "react";
// UI Components
import {
  Button,
  Carousel,
  Box,
  Text,
  AspectRatio,
  Tag,
  Theme,
} from "../../../../packages/react/index";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const productsSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductDetail(): React.ReactElement {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <Theme
      theme="light"
      tokens={{
        light: {
          color: {
            primary: "#6A9A23",
          },
        },
      }}>
      <Box justify="between" gap="2xl">
        <Box>
          <Carousel
            renderPrev={(props) => (
              <Button appearance="ghost" leftIcon={<FiArrowLeft size={24} />} iconOnly {...props}>
                Prev
              </Button>
            )}
            renderNext={(props) => (
              <Button appearance="ghost" leftIcon={<FiArrowRight size={24} />} iconOnly {...props}>
                Next
              </Button>
            )}>
            <img src="//legacies.com/cdn/shop/files/BenficaBlackHoodie-Compressed01.jpg?v=1700239125" />
            <img src="//legacies.com/cdn/shop/files/BenficaBlackHoodie-Compressed01.jpg?v=1700239125" />
          </Carousel>
        </Box>
        <Box direction="column" gap="2xl">
          <div>
            <Tag skin="primary" size="sm">
              Nova coleção
            </Tag>
          </div>
          <Box direction="column" gap="sm" space={{ y: "xl" }}>
            <Text as="h2" weight="light" whiteSpace="nowrap">
              Benfica ÁGUIA Hoodie Preto
            </Text>
            <Box gap="lg">
              <Text size="3xl" weight="bold">
                €89,95
              </Text>
              <Text size="3xl" weight="medium" variation={["line-through"]} skin="secondary">
                €120
              </Text>
            </Box>
            <Text size="xs">Taxas Incluídas. Envio calculado ao finalizar.</Text>
          </Box>
          <Box direction="column" gap="md">
            <Text size="xs" variation={"uppercase"} weight="medium">
              Seleccione o seu tamanho
            </Text>
            <Box gap="sm" space={{ y: "lg" }}>
              {productsSizes.map((value) => (
                <Button
                  key={value}
                  onClick={() => setSelectedSize(value)}
                  appearance={value === selectedSize ? "filled" : "outline"}
                  skin="secondary"
                  fullWidth>
                  {value}
                </Button>
              ))}
            </Box>
            <Button size="lg" fullWidth>
              Adicionar ao carrinho
            </Button>
          </Box>
          <Box gap="lg" direction="column">
            <Text size="sm" skin="secondary" whiteSpace="nowrap">
              Inclui uma etiqueta interativa na gola que concede acesso ao Club LEGACIES.
            </Text>

            <Text size="md">
              Esta coleção inspira-se na mítica águia, com uma nova abordagem poderosa que combina
              tradição e celebra a individualidade do Benfica.
            </Text>
          </Box>
        </Box>
      </Box>
    </Theme>
  );
}
