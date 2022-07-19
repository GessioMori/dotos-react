import { Eye, EyeSlash } from 'phosphor-react'

interface PasswordButtonProps {
  isVisible: boolean
  toggleVisibility: () => void
}

export function PasswordButton({
  isVisible,
  toggleVisibility,
}: PasswordButtonProps) {
  return (
    <>
      {isVisible ? (
        <Eye
          style={{ position: 'absolute', right: '1rem' }}
          size={20}
          onClick={toggleVisibility}
          weight="bold"
        />
      ) : (
        <EyeSlash
          style={{ position: 'absolute', right: '1rem' }}
          size={20}
          onClick={toggleVisibility}
          weight="bold"
        />
      )}
    </>
  )
}
