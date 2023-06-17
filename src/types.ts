export type ScreenDescription = {
  name: string;
  width: number;
  height: number;
  insets?: {
    top: number;
    bottom: number;
  };
  keyboardHeightMin?: number;
};
