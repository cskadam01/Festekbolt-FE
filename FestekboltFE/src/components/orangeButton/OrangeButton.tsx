import style from "./OrangeButton.module.css"

interface OrangeButtonProps {
  button_text: string
  onClick: () => void
  disabled?: boolean
  className?: string
}

export const OrangeButton = ({ button_text, onClick, disabled, className }: OrangeButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${style.orangeButton} ${className || ''}`}
    >
      {button_text}
    </button>
  )
}
