export interface CustomButtonProps {
  iconUrl: string;
  cmd: number;
  data: number | number[];
  onPress?: () => void;
}
