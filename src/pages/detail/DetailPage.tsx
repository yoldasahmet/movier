import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import {
  movieImageUrl,
  useGetMovieDetailsQuery,
  useGetMovieVideosQuery,
} from "../../services/MovieService";
import PageContainer from "../_base/PageContainer";

const DetailPage = (): ReactElement => {
  let { id } = useParams();

  const { data: movieDetail } = useGetMovieDetailsQuery({ id: Number(id) });
  const { data: movieVideos } = useGetMovieVideosQuery({ id: Number(id) });

  const selectedVideo = movieVideos?.results?.find(
    (item) => item.site === "YouTube"
  );

  return (
    <>
      <PageContainer>
        {movieDetail ? (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <Typography variant="h3" data-testid={`movie-title-label`}>
                  {movieDetail?.title}
                </Typography>

                <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
                  <Rating
                    name="rating"
                    defaultValue={movieDetail?.vote_average}
                    size="large"
                    readOnly
                    precision={0.2}
                    max={10}
                  />

                  <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{ paddingTop: "2px" }}
                  >
                    {movieDetail?.genre_ids?.map((item) => (
                      <Typography key={item.id} color="text.primary">
                        {item.name}
                      </Typography>
                    ))}
                  </Breadcrumbs>
                </Stack>

                <Stack
                  direction="row"
                  divider={<Divider orientation="vertical" flexItem />}
                  spacing={{ xs: 1, md: 3 }}
                >
                  <Button variant="outlined">
                    {movieDetail?.runtime + " mins"}
                  </Button>
                  <Button variant="outlined">{movieDetail.release_date}</Button>
                  <Button variant="outlined">
                    {movieDetail?.original_language}
                  </Button>
                </Stack>
                <Typography
                  variant="body1"
                  component="div"
                  sx={{ paddingTop: 2, paddingBottom: 2 }}
                >
                  {movieDetail?.overview}
                </Typography>

                {selectedVideo?.key && (
                  <YouTube
                    videoId={selectedVideo?.key}
                    opts={{
                      height: "500",
                      width: "100%",
                      playerVars: {
                        rel: 0,
                        autoplay: 1,
                      },
                    }}
                  />
                )}
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Stack spacing={2}>
                <img
                  src={`${movieImageUrl}${movieDetail.poster_path}`}
                  alt={""}
                  loading="lazy"
                  width="100%"
                />
              </Stack>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </PageContainer>
    </>
  );
};

export default DetailPage;
