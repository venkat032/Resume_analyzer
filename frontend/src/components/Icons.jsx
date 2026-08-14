/**
 * Inline stroke icons (24x24, currentColor) so the UI has no emoji glyphs and
 * no icon-font/CDN dependency. Every icon accepts the usual svg props.
 */
const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const Icon = ({ children, size = 20, className = "", ...rest }) => (
  <svg {...base} width={size} height={size} className={className} {...rest}>
    {children}
  </svg>
);

export const SparkIcon = (p) => (
  <Icon {...p}>
    <path d="M12 3v3.5M12 17.5V21M4.5 12H8M16 12h3.5M6.7 6.7l2.5 2.5M14.8 14.8l2.5 2.5M17.3 6.7l-2.5 2.5M9.2 14.8l-2.5 2.5" />
    <circle cx="12" cy="12" r="2.75" />
  </Icon>
);

export const UploadIcon = (p) => (
  <Icon {...p}>
    <path d="M12 16V4m0 0L8 8m4-4 4 4" />
    <path d="M4 15v2.5A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5V15" />
  </Icon>
);

export const FileIcon = (p) => (
  <Icon {...p}>
    <path d="M14 3H7.5A1.5 1.5 0 0 0 6 4.5v15A1.5 1.5 0 0 0 7.5 21h9a1.5 1.5 0 0 0 1.5-1.5V7z" />
    <path d="M14 3v4h4" />
  </Icon>
);

export const BriefcaseIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12h18" />
  </Icon>
);

export const CheckIcon = (p) => (
  <Icon {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const CheckCircleIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Icon>
);

export const AlertIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5M12 16.2v.3" />
  </Icon>
);

export const XIcon = (p) => (
  <Icon {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
);

export const ArrowLeftIcon = (p) => (
  <Icon {...p}>
    <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
  </Icon>
);

export const ChevronDownIcon = (p) => (
  <Icon {...p}>
    <path d="m6 9 6 6 6-6" />
  </Icon>
);

export const CopyIcon = (p) => (
  <Icon {...p}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M15 5.5A1.5 1.5 0 0 0 13.5 4h-7A2.5 2.5 0 0 0 4 6.5v7A1.5 1.5 0 0 0 5.5 15" />
  </Icon>
);

export const PrintIcon = (p) => (
  <Icon {...p}>
    <path d="M7 9V4h10v5" />
    <rect x="4" y="9" width="16" height="7" rx="2" />
    <path d="M7 14h10v6H7z" />
  </Icon>
);

export const CodeIcon = (p) => (
  <Icon {...p}>
    <path d="m9 8-5 4 5 4M15 8l5 4-5 4" />
  </Icon>
);

export const UsersIcon = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0M16 5.2a3.25 3.25 0 0 1 0 6.1M17 14.4a5.5 5.5 0 0 1 3.5 5.1" />
  </Icon>
);

export const ClockIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5V12l3 1.8" />
  </Icon>
);

export const TargetIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Icon>
);

export const SunIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.1 5.1l1.4 1.4M17.5 17.5l1.4 1.4M18.9 5.1l-1.4 1.4M6.5 17.5l-1.4 1.4" />
  </Icon>
);

export const MoonIcon = (p) => (
  <Icon {...p}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4 8.5 8.5 0 1 0 20 14.2" />
  </Icon>
);

export const GithubIcon = (p) => (
  <Icon {...p}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </Icon>
);

export default Icon;
