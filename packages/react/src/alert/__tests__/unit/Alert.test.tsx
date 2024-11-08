import React from "react";
// UI Components
import { Alert } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Alert", () => {
  it("should renders default component", () => {
    const { asFragment } = render(<Alert>Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should renders title", () => {
    const { asFragment } = render(<Alert title="Title">Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render additional classes", () => {
    const { asFragment } = render(<Alert className="other-class">Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render shadow classes", () => {
    const { asFragment } = render(<Alert shadow="3xl">Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should applies critical skin", () => {
    const { asFragment } = render(<Alert skin="critical">Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render left slot content", () => {
    const { asFragment } = render(<Alert leftSlot="Left slot">Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should render right slot content", () => {
    const { asFragment } = render(<Alert rightSlot="Right slot">Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });

  it("applies correct size classes", () => {
    const { asFragment } = render(<Alert size="md">Alert</Alert>);

    expect(asFragment()).toMatchSnapshot();
  });
});
