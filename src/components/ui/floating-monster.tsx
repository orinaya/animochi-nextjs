'use client'

interface FloatingMonsterProps {
  emoji: string
  size?: 'sm' | 'md' | 'lg'
  delay?: number
  duration?: number
  children?: React.ReactNode
  className?: string
}

function getSize (size: 'sm' | 'md' | 'lg'): string {
  switch (size) {
    case 'sm':
      return 'text-2xl'
    case 'md':
      return 'text-4xl'
    case 'lg':
      return 'text-6xl'
    default:
      return 'text-4xl'
  }
}

export default function FloatingMonster ({
  emoji,
  size = 'md',
  delay = 0,
  duration = 6,
  children,
  className = ''
}: FloatingMonsterProps): React.ReactNode {
  const sizeClass = getSize(size)

  return (
    <div
      className={`${className}absolute ${sizeClass} animate-pulse opacity-60 pointer-events-none select-none`}
      style={{
        animation: `float ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`
      }}
    >
      {emoji}
      <style>
        {`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px) translateX(0px) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) translateX(10px) rotate(5deg);
            }
            50% {
              transform: translateY(-10px) translateX(-15px) rotate(-3deg);
            }
            75% {
              transform: translateY(-25px) translateX(5px) rotate(2deg);
            }
          }
        `}
      </style>
    </div>
  )
}
