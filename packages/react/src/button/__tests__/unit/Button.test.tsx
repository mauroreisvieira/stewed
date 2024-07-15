import { Button } from "../../index";
import { render } from "@testing-library/react";

describe("Button", () => {
  it("renders children correctly", () => {
    const { asFragment } = render(<Button>Click me</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies correct skin and appearance classes", () => {
    const { asFragment } = render(
      <Button skin="primary" appearance="filled">
        Primary Filled
      </Button>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies correct size class", () => {
    const { asFragment } = render(<Button size="md">Medium Button</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading spinner when loading prop is true", () => {
    const { asFragment } = render(<Button loading>Loading...</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies disabled class when disabled prop is true", () => {
    const { asFragment } = render(<Button disabled>Disabled Button</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies icon-only class when iconOnly prop is true", () => {
    const { asFragment } = render(
      <Button iconOnly>
        <i className="fas fa-star" />
      </Button>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies fullWidth class when fullWidth prop is true", () => {
    const { asFragment } = render(<Button fullWidth>Full Width Button</Button>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies pressed class when pressed prop is true", () => {
    const { asFragment } = render(<Button pressed>Pressed Button</Button>);

    expect(asFragment()).toMatchSnapshot();
  });
});
