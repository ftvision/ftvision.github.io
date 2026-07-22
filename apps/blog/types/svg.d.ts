declare module "*.svg" {
  import type * as React from "react";

  const SvgComponent: React.FunctionComponent<
    React.HTMLAttributes<HTMLSpanElement>
  >;

  export default SvgComponent;
}

declare module "*.svg?url" {
  const url: string;
  export default url;
}
