import { faPlay, faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

const BodyComp = ({ arr, font, theme }) => {
  console.log(arr);
  const [src, setSrc] = useState("");
  useEffect(() => {
    let audios = [];
    if (arr.length) {
      for (let i = 0; i < arr[0].phonetics.length; i++) {
        const src = arr[0].phonetics[i];
        audios.push(src.audio)
      }
      let getAmericanAccent = audios.filter((audio) => {
        return audio.includes("us")
      })
      setSrc(getAmericanAccent.toString());
    }

  }, [arr])
  const audio = new Audio(src);
  return (
    <>
      <div className="word-title">
        <div className="word">
          <p className={`${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>{arr.length ? arr[0].word : ""}</p>
          <p>{arr.length ? arr[0].phonetic : ""}</p>
        </div>
        <div className="word-audio">
          <div>{
            arr.length ? <button onClick={() => audio.play()}>
              <FontAwesomeIcon icon={faPlay} style={{ color: "#A445ED", transform: "scale(1.5)", }} /></button>
              : ""
          }
          </div>
        </div>
      </div>
      <div className="word-meanings">
        {
          arr.map((item, parentIndex) => {
            return <div key={parentIndex}>
              {
                item.meanings.map((meaning, childIndex) => {
                  return <div key={childIndex}>
                    <div className="word-meanings__head">
                      <p className={`${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>{meaning.partOfSpeech}</p>
                      <div className="divider"></div>
                    </div>
                    <div className="word-meanings__info">
                      <p className={`word-meanings__info-head ${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>Meaning</p>
                      {
                        meaning.definitions.map((definition, defIndex) => {
                          return <div key={defIndex}>
                            <p className={`definition ${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`} >{definition.definition}</p>
                            {definition.example ? <q className="example">{definition.example}</q> : ""}
                            {definition.synonyms.length ?
                              <p className="synonyms"><span className={`${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>Synonyms</span> <span>{definition.synonyms.join(", ")}</span></p>
                              : ""}
                          </div>
                        })
                      }
                      {meaning.synonyms.length ?
                        <p className="synonyms"><span className={`${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>Synonyms</span><span>{meaning.synonyms.join(", ")}</span></p>
                        : ""}
                      {meaning.antonyms.length ?
                        <p className="antonyms"><span className={`${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>Antonyms</span> <span>{meaning.antonyms.join(", ")}</span></p>
                        : ""}

                    </div>
                  </div>
                })
              }
              <div className="source">
                <div className="divider"></div>
                <p className={`${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>Source</p>
                {
                  item.sourceUrls.map((source, childIndex) => {
                    return <div key={childIndex}>
                      <a className={`${theme ? "dark-items" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`} href={source} target="_blank" rel="noreferrer">{source} <FontAwesomeIcon icon={faUpRightFromSquare} /></a>
                    </div>
                  })
                }
              </div>
            </div>
          })
        }
      </div>
    </>
  )
}
export default BodyComp;
BodyComp.propTypes = {
  arr: PropTypes.array,
  font: PropTypes.string,
  theme: PropTypes.bool
}