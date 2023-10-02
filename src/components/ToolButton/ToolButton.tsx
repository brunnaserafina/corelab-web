interface ToolButtonProps {
  active: boolean;
  onClick: () => void;
  iconSrc: string;
  altText: string;
  titleText: string;
  refference?: React.RefObject<HTMLDivElement>;
}

export default function ToolButton({
  active,
  onClick,
  iconSrc,
  altText,
  titleText,
  refference
}: ToolButtonProps) {
  return (
    <span style={{ backgroundColor: active ? "#FFE3B3" : "transparent" }} ref={refference}>
      <img src={iconSrc} alt={altText} title={titleText} onClick={onClick} />
    </span>
  );
}
