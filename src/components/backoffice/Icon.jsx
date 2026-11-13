const ICON_PATHS = {
  overview:
    '<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
  users:
    '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19.5c.7-3.4 3-5.1 6.2-5.1s5.5 1.7 6.2 5.1"/><path d="M16 5.4a3.2 3.2 0 0 1 0 6.2M17.5 14.7c2.1.5 3.4 2 3.8 4.3"/>',
  clients:
    '<path d="M4 20V5.3A1.3 1.3 0 0 1 5.3 4h8.4A1.3 1.3 0 0 1 15 5.3V20"/><path d="M15 9h3.7A1.3 1.3 0 0 1 20 10.3V20M2.5 20h19"/><path d="M7 8h2M11 8h1M7 11.5h2M11 11.5h1M7 15h2M11 15h1"/>',
  team:
    '<circle cx="12" cy="8" r="3.4"/><path d="M5.2 20c.8-3.6 3.3-5.4 6.8-5.4s6 1.8 6.8 5.4"/><path d="m17.6 3.8 1.2 1.2 2.2-2.3"/>',
  transactions:
    '<path d="M4 7.5h15.5M15.5 3.5l4 4-4 4"/><path d="M20 16.5H4.5M8.5 12.5l-4 4 4 4"/>',
  invoices:
    '<path d="M6 3.5h9.2L19 7.3v13.2H6z"/><path d="M15.2 3.5v4h3.8M9 11h6M9 14.5h6M9 18h3.5"/>',
  payments:
    '<rect x="3" y="6" width="18" height="12" rx="2.2"/><path d="M3 9.5h18M6.5 15h4.5"/>',
  wallet:
    '<rect x="3.5" y="5.6" width="17" height="13" rx="2.5"/><path d="M3.5 9.2h13.2a1.7 1.7 0 0 1 1.7 1.7v4.2h-4.2a2.1 2.1 0 1 1 0-4.2h6.5"/>',
  profile:
    '<circle cx="12" cy="8.2" r="3.5"/><path d="M5.2 20c.8-3.5 3.3-5.3 6.8-5.3s6 1.8 6.8 5.3"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2"/>',
  bell: '<path d="M18.3 9.2a6.3 6.3 0 0 0-12.6 0c0 4.9-1.8 6.2-1.8 6.2h16.2s-1.8-1.3-1.8-6.2"/><path d="M9.8 19.1a2.5 2.5 0 0 0 4.4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  chevronDown: '<path d="m5.2 9.2 6.8 6.8 6.8-6.8"/>',
  chevronRight: '<path d="m9.2 5.2 6.8 6.8-6.8 6.8"/>',
  chevronLeft: '<path d="m14.8 5.2-6.8 6.8 6.8 6.8"/>',
  filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
  download: '<path d="M12 3.5v11M7.8 10.5 12 14.8l4.2-4.3M4 19.5h16"/>',
  upload: '<path d="M12 20.5v-11M7.8 13.5 12 9.2l4.2 4.3M4 4.5h16"/>',
  more: '<circle cx="5.5" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="currentColor" stroke="none"/><circle cx="18.5" cy="12" r="1.25" fill="currentColor" stroke="none"/>',
  check: '<path d="m5 12.3 4.4 4.4L19.2 6.9"/>',
  checkCircle: '<circle cx="12" cy="12" r="8.6"/><path d="m8 12.2 2.7 2.7 5.5-5.7"/>',
  clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.2 1.8"/>',
  alert: '<path d="M12 3.7 21 20H3z"/><path d="M12 9v4.8"/><circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/>',
  moon: '<path d="M20 15.1A8.5 8.5 0 0 1 8.9 4a8.5 8.5 0 1 0 11.1 11.1z"/>',
  arrowUpRight: '<path d="M7 17 17 7M8.2 7H17v8.8"/>',
  arrowDownLeft: '<path d="M17 7 7 17M15.8 17H7V8.2"/>',
  arrowRight: '<path d="M4 12h16M14.2 6.2 20 12l-5.8 5.8"/>',
  arrowLeft: '<path d="M20 12H4M9.8 6.2 4 12l5.8 5.8"/>',
  trendUp: '<path d="M3.5 16.5 9 11l3.5 3.5L20.5 6.5"/><path d="M15.5 6.5h5v5"/>',
  trendDown: '<path d="M3.5 7.5 9 13l3.5-3.5 8-8"/><path d="M15.5 17.5h5v-5"/>',
  sparkle:
    '<path d="M12 3.2c.6 4.5 2.3 6.2 6.8 6.8-4.5.6-6.2 2.3-6.8 6.8-.6-4.5-2.3-6.2-6.8-6.8 4.5-.6 6.2-2.3 6.8-6.8z"/><path d="M19 16.5c.25 1.9.95 2.6 2.8 2.85-1.85.25-2.55.95-2.8 2.85-.25-1.9-.95-2.6-2.8-2.85 1.85-.25 2.55-.95 2.8-2.85z"/>',
  command:
    '<path d="M9 6.5A2.5 2.5 0 1 0 6.5 9H9zM9 6.5v11M9 17.5A2.5 2.5 0 1 1 6.5 15H9M15 6.5A2.5 2.5 0 1 1 17.5 9H15zM15 6.5v11M15 17.5a2.5 2.5 0 1 0 2.5-2.5H15"/>',
  calendar:
    '<rect x="3.8" y="5.5" width="16.4" height="14.7" rx="2.2"/><path d="M7.5 3.8v3.4M16.5 3.8v3.4M3.8 9.8h16.4"/>',
  mail: '<rect x="3.5" y="5.3" width="17" height="13.4" rx="2.2"/><path d="m4.2 7 7.8 6.1L19.8 7"/>',
  lock: '<rect x="4.8" y="10.2" width="14.4" height="10.4" rx="2.2"/><path d="M8.2 10.2V7.9a3.8 3.8 0 0 1 7.6 0v2.3"/>',
  unlock: '<rect x="4.8" y="10.2" width="14.4" height="10.4" rx="2.2"/><path d="M8.2 10.2V7.9a3.8 3.8 0 0 1 7.1-2"/>',
  phone:
    '<path d="M7.4 3.8h9.2a2 2 0 0 1 2 2v12.4a2 2 0 0 1-2 2H7.4a2 2 0 0 1-2-2V5.8a2 2 0 0 1 2-2z"/><path d="M10.5 17.3h3"/>',
  bank: '<path d="m3.5 9.2 8.5-5.4 8.5 5.4M5.3 9.8v9.4M10 9.8v9.4M14 9.8v9.4M18.7 9.8v9.4M3.5 19.2h17"/>',
  card: '<rect x="3" y="5.2" width="18" height="13.6" rx="2.4"/><path d="M3 9.4h18M7 15h4"/>',
  logout: '<path d="M10 4.5H5.8a1.8 1.8 0 0 0-1.8 1.8v11.4a1.8 1.8 0 0 0 1.8 1.8H10"/><path d="M15.2 8.2 19 12l-3.8 3.8M9 12h10"/>',
  help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.4a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.1-1.7 2.3"/><circle cx="12" cy="16.9" r=".9" fill="currentColor" stroke="none"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  copy: '<rect x="8.2" y="8.2" width="11.2" height="11.2" rx="2"/><path d="M15.8 8.2V6.6a2 2 0 0 0-2-2H6.6a2 2 0 0 0-2 2v7.2a2 2 0 0 0 2 2h1.6"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13.5v5.2a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 18.7V7.3a1.8 1.8 0 0 1 1.8-1.8h5.2"/>',
  refresh: '<path d="M19.2 9.1A7.7 7.7 0 0 0 5.4 6.8L3.5 9"/><path d="M3.5 4.8V9h4.2"/><path d="M4.8 14.9a7.7 7.7 0 0 0 13.8 2.3l1.9-2.2"/><path d="M20.5 19.2V15h-4.2"/>',
  eye: '<path d="M2.8 12s3.3-6 9.2-6 9.2 6 9.2 6-3.3 6-9.2 6-9.2-6-9.2-6z"/><circle cx="12" cy="12" r="2.7"/>',
  eyeOff:
    '<path d="M3 3l18 18"/><path d="M9.9 6.3A9.8 9.8 0 0 1 12 6c5.9 0 9.2 6 9.2 6a16 16 0 0 1-3 3.5"/><path d="M6.2 7.6A16.7 16.7 0 0 0 2.8 12s3.3 6 9.2 6a10 10 0 0 0 4-.8"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
  file: '<path d="M7 3.8h6.6L19 9.2v11H7a1.8 1.8 0 0 1-1.8-1.8V5.6A1.8 1.8 0 0 1 7 3.8z"/><path d="M13.2 3.8v5.8H19M9.2 12h5.6M9.2 15.5h5.6"/>',
  send: '<path d="M21 3 10.6 13.4M21 3l-6.5 18-3.9-7.6L3 9.5z"/>',
  settings:
    '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.1A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.1 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H2.3V9.6h.1A1.7 1.7 0 0 0 4.1 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06L6.56 3.7l.06.06A1.7 1.7 0 0 0 8.5 4.1a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V2.3h4v.1A1.7 1.7 0 0 0 15 4.1a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 19.4 8.5a1.7 1.7 0 0 0 .6 1 1.7 1.7 0 0 0 1.1.4h.1v4h-.1A1.7 1.7 0 0 0 19.4 15z"/>',
  zap: '<path d="M13.2 2.5 4.5 13.6h6.3l-.2 7.9 8.9-11.4h-6.5z"/>',
  activity: '<path d="M3.5 12h4l2.3-6.4 4.4 12.8 2.3-6.4h4"/>',
  mapPin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
  info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 10.8v5.1"/><circle cx="12" cy="7.9" r=".9" fill="currentColor" stroke="none"/>',
  key: '<circle cx="8.2" cy="15.8" r="4.3"/><path d="m11.2 12.8 8.3-8.3M16.3 7.7l2.2 2.2M14.2 9.8l1.8 1.8"/>',
  globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4"/><path d="M12 3.5c2.2 2.4 3.4 5.2 3.4 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.4-5.2-3.4-8.5S9.8 5.9 12 3.5z"/>',
  briefcase: '<rect x="3" y="7.2" width="18" height="12.8" rx="2.2"/><path d="M8.3 7.2V5.5A1.5 1.5 0 0 1 9.8 4h4.4a1.5 1.5 0 0 1 1.5 1.5v1.7M3 11.5h18M10 11.5v2h4v-2"/>',
  shieldCheck: '<path d="M12 3.5 19 6v5.2c0 4.3-2.9 7.5-7 9.3-4.1-1.8-7-5-7-9.3V6z"/><path d="m8.8 11.8 2.2 2.2 4.3-4.5"/>',
  message: '<path d="M20.5 11.2a7.8 7.8 0 0 1-8 7.8 8.6 8.6 0 0 1-3.5-.8L4 20l1.7-4.4a7.7 7.7 0 1 1 14.8-4.4z"/>',
  sliders: '<path d="M4 7h8M16 7h4M4 17h4M12 17h8"/><circle cx="14" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  userPlus: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19.5c.7-3.4 3-5.1 6.2-5.1 1.4 0 2.6.3 3.6.9M18 12.5v6M15 15.5h6"/>',
  layers: '<path d="m12 3.5 9 4.7-9 4.7-9-4.7z"/><path d="m3 12 9 4.7 9-4.7M3 15.8l9 4.7 9-4.7"/>',
  database: '<ellipse cx="12" cy="6" rx="8" ry="3.2"/><path d="M4 6v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2V6M4 12v6c0 1.8 3.6 3.2 8 3.2s8-1.4 8-3.2v-6"/>',
  link: '<path d="M9.8 14.2 14.2 9.8"/><path d="M8.4 11.6 6.6 13.4a3.6 3.6 0 0 0 5.1 5.1l1.8-1.8M15.6 12.4l1.8-1.8a3.6 3.6 0 0 0-5.1-5.1l-1.8 1.8"/>',
  play: '<path d="M7.5 4.5 19 12 7.5 19.5z"/>',
  pause: '<rect x="6" y="4.5" width="4" height="15" rx="1.2"/><rect x="14" y="4.5" width="4" height="15" rx="1.2"/>',
  dot: '<circle cx="12" cy="12" r="4" fill="currentColor" stroke="none"/>',
  edit: '<path d="m4.5 16.7-.9 3.7 3.7-.9L19 7.8a2.4 2.4 0 0 0-3.4-3.4z"/><path d="m13.8 6.2 4 4"/>',
  trash: '<path d="M4.5 6.5h15M9 6.5v-2h6v2M6.5 6.5l.8 13h9.4l.8-13M10 10.5v5.5M14 10.5v5.5"/>',
  grid: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.2"/><path d="M3.5 9.5h17M3.5 15h17M9.5 3.5v17M15 3.5v17"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
  archive: '<rect x="3.5" y="4.5" width="17" height="4.5" rx="1.2"/><path d="M5 9v9.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V9M10 13h4"/>',
  flag: '<path d="M5 21V4h9l.8 2H20l-2.2 4.2L20 14h-7.2L12 12H5"/>',
  star: '<path d="m12 3.5 2.7 5.5 6 .9-4.35 4.2 1.03 6-5.38-2.83-5.38 2.83 1.03-6L3.3 9.9l6-.9z"/>',
};

export function Icon({ name, size = 20, strokeWidth = 1.7, className = '', title }) {
  const body = ICON_PATHS[name] || ICON_PATHS.dot;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      dangerouslySetInnerHTML={{ __html: title ? `<title>${title}</title>${body}` : body }}
    />
  );
}

export function BrandMark({ size = 28, className = '' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="16" cy="16" r="16" fill="#6FE7C8" />
      <path d="M4.5 20.5c5.4-8.7 12.8-10.2 23-5.4" stroke="#0A2540" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="7.2" cy="18.7" r="2.1" fill="#245BFF" />
      <circle cx="25.8" cy="14.6" r="1.7" fill="#0A2540" />
    </svg>
  );
}
