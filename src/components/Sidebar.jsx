// src/components/Sidebar.jsx
import React, { useState } from "react";
import "../pages/RoomCanvasPage.css";

// Import your actual image files based on your file structure
import BedIcon from "../assets/categories/Bed.png";
import DeskIcon from "../assets/categories/Desk.png";
import SofaIcon from "../assets/categories/Sofa.png";
import DecorIcon from "../assets/categories/Decor.png";


import bed1 from "../assets/furniture/bed1.png";
import bed1Purple from "../assets/furniture/bed1purple.png"; // Purple bed image
import bed1Blue from "../assets/furniture/bed1blue.png";     // Blue bed image
// Import left-facing bed images
import bed1Left from "../assets/furniture/bed1left.png";
import bed1PurpleLeft from "../assets/furniture/bed1purpleleft.png";
import bed1BlueLeft from "../assets/furniture/bed1blueleft.png";
// Import bed2 images
import bed2 from "../assets/furniture/bed2.png";
import bed2Pastel from "../assets/furniture/bed2pastel.png";
import bed2Maroon from "../assets/furniture/bed2maroon.png";
// Import bed2 left-facing images
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

// Import TV images
import tv1 from "../assets/furniture/tv1.png";
import tv1Left from "../assets/furniture/tv1left.png";
import tv2 from "../assets/furniture/tv2.png";
import tv2Gray from "../assets/furniture/tv2gray.png";
import tv2Brown from "../assets/furniture/tv2brown.png";
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




// Categories with icons and furniture items
const categories = {
  Beds: {
    img: BedIcon,
    items: [
      { 
        id: "bed1", 
        name: "Bed 1", 
        colors: ["#eeddde", "#bfd7ed", "#c6c0d2"], // Updated colors
        src: bed1, // Default image
        colorImages: {
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
        }
      },
      { 
        id: "bed2", 
        name: "Bed 2", 
        colors: ["#eeddde", "#f8d7da", "#8b2635"], // Default, Pastel, Maroon
        src: bed2, // Default image
        colorImages: {
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
        }
      },
    ],
  },
  Desks: {
    img: DeskIcon,
    items: [
      { 
        id: "desk1", 
        name: "Desk 1", 
        colors: ["#a87a4d", "#edd3bb", "#4f3a36"], // Default, Beige, Brown
        src: desk1, // Default image
        colorImages: {
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
        }
      },
      {id: "desk2", 
        name: "Desk 2", 
        colors: ["#ecf0f9", "#ffefe0", "#794a42"], // Default, Pastel, Maroon
        src: desk2, // Fixed: was bed2, now desk2
        colorImages: {
          // Right-facing (default)
          right: {
            "#ecf0f9": desk2,        // Default desk2
            "#ffefe0": desk2Beige,   // Beige desk2
            "#794a42": desk2Brown    // Brown desk2
          },
          // Left-facing
          left: {
            "#ecf0f9": desk2Left,        // Default desk2 left
            "#ffefe0": desk2BeigeLeft,   // Beige desk2 left
            "#794a42": desk2BrownLeft    // Brown desk2 left
          }
        }

      }
    ],
  },
  Sofas: {
    img: SofaIcon,
    items: [
      { 
        id: "sofa1", 
        name: "Sofa", 
        colors: ["#9ea894", "#dae3e6", "#fee7e6"], // Default, Blue, Pink
        src: sofa1, // Fixed: was desk1, now sofa1
        colorImages: {
          // Right-facing (default)
          right: {
            "#9ea894": sofa1,        // Default sofa1
            "#dae3e6": sofa1Blue,    // Blue sofa1
            "#fee7e6": sofa1Pink     // Pink sofa1
          },
          // Left-facing
          left: {
            "#9ea894": sofa1Left,        // Default sofa1 left
            "#dae3e6": sofa1BlueLeft,    // Blue sofa1 left
            "#fee7e6": sofa1PinkLeft     // Pink sofa1 left
          }
        }
      },
      { 
        id: "sofa2", 
        name: "Chair", 
        colors: ["#9ea894", "#dae3e6", "#fee7e6"], // Default, Blue, Pink
        src: sofa2, // Fixed: was desk1, now sofa2
        colorImages: {
          // Right-facing (default)
          right: {
            "#9ea894": sofa2,        // Default sofa2
            "#dae3e6": sofa2Blue,    // Blue sofa2
            "#fee7e6": sofa2Pink     // Pink sofa2
          },
          // Left-facing
          left: {
            "#9ea894": sofa2Left,        // Default sofa2 left
            "#dae3e6": sofa2BlueLeft,    // Blue sofa2 left
            "#fee7e6": sofa2PinkLeft     // Pink sofa2 left
          }
        }
      }
    ]
  },
  Decor: {
    img: DecorIcon,
    items: [
      { 
        id: "tv1", 
        name: "TV 1", 
        colors: ["#666666"], 
        src: tv1, 
        colorImages: {
          // Right-facing (default)
          right: {
            "#666666": tv1       // Default TV1
          },
          // Left-facing
          left: {
            "#666666": tv1Left   // Default TV1 left
          }
        }
      },
      { 
        id: "tv2", 
        name: "TV 2", 
        colors: ["#37586f", "#666666", "#422723"], 
        src: tv2, // Default image
        colorImages: {
          // Right-facing (default)
          right: {
            "#37586f": tv2,        
            "#666666": tv2Gray,   
            "#422723": tv2Brown    
          },
          // Left-facing
          left: {
            "#37586f": tv2Left,        
            "#666666": tv2GrayLeft,   
            "#422723": tv2BrownLeft  
          }
        }
      },
      { 
        id: "plant1", 
        name: "Plant", 
        colors: ["#663931", "#e2c5aa", "#ffd7da"], 
        src: plant1, // Default image
        colorImages: {
          // Right-facing (default)
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
        }
      },
      { 
        id: "poster1", 
        name: "Poster", 
        colors: ["#cbdbfc", "#f6f2b5"], 
        src: poster1, // Default image
        colorImages: {
          // Right-facing (default)
          right: {
            "#cbdbfc": poster1,        // Blue poster
            "#f6f2b5": poster1Yellow   // Yellow poster
          },
          // Left-facing
          left: {
            "#cbdbfc": poster1Left,        // Blue poster left
            "#f6f2b5": poster1YellowLeft   // Yellow poster left
          }
        }
      },
      { 
        id: "poster2", 
        name: "Poster 2", 
        colors: ["#f3d1e8", "#cbdbbd"], // Pink and Green colors
        src: poster2, // Default image
        colorImages: {
          // Right-facing (default)
          right: {
            "#f3d1e8": poster2,        // Pink poster2
            "#cbdbbd": poster2Green    // Green poster2
          },
          // Left-facing
          left: {
            "#f3d1e8": poster2Left,        // Pink poster2 left
            "#cbdbbd": poster2GreenLeft    // Green poster2 left
          }
        }
      },
    ]
  }
};

  

