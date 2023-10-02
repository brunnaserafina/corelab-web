import { useState } from "react";
import { Search } from "../../components";
import logo from "../../assets/images/logo.svg";
import iconOut from "../../assets/images/icon-out.svg";
import iconArrow from "../../assets/images/icon-arrow.svg";
import styles from "./Navbar.module.scss";

interface NavbarProps {
  onSearchChange: (search: string) => void;
}

export default function Navbar(props: NavbarProps) {
  const [search, setSearch] = useState<string>("");
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

  function handleSearchNote(e: any) {
    setSearch(e.target.value);

    if (e.target.value.length > 0) {
      props.onSearchChange(search);
    } else {
      props.onSearchChange("");
    }
  }

  return (
    <>
      {showNavbar ? (
        <nav className={styles.Navbar}>
          <div>
            <img src={logo} alt="Logo Corelab" />

            <p>CoreNotes</p>

            <Search
              placeholder="Pesquisar notas"
              value={search}
              onChange={handleSearchNote}
            />
          </div>

          <img
            src={iconOut}
            alt="Ícone fechar Navbar"
            className={styles.Icon}
            onClick={() => setShowNavbar(false)}
          />
        </nav>
      ) : (
        <div className={styles.Logo} onClick={() => setShowNavbar(true)}>
          <img src={iconArrow} alt="Flecha para expandir Navbar" />
        </div>
      )}
    </>
  );
}
