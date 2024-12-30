import React from "react";
// UI Components
import { Checkbox } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("CheckboxGroup", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(
        <Checkbox.Group>
          <Checkbox>Checkbox</Checkbox>
        </Checkbox.Group>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(
        <Checkbox.Group className="other-class">
          <Checkbox className="other-class">Checkbox</Checkbox>
        </Checkbox.Group>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
