import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Badge,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useTypedSelector } from "../../state/store";
import { Search, SearchIconWrapper, StyledInputBase } from "./HeaderSearch";

const Header = (): ReactElement => {
  const { favoriteMovie, watchMovie } = useTypedSelector((state) => state);
  const { count: favoriteCount } = favoriteMovie;
  const { count: watchCount } = watchMovie;
  const navigate = useNavigate();

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event && event.key === "Enter") {
      const textVal = (event.target as HTMLInputElement).value;
      if (textVal) {
        navigate("/search?text=" + textVal);
      }
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="default">
        <Container maxWidth="xl" sx={{ alignSelf: "center" }}>
          <Toolbar sx={{ padding: 0 }}>
            <IconButton
              data-testid="logo-button"
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => navigate("/")}
            >
              <img src={logo} width={40} alt={"movier"} />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                display: { xs: "none", sm: "block" },
                letterSpacing: 4,
                color: "#d13330",
              }}
            >
              movie
            </Typography>
            <Typography
              variant="h4"
              sx={{
                display: { xs: "none", sm: "block" },
                letterSpacing: 4,
                color: "#2d85cc",
              }}
            >
              r
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>

              <StyledInputBase
                placeholder="Search movie…"
                inputProps={{ "aria-label": "search" }}
                onKeyUp={handleSearch}
              />
            </Search>

            <Box sx={{ display: "flex" }}>
              <IconButton
                data-testid="favorite-icon"
                color="default"
                onClick={() => navigate("/movies/favorite")}
              >
                <Badge
                  data-testid="favorite-badge"
                  badgeContent={favoriteCount}
                  color="error"
                >
                  <FavoriteBorderIcon />
                </Badge>
              </IconButton>
              <IconButton
                data-testid="watch-icon"
                color="default"
                onClick={() => navigate("/movies/watch")}
              >
                <Badge
                  data-testid="watch-badge"
                  badgeContent={watchCount}
                  color="error"
                >
                  <AccessTimeIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
