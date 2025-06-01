import "./App.css";

function App() {
  return (
    <div className="container">
      {/* Top Corner Elements */}
      <div className="corner top-left">ABOUT STUDIO</div>
      <div className="corner top-right">WHAT WE DO</div>

      {/* First Row */}
      <div className="row first-row">
        <div className="text-element">
          <div>EXPERIMENTAL</div>
          <div>SOFTWARE</div>
        </div>
        <div className="text-element">
          <div>SURREAL</div>
          <div>EVENTS</div>
        </div>
        <div className="text-element">
          <div>UNDERGROUND</div>
          <div>LABEL</div>
        </div>
      </div>

      {/* Center Logo */}
      <div className="center-logo">
        <div className="logo-text-container">sun rot studios</div>
        <div className="center-image">
          <img src="https://picsum.photos/300/200?random=1" alt="Center" />
        </div>
      </div>

      {/* Second Row */}
      <div className="row second-row">
        <div className="text-element">
          <div>ARTISTS</div>
          <div>HACKERS</div>
        </div>
        <div className="text-element">
          <div>DANCERS</div>
          <div>PROPHETS</div>
        </div>
        <div className="text-element">
          <div>BEAUTIFUL</div>
          <div>MISFITS</div>
        </div>
      </div>

      {/* Bottom Corner Elements */}
      <div className="corner bottom-left">
        <div className="read-book">VENICE CA</div>
        <div className="small-text">fever dream + digital infrastructure</div>
      </div>
      <div className="corner bottom-right">ENTER</div>
    </div>
  );
}

export default App;
