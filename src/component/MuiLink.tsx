import type { LinkProps } from "@mui/material";
import { Link } from "@mui/material";
import type { LinkComponent } from "@tanstack/react-router";
import { createLink } from "@tanstack/react-router";
import React from "react";

interface MUIButtonLinkProps extends LinkProps<"a"> {}

const MUIButtonLinkComponent = React.forwardRef<
	HTMLAnchorElement,
	MUIButtonLinkProps
>((props, ref) => <Link ref={ref} component="a" {...props} />);

const CreatedButtonLinkComponent = createLink(MUIButtonLinkComponent);

export const CustomLink: LinkComponent<typeof MUIButtonLinkComponent> = (
	props,
) => {
	return <CreatedButtonLinkComponent preload={false} {...props} />;
};
