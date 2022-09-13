import { ImageBackground } from 'react-native';

import backgroundImg from '../../assets/background-galaxy.png';

import { styles } from './styles';

interface IProps {
  children: React.ReactNode
}

export function Background({ children }:IProps) {
  return (
    <ImageBackground 
      style={styles.container}
      defaultSource={backgroundImg} 
      source={backgroundImg} 
    >
      
      { children }
    </ImageBackground>
  );
}
