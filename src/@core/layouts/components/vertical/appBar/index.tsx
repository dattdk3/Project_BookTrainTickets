// ** React Imports
import { ReactNode } from "react";

// ** MUI Imports
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps } from "@mui/material/AppBar";
import MuiToolbar, { ToolbarProps } from "@mui/material/Toolbar";

interface Props {
  hidden: boolean;
  toggleNavVisibility: () => void;
  verticalAppBarContent?: (props?: any) => ReactNode;
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  transition: "none",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  minHeight: theme.mixins.toolbar.minHeight
}));

const Toolbar = styled(MuiToolbar)<ToolbarProps>(({ theme }) => ({
  width: "100%",
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  padding: `${theme.spacing(0)} !important`,
  minHeight: `${theme.mixins.toolbar.minHeight}px !important`,
  transition:
    "padding .25s ease-in-out, box-shadow .25s ease-in-out, backdrop-filter .25s ease-in-out, background-color .25s ease-in-out",
}));

const LayoutAppBar = (props: Props) => {
  // ** Props
  const { verticalAppBarContent: userVerticalAppBarContent } = props;

  // ** Hooks
  const theme = useTheme();

  return (
    <AppBar
      elevation={0}
      color="default"
      className="layout-navbar"
      position="static"
    >
      <Toolbar
        className="navbar-content-container"
      >
        {(userVerticalAppBarContent && userVerticalAppBarContent(props)) ||
          null}
      </Toolbar>
    </AppBar>
  );
};

export default LayoutAppBar;
