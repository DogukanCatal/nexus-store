"use client";

import React from "react";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import type { LottieJson } from "@/types/lottie/lottie-json";

type LottiePlayerProps = {
  path: string;
  loop?: boolean;
  autoplay?: boolean;
  style?: React.CSSProperties;
};

const LottiePlayer = ({
  path,
  loop = true,
  autoplay = true,
  style,
}: LottiePlayerProps) => {
  const [animationData, setAnimationData] = useState<LottieJson | null>(null);

  useEffect(() => {
    const fetchAnimation = async () => {
      try {
        const res = await fetch(path);
        const json = await res.json();

        if (
          json &&
          typeof json === "object" &&
          "v" in json &&
          "layers" in json
        ) {
          setAnimationData(json as LottieJson);
        } else {
          console.error("Invalid Lottie JSON format.");
        }
      } catch (err) {
        console.error("Failed to load Lottie animation:", err);
      }
    };
    fetchAnimation();
  }, [path]);

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={style}
    />
  );
};

export default LottiePlayer;
