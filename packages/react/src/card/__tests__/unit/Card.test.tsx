import React from "react";
// UI Components
import { Card } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Card", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(
        <Card>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(
        <Card className="other-class">
          <Card.Header className="other-header-class">Header</Card.Header>
          <Card.Body className="other-body-class">Body</Card.Body>
          <Card.Footer className="other-footer-class">Footer</Card.Footer>
        </Card>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render media", () => {
      const img = new Image();
      const { container } = render(
        <Card direction="row">
          <Card.Media src={img.src} />
        </Card>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render direction classes", () => {
      const { container } = render(
        <Card direction="row">
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render shadow classes", () => {
      const { container } = render(
        <Card shadow="3xl">
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render padding classes", () => {
      const { container } = render(
        <Card padding={{ block: "md", inline: "xl" }}>
          <Card.Header>Header</Card.Header>
          <Card.Body>Body</Card.Body>
          <Card.Footer>Footer</Card.Footer>
        </Card>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
