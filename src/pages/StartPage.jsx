import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StartPage.css";
import chair1 from "../assets/furniture/chair1.png";
import chair2 from "../assets/furniture/chair2.png";
import tv from "../assets/furniture/tv.png";
import bed from "../assets/furniture/bed.png";
import plant from "../assets/furniture/plant.png";
import table from "../assets/furniture/table.png";

export default function StartPage({ onStart }) {
  const navigate = useNavigate();
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  function handleStart() {
    if (onStart) {
      onStart();
    } else {
      navigate("/room-canvas");
    }
  }

  return (
    <div 
      className="start-page"
      style={{
        backgroundImage: 'url(/src/assets/furniture/background.png)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Falling furniture - like rainfall */}
      <img src={chair1} alt="Chair 1" className="furniture-1" draggable={false} />
      <img src={chair2} alt="Chair 2" className="furniture-2" draggable={false} />
      <img src={tv} alt="TV" className="furniture-3" draggable={false} />
      <img src={bed} alt="Bed" className="furniture-4" draggable={false} />
      <img src={plant} alt="Plant" className="furniture-5" draggable={false} />
      <img src={table} alt="Table" className="furniture-6" draggable={false} />

      <div className="start-content">
        <h1 className="game-title">Room Decor Game</h1>
        <div className="button-group">
          <button className="start-button" onClick={handleStart}>
            Start
          </button>
          <button className="how-to-play-button" onClick={() => setShowHowToPlay(true)}>
            How to Play
          </button>
        </div>
      </div>

      {showHowToPlay && (
        <div className="modal-overlay" onClick={() => setShowHowToPlay(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>How to Play</h2>
            <p>
              🖌️ Drag and drop furniture into the room.<br />
              🎨 Change colors to match your style.<br />
              🏆 Save your perfect room design!
            </p>
            <button className="close-button" onClick={() => setShowHowToPlay(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}