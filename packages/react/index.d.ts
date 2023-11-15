/**
 * Required to avoid errors when importing these types of files
 */

declare module "*.svg?url" {
  const content: string;
  export default content;
}

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.md" {
  const content: string;
  export default content;
}

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}
