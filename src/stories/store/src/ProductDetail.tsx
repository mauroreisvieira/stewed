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
  TextField,
  List,
  FormField,
} from "../../../../packages/react/index";
// Icons
import { FiPlus } from "react-icons/fi";

const productsSizes = ["XXS", "XS", "S", "M", "L", "XL"];

export function ProductDetail(): React.ReactElement {
  const [selectedSize, setSelectedSize] = useState("M");

  return (
    <Theme<"default">
      tokens={{
        default: {
          color: {
            "secondary": "#333",
            "secondary-faded": "#f3f3f3",
          },
          components: {
            toggle: {
              radius: "sm",
            },
          },
        },
      }}>
      <Box justify="between" gap="2xl" wrap="wrap">
        <Box grow>
          <Carousel>
            <img src="https://placehold.co/400x600" />
            <img src="https://placehold.co/400x600" />
          </Carousel>
        </Box>
        <Box direction="column" gap="2xl" grow>
          <div>
            <Tag skin="primary" appearance="ghost" size="sm">
              Nova coleção
            </Tag>
          </div>
          <Box direction="column" gap="sm">
            <Text as="h2" weight="light">
              Benfica ÁGUIA Hoodie Preto
            </Text>
            <Box gap="lg">
              <Text size="3xl" weight="bold">
                €89,95
              </Text>
              <Text size="3xl" variation={["line-through"]} skin="critical">
                €120
              </Text>
            </Box>
            <Text size="xs">Taxas Incluídas. Envio calculado ao finalizar.</Text>
          </Box>

          <FormField>
            <FormField.Label htmlFor="group">Seleccione o seu tamanho</FormField.Label>
            <FormField.Control>
              <Toggle.Group id="group" fullWidth>
                {productsSizes.map((value) => (
                  <Toggle
                    key={value}
                    size="md"
                    skin="secondary"
                    onClick={() => setSelectedSize(value)}
                    selected={value === selectedSize}>
                    {value}
                  </Toggle>
                ))}
              </Toggle.Group>
            </FormField.Control>
          </FormField>

          <FormField>
            <FormField.Label htmlFor="quantity">Quantidade</FormField.Label>
            <FormField.Control>
              <TextField id="quantity" type="number" min={10} max={100} step={10} />
            </FormField.Control>
          </FormField>

          <Button skin="primary" size="xl" fullWidth>
            Adicionar ao carrinho
          </Button>

          <Box gap="lg" direction="column">
            <Text size="sm" skin="neutral">
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
                    <List>
                      <List.Item>Algodão LEGACIES de peso médio</List.Item>
                      <List.Item>100% algodão</List.Item>
                      <List.Item>500 gmq</List.Item>
                      <List.Item>Corte unissexo</List.Item>
                      <List.Item>Impressão DTG</List.Item>
                      <List.Item>Fabricado em Portugal</List.Item>
                    </List>
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
