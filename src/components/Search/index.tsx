import styles from "./Search.module.scss";
import iconSearch from "../../assets/images/icon-search.svg";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";

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
        minLength={1}
        debounceTimeout={150}
        value={props.value}
        type="text"
        placeholder={props.placeholder}
        onChange={props.onChange}
      />
      <img src={iconSearch} alt="Lupa" />
    </div>
  );
};

export default Search;
