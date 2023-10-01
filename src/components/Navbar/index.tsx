import logo from "../../assets/images/logo.svg";
import iconOut from "../../assets/images/icon-out.svg";
import iconArrow from "../../assets/images/icon-arrow.svg";
import Search from "../Search";
import styles from "./Navbar.module.scss";
import { useState } from "react";

export default function Navbar(props: any) {
  const [search, setSearch] = useState<string>();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);

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
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>

          <img
            src={iconOut}
            alt="Ícone fechar"
            className={styles.Icon}
            onClick={() => setShowNavbar(false)}
          />
        </nav>
      ) : (
        <div className={styles.Logo} onClick={() => setShowNavbar(true)}>
          <img src={iconArrow} alt="Logo Corelab" />
        </div>
      )}
    </>
  );
}
