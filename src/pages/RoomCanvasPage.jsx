// src/pages/RoomCanvasPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Group, Rect, Text } from "react-konva";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useImage from "use-image";

// Import room background images
import Base from "../assets/images/Base.png";
import Basebeige from "../assets/images/Basebeige.png";
import Basepink from "../assets/images/Basepink.png";
import Baseblue from "../assets/images/Baseblue.png";
import Basegreen from "../assets/images/Basegreen.png";
import "./RoomCanvasPage.css";

// Import bed images for color mapping
import bed1 from "../assets/furniture/bed1.png";
import bed1Purple from "../assets/furniture/bed1purple.png";
import bed1Blue from "../assets/furniture/bed1blue.png";
// Import left-facing bed images
import bed1Left from "../assets/furniture/bed1left.png";
import bed1PurpleLeft from "../assets/furniture/bed1purpleleft.png";
import bed1BlueLeft from "../assets/furniture/bed1blueleft.png";
// Import bed2 images
import bed2 from "../assets/furniture/bed2.png";
import bed2Pastel from "../assets/furniture/bed2pastel.png";
import bed2Maroon from "../assets/furniture/bed2maroon.png";
// Import bed2 left-facing images (assuming you have these)
import bed2Left from "../assets/furniture/bed2left.png";
import bed2PastelLeft from "../assets/furniture/bed2pastelleftl.png";
import bed2MaroonLeft from "../assets/furniture/bed2maroonleft.png";
// Import desk images
import desk1 from "../assets/furniture/desk1.png";
import desk1Beige from "../assets/furniture/desk1beige.png";
import desk1Brown from "../assets/furniture/desk1brown.png";
import desk2 from "../assets/furniture/desk2.png";
import desk2Beige from "../assets/furniture/desk2beige.png";
import desk2Brown from "../assets/furniture/desk2brown.png";

// Import desk left-facing images
import desk1Left from "../assets/furniture/desk1left.png";
import desk1BeigeLeft from "../assets/furniture/desk1beigeleft.png";
import desk1BrownLeft from "../assets/furniture/desk1brownleft.png";
import desk2Left from "../assets/furniture/desk2left.png";
import desk2BeigeLeft from "../assets/furniture/desk2beigeleft.png";
import desk2BrownLeft from "../assets/furniture/desk2brownleft.png";

import sofa1 from "../assets/furniture/sofa1.png";
import sofa1Blue from "../assets/furniture/sofa1blue.png";
import sofa1Pink from "../assets/furniture/sofa1pink.png";
import sofa2 from "../assets/furniture/sofa2.png";
import sofa2Blue from "../assets/furniture/sofa2blue.png";
import sofa2Pink from "../assets/furniture/sofa2pink.png";

import sofa1Left from "../assets/furniture/sofa1left.png";
import sofa1BlueLeft from "../assets/furniture/sofa1blueleft.png";
import sofa1PinkLeft from "../assets/furniture/sofa1pinkleft.png";
import sofa2Left from "../assets/furniture/sofa2left.png";
import sofa2BlueLeft from "../assets/furniture/sofa2blueleft.png";
import sofa2PinkLeft from "../assets/furniture/sofa2pinkleft.png";

import tv1 from "../assets/furniture/tv1.png";
import tv2 from "../assets/furniture/tv2.png";
import tv2Gray from "../assets/furniture/tv2gray.png";
import tv2Brown from "../assets/furniture/tv2brown.png";

import tv1Left from "../assets/furniture/tv1left.png";
import tv2Left from "../assets/furniture/tv2left.png";
import tv2GrayLeft from "../assets/furniture/tv2grayleft.png";
import tv2BrownLeft from "../assets/furniture/tv2brownleft.png";

import plant1 from "../assets/furniture/plant1.png";
import plant1Beige from "../assets/furniture/plant1beige.png";
import plant1Pink from "../assets/furniture/plant1pink.png";
import plant1Left from "../assets/furniture/plant1left.png";
import plant1BeigeLeft from "../assets/furniture/plant1beigeleft.png";
import plant1PinkLeft from "../assets/furniture/plant1pinkleft.png";

// Import Poster images
import poster1 from "../assets/furniture/poster1.png";
import poster1Yellow from "../assets/furniture/poster1yellow.png";
import poster1Left from "../assets/furniture/poster1left.png";
import poster1YellowLeft from "../assets/furniture/poster1yellowleft.png";

