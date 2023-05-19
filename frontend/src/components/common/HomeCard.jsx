import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TableRowsIcon from "@mui/icons-material/TableRows";

export default function HomeCard({ onAdd, onView, img, title }) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={title} />
      <CardMedia component='img' height='194' image={img} />

      <CardActions disableSpacing>
        <Tooltip title='Add Item'>
          <IconButton onClick={() => onAdd()} aria-label='add to favorites'>
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='View Items'>
          <IconButton onClick={() => onView()} aria-label='add to favorites'>
            <TableRowsIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
