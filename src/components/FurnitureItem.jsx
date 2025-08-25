import React from "react";
import useImage from "../hooks/useImage"; // your own hook or implement the one I showed earlier

export default function FurnitureItem({ furniture, rotation, color, ...props }) {
  // Assuming src depends on rotation and color
  // For example, your files could be named like chair1_red_right.png etc
  const src = `/assets/${furniture.id}_${color}_${rotation}.png`;
  const image = useImage(src);

  return <Image image={image} {...props} />;
}
