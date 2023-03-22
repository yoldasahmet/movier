import { rest } from "msw";
import detailData from "../data/detail.json";
import moviesData from "../data/movies.json";
import searchData from "../data/search.json";
import videoData from "../data/videos.json";
import { setupServer } from "msw/node";

const mockedDetailApi = setupServer(
  rest.get("https://api.themoviedb.org/3/movie/943822", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(detailData));
  })
);
const mockedMoviesApi = setupServer(
  rest.get("https://api.themoviedb.org/3/movie/popular", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(moviesData));
  })
);
const mockedSearchApi = setupServer(
  rest.get("https://api.themoviedb.org/3/search/movie", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(searchData));
  })
);

const mockedVideoApi = setupServer(
  rest.get(
    "https://api.themoviedb.org/3/movie/943822/videos",
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(videoData));
    }
  )
);

export { mockedDetailApi, mockedMoviesApi, mockedSearchApi, mockedVideoApi };
