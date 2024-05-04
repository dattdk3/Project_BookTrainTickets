// ** React Imports
import { ReactNode, useState } from "react";

// ** MUI Imports
import { styled } from "@mui/material/styles";
import Box, { BoxProps } from "@mui/material/Box";

// ** Components

import AppBar from "@/@core/layouts/components/vertical/appBar";
import Navigation from "./navigation";

export type LayoutProps = {
  hidden: boolean;
  children: ReactNode;
  verticalAppBarContent?: (props?: any) => ReactNode;
  verticalNavItems?: any;
};

const VerticalLayoutWrapper = styled("div")({
  height: "100%",
  display: "flex",
  margin: -8,
  backgroundColor: "#F4F5FA"
});

const MainContentWrapper = styled(Box)<BoxProps>({
  flexGrow: 1,
  minWidth: 0,
  display: "flex",
  minHeight: "100vh",
  flexDirection: "column",
  paddingRight: "24px",
  paddingLeft: "24px",
  paddingBottom: "24px"
});

const ContentWrapper = styled("main")(({ theme }) => ({
  flexGrow: 1,
  paddingTop: 16,
  width: "100%",
  transition: "padding .25s ease-in-out"
}));

const VerticalLayout = (props: LayoutProps) => {
  // ** Props
  const { children } = props;

  // ** States
  const [navVisible, setNavVisible] = useState<boolean>(false);

  // ** Toggle Functions
  const toggleNavVisibility = () => setNavVisible(!navVisible);

  return (
    <>
      <VerticalLayoutWrapper className="layout-wrapper">
        <Navigation
          navWidth={260}
          navVisible={navVisible}
          setNavVisible={setNavVisible}
          toggleNavVisibility={toggleNavVisibility}
          {...props}
        />
        <MainContentWrapper className="layout-content-wrapper">
          {/* AppBar Component */}
          <AppBar toggleNavVisibility={toggleNavVisibility} {...props} />

          {/* Content */}
          <ContentWrapper
            className="layout-page-content"
          >
            {children}
          </ContentWrapper>
        </MainContentWrapper>
      </VerticalLayoutWrapper>
    </>
  );
};

export default VerticalLayout;
