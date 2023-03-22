import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Button, IconButton } from "@mui/material";
import { ReactElement } from "react";
import { Movie } from "../../models/MovieModel";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
} from "../../state/slices/FavoriteMovieSlice";
import { useTypedDispatch, useTypedSelector } from "../../state/store";

const FavoriteButton = (props: {
  movie: Movie;
  text?: string;
}): ReactElement => {
  const { movie, text } = props;
  const { list } = useTypedSelector((state) => state.favoriteMovie);
  const dispatch = useTypedDispatch();

  const handleOnClick = (e: React.SyntheticEvent): void => {
    e.stopPropagation();
    if (list.find((favItem) => favItem.id === movie.id)) {
      dispatch(removeFavoriteMovie(movie.id));
    } else {
      dispatch(addFavoriteMovie(movie));
    }
  };

  const currentIcon = list.find((favItem) => favItem.id === movie.id) ? (
    <FavoriteIcon color="error" />
  ) : (
    <FavoriteBorderIcon color="error" />
  );

  if (text) {
    return (
      <Button
        data-testid={`favorite-link-${movie.id}`}
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
      data-testid={`favorite-button-${movie.id}`}
      color="error"
      sx={{ position: "absolute", right: 0 }}
      onClick={handleOnClick}
    >
      {currentIcon}
    </IconButton>
  );
};

export default FavoriteButton;
