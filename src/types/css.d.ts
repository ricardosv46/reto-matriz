declare module "*.css";
declare module "*.module.css";
declare module "*.scss";
declare module "*.module.scss";

// Allow importing images and other static assets without type errors
declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
