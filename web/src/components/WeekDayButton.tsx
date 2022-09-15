import { ButtonHTMLAttributes } from "react";

interface IButtonProps extends ButtonHTMLAttributes<HTMLElement> {}

export function WeekDayButton({ children, ...rest }: IButtonProps) {
  return (
    <button 
      {...rest}
      className='w-8 h-8 rounded bg-zinc-900'
    >
      {children}
    </button>
  )
}