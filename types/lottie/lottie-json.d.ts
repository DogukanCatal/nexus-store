export type LottieJson = {
  v: string; //version
  fr: number; //frame rate
  ip: number; //in point
  op: number; //out point
  w: number; //width
  h: number; //height
  nm?: string; //name (optional)
  ddd?: number; //3D flah (optional)
  assets?: unknown[]; //assets like images
  fonts?: unknown[]; //fonts used
  layers: unknown[]; //animation layers
  markers?: unknown[]; //optional markers
  [key: string]: unknown; //any other optional keys
};
