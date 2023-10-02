import { useState } from "react";
import { DebounceInput } from "react-debounce-input";
import iconSearch from "../../assets/images/icon-search.svg";
import styles from "./Search.module.scss";

interface ISearch {
  placeholder: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: ISearch) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      className={styles.Search}
      style={{ border: isFocused ? "1px solid #ffb60d" : "" }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <DebounceInput
        aria-label="Campo para pesquisar notas"
        minLength={1}
        debounceTimeout={150}
        value={props.value}
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <img src={iconSearch} alt="Lupa" width="14" height="14" />
    </div>
  );
};

export default Search;
