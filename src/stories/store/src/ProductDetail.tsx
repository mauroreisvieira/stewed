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
  Toggle,
} from "../../../../packages/react/index";
import { FiArrowLeft, FiArrowRight, FiPlus } from "react-icons/fi";

const productsSizes = ["XS", "S", "M", "L", "XL", "XXL"];

export function ProductDetail(): React.ReactElement {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <Theme<"default"> defaultTheme="default" tokens={{
    default: {
      components: {
        toggle: {
          radius: "sm",
        }
      }
    }
    }}>
      <Box justify="between" gap="2xl">
        <Box>
          <Carousel
            renderPrev={(props) => (
              <Button appearance="ghost" leftSlot={<FiArrowLeft size={24} />} iconOnly {...props}>
                Prev
              </Button>
            )}
            renderNext={(props) => (
              <Button appearance="ghost" leftSlot={<FiArrowRight size={24} />} iconOnly {...props}>
                Next
              </Button>
            )}>
            <img src="https://placehold.co/400x600" />
            <img src="https://placehold.co/400x600" />
          </Carousel>
        </Box>
        <Box direction="column" gap="2xl">
          <div>
            <Tag skin="primary" appearance="muted" size="sm">
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
              <Text size="3xl" variation={["line-through"]} skin="neutral">
                €120
              </Text>
            </Box>
            <Text size="xs">Taxas Incluídas. Envio calculado ao finalizar.</Text>
          </Box>
          <Box direction="column" gap="md">
            <Text as="label" size="xs" variation={"uppercase"} weight="medium">
              Seleccione o seu tamanho
            </Text>
            <Toggle.Group>
              {productsSizes.map((value) => (
                <Toggle
                  key={value}
                  size="md"
                  onClick={() => setSelectedSize(value)}
                  selected={value === selectedSize}>
                  {value}
                </Toggle>
              ))}
            </Toggle.Group>
            <Button skin="neutral" fullWidth>
              Adicionar ao carrinho
            </Button>
          </Box>
          <Box gap="lg" direction="column">
            <Text size="sm" skin="neutral" whiteSpace="nowrap">
              Inclui uma etiqueta interativa na gola que concede acesso ao Club LEGACIES.
            </Text>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header rightSlot={<FiPlus />}>Detalhes do Produto</Accordion.Header>
                <Accordion.Body>
                  <Box direction="column" gap="lg">
                    <Text>
                      Esta coleção inspira-se na mítica águia, com uma nova abordagem poderosa que
                      combina tradição e celebra a individualidade do Benfica.
                    </Text>
                    <ul>
                      <Text as="li">Algodão LEGACIES de peso médio</Text>
                      <Text as="li">100% algodão</Text>
                      <Text as="li">500 gmq</Text>
                      <Text as="li">Corte unissexo</Text>
                      <Text as="li">Impressão DTG</Text>
                      <Text as="li">Fabricado em Portugal</Text>
                    </ul>
                  </Box>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item>
                <Accordion.Header rightSlot={<FiPlus />}>Tamanho e ajuste</Accordion.Header>
                <Accordion.Body>
                  <Text>
                    As nossas sweatshirts com capuz têm um tamanho grande. Se desejar um tamanho
                    normal, diminua o tamanho do seu tamanho habitual.
                  </Text>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Box>
        </Box>
      </Box>
    </Theme>
  );
}
