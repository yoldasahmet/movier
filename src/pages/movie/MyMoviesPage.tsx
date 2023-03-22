import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FavoriteButton from "../../features/favorite-button/FavoriteButton";
import WatchButton from "../../features/watch-button/WatchButton";
import { movieImageUrl } from "../../services/MovieService";
import { useTypedSelector } from "../../state/store";
import PageContainer from "../_base/PageContainer";

const MyMoviesPage = (): ReactElement => {
  let { type: pageType } = useParams();
  const navigate = useNavigate();
  const isTypeFavorite = pageType === "favorite";
  const { count, list } = useTypedSelector((state) =>
    isTypeFavorite ? state.favoriteMovie : state.watchMovie
  );

  return (
    <PageContainer>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, marginTop: 2 }}
        component="div"
      >
        {`${count} ${isTypeFavorite ? "Favorite" : "Watch Later"} ${
          count > 1 ? "Movies" : "Movie"
        }`}
      </Typography>
      <Grid container spacing={2}>
        {list.map((movieItem) => (
          <Grid item xs={12} sm={12} md={6} lg={4} key={movieItem.id}>
            <Card
              sx={{ display: "flex" }}
              onClick={() => navigate("/detail/" + movieItem.id)}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {movieItem.original_title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {movieItem.overview?.length > 45
                      ? movieItem.overview.substring(0, 45) + "..."
                      : movieItem.overview}
                  </Typography>
                  <ButtonGroup variant="text">
                    <Button>{movieItem?.vote_average.toFixed(1)}</Button>
                    <Button>{movieItem.release_date.substring(0, 4)}</Button>
                    <Button>{movieItem?.original_language}</Button>
                  </ButtonGroup>
                </CardContent>

                <Box sx={{ pl: 1.8, pb: 1.5 }}>
                  {isTypeFavorite ? (
                    <FavoriteButton text="Remove Favorite" movie={movieItem} />
                  ) : (
                    <WatchButton text="Remove From List" movie={movieItem} />
                  )}
                </Box>
              </Box>

              <CardMedia
                component="img"
                sx={{ width: 150 }}
                image={`${movieImageUrl}${movieItem.poster_path}`}
                alt=""
              />
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default MyMoviesPage;
