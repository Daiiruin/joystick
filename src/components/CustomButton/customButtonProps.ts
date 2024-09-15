import { ImageSourcePropType } from 'react-native';

export interface CustomButtonProps {
  iconUrl?: ImageSourcePropType;
  title?: string;
  cmd: number;
  data: number | number[];
  onPress?: () => void;
}
