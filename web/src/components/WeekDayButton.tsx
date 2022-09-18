import { ButtonHTMLAttributes } from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group'


interface IButtonProps extends ToggleGroup.ToggleGroupItemProps {
  isActive: boolean
}

export function WeekDayButton({ children, isActive, ...rest }: IButtonProps) {
  return (
    <ToggleGroup.Item 
      {...rest}
      className={`
        w-8
        h-8
        rounded
        ${isActive ? 'bg-violet-500' : 'bg-zinc-900'}
      `}
    >
      {children}
    </ToggleGroup.Item >
  )
}