// ** React Import
import { ReactNode, useRef, useState } from "react";

// ** MUI Import
import List from "@mui/material/List";
import Box, { BoxProps } from "@mui/material/Box";
import { styled, useTheme } from "@mui/material/styles";

// ** Component Imports
import Drawer from "./Drawer";
import VerticalNavItems, { VerticalNavItemsType } from "./VerticalNavItems";
import VerticalNavHeader from "./VerticalNavHeader";

interface Props {
  hidden: boolean;
  navWidth: number;
  children: ReactNode;
  navVisible: boolean;
  toggleNavVisibility: () => void;
  setNavVisible: (value: boolean) => void;
  verticalNavItems?: VerticalNavItemsType;
  verticalNavMenuContent?: (props?: any) => ReactNode;
  afterVerticalNavMenuContent?: (props?: any) => ReactNode;
  beforeVerticalNavMenuContent?: (props?: any) => ReactNode;
}

const StyledBoxForShadow = styled(Box)<BoxProps>({
  top: 50,
  left: -8,
  zIndex: 2,
  height: 75,
  display: "none",
  position: "absolute",
  pointerEvents: "none",
  width: "calc(100% + 15px)",
  "&.d-block": {
    display: "block",
  },
});

const Navigation = (props: Props) => {
  // ** Props
  const {
    hidden,
    afterVerticalNavMenuContent,
    beforeVerticalNavMenuContent,
    verticalNavMenuContent: userVerticalNavMenuContent,
  } = props;

  // ** States
  const [groupActive, setGroupActive] = useState<string[]>([]);
  const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);

  // ** Ref
  const shadowRef = useRef(null);

  // ** Hooks
  const theme = useTheme();

  // ** Fixes Navigation InfiniteScroll
  const handleInfiniteScroll = (ref: HTMLElement) => {
    if (ref) {
      // @ts-ignore
      ref._getBoundingClientRect = ref.getBoundingClientRect;

      ref.getBoundingClientRect = () => {
        // @ts-ignore
        const original = ref._getBoundingClientRect();

        return { ...original, height: Math.floor(original.height) };
      };
    }
  };

  // ** Scroll Menu
  const scrollMenu = (container: any) => {
    container = hidden ? container.target : container;
    if (shadowRef && container.scrollTop > 0) {
      // @ts-ignore
      if (!shadowRef.current.classList.contains("d-block")) {
        // @ts-ignore
        shadowRef.current.classList.add("d-block");
      }
    } else {
      // @ts-ignore
      shadowRef.current.classList.remove("d-block");
    }
  };
  return (
    <Drawer {...props}>
      <VerticalNavHeader {...props} />
      <StyledBoxForShadow ref={shadowRef} sx={{}} />
      <Box sx={{ height: "100%", position: "relative", overflow: "hidden" }}>
        {/* @ts-ignore */}
        {beforeVerticalNavMenuContent
          ? beforeVerticalNavMenuContent(props)
          : null}
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {userVerticalNavMenuContent ? (
            userVerticalNavMenuContent(props)
          ) : (
            <List
              className="nav-items"
              sx={{ transition: "padding .25s ease", pr: 4.5 }}
            >
              <VerticalNavItems
                groupActive={groupActive}
                setGroupActive={setGroupActive}
                currentActiveGroup={currentActiveGroup}
                setCurrentActiveGroup={setCurrentActiveGroup}
                {...props}
              />
            </List>
          )}
        </Box>
      </Box>
      {afterVerticalNavMenuContent ? afterVerticalNavMenuContent(props) : null}
    </Drawer>
  );
};

export default Navigation;
