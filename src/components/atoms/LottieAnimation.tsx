import { DotLottiePlayer } from "@dotlottie/react-player";
import { Box, BoxProps } from "@mui/material";

interface LottieAnimationProps extends BoxProps {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
}

export function LottieAnimation({
  src,
  loop = true,
  autoplay = true,
  ...boxProps
}: LottieAnimationProps) {
  return (
    <Box {...boxProps}>
      <DotLottiePlayer
        src={src}
        autoplay={autoplay}
        loop={loop}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
