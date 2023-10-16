import { IconSvgProps } from "@/types/icon-type";

export const CheckIcon = ({
  strokeWidth = 1.5,
  ...otherProps
}: IconSvgProps) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...otherProps}
  >
    <path
      d="M7.75 11.9999L10.58 14.8299L16.25 9.16992"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
