import React from "react";
// UI Components
import { Pagination } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Pagination", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Pagination total={3} />);

      expect(container).toMatchSnapshot();
    });
  });
});
