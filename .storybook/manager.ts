import { addons } from "@storybook/manager-api";
import { create } from "@storybook/theming";

const theme = create({
  base: "light",
  brandTitle: "Stewed",
  brandUrl: "/",
  brandImage: "/images/logo/stewed.svg",
  colorPrimary: "#6366f1",
  colorSecondary: "#64748b",
  textColor: "#1e293b",
  appBg: "#fff",
});

addons.setConfig({
  theme,
  showToolbar: true,
});
