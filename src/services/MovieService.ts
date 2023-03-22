import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MovieApiResponse } from "../models/MovieApiResponse";
import { Movie, MovieVideo } from "../models/MovieModel";

const apiKey = "9765e8bdf86d23ebbd40453b00325891";

export const movieImageUrl = "https://image.tmdb.org/t/p/original/";

const MovieService = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<MovieApiResponse, void>({
      query: () => `/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
    }),
    getMovieDetails: builder.query<Movie, { id: number }>({
      query: ({ id }) => `/movie/${id}?api_key=${apiKey}`,
    }),
    getMovieVideos: builder.query<
      { id: number; results: MovieVideo[] },
      { id: number }
    >({
      query: ({ id }) => `/movie/${id}/videos?api_key=${apiKey}`,
    }),
    searchMovie: builder.query<MovieApiResponse, { text: string }>({
      query: ({ text }) =>
        `/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${text}`,
    }),
  }),
});

export default MovieService;

export const {
  useGetPopularMoviesQuery,
  useGetMovieDetailsQuery,
  useGetMovieVideosQuery,
  useSearchMovieQuery,
} = MovieService;
