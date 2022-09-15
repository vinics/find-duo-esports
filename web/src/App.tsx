import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import { GameBanner } from './components/GameBanner'
import { CreateAdBanner } from './components/CreateAdBanner'

import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'
import { GameController } from 'phosphor-react'
import { Input } from './components/Input'
import { WeekDayButton } from './components/WeekDayButton'

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
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
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
        
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
          
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
  
            <form className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual é o game?</label>
                <Input id="game" placeholder="Selecione o game que deseja jogar"/>
              </div>
              
              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input id="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input id='discord' type="text" placeholder='Usuário#0000'/>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  <div className='grid grid-cols-4 gap-2'>
                    <WeekDayButton title='Domingo'>D</WeekDayButton>
                    <WeekDayButton title='Segunda'>S</WeekDayButton>
                    <WeekDayButton title='Terça'>T</WeekDayButton>
                    <WeekDayButton title='Quarta'>Q</WeekDayButton>
                    <WeekDayButton title='Quinta'>Q</WeekDayButton>
                    <WeekDayButton title='Sexta'>S</WeekDayButton>
                    <WeekDayButton title='Sábado'>S</WeekDayButton>
                  </div>
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Quando horário do dia?</label>

                  <div className='grid grid-cols-2 gap-2'>
                    <Input id="hourStart" placeholder='De' type="time" />
                    <Input id="hourEnd" placeholder='Até' type="time" />
                  </div>
                </div>
              </div>

              <div className='mt-2 flex gap-2 text-sm'>
                <input type="checkbox" id="chatConnection" />
                Costumo me conectar no chat de voz
              </div>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close 
                  type="button"
                  className='bg-zinc-500 
                    px-5 
                    h-12 
                    rounded-md 
                    font-semibold 
                    hover:bg-zinc-600
                    '
                >
                  Cancelar
                </Dialog.Close >
                
                <button 
                  type="submit"
                  className='
                    bg-violet-500 
                    px-5 
                    h-12 
                    rounded-md 
                    font-semibold 
                    flex 
                    items-center 
                    gap-3
                    hover:bg-violet-600
                    '
                >
                  <GameController className='w-6 h-6'/>
                  Encontrar Duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
