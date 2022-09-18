import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'

import { CreateAdModal } from './components/CreateAdModal'
import axios from 'axios'

interface IGame {
  id: string
  title: string
  bannerUrl: string
  _count: {
    Ads: number
  }
}

function App() {
  const [games, setGames] = useState<IGame[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className='
      max-w-[1344px] 
      mx-auto 
      flex flex-col items-center 
      my-20'>
      <img src={logoImg} alt="" />

      <h1 className='
        text-6xl text-white font-black
        mt-20'>
        Seu <span className='bg-nlw-gradient bg-clip-text text-transparent'>duo</span> está aqui
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        
        {
          games.map(game => (
            <GameBanner 
              key={game.id}
              adsCount={game._count.Ads}
              bannerUrl={game.bannerUrl} 
              title={game.title} 
            />
          ))
        }
 
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
