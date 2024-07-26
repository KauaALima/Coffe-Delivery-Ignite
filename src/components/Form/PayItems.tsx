import { twMerge } from 'tailwind-merge'

interface PayItemsProps {
  title: string
  price: string
  className?: string
}

export function PayItems({ title, price, className }: PayItemsProps) {
  return (
    <div
      className={twMerge(
        'flex justify-between text-sm text-gray-700 dark:text-gray-300',
        className,
      )}
    >
      <p>{title}</p>
      <span>{price}</span>
    </div>
  )
}
