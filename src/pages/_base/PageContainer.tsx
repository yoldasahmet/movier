import { Box, Container, SxProps, Theme } from "@mui/material";
import { ReactElement } from "react";
import Header from "../../components/header/Header";

const contentStyle: SxProps<Theme> = {
  paddingBottom: 12,
  paddingTop: 12,
};

const PageContainer = (props: {
  children: ReactElement | ReactElement[];
}): ReactElement => {
  return (
    <Box sx={contentStyle}>
      <Header />
      <Container maxWidth="xl">
        <Box sx={{ padding: { xs: 0, sm: "0 24px" } }}>{props.children}</Box>
      </Container>
    </Box>
  );
};

export default PageContainer;
