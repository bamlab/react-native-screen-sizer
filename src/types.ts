export type Device = {
  name: string;
  width: number;
  height: number;
  insets?: Partial<Insets>;
  landscapeInsets?: Partial<Insets>;
};

type Insets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};