import poster2 from "../assets/furniture/poster2.png";
import poster2Green from "../assets/furniture/poster2green.png";
import poster2Left from "../assets/furniture/poster2left.png";
import poster2GreenLeft from "../assets/furniture/poster2greenleft.png";


// Room color options
const roomColorOptions = [
  { name: "Default", color: "#e2c6ab", image: Base },
  { name: "Beige", color: "#ebe0d0", image: Basebeige },
  { name: "Pink", color: "#d3b1c2", image: Basepink },
  { name: "Blue", color: "#e3e8e9", image: Baseblue },
  { name: "Green", color: "#c1c2ad", image: Basegreen }
];

// Constants for stage dimensions and boundary constraints
const STAGE_WIDTH = 1200;  // Increased stage width
const STAGE_HEIGHT = 800;  // Increased stage height
const ROOM_WIDTH = 912;    // Original room width
const ROOM_HEIGHT = 656;   // Original room height
const FURNITURE_WIDTH = 256;
const FURNITURE_HEIGHT = 256;
const BOUNDARY_PADDING = 140; // Space from edges for UI elements (increased for control panel)

// Function to constrain furniture position within safe boundaries
function constrainFurniturePosition(x, y) {
  const minX = BOUNDARY_PADDING;
  const maxX = STAGE_WIDTH - FURNITURE_WIDTH - BOUNDARY_PADDING;
  const minY = BOUNDARY_PADDING;
  const maxY = STAGE_HEIGHT - FURNITURE_HEIGHT - BOUNDARY_PADDING;
  
  return {
    x: Math.max(minX, Math.min(maxX, x)),
    y: Math.max(minY, Math.min(maxY, y))
  };
}

// Color to image mapping
const colorImageMappings = {
  "bed1": {
    // Right-facing (default)
    right: {
      "#eeddde": bed1,        // Brown/default bed
      "#bfd7ed": bed1Blue,    // Blue bed
      "#c6c0d2": bed1Purple   // Purple bed
    },
    // Left-facing
    left: {
      "#eeddde": bed1Left,        // Brown/default bed left
      "#bfd7ed": bed1BlueLeft,    // Blue bed left
      "#c6c0d2": bed1PurpleLeft   // Purple bed left
    }
  },
  "bed2": {
    // Right-facing (default)
    right: {
      "#eeddde": bed2,        // Default bed2
      "#f8d7da": bed2Pastel,  // Pastel bed2
      "#8b2635": bed2Maroon   // Maroon bed2
    },
    // Left-facing
    left: {
      "#eeddde": bed2Left,        // Default bed2 left
      "#f8d7da": bed2PastelLeft,  // Pastel bed2 left
      "#8b2635": bed2MaroonLeft   // Maroon bed2 left
    }
  },
  "desk1": {
    // Right-facing (default)
    right: {
      "#a87a4d": desk1,        // Default desk1
      "#edd3bb": desk1Beige,   // Beige desk1
      "#4f3a36": desk1Brown    // Brown desk1
    },
    // Left-facing
    left: {
      "#a87a4d": desk1Left,        // Default desk1 left
      "#edd3bb": desk1BeigeLeft,   // Beige desk1 left
      "#4f3a36": desk1BrownLeft    // Brown desk1 left
    }
  },
  "desk2":{
    right:{
      "#ecf0f9":desk2,
      "#ffefe0":desk2Beige,
      "#794a42":desk2Brown
    },
    left:{
      "#ecf0f9":desk2Left,
      "#ffefe0":desk2BeigeLeft,
      "#794a42":desk2BrownLeft
    }
  },
  "sofa1" :{
    right:{
      "#9ea894": sofa1, 
      "#dae3e6": sofa1Blue,
      "#fee7e6": sofa1Pink
    },
    left:{
      "#9ea894": sofa1Left, 
      "#dae3e6": sofa1BlueLeft,
      "#fee7e6": sofa1PinkLeft
    }
  },
  "sofa2" :{
    right:{
      "#9ea894": sofa2, 
      "#dae3e6": sofa2Blue,
      "#fee7e6": sofa2Pink
    },
    left:{
      "#9ea894": sofa2Left, 
      "#dae3e6": sofa2BlueLeft,
      "#fee7e6": sofa2PinkLeft
    }
  },
  "tv1":{
    right:{
      "#666666": tv1
    },
    left:{
      "#666666": tv1Left
    }
  },
  "tv2":{
    right: {
      "#37586f": tv2,        
      "#666666": tv2Gray,   
      "#422723": tv2Brown    
    },
    left: {
      "#37586f": tv2Left,        
      "#666666": tv2GrayLeft,   
      "#422723": tv2BrownLeft  
    }
  },
  "plant1":{
    right: {
      "#663931": plant1,        // Brown plant
      "#e2c5aa": plant1Beige,   // Beige plant
      "#ffd7da": plant1Pink     // Pink plant
        },
              // Left-facing
    left: {
      "#663931": plant1Left,        // Brown plant left
      "#e2c5aa": plant1BeigeLeft,   // Beige plant left
      "#ffd7da": plant1PinkLeft     // Pink plant left
      }
  },
  "poster1":{
    right: {
      "#cbdbfc": poster1,        // Blue poster
      "#f6f2b5": poster1Yellow   // Yellow poster
      },
              // Left-facing
    left: {
      "#cbdbfc": poster1Left,        // Blue poster left
      "#f6f2b5": poster1YellowLeft   // Yellow poster left
      }
  },
  "poster2":{
    right: {
      "#f3d1e8": poster2,        // Pink poster2
      "#cbdbbd": poster2Green    // Green poster2
      },
              // Left-facing
    left: {
      "#f3d1e8": poster2Left,        // Pink poster2 left
      "#cbdbbd": poster2GreenLeft    // Green poster2 left
       }
  },

};

