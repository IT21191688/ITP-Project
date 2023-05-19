import * as React from "react";
import Button from "@mui/material/Button";

export default function BasicButton({
  text,
  onClick,
  width,
  backgroundColor = "primary" | "secondary",
}) {
  let color = "";
  switch (backgroundColor) {
    case "primary":
      color = "#4A75D3";
      break;
    case "secondary":
      color = "#26CED1";
      break;
    default:
      color = "#4A75D3";
  }
  return (
    <Button
      onClick={onClick}
      style={{
        borderRadius: 35,
      }}
      sx={{ width: width, backgroundColor: color }}
      variant="contained"
    >
      {text}
    </Button>
  );
}
