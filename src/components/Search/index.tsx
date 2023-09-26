import styles from "./Search.module.scss";
import iconSearch from "../../assets/images/icon-search.svg";

interface ISearch {
  placeholder: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: ISearch) => {
  return (
    <div className={styles.Search}>
      <input type="text" placeholder={props.placeholder} value={props.value} />
      <img src={iconSearch} alt="Lupa" />
    </div>
  );
};

export default Search;
