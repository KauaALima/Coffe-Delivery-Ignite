import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface itemsProps {
  icon: ReactNode
  className: string
  text: string
}

export function Items({ icon, className, text }: itemsProps) {
  return (
    <span className="flex gap-3 text-base items-center text-gray-700">
      <div className={twMerge('p-2 rounded-full text-white', className)}>
        {icon}
      </div>
      {text}
    </span>
  )
}
