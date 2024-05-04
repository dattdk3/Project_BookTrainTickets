// ** React Imports
import { ElementType, ReactNode } from "react";

// ** Next Imports
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// ** MUI Imports
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box, { BoxProps } from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";

// ** Custom Components Imports
import PersonIcon from "@mui/icons-material/Person";

import { NavLink } from "./VerticalNavItems";
import { SvgIconProps } from "@mui/material";

interface Props {
  item: NavLink;
  navVisible?: boolean;
  toggleNavVisibility: () => void;
}

interface UserIconProps {
  iconProps?: SvgIconProps;
  icon: string | ReactNode;
}

// ** Styled Components
const MenuNavLink = styled(ListItemButton, {
  shouldForwardProp: () => true,
})<
  ListItemButtonProps & {
    component?: ElementType;
    target?: "_blank" | undefined;
    href?: string | undefined;
  }
>(({ theme }) => ({
  width: "100%",
  borderTopRightRadius: 100,
  borderBottomRightRadius: 100,
  color: theme.palette.text.primary,
  padding: theme.spacing(2.25, 3.5),
  transition: "opacity .25s ease-in-out",
  textDecoration: "none",
  "&.active, &.active:hover": {
    boxShadow: theme.shadows[3],
    backgroundImage: `linear-gradient(98deg, #9fe4f2, ${theme.palette.primary.main} 94%)`,
  },
  "&.active .MuiTypography-root, &.active .MuiSvgIcon-root": {
    color: `${theme.palette.common.white} !important`,
  },
}));

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  transition: "opacity .25s ease-in-out",
  ...{ overflow: "hidden" },
});

const VerticalNavLink = ({ item, navVisible, toggleNavVisibility }: Props) => {
  // ** Hooks
  const router = useRouter();
  const pathName = usePathname();

  const IconTag: ReactNode = item.icon;

  const UserIcon = (props: UserIconProps) => {
    // ** Props
    const { icon, iconProps } = props;

    const IconTag = icon;

    let styles;

    /* styles = {
      color: 'red',
      fontSize: '2rem'
    } */

    // @ts-ignore
    return <IconTag {...iconProps} style={{ ...styles }} />;
  };

  const isNavLinkActive = () => {
    if (pathName === item.path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <ListItem
      disablePadding
      className="nav-link"
      disabled={item.disabled || false}
      sx={{ mt: 1.5, px: "0 !important" }}
    >
      <MenuNavLink
        href={item.path === undefined ? "/" : `${item.path}`}
        component={"a"}
        className={isNavLinkActive() ? "active" : ""}
        {...(item.openInNewTab ? { target: "_blank" } : null)}
        onClick={(e) => {
          if (item.path === undefined) {
            e.preventDefault();
            e.stopPropagation();
          }
          if (navVisible) {
            toggleNavVisibility();
          }
        }}
        sx={{
          pl: 5.5,
          textDecoration: "none",
          ...(item.disabled
            ? { pointerEvents: "none" }
            : { cursor: "pointer" }),
        }}
      >
        <ListItemIcon
          sx={{
            mr: 0,
            color: "text.primary",
            transition: "margin .25s ease-in-out",
          }}
        >
          <UserIcon icon={IconTag} />
        </ListItemIcon>
        <MenuItemTextMetaWrapper>
          <Typography {...{ noWrap: true }}>{item.title}</Typography>
          {item.badgeContent ? (
            <Chip
              label={item.badgeContent}
              color={item.badgeColor || "primary"}
              sx={{
                height: 20,
                fontWeight: 500,
                marginLeft: 1.25,
                "& .MuiChip-label": { px: 0.5, textTransform: "capitalize" },
              }}
            />
          ) : null}
        </MenuItemTextMetaWrapper>
      </MenuNavLink>
    </ListItem>
  );
};

export default VerticalNavLink;
