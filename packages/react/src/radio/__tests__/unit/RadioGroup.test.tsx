import React from "react";
// UI Components
import { Radio } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("RadioGroup", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(
        <Radio.Group name="name">
          <Radio>Radio</Radio>
        </Radio.Group>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(
        <Radio.Group name="name" className="other-class">
          <Radio className="other-class">Radio</Radio>
        </Radio.Group>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
