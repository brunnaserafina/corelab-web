import styles from "./PaletteColors.module.scss";

interface PaletteColorsProps {
  handleEditColorNote: (colorCode: string) => void;
  paletteRef: React.RefObject<HTMLDivElement>;
}

export default function PaletteColors(props: PaletteColorsProps) {
  return (
    <div className={styles.Pallete} ref={props.paletteRef}>
      {colors.map((color) => (
        <span
          key={color.code}
          style={{ backgroundColor: color.code }}
          title={color.name}
          onClick={() => props.handleEditColorNote(color.code)}
        ></span>
      ))}
    </div>
  );
}

export const colors = [
  { code: "#bae2ff", name: "Azul claro" },
  { code: "#b9ffdd", name: "Verde Hortelã" },
  { code: "#ffe8ac", name: "Amarelo Champanhe" },
  { code: "#ffcab9", name: "Pêssego" },
  { code: "#f99494", name: "Salmão Claro" },
  { code: "#9DD6FF", name: "Azul" },
  { code: "#eca1ff", name: "Rosa lavanda" },
  { code: "#daff8b", name: "Verde Neon" },
  { code: "#ffa285", name: "Laranja Melão" },
  { code: "#cdcdcd", name: "Cinza Claro" },
  { code: "#979797", name: "Cinza Escuro" },
  { code: "#a99a7c", name: "Caqui" },
];
