import type { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  const base = 'inline-block font-bold px-8 py-3 rounded-full transition-colors text-base cursor-pointer'
  const variants = {
    primary: 'bg-[#FFB700] text-gray-900 hover:bg-yellow-400',
    secondary: 'bg-white text-[#1E7E34] border-2 border-[#1E7E34] hover:bg-green-50',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  )
}
