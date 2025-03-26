
import './Galaga.css'

function Galaga() {
  return (
    <div>
      <div className="game">
        <iframe
          src="https://galaga.ee"
          width="50%"
          height="600px"
          style={{ border: 'none' }}
        ></iframe>

        <a href="/" className="launch-btn">
          <span className="icon">
            <img src="/Fighter.webp" alt="" />
          </span>
          <span className="text">Home</span>
          <span className="launch"></span>
        </a>
      </div>
    </div>
  );
}

export default Galaga
