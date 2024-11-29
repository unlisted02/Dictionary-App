import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { faBook, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import SearchComp from "./SearchComp";
const HeaderComp = () => {
  const [theme, setTheme] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [font, setFont] = useState("");

  const darkBody = () => {
    if (theme) {
      document.documentElement.style.backgroundColor = "#fafafa";
    } else {
      document.documentElement.style.backgroundColor = "#000";
    }
  }
  const activeOne = (num) => {
    let items = document.querySelectorAll(".dropdown-list li");
    let mainFont = document.querySelector(".main-font");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (num === i) {
        item.classList.add("active")
        mainFont.innerHTML = item.innerHTML;
        setFont(item.getAttribute("data-font"));
      } else {
        item.classList.remove("active")
      }
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          <FontAwesomeIcon icon={faBook} style={theme ? { color: "#fff" } : { color: "#727272" }} />
        </div>
        <div className="dropdown">
          <p className={`main-font ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`} style={theme ? { color: "#fff" } : null}>Sans Serif</p>
          <FontAwesomeIcon icon={faChevronDown} style={{ color: "#852aa8" }} onClick={() => setDropDown(!dropDown)} />
          <div className={`dropdown-list ${theme ? "dark-dropdown-list" : null}`} style={dropDown ? { transform: "scale(1)" } : null}>
            <ul>
              <li data-font="sans" style={{ fontFamily: "sans-serif" }} onClick={() => { activeOne(0); }}>Sans Serif</li>
              <li data-font="serif" style={{ fontFamily: "serif" }} onClick={() => { activeOne(1); }}>Serif</li>
              <li data-font="mono" style={{ fontFamily: "monospace" }} onClick={() => { activeOne(2); }}>Monospace</li>
            </ul>
          </div>
        </div>
        <div className="theme-switcher">
          <div className="switcher" onClick={() => {
            setTheme(!theme)
            darkBody();
          }}>
            <span style={theme ? { transform: "translate(19px)" } : null}></span>
          </div>
          <FontAwesomeIcon icon={faMoon} style={theme ? { color: "#fff" } : { color: "#727272" }} />
        </div>
      </header>
      <SearchComp font={font} theme = {theme}/>
    </>
  )
}
export default HeaderComp;