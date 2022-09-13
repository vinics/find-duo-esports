import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

interface IProps extends ViewProps {
  title: string
  subTitle: string
}

export function Heading({ title, subTitle, ...rest }: IProps) {
  return (
    <View style={styles.container} {...rest}>
      <Text style={styles.title}>
        {title}
      </Text>
      <Text  style={styles.subtitle}>
        {subTitle}
      </Text>
    </View>
  );
}