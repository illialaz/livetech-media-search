/// <reference types="next" />
/// <reference types="next/types/global" />

declare module '*.svg' {
  import type * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
  const image: {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
  };
  export default image;
}
