import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FavoriteButton from "../../features/favorite-button/FavoriteButton";
import WatchButton from "../../features/watch-button/WatchButton";
import { Movie } from "../../models/MovieModel";
import {
  movieImageUrl,
  useSearchMovieQuery,
} from "../../services/MovieService";
import PageContainer from "../_base/PageContainer";

const SearchPage = (): ReactElement => {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: searchResults, isLoading: isSearchLoading } =
    useSearchMovieQuery({ text: searchParams.get("text") || "" });

  return (
    <PageContainer>
      <Typography
        data-testid={`search-label`}
        variant="h4"
        sx={{ marginBottom: 3, marginTop: 2 }}
        component="div"
      >
        Results for : {searchParams.get("text")}
      </Typography>
      {isSearchLoading ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Search Content</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {searchResults?.results?.length ? (
                    searchResults.results.map((row: Movie) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                        onClick={() => navigate("/detail/" + row.id)}
                        key={row.id}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ padding: 0 }}
                        >
                          <img
                            src={`${movieImageUrl}${row.poster_path}`}
                            width={100}
                            alt={"poster"}
                          />
                        </TableCell>
                        <TableCell sx={{ padding: 2, position: "relative" }}>
                          <Stack>
                            <Typography variant="subtitle1">
                              {row.title}
                            </Typography>
                            <Typography variant="caption">
                              {row.overview}
                            </Typography>
                            <Stack direction="row" sx={{ marginTop: 1 }}>
                              <FavoriteButton text="Favorite" movie={row} />
                              <WatchButton text="Watch Later" movie={row} />
                            </Stack>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        sx={{ padding: 5 }}
                      >{`No movie for '${searchParams.get(
                        "text"
                      )}'`}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </PageContainer>
  );
};

export default SearchPage;
