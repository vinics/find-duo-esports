import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Check, GameController } from 'phosphor-react'

import { Input } from './Form/Input'
import { WeekDayButton } from './WeekDayButton'

interface IGame {
  id: string
  title: string
}

export function CreateAdModal() {
  const [games, setGames] = useState<IGame[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    if (!data.name) return

    try {
      console.log(data)
      axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!')
    } catch (error) {
      console.log(error)
      alert('Erro ao criar anúncio!')
    }
  }

  return (
    <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed'/>
          
          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
            <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>
  
            <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual é o game?</label>
                <select 
                  id="game"
                  name="game"
                  defaultValue=""
                  className='
                  appearance-none
                  bg-zinc-900
                  px-3
                  py-4
                  rounded
                  text-sm
                  placeholder:text-zinc-500
                  '
                >
                  <option disabled value="">Selecione o game que deseja jogar</option>
                  { games.map(game => {
                    return <option key={game.id} value={game.id}>{game.title}</option>
                  }) }
                </select>
              </div>
              
              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" name="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO' />
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input id='discord' name='discord' type="text" placeholder='Usuário#0000'/>
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays">Quando costuma jogar?</label>
                  
                  <ToggleGroup.Root 
                    type='multiple' 
                    className='grid grid-cols-4 gap-2'
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <WeekDayButton value='0' title='Domingo' isActive={weekDays.includes('0')}>D</WeekDayButton>
                    <WeekDayButton value='1' title='Segunda' isActive={weekDays.includes('1')}>S</WeekDayButton>
                    <WeekDayButton value='2' title='Terça' isActive={weekDays.includes('2')}>T</WeekDayButton>
                    <WeekDayButton value='3' title='Quarta' isActive={weekDays.includes('3')}>Q</WeekDayButton>
                    <WeekDayButton value='4' title='Quinta' isActive={weekDays.includes('4')}>Q</WeekDayButton>
                    <WeekDayButton value='5' title='Sexta' isActive={weekDays.includes('5')}>S</WeekDayButton>
                    <WeekDayButton value='6' title='Sábado' isActive={weekDays.includes('6')}>S</WeekDayButton>
                  </ToggleGroup.Root>
                  
                </div>

                <div className='flex flex-col gap-2 flex-1'>
                  <label htmlFor="hourStart">Quando horário do dia?</label>

                  <div className='grid grid-cols-2 gap-2'>
                    <Input id="hourStart" name="hourStart" placeholder='De' type="time" />
                    <Input id="hourEnd" name="hourEnd" placeholder='Até' type="time" />
                  </div>
                </div>
              </div>

              <label className='mt-2 flex items-center gap-2 text-sm hover:cursor-pointer'>
                <Checkbox.Root 
                  className='w-6 h-6 p-1 rounded bg-zinc-900'
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setUseVoiceChannel(true)
                    } else {
                      setUseVoiceChannel(false)
                    }
                  }}
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                Costumo me conectar no chat de voz
              </label>

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
  )
}