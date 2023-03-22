import {
  cleanup,
  fireEvent,
  renderWithProviders,
  screen,
} from "../../../_test/utils/test-utils";
import Header from "../../components/header/Header";
import FavoriteButton from "./FavoriteButton";

const movieFields = {
  title: "test-movie",
  poster_path: "",
  adult: false,
  overview: "",
  release_date: "",
  genre_ids: [],
  original_title: "",
  original_language: "",
  popularity: 1,
  vote_count: 1,
  video: false,
  vote_average: 1,
  backdrop_path: "",
  runtime: 1,
};

describe("favorite-button-component", () => {
  afterEach(cleanup);

  test("render", async () => {
    const initPropValues = {
      movie: { id: 1, ...movieFields },
      text: "favorite",
    };

    const initPropValues2 = {
      movie: { id: 2, ...movieFields },
    };

    renderWithProviders(<Header />);

    const { asFragment: fragmentButton } = renderWithProviders(
      <FavoriteButton {...initPropValues} />
    );

    const { asFragment: fragmentIcon } = renderWithProviders(
      <FavoriteButton {...initPropValues2} />
    );

    fireEvent.click(screen.getByTestId("favorite-link-1"));
    fireEvent.click(screen.getByTestId("favorite-button-2"));
    expect(
      (screen.getByTestId("favorite-badge") as HTMLSpanElement).textContent
    ).toBe("2");

    fireEvent.click(screen.getByTestId("favorite-link-1"));
    expect(
      (screen.getByTestId("favorite-badge") as HTMLSpanElement).textContent
    ).toBe("1");

    expect(fragmentButton()).toMatchSnapshot();
    expect(fragmentIcon()).toMatchSnapshot();
  });
});
