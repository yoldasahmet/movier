import {
  cleanup,
  fireEvent,
  renderWithProviders,
  screen,
} from "../../../_test/utils/test-utils";
import Header from "../../components/header/Header";
import WatchButton from "./WatchButton";

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

describe("watch-button-component", () => {
  afterEach(cleanup);

  test("render", async () => {
    const initPropValues = {
      movie: { id: 1, ...movieFields },
      text: "watch",
    };

    const initPropValues2 = {
      movie: { id: 2, ...movieFields },
    };

    renderWithProviders(<Header />);

    const { asFragment: fragmentButton } = renderWithProviders(
      <WatchButton {...initPropValues} />
    );

    const { asFragment: fragmentIcon } = renderWithProviders(
      <WatchButton {...initPropValues2} />
    );

    fireEvent.click(screen.getByTestId("watch-link-1"));
    fireEvent.click(screen.getByTestId("watch-button-2"));
    expect(
      (screen.getByTestId("watch-badge") as HTMLSpanElement).textContent
    ).toBe("2");

    fireEvent.click(screen.getByTestId("watch-link-1"));
    expect(
      (screen.getByTestId("watch-badge") as HTMLSpanElement).textContent
    ).toBe("1");

    expect(fragmentButton()).toMatchSnapshot();
    expect(fragmentIcon()).toMatchSnapshot();
  });
});
