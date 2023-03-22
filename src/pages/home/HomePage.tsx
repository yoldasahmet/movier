import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../../features/favorite-button/FavoriteButton";
import WatchButton from "../../features/watch-button/WatchButton";
import { Movie } from "../../models/MovieModel";
import {
  movieImageUrl,
  useGetPopularMoviesQuery,
} from "../../services/MovieService";
import PageContainer from "../_base/PageContainer";

const HomePage = (): ReactElement => {
  const navigate = useNavigate();

  const { data: movieList, isLoading: isMovieListLoading } =
    useGetPopularMoviesQuery();

  return (
    <PageContainer>
      <Typography
        variant="h4"
        sx={{ marginBottom: 3, marginTop: 2 }}
        component="div"
      >
        Popular Movies
      </Typography>
      {isMovieListLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {movieList?.results?.map((movieItem: Movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movieItem.id}>
              <Card
                data-testid={`movie-card-${movieItem.id}`}
                onClick={() => navigate("/detail/" + movieItem.id)}
              >
                <CardActionArea component={"a"}>
                  <FavoriteButton movie={movieItem} />
                  <WatchButton movie={movieItem} />

                  <CardMedia
                    component="img"
                    image={`${movieImageUrl}${movieItem.poster_path}`}
                    alt="poster"
                  />
                  <CardContent sx={{ height: 104 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {movieItem.original_title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default HomePage;
