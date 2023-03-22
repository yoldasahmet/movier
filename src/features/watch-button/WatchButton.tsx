import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { Button, IconButton } from "@mui/material";
import { ReactElement } from "react";
import { Movie } from "../../models/MovieModel";
import {
  addWatchMovie,
  removeWatchMovie,
} from "../../state/slices/WatchMovieSlice";
import { useTypedDispatch, useTypedSelector } from "../../state/store";

const WatchButton = (props: { movie: Movie; text?: string }): ReactElement => {
  const { movie, text } = props;
  const { list } = useTypedSelector((state) => state.watchMovie);
  const dispatch = useTypedDispatch();

  const handleOnClick = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    if (list.find((watchItem) => watchItem.id === movie.id)) {
      dispatch(removeWatchMovie(movie.id));
    } else {
      dispatch(addWatchMovie(movie));
    }
  };

  const currentIcon = list.find((watchItem) => watchItem.id === movie.id) ? (
    <AccessTimeFilledIcon color="info" />
  ) : (
    <AccessTimeIcon color="info" />
  );

  if (text) {
    return (
      <Button
        data-testid={`watch-link-${movie.id}`}
        color="inherit"
        variant="text"
        size="small"
        startIcon={currentIcon}
        onClick={handleOnClick}
        sx={{
          textTransform: "none",
          textAlign: "left",
          lineHeight: 1.4,
          justifyContent: "flex-start",
        }}
      >
        {text}
      </Button>
    );
  }

  return (
    <IconButton
      data-testid={`watch-button-${movie.id}`}
      color="info"
      sx={{ position: "absolute", right: 0, bottom: 0 }}
      onClick={handleOnClick}
    >
      {currentIcon}
    </IconButton>
  );
};

export default WatchButton;
