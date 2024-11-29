import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import BodyComp from "./BodyComp"
import ErrorComp from './ErrorComp';
import { PropTypes } from "prop-types";

const SearchComp = ({ font, theme }) => {
  const [isFocus, setFocus] = useState(false);
  const [word, setWord] = useState("");
  const [isFound , setFound] = useState(true);
  const [arrOfData, setArr] = useState([]);
  const getWord = async () => {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    try {
      if (res.status === 200) {
        const data = await res.json()
        setArr(data);
        setFound(true);
      } else {
        setFound(false);
      }
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <form onSubmit={(e) => {e.preventDefault(); getWord(); e.target.reset()}}>
        <div className={`wrapper ${theme ? `dark-wrapper ${isFocus? "isFocus-dark" : ""}` : `${isFocus? "isFocus-light": ""}`}`}>
          <input type="text"
            className={`${theme ? "dark-inp" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}
            placeholder="Search for any word ..."
            aria-label="choose a word"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChange={(e) => setWord(e.target.value)}
            required
            />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} style={{ color: "#852aa8" }} />
          </button>
        </div>
      </form>
      {isFound? <BodyComp arr={arrOfData} font={font} theme={theme} /> : <ErrorComp  font={font} theme={theme} />}
    </>
  )
}
export default SearchComp;
SearchComp.propTypes = {
  font: PropTypes.string,
  theme: PropTypes.bool
}