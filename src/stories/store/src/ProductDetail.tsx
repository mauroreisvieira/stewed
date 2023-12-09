import React, { useState } from "react";
// UI Components
import {
  Button,
  Carousel,
  Box,
  Text,
  Tag,
  Theme,
  Accordion,
} from "../../../../packages/react/index";
import { FiArrowLeft, FiArrowRight, FiPlus } from "react-icons/fi";

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
            showIndicator={false}
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
            <img src="//legacies.com/cdn/shop/files/BenficaBlackHoodie-Compressed07.jpg?v=1701181151" />
          </Carousel>
        </Box>
        <Box direction="column" gap="2xl">
          <div>
            <Tag skin="primary" size="sm">
              Nova coleção
            </Tag>
          </div>
          <Box direction="column" gap="sm">
            <Text as="h2" weight="light" whiteSpace="nowrap">
              Benfica ÁGUIA Hoodie Preto
            </Text>
            <Box gap="lg">
              <Text size="3xl" weight="bold">
                €89,95
              </Text>
              <Text size="3xl" weight="thin" variation={["line-through"]} skin="secondary">
                €120
              </Text>
            </Box>
            <Text size="xs">Taxas Incluídas. Envio calculado ao finalizar.</Text>
          </Box>
          <Box direction="column" gap="md">
            <Text as="label" size="xs" variation={"uppercase"} weight="medium">
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
            <Accordion open>
              <Accordion.Header rightSlot={<FiPlus />}>Detalhes do Produto</Accordion.Header>
              <Accordion.Body>
                <Box direction="column" gap="lg">
                  <Text>
                    Esta coleção inspira-se na mítica águia, com uma nova abordagem poderosa que
                    combina tradição e celebra a individualidade do Benfica.
                  </Text>
                  <ul>
                    <li>Algodão LEGACIES de peso médio</li>
                    <li>100% algodão</li>
                    <li>500 gmq</li>
                    <li>Corte unissexo</li>
                    <li>Impressão DTG</li>
                    <li>Fabricado em Portugal</li>
                  </ul>
                </Box>
              </Accordion.Body>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Theme>
  );
}
