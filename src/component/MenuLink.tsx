import { MenuItem } from "@mui/material";
import type { MenuItemProps } from "@mui/material";
import { createLink } from "@tanstack/react-router";
import type { LinkComponent } from "@tanstack/react-router";
import React from "react";

interface MUIButtonLinkProps extends MenuItemProps<"a"> {}

const MUIButtonLinkComponent = React.forwardRef<HTMLAnchorElement, MUIButtonLinkProps>((props, ref) => <MenuItem ref={ref} component="a" {...props} />);

const CreatedButtonLinkComponent = createLink(MUIButtonLinkComponent);

export const CustomMenuItemLink: LinkComponent<typeof MUIButtonLinkComponent> = (props) => {
	return <CreatedButtonLinkComponent preload={"intent"} {...props} />;
};