export default function Sidebar({ visible, onClose, onDragFurniture }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const catObj = selectedCategory ? categories[selectedCategory] : null;

  function handleDragStart(item) {
    const colorToUse = selectedColor || item.colors[0];
    const direction = 'right'; // Default to right-facing
    let imageToUse = item.src;
    
    if (item.colorImages) {
      const directionMapping = item.colorImages[direction];
      if (directionMapping && directionMapping[colorToUse]) {
        imageToUse = directionMapping[colorToUse];
      }
    }
    
    onDragFurniture({
      ...item,
      src: imageToUse,
      color: colorToUse,
      rotation: 0, // Default rotation
    });
  }

  function handleCategoryClick(cat) {
    setSelectedCategory(selectedCategory === cat ? null : cat);
    setSelectedColor(null); // Reset color selection when changing categories
  }

  return (
    <aside className={`sidebar ${visible ? "open" : ""}`}>
      <button className="sidebar-close-btn" onClick={onClose}>×</button>

      {/* Categories */}
      <div className="category-list">
        {Object.entries(categories).map(([cat, data]) => (
          <div
            key={cat}
            className={`category-item ${selectedCategory === cat ? "selected" : ""}`}
            onClick={() => handleCategoryClick(cat)}
            tabIndex={0}
            role="button"
            aria-pressed={selectedCategory === cat}
          >
            <img 
              src={data.img} 
              alt={`${cat} icon`} 
              className="category-icon"
              onError={(e) => {
                console.error(`Failed to load category icon: ${data.img}`);
                e.target.style.display = 'none';
              }}
            />
            <span>{cat}</span>
          </div>
        ))}
      </div>

      {/* Furniture items - only show if category is selected */}
      {selectedCategory && catObj && (
        <div className="furniture-list">
          <h3 style={{ color: '#333', marginBottom: '10px', fontSize: '14px' }}>
            {selectedCategory} ({catObj.items.length} items)
          </h3>
          {catObj.items.map(item => {
            // Get the current preview image based on selected color
            const currentColor = selectedColor || item.colors[0];
            const direction = 'right'; // Always show right-facing in sidebar
            let previewImage = item.src;
            
            if (item.colorImages) {
              const directionMapping = item.colorImages[direction];
              if (directionMapping && directionMapping[currentColor]) {
                previewImage = directionMapping[currentColor];
              }
            }
            
            return (
              <div key={item.id} className="furniture-item" style={{ 
                border: '1px solid #ddd', 
                borderRadius: '8px', 
                padding: '10px', 
                marginBottom: '10px',
                backgroundColor: '#f9f9f9'
              }}>
                {/* Draggable thumbnail - shows current color variant */}
                <img
                  src={previewImage}
                  alt={item.name}
                  className="furniture-drag-name"
                  onMouseDown={(e) => {
                    console.log('Mouse down on furniture:', item.name, 'Color:', currentColor);
                    handleDragStart(item);
                    e.preventDefault();
                  }}
                  title={`Click and drag ${item.name} to the room`}
                  style={{ 
                    width: 64, 
                    height: 64, 
                    cursor: "grab", 
                    marginBottom: "0.25rem",
                    objectFit: "contain",
                    display: 'block',
                    margin: '0 auto',
                    userSelect: 'none'
                  }}
                  onError={(e) => {
                    console.error(`Failed to load furniture image: ${e.target.src}`);
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect width='64' height='64' fill='%23ddd'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='0.3em' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
                
                {/* Name below thumbnail */}
                <div style={{ 
                  fontSize: 12, 
                  textAlign: "center", 
                  fontFamily: "PixelifySans, monospace",
                  marginBottom: "0.5rem",
                  fontWeight: 'bold'
                }}>
                  {item.name}
                </div>

                {/* Color picker */}
                <div className="color-picker" style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '4px',
                  flexWrap: 'wrap'
                }}>
                  {item.colors.map(color => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? "selected" : ""}`}
                      style={{ 
                        backgroundColor: color,
                        width: "20px",
                        height: "20px",
                        border: selectedColor === color ? "2px solid #333" : "1px solid #ccc",
                        borderRadius: "4px",
                        cursor: "pointer",
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select color ${color} for ${item.name}`}
                    />
                  ))}
                </div>
              </div>
            );
          }) || <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>No items in this category</div>}
        </div>
      )}

      {/* Show message when no category is selected */}
      {!selectedCategory && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#666',
          fontSize: '14px'
        }}>
          Select a category to view furniture
        </div>
      )}
    </aside>
  );
}