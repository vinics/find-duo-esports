import { useEffect, useState } from 'react';
import { View, TouchableOpacity, Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons'

import { styles } from './styles';
import { THEME } from '../../theme';
import logoImg from '../../assets/logo-nlw-esports.png'

import { IGameParams } from '../../@types/navigation';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, IDuoCardsProp } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch'

export function Game() {
  const navigation = useNavigation()
  const route = useRoute()
  const game = route.params as IGameParams
  const [duos, setDuos] = useState<IDuoCardsProp[]>([])
  const [discordDuoSelected, setDiscordDuoSelected] = useState('')

  function handleGoBack() {
    navigation.goBack()
  }

  async function getDiscordUser(adsId: string) {
    fetch(`http://192.168.0.106:3333/ads/${adsId}/discord`)
      .then(response => response.json())
      .then(data => setDiscordDuoSelected(data.discord))
  }

  useEffect(() => {
    fetch(`http://192.168.0.106:3333/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo 
              color={THEME.COLORS.CAPTION_300}
              name='chevron-thin-left'
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

        <View style={styles.right}/>
        </View>

        <Image 
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading title={game.title} subTitle='Conecte-se e comece a jogar!'/>

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard data={item} onConnect={() => getDiscordUser(item.id)}/>
          )}
          horizontal
          style={styles.containerList}
          contentContainerStyle={[duos.length > 0 ? styles.contentList : styles.emptyListContent]}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Ainda não há anúncios publicados para esse jogo.
            </Text>
          )}
        />

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}