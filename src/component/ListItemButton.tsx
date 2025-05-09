import { ListItemButton } from "@mui/material";
import type { ListItemButtonProps } from "@mui/material";
import { createLink } from "@tanstack/react-router";
import type { LinkComponent } from "@tanstack/react-router";
import React from "react";

interface MUIButtonLinkProps extends ListItemButtonProps<"a"> {}

const MUIButtonLinkComponent = React.forwardRef<
	HTMLAnchorElement,
	MUIButtonLinkProps
>((props, ref) => <ListItemButton ref={ref} component="a" {...props} />);

const CreatedButtonLinkComponent = createLink(MUIButtonLinkComponent);

export const CustomListItemButton: LinkComponent<
	typeof MUIButtonLinkComponent
> = (props) => {
	return <CreatedButtonLinkComponent preload={"intent"} {...props} />;
};
