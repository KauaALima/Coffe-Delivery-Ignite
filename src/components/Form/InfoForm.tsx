import type { ReactNode } from 'react'

interface InfoFormProps {
  logo: ReactNode
  title: string
  info: string
}

export function InfoForm({ logo, title, info }: InfoFormProps) {
  return (
    <div className="flex items-start gap-2">
      {logo}
      <div>
        <span className="text-base text-gray-800 dark:text-gray-400">
          {title}
        </span>
        <p className="text-sm text-gray-700 dark:text-gray-300">{info}</p>
      </div>
    </div>
  )
}
