import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

export default function Button({
  text,
  className,
  icon,
  onClick,
  disabled,
  type = "button",
}: {
  text: string,
  className?: string,
  icon?: IconProp,
  onClick?: () => void,
  disabled?: boolean,
  type?: "button" | "submit" | "reset"
}) {
  const classes = [
    "text-sm",
    "p-1",
    "pl-3",
    "pr-3",
    "border-1",
    "border-black",
    "rounded-xl",
    "cursor-pointer",
    "disabled:text-gray-500",
    "disabled:border-gray-500",
    "disabled:cursor-default",
    "hover:shadow-md",
    "disabled:hover:shadow-none",
    className,
  ].join(" ");
  return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type}>
      {icon && <FontAwesomeIcon icon={icon} className="mr-2" />}
      {text}
    </button>
  )
}