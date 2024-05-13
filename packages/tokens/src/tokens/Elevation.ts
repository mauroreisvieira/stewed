export const elevation = {
  default: 100,
  navigation: 200,
  popup: 300,
  notification: 400,
  hint: 500,
};

export type Elevation = keyof typeof elevation;
