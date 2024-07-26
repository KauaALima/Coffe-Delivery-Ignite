import { forwardRef, InputHTMLAttributes, LegacyRef } from 'react'

interface PayButtonProps extends InputHTMLAttributes<HTMLInputElement> {
  isSelected: boolean
}

export const PayButton = forwardRef(function PayButton(
  { children, isSelected, ...rest }: PayButtonProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <label
      data-state={isSelected}
      className="flex w-full p-4 text-[12px] uppercase items-center gap-3 text-gray-700 rounded-md bg-gray-400 hover:bg-gray-500
       data-[state='true']:bg-purple-100 data-[state='true']:ring-1 data-[state='true']:ring-purple-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
    >
      <input type="radio" className="hidden" ref={ref} {...rest} />
      {children}
    </label>
  )
})
