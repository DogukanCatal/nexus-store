"use client";

import React from "react";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("./LottiePlayer"), { ssr: false });

type LottieWrapperProps = {
  path: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
};

const LottieWrapper = ({
  path,
  loop = true,
  autoplay = true,
  style,
}: LottieWrapperProps) => {
  return (
    <LottiePlayer path={path} loop={loop} autoplay={autoplay} style={style} />
  );
};

export default LottieWrapper;
