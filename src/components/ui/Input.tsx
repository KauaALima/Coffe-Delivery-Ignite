import { forwardRef, LegacyRef, InputHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input = forwardRef(function Input(
  { className, onChange, ...children }: InputProps,
  ref: LegacyRef<HTMLInputElement>,
) {
  return (
    <input
      type="text"
      ref={ref}
      onChange={onChange}
      className={twMerge(
        'p-3 bg-gray-300 text-sm text-gray-700 border border-gray-400 rounded placeholder:text-gray-600 dark:bg-gray-700 dark:border-gray-800 dark:text-gray-300',
        className,
      )}
      {...children}
    />
  )
})
