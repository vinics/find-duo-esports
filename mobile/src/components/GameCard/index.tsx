import { 
  TouchableOpacity, 
  TouchableOpacityProps,
  ImageBackground, 
  ImageSourcePropType,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';
import { THEME } from '../../theme';

export interface IGameCardProps {
  id: string
  title: string
  _count: {
    Ads: number
  }
  bannerUrl: string
}

interface IProps extends TouchableOpacityProps {
  data: IGameCardProps
}


export function GameCard({ data, ...rest }: IProps) {
  const bannerImage = { uri: data.bannerUrl }

  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground 
        style={styles.cover}
        source={bannerImage}
      >
        <LinearGradient 
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>
          <Text style={styles.ads}>
            {data._count.Ads} anúncios
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}