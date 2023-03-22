import {
  cleanup,
  fireEvent,
  renderWithProviders,
  screen,
  mockedUseNavigate,
} from "../../../_test/utils/test-utils";
import Header from "./Header";

describe("header-component", () => {
  afterEach(cleanup);

  test("render", async () => {
    const { asFragment } = renderWithProviders(<Header />);

    const searchElement = screen.getByLabelText("search") as HTMLInputElement;
    fireEvent.change(searchElement, { target: { value: "chicago" } });
    expect(searchElement.value).toBe("chicago");

    fireEvent.keyUp(searchElement, {
      key: "Enter",
      code: "Enter",
      charCode: 13,
    });
    expect(mockedUseNavigate).toHaveBeenCalledWith("/search?text=chicago");

    fireEvent.click(screen.getByTestId("favorite-icon"));
    expect(mockedUseNavigate).toHaveBeenCalledWith("/movies/favorite");

    fireEvent.click(screen.getByTestId("watch-icon"));
    expect(mockedUseNavigate).toHaveBeenCalledWith("/movies/watch");

    fireEvent.click(screen.getByTestId("logo-button"));
    expect(mockedUseNavigate).toHaveBeenCalledWith("/");

    expect(asFragment()).toMatchSnapshot();
  });
});
