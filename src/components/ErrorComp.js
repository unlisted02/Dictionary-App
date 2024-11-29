import { PropTypes } from "prop-types";
const ErrorComp = ({font, theme}) => {
  return(
  <>
  <div className={`error ${theme ? "dark-error" : null} ${font === "serif" ? "serif" : font === "mono" ? "mono" : "sans"}`}>
    <p>&#128533;</p>
    <p>No Definition Found</p>
    <p>we couldn't find definition for the word you were looking for.</p>
  </div>
  </>
  )
} 
export default ErrorComp;
ErrorComp.propTypes = {
  font: PropTypes.string,
  theme: PropTypes.bool
}