// Preview furniture component for drag state
function PreviewFurniture({ furniture, x, y }) {
  const [image] = useImage(furniture.src);
  return (
    <KonvaImage
      image={image}
      x={x}
      y={y}
      width={64}
      height={64}
      opacity={0.7}
    />
  );
}

// Room Color Picker Component
function RoomColorPicker({ selectedColor, onColorChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedOption = roomColorOptions.find(opt => opt.color === selectedColor);

  return (
    <div className="room-color-picker">
      <button 
        className="room-color-header"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
      >
        <span>Room Color: {selectedOption?.name || 'Default'}</span>
        <span className={`room-color-arrow ${isExpanded ? 'expanded' : ''}`}>▼</span>
      </button>
      
      {isExpanded && (
        <div className="room-color-options">
          {roomColorOptions.map((option) => (
            <button
              key={option.name}
              className={`room-color-btn ${selectedColor === option.color ? 'selected' : ''}`}
              style={{ backgroundColor: option.color }}
              onClick={() => {
                onColorChange(option.color, option.image);
                setIsExpanded(false); // Close after selection
              }}
              title={option.name}
              aria-label={`Select ${option.name} room color`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Main furniture component for placed items
function Furniture({ furniture, isSelected, onSelect, onDragEnd, onRotate, onColorChange, onRemove }) {
  // Determine which image to use based on furniture color and rotation
  const getImageSrc = () => {
    const mapping = colorImageMappings[furniture.id];
    if (mapping && furniture.color) {
      const direction = furniture.rotation === 180 ? 'left' : 'right';
      const directionMapping = mapping[direction];
      if (directionMapping && directionMapping[furniture.color]) {
        return directionMapping[furniture.color];
      }
    }
    return furniture.src; // Fallback to original src
  };

  const [image] = useImage(getImageSrc());

  return (
    <>
      <KonvaImage
        image={image}
        x={furniture.x}
        y={furniture.y}
        width={FURNITURE_WIDTH}
        height={FURNITURE_HEIGHT}
        draggable
        onClick={onSelect}
        onTap={onSelect}
        onDragMove={(e) => {
          // Real-time constraint during drag
          const constrainedPosition = constrainFurniturePosition(
            e.target.x(),
            e.target.y()
          );
          e.target.x(constrainedPosition.x);
          e.target.y(constrainedPosition.y);
        }}
        onDragEnd={e => {
          const constrainedPosition = constrainFurniturePosition(
            e.target.x(),
            e.target.y()
          );
          onDragEnd(constrainedPosition.x, constrainedPosition.y);
        }}
        stroke={isSelected ? "dodgerblue" : null}
        strokeWidth={isSelected ? 2 : 0}
        shadowColor={isSelected ? "dodgerblue" : null}
        shadowBlur={isSelected ? 10 : 0}
      />

      {isSelected && (
        <Group x={furniture.x + 270} y={furniture.y}>
          <Rect width={120} height={100} fill="#fff" shadowBlur={5} cornerRadius={8} />
          <Text 
            text="Rotate" 
            x={10} y={10} 
            fontSize={14} 
            fill="#333" 
            onClick={onRotate}
            style={{ cursor: 'pointer' }}
          />
          <Text 
            text="Remove" 
            x={10} y={25} 
            fontSize={14} 
            fill="#e74c3c" 
            onClick={onRemove}
            style={{ cursor: 'pointer' }}
          />
          <Text text="Colors:" x={10} y={45} fontSize={14} fill="#333" />
          {furniture.colors.map((color, i) => (
            <Rect
              key={color}
              x={10 + i * 24}
              y={65}
              width={20}
              height={20}
              fill={color}
              cornerRadius={4}
              stroke={furniture.color === color ? "dodgerblue" : null}
              strokeWidth={2}
              onClick={() => onColorChange(color)}
            />
          ))}
        </Group>
      )}
    </>
  );
}

export default function RoomCanvasPage() {
  const navigate = useNavigate();
  const stageRef = useRef();
  
  // Room state management
  const [selectedRoomColor, setSelectedRoomColor] = useState("#e2c6ab");
  const [roomImage] = useImage(roomColorOptions.find(opt => opt.color === selectedRoomColor)?.image || Base);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [placedFurniture, setPlacedFurniture] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [draggedFurniture, setDraggedFurniture] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Load saved progress (commented out for Claude.ai compatibility)
  useEffect(() => {
    // const saved = localStorage.getItem("roomDecorFurniture");
    // if (saved) setPlacedFurniture(JSON.parse(saved));
    // const savedRoomColor = localStorage.getItem("roomColor");
    // if (savedRoomColor) setSelectedRoomColor(savedRoomColor);
  }, []);

  function handleRoomColorChange(color, image) {
    setSelectedRoomColor(color);
    console.log('Room color changed to:', color);
  }

  function handleDragFurniture(furniture) {
    console.log('Drag started with furniture:', furniture);
    setDraggedFurniture({
      ...furniture,
      x: 0,
      y: 0,
      uid: Date.now().toString(),
      colors: furniture.colors || ["#eeddde"],
      color: furniture.color || furniture.colors?.[0] || "#eeddde",
      rotation: 0, // Default rotation
    });
  }

  // Handle mouse movement over the canvas
  function handleMouseMove(e) {
    if (draggedFurniture) {
      const stage = stageRef.current;
      const pos = stage.getPointerPosition();
      if (pos) {
        setMousePos(pos);
      }
    }
  }

  // Handle mouse up (drop) on the canvas
  function handleMouseUp(e) {
    console.log('Mouse up on canvas', { draggedFurniture });
    
    if (!draggedFurniture) return;
    
    const stage = stageRef.current;
    const pos = stage.getPointerPosition();
    console.log('Drop position:', pos);

    if (pos && pos.x >= 0 && pos.y >= 0 && pos.x <= STAGE_WIDTH && pos.y <= STAGE_HEIGHT) {
      // Apply boundary constraints to the drop position
      const constrainedPosition = constrainFurniturePosition(
        pos.x - 32,  // Offset for cursor position
        pos.y - 32
      );

      const newFurniture = {
        ...draggedFurniture,
        x: constrainedPosition.x,
        y: constrainedPosition.y,
        rotation: draggedFurniture.rotation || 0, // Ensure rotation is preserved
      };

      console.log('Adding furniture:', newFurniture);
      
      setPlacedFurniture(prev => [...prev, newFurniture]);
    }
    
    setDraggedFurniture(null);
  }

  function handleDragEnd(uid, x, y) {
    console.log('Furniture moved:', { uid, x, y });
    setPlacedFurniture(prev =>
      prev.map(f => (f.uid === uid ? { ...f, x, y } : f))
    );
  }

  function handleRotate() {
    if (selectedId) {
      setPlacedFurniture(prev =>
        prev.map(f => {
          if (f.uid === selectedId) {
            // Toggle between 0 (right) and 180 (left) degrees
            const newRotation = f.rotation === 180 ? 0 : 180;
            console.log('Rotating furniture:', f.name, 'to', newRotation, 'degrees');
            return { ...f, rotation: newRotation };
          }
          return f;
        })
      );
    }
  }

  function handleColorChange(color) {
    if (selectedId) {
      console.log('Changing color to:', color, 'for furniture:', selectedId);
      setPlacedFurniture(prev =>
        prev.map(f => (f.uid === selectedId ? { ...f, color } : f))
      );
    }
  }

  function handleRemove() {
    if (selectedId) {
      setPlacedFurniture(prev => prev.filter(f => f.uid !== selectedId));
      setSelectedId(null); // Deselect after removal
      console.log('Removed furniture with id:', selectedId);
    }
  }

  function handleSave() {
    // localStorage.setItem("roomDecorFurniture", JSON.stringify(placedFurniture));
    // localStorage.setItem("roomColor", selectedRoomColor);
    console.log('Saved furniture:', placedFurniture);
    console.log('Saved room color:', selectedRoomColor);
    alert("Progress saved to console! (localStorage disabled in this environment)");
  }

  // Handle clicks outside furniture to deselect
  function handleStageClick(e) {
    // Only deselect if we clicked on the stage itself or the background room image
    // Don't deselect if we clicked on furniture or UI elements
    const clickedOnStage = e.target === e.target.getStage();
    const clickedOnBackground = e.target.getClassName() === 'Image' && e.target.image() === roomImage;
    
    if (clickedOnStage || clickedOnBackground) {
      setSelectedId(null);
    }
  }

  return (
    <div className="room-canvas-page">
      {/* Top left buttons */}
      <div className="top-left-buttons">
        <button onClick={() => navigate(-1)} className="control-btn">← Back</button>
        <button onClick={handleSave} className="control-btn">Save</button>
      </div>

      {/* Room Color Picker */}
      <RoomColorPicker 
        selectedColor={selectedRoomColor}
        onColorChange={handleRoomColorChange}
      />

      {/* Sidebar toggle */}
      <button
        className="sidebar-toggle-btn"
        onClick={() => setSidebarOpen(open => !open)}
      >
        {sidebarOpen ? "→" : "←"}
      </button>

      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onDragFurniture={handleDragFurniture}
      />

      <div className="room-canvas-container" style={{ marginRight: sidebarOpen ? 300 : 0 }}>
        <Stage
          width={STAGE_WIDTH}
          height={STAGE_HEIGHT}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onClick={handleStageClick}
          ref={stageRef}
          className="room-canvas-stage"
          style={{ border: draggedFurniture ? '2px solid #4169E1' : '2px dashed #ccc' }}
        >
          <Layer>
            {/* Background - centered in larger stage */}
            <KonvaImage 
              image={roomImage} 
              x={(STAGE_WIDTH - ROOM_WIDTH) / 2} 
              y={(STAGE_HEIGHT - ROOM_HEIGHT) / 2} 
              width={ROOM_WIDTH} 
              height={ROOM_HEIGHT} 
            />

            {/* Preview furniture while dragging */}
            {draggedFurniture && (
              <PreviewFurniture
                furniture={draggedFurniture}
                x={mousePos.x - 32}
                y={mousePos.y - 32}
              />
            )}

            {/* Placed furniture */}
            {placedFurniture.map(furn => (
              <Furniture
                key={furn.uid}
                furniture={furn}
                isSelected={furn.uid === selectedId}
                onSelect={() => setSelectedId(furn.uid)}
                onDragEnd={(x, y) => handleDragEnd(furn.uid, x, y)}
                onRotate={handleRotate}
                onColorChange={handleColorChange}
                onRemove={handleRemove}
              />
            ))}
          </Layer>
        </Stage>
        
        {/* Debug info */}
        {draggedFurniture && (
          <div style={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '5px 10px',
            borderRadius: '4px',
            fontSize: '12px'
          }}>
            Dragging: {draggedFurniture.name} - Move mouse over canvas and release!
          </div>
        )}
        
        <div style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '4px',
          fontSize: '12px'
        }}>
          Furniture placed: {placedFurniture.length} | Room: {roomColorOptions.find(opt => opt.color === selectedRoomColor)?.name || 'Default'}
        </div>
      </div>
    </div>
  );
}