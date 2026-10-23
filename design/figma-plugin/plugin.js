/* eslint-disable */
(function () {
    'use strict';

    /**
     * Design tokens for the AirliPay back-office redesign.
     *
     * The colour roles mirror the mobile theme at AiliPayApp/src/theme/tokens.js.
     * Desktop-specific roles (sidebar, tables, board chrome) are derived from the
     * same palette so the two products read as one family.
     */
    function hexToRgb(hex) {
        const clean = hex.replace('#', '').trim();
        if (clean.length !== 6) {
            throw new Error(`Unsupported colour value: ${hex}`);
        }
        return {
            r: parseInt(clean.slice(0, 2), 16) / 255,
            g: parseInt(clean.slice(2, 4), 16) / 255,
            b: parseInt(clean.slice(4, 6), 16) / 255
        };
    }
    function toHex(value) {
        return Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0');
    }
    /** Blend `b` into `a`; 0 returns a, 1 returns b. */
    function mix(a, b, amount) {
        const left = hexToRgb(a);
        const right = hexToRgb(b);
        const t = Math.max(0, Math.min(1, amount));
        const channel = (x, y) => toHex((x * (1 - t) + y * t) * 255);
        return `#${channel(left.r, right.r)}${channel(left.g, right.g)}${channel(left.b, right.b)}`.toUpperCase();
    }
    const lightBase = {
        navy: '#0A2540',
        navyDeep: '#061A2F',
        brandSurface: '#0A2540',
        onBrand: '#FFFFFF',
        onBrandMuted: '#C9D8E8',
        onBrandFaint: '#8EA5BC',
        brandText: '#0A2540',
        cobalt: '#245BFF',
        cobaltPressed: '#1B46C9',
        cobaltSoft: '#EEF2FF',
        cobaltText: '#245BFF',
        onPrimary: '#FFFFFF',
        mint: '#6FE7C8',
        mintSoft: '#E4FAF3',
        onMint: '#0A2540',
        onMintSoft: '#0A2540',
        canvas: '#F5F7FA',
        surface: '#FFFFFF',
        surfaceRaised: '#F8FAFC',
        surfaceSunken: '#F1F5F9',
        ink: '#0B1220',
        inkSoft: '#16283D',
        muted: '#5B6B7F',
        mutedLight: '#8A98A8',
        border: '#D7E0EA',
        borderStrong: '#B8C6D6',
        success: '#0E7A5F',
        successSoft: '#E6F6F0',
        warning: '#9A5B00',
        warningSoft: '#FFF4DB',
        error: '#B42318',
        errorSoft: '#FDECEA',
        info: '#1D4ED8',
        infoSoft: '#E8EFFF',
        knob: '#FFFFFF',
        illustrationInk: '#0A2540',
        overlay: 'rgba(6, 26, 47, 0.48)'
    };
    const darkBase = {
        navy: '#0A2540',
        navyDeep: '#061A2F',
        brandSurface: '#102A44',
        onBrand: '#F5F7FA',
        onBrandMuted: '#C9D8E8',
        onBrandFaint: '#8EA5BC',
        brandText: '#E8F0F8',
        cobalt: '#245BFF',
        cobaltPressed: '#1B46C9',
        cobaltSoft: '#152C4D',
        cobaltText: '#93ADFF',
        onPrimary: '#FFFFFF',
        mint: '#6FE7C8',
        mintSoft: '#103B38',
        onMint: '#061A2F',
        onMintSoft: '#C9F7EA',
        canvas: '#061322',
        surface: '#0B1E32',
        surfaceRaised: '#10263D',
        surfaceSunken: '#08182A',
        ink: '#F2F6FB',
        inkSoft: '#D8E4F0',
        muted: '#A9BACB',
        mutedLight: '#7C90A6',
        border: '#223A52',
        borderStrong: '#35516E',
        success: '#5CD6A0',
        successSoft: '#12382C',
        warning: '#F1B45A',
        warningSoft: '#3A2A12',
        error: '#FF8F86',
        errorSoft: '#3B1C20',
        info: '#8FB0FF',
        infoSoft: '#172C52',
        knob: '#F5F7FA',
        illustrationInk: '#E8F0F8',
        overlay: 'rgba(0, 0, 0, 0.64)'
    };
    const lightColors = Object.assign(Object.assign({}, lightBase), { sidebarBg: lightBase.navy, sidebarDeep: lightBase.navyDeep, sidebarCard: mix(lightBase.navy, '#FFFFFF', 0.06), sidebarBorder: mix(lightBase.navy, '#FFFFFF', 0.12), sidebarText: '#F5F7FA', sidebarMuted: '#C9D8E8', sidebarFaint: '#8EA5BC', navActiveBg: mix(lightBase.navy, lightBase.mint, 0.15), navActiveText: lightBase.mint, topbarBg: lightBase.surface, tableHead: '#F7F9FC', rowHover: mix(lightBase.surface, lightBase.cobalt, 0.035), rowSelected: lightBase.cobaltSoft, fieldBg: '#FFFFFF', chartDeposit: lightBase.cobalt, chartPayout: '#1FA987', chartGrid: lightBase.border, chartAxis: lightBase.mutedLight, focusRing: lightBase.cobalt });
    const darkColors = Object.assign(Object.assign({}, darkBase), { sidebarBg: darkBase.navyDeep, sidebarDeep: '#04101D', sidebarCard: mix(darkBase.navyDeep, '#FFFFFF', 0.05), sidebarBorder: mix(darkBase.navyDeep, '#FFFFFF', 0.1), sidebarText: '#F2F6FB', sidebarMuted: '#C9D8E8', sidebarFaint: '#8EA5BC', navActiveBg: mix(darkBase.navyDeep, darkBase.mint, 0.14), navActiveText: darkBase.mint, topbarBg: darkBase.surface, tableHead: '#091A2C', rowHover: mix(darkBase.surface, darkBase.cobalt, 0.09), rowSelected: darkBase.cobaltSoft, fieldBg: '#08182A', chartDeposit: '#6D91FF', chartPayout: darkBase.mint, chartGrid: darkBase.border, chartAxis: darkBase.mutedLight, focusRing: darkBase.cobaltText });
    /** The active palette. Screens read these roles at build time. */
    const colors = Object.assign({}, lightColors);
    function setTheme(theme) {
        Object.assign(colors, theme === 'dark' ? darkColors : lightColors);
    }
    const fontFamily = 'Inter';
    const fonts = {
        regular: { family: fontFamily, style: 'Regular' },
        medium: { family: fontFamily, style: 'Medium' },
        semibold: { family: fontFamily, style: 'Semi Bold' },
        bold: { family: fontFamily, style: 'Bold' },
        extrabold: { family: fontFamily, style: 'Extra Bold' }
    };
    const typeScale = {
        display: { size: 44, lineHeight: 52, weight: 'extrabold', letterSpacing: -1.2 },
        pageTitle: { size: 28, lineHeight: 34, weight: 'bold', letterSpacing: -0.5 },
        metric: { size: 30, lineHeight: 36, weight: 'bold', letterSpacing: -0.6 },
        balance: { size: 40, lineHeight: 46, weight: 'extrabold', letterSpacing: -1.1 },
        h2: { size: 22, lineHeight: 28, weight: 'semibold', letterSpacing: -0.2 },
        h3: { size: 18, lineHeight: 24, weight: 'semibold', letterSpacing: -0.1 },
        body: { size: 16, lineHeight: 24, weight: 'regular', letterSpacing: 0 },
        bodyStrong: { size: 16, lineHeight: 24, weight: 'medium', letterSpacing: 0 },
        bodySmall: { size: 14, lineHeight: 20, weight: 'regular', letterSpacing: 0 },
        label: { size: 13, lineHeight: 18, weight: 'medium', letterSpacing: 0 },
        table: { size: 13, lineHeight: 19, weight: 'regular', letterSpacing: 0 },
        tableStrong: { size: 13, lineHeight: 19, weight: 'semibold', letterSpacing: 0 },
        micro: { size: 11, lineHeight: 14, weight: 'medium', letterSpacing: 0 },
        eyebrow: { size: 11, lineHeight: 14, weight: 'semibold', letterSpacing: 0.6 },
        button: { size: 14, lineHeight: 20, weight: 'semibold', letterSpacing: 0 },
        amount: { size: 18, lineHeight: 24, weight: 'semibold', letterSpacing: -0.2 },
        caption: { size: 12, lineHeight: 16, weight: 'regular', letterSpacing: 0 }
    };
    const radii = {
        xs: 4,
        sm: 8,
        md: 12,
        lg: 16,
        xl: 20,
        pill: 999
    };
    const screen = {
        width: 1440,
        height: 960,
        sidebarWidth: 248,
        topbarHeight: 64,
        contentWidth: 1128};
    const board = {
        width: 4656,
        columns: [96, 1608, 3120],
        screenWidth: 1440,
        screenHeight: 960,
        rowPitch: 1100};
    /** Colours used only by the review canvas, never inside the app frames. */
    const boardColors = {
        bg: '#06111E',
        panel: '#091B2C',
        panelAlt: '#0C2237',
        border: '#1C344B',
        borderStrong: '#2A4762',
        text: '#F2F6FB',
        muted: '#A9BACB',
        faint: '#7C90A6',
        mint: '#6FE7C8',
        cobalt: '#6D91FF',
        warning: '#F1B45A',
        danger: '#FF8F86'
    };

    const paths = {
        overview: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.8"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.8"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.8"/>',
        users: '<circle cx="9" cy="8" r="3.2"/><path d="M2.8 19.5c.7-3.4 3-5.1 6.2-5.1s5.5 1.7 6.2 5.1"/><path d="M16 5.4a3.2 3.2 0 0 1 0 6.2M17.5 14.7c2.1.5 3.4 2 3.8 4.3"/>',
        clients: '<path d="M4 20V5.3A1.3 1.3 0 0 1 5.3 4h8.4A1.3 1.3 0 0 1 15 5.3V20"/><path d="M15 9h3.7A1.3 1.3 0 0 1 20 10.3V20M2.5 20h19"/><path d="M7 8h2M11 8h1M7 11.5h2M11 11.5h1M7 15h2M11 15h1"/>',
        team: '<circle cx="12" cy="8" r="3.4"/><path d="M5.2 20c.8-3.6 3.3-5.4 6.8-5.4s6 1.8 6.8 5.4"/><path d="m17.6 3.8 1.2 1.2 2.2-2.3"/>',
        transactions: '<path d="M4 7.5h15.5M15.5 3.5l4 4-4 4"/><path d="M20 16.5H4.5M8.5 12.5l-4 4 4 4"/>',
        invoices: '<path d="M6 3.5h9.2L19 7.3v13.2H6z"/><path d="M15.2 3.5v4h3.8M9 11h6M9 14.5h6M9 18h3.5"/>',
        payments: '<rect x="3" y="6" width="18" height="12" rx="2.2"/><path d="M3 9.5h18M6.5 15h4.5"/>',
        wallet: '<rect x="3.5" y="5.6" width="17" height="13" rx="2.5"/><path d="M3.5 9.2h13.2a1.7 1.7 0 0 1 1.7 1.7v4.2h-4.2a2.1 2.1 0 1 1 0-4.2h6.5"/>',
        profile: '<circle cx="12" cy="8.2" r="3.5"/><path d="M5.2 20c.8-3.5 3.3-5.3 6.8-5.3s6 1.8 6.8 5.3"/>',
        search: '<circle cx="10.8" cy="10.8" r="6.3"/><path d="m15.5 15.5 4.2 4.2"/>',
        bell: '<path d="M18.3 9.2a6.3 6.3 0 0 0-12.6 0c0 4.9-1.8 6.2-1.8 6.2h16.2s-1.8-1.3-1.8-6.2"/><path d="M9.8 19.1a2.5 2.5 0 0 0 4.4 0"/>',
        plus: '<path d="M12 5v14M5 12h14"/>',
        chevronDown: '<path d="m5.2 9.2 6.8 6.8 6.8-6.8"/>',
        chevronRight: '<path d="m9.2 5.2 6.8 6.8-6.8 6.8"/>',
        chevronLeft: '<path d="m14.8 5.2-6.8 6.8 6.8 6.8"/>',
        filter: '<path d="M4 6h16M7 12h10M10 18h4"/>',
        download: '<path d="M12 3.5v11M7.8 10.5 12 14.8l4.2-4.3M4 19.5h16"/>',
        upload: '<path d="M12 20.5v-11M7.8 13.5 12 9.2l4.2 4.3M4 4.5h16"/>',
        more: '<circle cx="5.5" cy="12" r="1.25" fill="CURRENT" stroke="none"/><circle cx="12" cy="12" r="1.25" fill="CURRENT" stroke="none"/><circle cx="18.5" cy="12" r="1.25" fill="CURRENT" stroke="none"/>',
        check: '<path d="m5 12.3 4.4 4.4L19.2 6.9"/>',
        checkCircle: '<circle cx="12" cy="12" r="8.6"/><path d="m8 12.2 2.7 2.7 5.5-5.7"/>',
        clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5l3.2 1.8"/>',
        alert: '<path d="M12 3.7 21 20H3z"/><path d="M12 9v4.8"/><circle cx="12" cy="17" r=".9" fill="CURRENT" stroke="none"/>',
        close: '<path d="M6 6l12 12M18 6 6 18"/>',
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4"/>',
        moon: '<path d="M20 15.1A8.5 8.5 0 0 1 8.9 4a8.5 8.5 0 1 0 11.1 11.1z"/>',
        arrowUpRight: '<path d="M7 17 17 7M8.2 7H17v8.8"/>',
        arrowDownLeft: '<path d="M17 7 7 17M15.8 17H7V8.2"/>',
        trendUp: '<path d="M3.5 16.5 9 11l3.5 3.5L20.5 6.5"/><path d="M15.5 6.5h5v5"/>',
        trendDown: '<path d="M3.5 7.5 9 13l3.5-3.5 8-8"/><path d="M15.5 17.5h5v-5"/>',
        sparkle: '<path d="M12 3.2c.6 4.5 2.3 6.2 6.8 6.8-4.5.6-6.2 2.3-6.8 6.8-.6-4.5-2.3-6.2-6.8-6.8 4.5-.6 6.2-2.3 6.8-6.8z"/><path d="M19 16.5c.25 1.9.95 2.6 2.8 2.85-1.85.25-2.55.95-2.8 2.85-.25-1.9-.95-2.6-2.8-2.85 1.85-.25 2.55-.95 2.8-2.85z"/>',
        command: '<path d="M9 6.5A2.5 2.5 0 1 0 6.5 9H9zM9 6.5v11M9 17.5A2.5 2.5 0 1 1 6.5 15H9M15 6.5A2.5 2.5 0 1 1 17.5 9H15zM15 6.5v11M15 17.5a2.5 2.5 0 1 0 2.5-2.5H15"/>',
        calendar: '<rect x="3.8" y="5.5" width="16.4" height="14.7" rx="2.2"/><path d="M7.5 3.8v3.4M16.5 3.8v3.4M3.8 9.8h16.4"/>',
        mail: '<rect x="3.5" y="5.3" width="17" height="13.4" rx="2.2"/><path d="m4.2 7 7.8 6.1L19.8 7"/>',
        lock: '<rect x="4.8" y="10.2" width="14.4" height="10.4" rx="2.2"/><path d="M8.2 10.2V7.9a3.8 3.8 0 0 1 7.6 0v2.3"/>',
        phone: '<path d="M7.4 3.8h9.2a2 2 0 0 1 2 2v12.4a2 2 0 0 1-2 2H7.4a2 2 0 0 1-2-2V5.8a2 2 0 0 1 2-2z"/><path d="M10.5 17.3h3"/>',
        bank: '<path d="m3.5 9.2 8.5-5.4 8.5 5.4M5.3 9.8v9.4M10 9.8v9.4M14 9.8v9.4M18.7 9.8v9.4M3.5 19.2h17"/>',
        card: '<rect x="3" y="5.2" width="18" height="13.6" rx="2.4"/><path d="M3 9.4h18M7 15h4"/>',
        logout: '<path d="M10 4.5H5.8a1.8 1.8 0 0 0-1.8 1.8v11.4a1.8 1.8 0 0 0 1.8 1.8H10"/><path d="M15.2 8.2 19 12l-3.8 3.8M9 12h10"/>',
        help: '<circle cx="12" cy="12" r="8.5"/><path d="M9.8 9.4a2.4 2.4 0 1 1 3.9 1.9c-.9.7-1.7 1.1-1.7 2.3"/><circle cx="12" cy="16.9" r=".9" fill="CURRENT" stroke="none"/>',
        menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
        copy: '<rect x="8.2" y="8.2" width="11.2" height="11.2" rx="2"/><path d="M15.8 8.2V6.6a2 2 0 0 0-2-2H6.6a2 2 0 0 0-2 2v7.2a2 2 0 0 0 2 2h1.6"/>',
        external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13.5v5.2a1.8 1.8 0 0 1-1.8 1.8H4.8A1.8 1.8 0 0 1 3 18.7V7.3a1.8 1.8 0 0 1 1.8-1.8h5.2"/>',
        refresh: '<path d="M19.2 9.1A7.7 7.7 0 0 0 5.4 6.8L3.5 9"/><path d="M3.5 4.8V9h4.2"/><path d="M4.8 14.9a7.7 7.7 0 0 0 13.8 2.3l1.9-2.2"/><path d="M20.5 19.2V15h-4.2"/>',
        eye: '<path d="M2.8 12s3.3-6 9.2-6 9.2 6 9.2 6-3.3 6-9.2 6-9.2-6-9.2-6z"/><circle cx="12" cy="12" r="2.7"/>',
        eyeOff: '<path d="M3 3l18 18"/><path d="M9.9 6.3A9.8 9.8 0 0 1 12 6c5.9 0 9.2 6 9.2 6a16 16 0 0 1-3 3.5"/><path d="M6.2 7.6A16.7 16.7 0 0 0 2.8 12s3.3 6 9.2 6a10 10 0 0 0 4-.8"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>',
        file: '<path d="M7 3.8h6.6L19 9.2v11H7a1.8 1.8 0 0 1-1.8-1.8V5.6A1.8 1.8 0 0 1 7 3.8z"/><path d="M13.2 3.8v5.8H19M9.2 12h5.6M9.2 15.5h5.6"/>',
        send: '<path d="M21 3 10.6 13.4M21 3l-6.5 18-3.9-7.6L3 9.5z"/>',
        settings: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.86 2.86-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21H9.6v-.1A1.7 1.7 0 0 0 8.5 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06-2.86-2.86.06-.06A1.7 1.7 0 0 0 4.1 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H2.3V9.6h.1A1.7 1.7 0 0 0 4.1 8.5a1.7 1.7 0 0 0-.34-1.88l-.06-.06L6.56 3.7l.06.06A1.7 1.7 0 0 0 8.5 4.1a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V2.3h4v.1A1.7 1.7 0 0 0 15 4.1a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.86 2.86-.06.06A1.7 1.7 0 0 0 19.4 8.5a1.7 1.7 0 0 0 .6 1 1.7 1.7 0 0 0 1.1.4h.1v4h-.1A1.7 1.7 0 0 0 19.4 15z"/>',
        zap: '<path d="M13.2 2.5 4.5 13.6h6.3l-.2 7.9 8.9-11.4h-6.5z"/>',
        activity: '<path d="M3.5 12h4l2.3-6.4 4.4 12.8 2.3-6.4h4"/>',
        mapPin: '<path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z"/><circle cx="12" cy="10" r="2.6"/>',
        info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 10.8v5.1"/><circle cx="12" cy="7.9" r=".9" fill="CURRENT" stroke="none"/>',
        key: '<circle cx="8.2" cy="15.8" r="4.3"/><path d="m11.2 12.8 8.3-8.3M16.3 7.7l2.2 2.2M14.2 9.8l1.8 1.8"/>',
        globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4"/><path d="M12 3.5c2.2 2.4 3.4 5.2 3.4 8.5S14.2 18.1 12 20.5c-2.2-2.4-3.4-5.2-3.4-8.5S9.8 5.9 12 3.5z"/>',
        arrowLeft: '<path d="M20 12H4M9.8 6.2 4 12l5.8 5.8"/>',
        arrowRight: '<path d="M4 12h16M14.2 6.2 20 12l-5.8 5.8"/>',
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
        dot: '<circle cx="12" cy="12" r="4" fill="CURRENT" stroke="none"/>',
        grid: '<rect x="3.5" y="3.5" width="17" height="17" rx="2.2"/><path d="M3.5 9.5h17M3.5 15h17M9.5 3.5v17M15 3.5v17"/>',
        list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
        archive: '<rect x="3.5" y="4.5" width="17" height="4.5" rx="1.2"/><path d="M5 9v9.5a1.5 1.5 0 0 0 1.5 1.5h11a1.5 1.5 0 0 0 1.5-1.5V9M10 13h4"/>',
        edit: '<path d="m4.5 16.7-.9 3.7 3.7-.9L19 7.8a2.4 2.4 0 0 0-3.4-3.4z"/><path d="m13.8 6.2 4 4"/>',
        trash: '<path d="M4.5 6.5h15M9 6.5v-2h6v2M6.5 6.5l.8 13h9.4l.8-13M10 10.5v5.5M14 10.5v5.5"/>',
        star: '<path d="m12 3.5 2.7 5.5 6 .9-4.35 4.2 1.03 6-5.38-2.83-5.38 2.83 1.03-6L3.3 9.9l6-.9z"/>',
        flag: '<path d="M5 21V4h9l.8 2H20l-2.2 4.2L20 14h-7.2L12 12H5"/>'
    };
    function iconSvg(name, color, size = 20, strokeWidth = 1.7) {
        const body = paths[name].split('CURRENT').join(color);
        return [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round">`,
            body,
            '</svg>'
        ].join('');
    }
    /** The circular AirliPay route motif used in both products. */
    function brandMarkSvg(size = 28) {
        return [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none">`,
            '<circle cx="16" cy="16" r="16" fill="#6FE7C8"/>',
            '<path d="M4.5 20.5c5.4-8.7 12.8-10.2 23-5.4" stroke="#0A2540" stroke-width="2.4" stroke-linecap="round"/>',
            '<circle cx="7.2" cy="18.7" r="2.1" fill="#245BFF"/>',
            '<circle cx="25.8" cy="14.6" r="1.7" fill="#0A2540"/>',
            '</svg>'
        ].join('');
    }
    /** Abstract arc artwork for the sign-in brand panel and the cover. */
    function routeArtSvg(width = 560, height = 320, accent = '#6FE7C8') {
        return [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 560 320" fill="none">`,
            '<circle cx="300" cy="156" r="132" fill="#245BFF" opacity="0.08"/>',
            '<path d="M10 244c92-170 250-214 500-90" stroke="#245BFF" stroke-width="4" stroke-linecap="round" opacity="0.7"/>',
            `<path d="M32 266c76-116 188-154 342-112 100 27 148 8 174-24" stroke="${accent}" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 12"/>`,
            '<circle cx="78" cy="194" r="11" fill="#6FE7C8"/>',
            '<circle cx="78" cy="194" r="4" fill="#0A2540"/>',
            '<circle cx="252" cy="130" r="7" fill="#F5F7FA"/>',
            '<circle cx="252" cy="130" r="2.5" fill="#0A2540"/>',
            '<circle cx="430" cy="150" r="15" fill="#6FE7C8"/>',
            '<path d="m423 150 5 5 9-10" stroke="#0A2540" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>',
            '<circle cx="510" cy="96" r="4" fill="#8EA5BC"/>',
            '</svg>'
        ].join('');
    }

    let fontMap = null;
    function setFontMap(map) {
        fontMap = map;
    }
    function getFont(weight) {
        if (!fontMap) {
            throw new Error('Fonts have not been preloaded');
        }
        return fontMap[weight];
    }
    async function preloadFonts() {
        var _a, _b, _c;
        const available = await figma.listAvailableFontsAsync();
        const inter = available.filter((font) => font.fontName.family === fontFamily);
        if (!inter.length) {
            throw new Error('Inter is not available in this Figma environment. Install Inter or use a Figma build that ships with it.');
        }
        const fallback = (_b = (_a = inter.find((font) => font.fontName.style === 'Regular')) === null || _a === void 0 ? void 0 : _a.fontName) !== null && _b !== void 0 ? _b : inter[0].fontName;
        const warnings = [];
        const map = {};
        for (const weight of Object.keys(fonts)) {
            const desired = fonts[weight].style;
            const exact = (_c = inter.find((font) => font.fontName.style === desired)) === null || _c === void 0 ? void 0 : _c.fontName;
            const selected = exact !== null && exact !== void 0 ? exact : fallback;
            if (!exact) {
                warnings.push(`Inter ${desired} missing; ${selected.style} is used for ${weight}.`);
            }
            await figma.loadFontAsync(selected);
            map[weight] = selected;
        }
        setFontMap(map);
        return { map, warnings };
    }
    function paint(hex, opacity = 1) {
        return {
            type: 'SOLID',
            color: hexToRgb(hex),
            opacity
        };
    }
    function frame(name, opts = {}) {
        var _a, _b, _c, _d;
        const node = figma.createFrame();
        node.name = name;
        node.resize(Math.max(1, (_a = opts.width) !== null && _a !== void 0 ? _a : 100), Math.max(1, (_b = opts.height) !== null && _b !== void 0 ? _b : 10));
        node.fills = opts.fill ? [paint(opts.fill)] : [];
        if (opts.stroke) {
            node.strokes = [paint(opts.stroke)];
            node.strokeWeight = (_c = opts.strokeWeight) !== null && _c !== void 0 ? _c : 1;
            node.strokeAlign = 'INSIDE';
        }
        if (opts.radius !== undefined) {
            node.cornerRadius = opts.radius;
        }
        node.clipsContent = (_d = opts.clip) !== null && _d !== void 0 ? _d : false;
        if (opts.opacity !== undefined) {
            node.opacity = opts.opacity;
        }
        return node;
    }
    function vstack(name, opts = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const node = frame(name, opts);
        node.layoutMode = 'VERTICAL';
        node.itemSpacing = (_a = opts.gap) !== null && _a !== void 0 ? _a : 0;
        node.paddingTop = (_c = (_b = opts.paddingTop) !== null && _b !== void 0 ? _b : opts.padding) !== null && _c !== void 0 ? _c : 0;
        node.paddingBottom = (_e = (_d = opts.paddingBottom) !== null && _d !== void 0 ? _d : opts.padding) !== null && _e !== void 0 ? _e : 0;
        node.paddingLeft = (_h = (_g = (_f = opts.paddingLeft) !== null && _f !== void 0 ? _f : opts.paddingX) !== null && _g !== void 0 ? _g : opts.padding) !== null && _h !== void 0 ? _h : 0;
        node.paddingRight = (_l = (_k = (_j = opts.paddingRight) !== null && _j !== void 0 ? _j : opts.paddingX) !== null && _k !== void 0 ? _k : opts.padding) !== null && _l !== void 0 ? _l : 0;
        node.counterAxisAlignItems = (_m = opts.align) !== null && _m !== void 0 ? _m : 'MIN';
        node.primaryAxisAlignItems = (_o = opts.justify) !== null && _o !== void 0 ? _o : 'MIN';
        if (opts.width !== undefined) {
            node.resize(opts.width, (_p = opts.height) !== null && _p !== void 0 ? _p : Math.max(1, node.height));
        }
        node.primaryAxisSizingMode = opts.height !== undefined ? 'FIXED' : 'AUTO';
        node.counterAxisSizingMode = opts.width !== undefined ? 'FIXED' : 'AUTO';
        return node;
    }
    function hstack(name, opts = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        const node = frame(name, opts);
        node.layoutMode = 'HORIZONTAL';
        node.itemSpacing = (_a = opts.gap) !== null && _a !== void 0 ? _a : 0;
        node.paddingTop = (_c = (_b = opts.paddingTop) !== null && _b !== void 0 ? _b : opts.padding) !== null && _c !== void 0 ? _c : 0;
        node.paddingBottom = (_e = (_d = opts.paddingBottom) !== null && _d !== void 0 ? _d : opts.padding) !== null && _e !== void 0 ? _e : 0;
        node.paddingLeft = (_h = (_g = (_f = opts.paddingLeft) !== null && _f !== void 0 ? _f : opts.paddingX) !== null && _g !== void 0 ? _g : opts.padding) !== null && _h !== void 0 ? _h : 0;
        node.paddingRight = (_l = (_k = (_j = opts.paddingRight) !== null && _j !== void 0 ? _j : opts.paddingX) !== null && _k !== void 0 ? _k : opts.padding) !== null && _l !== void 0 ? _l : 0;
        node.counterAxisAlignItems = (_m = opts.align) !== null && _m !== void 0 ? _m : 'CENTER';
        node.primaryAxisAlignItems = (_o = opts.justify) !== null && _o !== void 0 ? _o : 'MIN';
        if (opts.width !== undefined) {
            node.resize(opts.width, (_p = opts.height) !== null && _p !== void 0 ? _p : Math.max(1, node.height));
        }
        node.primaryAxisSizingMode = opts.width !== undefined ? 'FIXED' : 'AUTO';
        node.counterAxisSizingMode = opts.height !== undefined ? 'FIXED' : 'AUTO';
        return node;
    }
    function setFillWidth(node) {
        try {
            node.layoutSizingHorizontal = 'FILL';
        }
        catch (_a) {
            // Node is not an auto-layout child.
        }
    }
    function setGrow(node) {
        try {
            node.layoutGrow = 1;
        }
        catch (_a) {
            // Node is not an auto-layout child.
        }
    }
    function text(parent, value, opts = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const token = typeScale[(_a = opts.token) !== null && _a !== void 0 ? _a : 'body'];
        const node = figma.createText();
        node.name = (_b = opts.name) !== null && _b !== void 0 ? _b : value.slice(0, 48);
        node.fontName = getFont((_c = opts.weight) !== null && _c !== void 0 ? _c : token.weight);
        node.fontSize = (_d = opts.size) !== null && _d !== void 0 ? _d : token.size;
        node.lineHeight = {
            unit: 'PIXELS',
            value: (_e = opts.lineHeight) !== null && _e !== void 0 ? _e : token.lineHeight
        };
        node.letterSpacing = {
            unit: 'PIXELS',
            value: (_f = opts.letterSpacing) !== null && _f !== void 0 ? _f : token.letterSpacing
        };
        node.textAlignHorizontal = (_g = opts.align) !== null && _g !== void 0 ? _g : 'LEFT';
        node.characters = value;
        node.fills = [paint((_h = opts.color) !== null && _h !== void 0 ? _h : colors.ink)];
        if (opts.opacity !== undefined) {
            node.opacity = opts.opacity;
        }
        if (opts.hug) {
            node.textAutoResize = 'WIDTH_AND_HEIGHT';
        }
        else {
            const columnWidth = parent.layoutMode === 'VERTICAL' ? parent.width - parent.paddingLeft - parent.paddingRight : 200;
            const availableWidth = (_j = opts.width) !== null && _j !== void 0 ? _j : Math.max(24, columnWidth);
            node.resize(availableWidth, 10);
            node.textAutoResize = 'HEIGHT';
        }
        parent.appendChild(node);
        if (opts.grow) {
            setGrow(node);
        }
        else if (opts.fill !== false && !opts.hug && opts.width === undefined && parent.layoutMode === 'VERTICAL') {
            setFillWidth(node);
        }
        return node;
    }
    function icon(parent, name, color = colors.ink, size = 20, nodeName) {
        const node = figma.createNodeFromSvg(iconSvg(name, color, size));
        node.name = `Icon/${name}`;
        parent.appendChild(node);
        return node;
    }
    function svg(parent, markup, name) {
        const node = figma.createNodeFromSvg(markup);
        node.name = name;
        parent.appendChild(node);
        return node;
    }
    function brandMark(parent, size = 28) {
        const mark = svg(parent, brandMarkSvg(size), 'Brand mark');
        return mark;
    }
    function spacer(parent, height = 1, growX = false, width = 1) {
        const node = frame('Spacer', { width, height, fill: null });
        parent.appendChild(node);
        if (growX) {
            setGrow(node);
        }
        return node;
    }
    function divider(parent, color = colors.border) {
        const node = frame('Divider', {
            width: Math.max(1, parent.width),
            height: 1,
            fill: color
        });
        parent.appendChild(node);
        if (parent.layoutMode === 'VERTICAL') {
            setFillWidth(node);
        }
        return node;
    }
    function avatar(parent, initials, opts = {}) {
        var _a, _b, _c, _d, _e;
        const size = (_a = opts.size) !== null && _a !== void 0 ? _a : 36;
        const node = frame((_b = opts.name) !== null && _b !== void 0 ? _b : `Avatar ${initials}`, {
            width: size,
            height: size,
            fill: (_c = opts.bg) !== null && _c !== void 0 ? _c : colors.cobaltSoft,
            radius: (_d = opts.radius) !== null && _d !== void 0 ? _d : 999
        });
        parent.appendChild(node);
        const label = text(node, initials, {
            size: Math.round(size * 0.34),
            lineHeight: Math.round(size * 0.44),
            weight: 'semibold',
            color: (_e = opts.color) !== null && _e !== void 0 ? _e : colors.cobaltText,
            align: 'CENTER',
            width: size,
            fill: false
        });
        label.x = 0;
        label.y = (size - label.height) / 2;
        return node;
    }
    function logoLockup(parent, opts = {}) {
        var _a, _b, _c, _d, _e;
        const lockup = hstack('AirliPay logo', {
            width: (_a = opts.width) !== null && _a !== void 0 ? _a : 180,
            height: (_b = opts.size) !== null && _b !== void 0 ? _b : 32,
            gap: 9,
            fill: null
        });
        parent.appendChild(lockup);
        brandMark(lockup, (_c = opts.markSize) !== null && _c !== void 0 ? _c : 28);
        text(lockup, (_d = opts.label) !== null && _d !== void 0 ? _d : 'AirliPay', {
            size: opts.size ? Math.round(opts.size * 0.72) : 21,
            lineHeight: opts.size ? opts.size : 26,
            weight: 'extrabold',
            color: (_e = opts.color) !== null && _e !== void 0 ? _e : colors.brandText,
            letterSpacing: -0.6,
            fill: false
        });
        return lockup;
    }
    function clampText(value, max) {
        return value.length > max ? `${value.slice(0, Math.max(0, max - 1))}…` : value;
    }

    /**
     * Canonical mock dataset for the review boards.
     *
     * Every screen reads from this module so names, employers, amounts and states
     * stay consistent across the 27 designs. Values follow the API enums in
     * AirliPayApi/prisma/schema.prisma.
     */
    const clients = [
        {
            id: 'cl_penda',
            name: 'Penda Logistics',
            monogram: 'PL',
            industry: 'Freight & logistics',
            email: 'finance@penda.cm',
            phone: '+237 6 77 10 44 20',
            status: 'ACTIVE',
            employeeCount: 1842,
            nextPaymentDate: '2026-10-28',
            joined: '12 Feb 2024',
            activated: '14 Feb 2024',
            city: 'Douala',
            region: 'Littoral',
            street: 'Zone industrielle de Bassa',
            taxId: 'M0801224587',
            commissionPct: 2.5,
            bank: 'Afriland First Bank',
            accountMasked: '•••• 4821',
            fundingBalance: 25000000,
            manager: 'Jude Ekema',
            revenue: 4280000
        },
        {
            id: 'cl_kribi',
            name: 'Kribi Marine Services',
            monogram: 'KM',
            industry: 'Maritime services',
            email: 'ops@kribimarine.cm',
            phone: '+237 6 99 31 08 55',
            status: 'ACTIVE',
            employeeCount: 624,
            nextPaymentDate: '2026-10-29',
            joined: '06 May 2024',
            activated: '08 May 2024',
            city: 'Kribi',
            region: 'South',
            street: 'Port industrial estate',
            taxId: 'M0901448721',
            commissionPct: 2.5,
            bank: 'Ecobank Cameroon',
            accountMasked: '•••• 7740',
            fundingBalance: 8050000,
            manager: 'Nadège Mballa',
            revenue: 1960000
        },
        {
            id: 'cl_montfebe',
            name: 'Mont Fébé Hospitality',
            monogram: 'MF',
            industry: 'Hospitality',
            email: 'people@montfebe.cm',
            phone: '+237 6 55 72 19 03',
            status: 'PENDING',
            employeeCount: 388,
            nextPaymentDate: '2026-10-30',
            joined: '18 Jul 2026',
            activated: '—',
            city: 'Yaoundé',
            region: 'Centre',
            street: 'Rue du Mont Fébé',
            taxId: 'M1001662054',
            commissionPct: 3,
            bank: 'BICEC',
            accountMasked: '•••• 1108',
            fundingBalance: 0,
            manager: 'Claudia Mbah',
            revenue: 820000
        },
        {
            id: 'cl_sahel',
            name: 'Sahel Agro Group',
            monogram: 'SA',
            industry: 'Agribusiness',
            email: 'treasury@sahelagro.cm',
            phone: '+237 6 94 08 63 12',
            status: 'ACTIVE',
            employeeCount: 1104,
            nextPaymentDate: '2026-10-31',
            joined: '21 Nov 2024',
            activated: '23 Nov 2024',
            city: 'Garoua',
            region: 'North',
            street: 'Route de Maroua',
            taxId: 'M0701559320',
            commissionPct: 2.5,
            bank: 'Commercial Bank of Cameroon',
            accountMasked: '•••• 6053',
            fundingBalance: 18500000,
            manager: 'Jude Ekema',
            revenue: 3365000
        },
        {
            id: 'cl_douala',
            name: 'Douala Digital',
            monogram: 'DD',
            industry: 'Technology',
            email: 'salary@doualadigital.cm',
            phone: '+237 6 58 40 22 76',
            status: 'ACTIVE',
            employeeCount: 212,
            nextPaymentDate: '2026-11-01',
            joined: '09 Jan 2025',
            activated: '10 Jan 2025',
            city: 'Douala',
            region: 'Littoral',
            street: 'Bonanjo business district',
            taxId: 'M1201980341',
            commissionPct: 2,
            bank: 'Equity Bank Cameroon',
            accountMasked: '•••• 3296',
            fundingBalance: 2140000,
            manager: 'Claudia Mbah',
            revenue: 1148000
        },
        {
            id: 'cl_bamenda',
            name: 'Bamenda Health Co.',
            monogram: 'BH',
            industry: 'Healthcare',
            email: 'admin@bamendahealth.cm',
            phone: '+237 6 74 90 51 67',
            status: 'BLOCKED',
            employeeCount: 486,
            nextPaymentDate: '2026-11-02',
            joined: '03 Mar 2025',
            activated: '05 Mar 2025',
            city: 'Bamenda',
            region: 'Northwest',
            street: 'Mankon medical quarter',
            taxId: 'M1101734410',
            commissionPct: 3,
            bank: 'Standard Chartered Bank Cameroon',
            accountMasked: '•••• 9184',
            fundingBalance: 0,
            manager: 'Nadège Mballa',
            revenue: 2460000
        }
    ];
    const employees = [
        {
            id: 'emp_awa',
            name: 'Awa Fongang',
            initials: 'AF',
            email: 'awa.fongang@penda.cm',
            phone: '+237 6 77 42 18 90',
            employeeId: 'EMP-10482',
            clientId: 'cl_penda',
            baseSalary: 240000,
            balance: 184500,
            status: 'ACTIVE',
            joined: '04 Mar 2025',
            activated: '04 Mar 2025',
            city: 'Douala',
            region: 'Littoral',
            street: 'Bépanda Omnisport',
            dob: '14 Jun 1994',
            sex: 'F',
            operator: 'MTN',
            momoMasked: '•••• 7321',
            bank: 'Afriland First Bank',
            bankAccountMasked: '•••• 4821'
        },
        {
            id: 'emp_brice',
            name: 'Brice Tchoumi',
            initials: 'BT',
            email: 'brice.tchoumi@kribimarine.cm',
            phone: '+237 6 99 16 73 04',
            employeeId: 'EMP-09117',
            clientId: 'cl_kribi',
            baseSalary: 150000,
            balance: 96000,
            status: 'ACTIVE',
            joined: '19 Aug 2024',
            activated: '19 Aug 2024',
            city: 'Kribi',
            region: 'South',
            street: 'Mboa-Manga',
            dob: '03 Nov 1991',
            sex: 'M',
            operator: 'ORANGE',
            momoMasked: '•••• 6408',
            bank: 'Ecobank Cameroon',
            bankAccountMasked: '•••• 7740'
        },
        {
            id: 'emp_marie',
            name: 'Marie-Claire Ewane',
            initials: 'ME',
            email: 'mc.ewane@montfebe.cm',
            phone: '+237 6 55 84 39 28',
            employeeId: 'EMP-06320',
            clientId: 'cl_montfebe',
            baseSalary: 125000,
            balance: 180000,
            status: 'PENDING',
            joined: '12 Sep 2026',
            activated: '—',
            city: 'Yaoundé',
            region: 'Centre',
            street: 'Bastos',
            dob: '28 Apr 1997',
            sex: 'F',
            operator: 'ORANGE',
            momoMasked: '•••• 2914',
            bank: 'BICEC',
            bankAccountMasked: '•••• 1108'
        },
        {
            id: 'emp_emmanuel',
            name: 'Emmanuel Nfor',
            initials: 'EN',
            email: 'emmanuel.nfor@sahelagro.cm',
            phone: '+237 6 94 55 71 30',
            employeeId: 'EMP-11704',
            clientId: 'cl_sahel',
            baseSalary: 180000,
            balance: 142500,
            status: 'ACTIVE',
            joined: '17 Apr 2025',
            activated: '17 Apr 2025',
            city: 'Garoua',
            region: 'North',
            street: 'Poumpoumré',
            dob: '07 Jan 1990',
            sex: 'M',
            operator: 'MTN',
            momoMasked: '•••• 8035',
            bank: 'Commercial Bank of Cameroon',
            bankAccountMasked: '•••• 6053'
        },
        {
            id: 'emp_larissa',
            name: 'Larissa Etoundi',
            initials: 'LE',
            email: 'larissa.etoundi@doualadigital.cm',
            phone: '+237 6 58 21 67 44',
            employeeId: 'EMP-12930',
            clientId: 'cl_douala',
            baseSalary: 160000,
            balance: 88750,
            status: 'ACTIVE',
            joined: '21 Jan 2025',
            activated: '21 Jan 2025',
            city: 'Douala',
            region: 'Littoral',
            street: 'Akwa',
            dob: '11 Oct 1995',
            sex: 'F',
            operator: 'ORANGE',
            momoMasked: '•••• 4472',
            bank: 'Equity Bank Cameroon',
            bankAccountMasked: '•••• 3296'
        },
        {
            id: 'emp_serge',
            name: 'Serge Mbarga',
            initials: 'SM',
            email: 'serge.mbarga@penda.cm',
            phone: '+237 6 77 63 80 11',
            employeeId: 'EMP-10891',
            clientId: 'cl_penda',
            baseSalary: 145000,
            balance: 61000,
            status: 'BLOCKED',
            joined: '30 Jun 2025',
            activated: '30 Jun 2025',
            city: 'Douala',
            region: 'Littoral',
            street: 'New Bell',
            dob: '19 Feb 1993',
            sex: 'M',
            operator: 'MTN',
            momoMasked: '•••• 1750',
            bank: 'Afriland First Bank',
            bankAccountMasked: '•••• 4821'
        },
        {
            id: 'emp_aaliyah',
            name: 'Aaliyah Njoya',
            initials: 'AN',
            email: 'aaliyah.njoya@montfebe.cm',
            phone: '+237 6 55 92 06 81',
            employeeId: 'EMP-06418',
            clientId: 'cl_montfebe',
            baseSalary: 118000,
            balance: 30000,
            status: 'DEACTIVATED',
            joined: '06 Oct 2025',
            activated: '06 Oct 2025',
            city: 'Yaoundé',
            region: 'Centre',
            street: 'Mvog-Mbi',
            dob: '02 Aug 1998',
            sex: 'F',
            operator: 'MTN',
            momoMasked: '•••• 5623',
            bank: 'BICEC',
            bankAccountMasked: '•••• 1108'
        },
        {
            id: 'emp_patrick',
            name: 'Patrick Fotso',
            initials: 'PF',
            email: 'patrick.fotso@kribimarine.cm',
            phone: '+237 6 99 74 28 16',
            employeeId: 'EMP-09203',
            clientId: 'cl_kribi',
            baseSalary: 135000,
            balance: 120000,
            status: 'ACTIVE',
            joined: '02 Dec 2024',
            activated: '02 Dec 2024',
            city: 'Kribi',
            region: 'South',
            street: 'Dombé',
            dob: '23 May 1992',
            sex: 'M',
            operator: 'ORANGE',
            momoMasked: '•••• 3927',
            bank: 'Ecobank Cameroon',
            bankAccountMasked: '•••• 7740'
        },
        {
            id: 'emp_gerard',
            name: 'Gérard Ndzana',
            initials: 'GN',
            email: 'gerard.ndzana@penda.cm',
            phone: '+237 6 77 18 62 40',
            employeeId: 'EMP-11231',
            clientId: 'cl_penda',
            baseSalary: 155000,
            balance: 76000,
            status: 'ACTIVE',
            joined: '23 Sep 2025',
            activated: '23 Sep 2025',
            city: 'Douala',
            region: 'Littoral',
            street: 'Akwa',
            dob: '05 Mar 1990',
            sex: 'M',
            operator: 'MTN',
            momoMasked: '•••• 9082',
            bank: 'Afriland First Bank',
            bankAccountMasked: '•••• 4821'
        },
        {
            id: 'emp_yvonne',
            name: 'Yvonne Atangana',
            initials: 'YA',
            email: 'yvonne.atangana@penda.cm',
            phone: '+237 6 55 03 91 27',
            employeeId: 'EMP-11456',
            clientId: 'cl_penda',
            baseSalary: 210000,
            balance: 250000,
            status: 'ACTIVE',
            joined: '12 May 2025',
            activated: '12 May 2025',
            city: 'Douala',
            region: 'Littoral',
            street: 'Bonapriso',
            dob: '22 Dec 1988',
            sex: 'F',
            operator: 'ORANGE',
            momoMasked: '•••• 3614',
            bank: 'Afriland First Bank',
            bankAccountMasked: '•••• 4821'
        },
        {
            id: 'emp_marcel',
            name: 'Marcel Ebode',
            initials: 'ME',
            email: 'marcel.ebode@penda.cm',
            phone: '+237 6 77 90 14 55',
            employeeId: 'EMP-11822',
            clientId: 'cl_penda',
            baseSalary: 130000,
            balance: 0,
            status: 'PENDING',
            joined: '15 Oct 2026',
            activated: '—',
            city: 'Douala',
            region: 'Littoral',
            street: 'New Bell',
            dob: '09 Jul 1996',
            sex: 'M',
            operator: 'MTN',
            momoMasked: '•••• 2290',
            bank: 'Afriland First Bank',
            bankAccountMasked: '•••• 4821'
        },
        {
            id: 'emp_sandrine',
            name: 'Sandrine Fokou',
            initials: 'SF',
            email: 'sandrine.fokou@penda.cm',
            phone: '+237 6 77 65 38 02',
            employeeId: 'EMP-10677',
            clientId: 'cl_penda',
            baseSalary: 170000,
            balance: 42000,
            status: 'DEACTIVATED',
            joined: '06 Jun 2024',
            activated: '06 Jun 2024',
            city: 'Douala',
            region: 'Littoral',
            street: 'Deïdo',
            dob: '30 Jan 1993',
            sex: 'F',
            operator: 'ORANGE',
            momoMasked: '•••• 5178',
            bank: 'Afriland First Bank',
            bankAccountMasked: '•••• 4821'
        }
    ];
    const admins = [
        {
            id: 'adm_nadege',
            name: 'Nadège Mballa',
            initials: 'NM',
            email: 'nadege.mballa@airlipay.cm',
            phone: '+237 6 77 42 18 90',
            role: 'Super admin',
            focus: 'Operations',
            status: 'ACTIVE',
            joined: '14 Jan 2024',
            activated: '15 Jan 2024',
            lastActive: '23 Oct 2026 · 09:44',
            city: 'Douala',
            region: 'Littoral',
            street: '12 Boulevard de la Liberté',
            twoFactor: true
        },
        {
            id: 'adm_jude',
            name: 'Jude Ekema',
            initials: 'JE',
            email: 'jude.ekema@airlipay.cm',
            phone: '+237 6 77 30 55 12',
            role: 'Admin',
            focus: 'Finance',
            status: 'ACTIVE',
            joined: '22 Feb 2024',
            activated: '23 Feb 2024',
            lastActive: '23 Oct 2026 · 08:51',
            city: 'Douala',
            region: 'Littoral',
            street: 'Bonapriso',
            twoFactor: true
        },
        {
            id: 'adm_claudia',
            name: 'Claudia Mbah',
            initials: 'CM',
            email: 'claudia.mbah@airlipay.cm',
            phone: '+237 6 55 90 41 73',
            role: 'Admin',
            focus: 'Client success',
            status: 'PENDING',
            joined: '18 Oct 2026',
            activated: '—',
            lastActive: 'Invitation sent',
            city: 'Yaoundé',
            region: 'Centre',
            street: 'Odza',
            twoFactor: false
        },
        {
            id: 'adm_kelvin',
            name: 'Kelvin Ajong',
            initials: 'KA',
            email: 'kelvin.ajong@airlipay.cm',
            phone: '+237 6 74 20 38 65',
            role: 'Admin',
            focus: 'Support',
            status: 'ACTIVE',
            joined: '05 Jun 2025',
            activated: '06 Jun 2025',
            lastActive: '22 Oct 2026 · 17:26',
            city: 'Bamenda',
            region: 'Northwest',
            street: 'Mankon',
            twoFactor: false
        }
    ];
    const currentUser = admins[0];
    const transactions = [
        {
            id: 'txn_1042',
            ref: 'TXN-8F2A91',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_awa',
            clientId: 'cl_penda',
            actorName: 'Awa Fongang',
            description: 'Early wage withdrawal',
            amount: 45000,
            fee: 2250,
            balanceBefore: 231750,
            balanceAfter: 184500,
            date: '2026-10-23T09:42:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 7321'
        },
        {
            id: 'txn_1041',
            ref: 'TXN-1C7D40',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_brice',
            clientId: 'cl_kribi',
            actorName: 'Brice Tchoumi',
            description: 'Early wage withdrawal',
            amount: 20000,
            fee: 1000,
            balanceBefore: 117000,
            balanceAfter: 96000,
            date: '2026-10-23T09:15:00+01:00',
            operator: 'ORANGE',
            destinationMasked: '•••• 6408'
        },
        {
            id: 'txn_1040',
            ref: 'FND-5A021E',
            type: 'DEPOSIT',
            status: 'SUCCESS',
            employeeId: null,
            clientId: 'cl_penda',
            actorName: 'Penda Logistics treasury',
            description: 'Payroll funding',
            amount: 25000000,
            fee: 0,
            balanceBefore: 0,
            balanceAfter: 0,
            date: '2026-10-23T08:55:00+01:00'
        },
        {
            id: 'txn_1039',
            ref: 'TXN-4B90C2',
            type: 'WITHDRAW',
            status: 'FAILED',
            employeeId: 'emp_marie',
            clientId: 'cl_montfebe',
            actorName: 'Marie-Claire Ewane',
            description: 'Early wage withdrawal',
            amount: 80000,
            fee: 4000,
            balanceBefore: 180000,
            balanceAfter: 180000,
            date: '2026-10-22T17:32:00+01:00',
            operator: 'ORANGE',
            destinationMasked: '•••• 2914'
        },
        {
            id: 'txn_1038',
            ref: 'TXN-7D13A8',
            type: 'WITHDRAW',
            status: 'PENDING',
            employeeId: 'emp_emmanuel',
            clientId: 'cl_sahel',
            actorName: 'Emmanuel Nfor',
            description: 'Early wage withdrawal',
            amount: 150000,
            fee: 7500,
            balanceBefore: 142500,
            balanceAfter: 142500,
            date: '2026-10-22T16:10:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 8035'
        },
        {
            id: 'txn_1037',
            ref: 'TXN-2E806B',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_larissa',
            clientId: 'cl_douala',
            actorName: 'Larissa Etoundi',
            description: 'Early wage withdrawal',
            amount: 60000,
            fee: 3000,
            balanceBefore: 151750,
            balanceAfter: 88750,
            date: '2026-10-22T14:48:00+01:00',
            operator: 'ORANGE',
            destinationMasked: '•••• 4472'
        },
        {
            id: 'txn_1036',
            ref: 'TXN-6A44F3',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_patrick',
            clientId: 'cl_kribi',
            actorName: 'Patrick Fotso',
            description: 'Early wage withdrawal',
            amount: 90000,
            fee: 4500,
            balanceBefore: 214500,
            balanceAfter: 120000,
            date: '2026-10-22T11:02:00+01:00',
            operator: 'ORANGE',
            destinationMasked: '•••• 3927'
        },
        {
            id: 'txn_1035',
            ref: 'FND-3C781A',
            type: 'DEPOSIT',
            status: 'SUCCESS',
            employeeId: null,
            clientId: 'cl_sahel',
            actorName: 'Sahel Agro Group treasury',
            description: 'Payroll funding',
            amount: 18500000,
            fee: 0,
            balanceBefore: 0,
            balanceAfter: 0,
            date: '2026-10-22T09:20:00+01:00'
        },
        {
            id: 'txn_1034',
            ref: 'TXN-9B205D',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_awa',
            clientId: 'cl_penda',
            actorName: 'Awa Fongang',
            description: 'Early wage withdrawal',
            amount: 35000,
            fee: 1750,
            balanceBefore: 268500,
            balanceAfter: 231750,
            date: '2026-10-20T13:08:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 7321'
        },
        {
            id: 'txn_1033',
            ref: 'TXN-0F58E7',
            type: 'WITHDRAW',
            status: 'FAILED',
            employeeId: 'emp_serge',
            clientId: 'cl_penda',
            actorName: 'Serge Mbarga',
            description: 'Early wage withdrawal',
            amount: 120000,
            fee: 6000,
            balanceBefore: 61000,
            balanceAfter: 61000,
            date: '2026-10-20T10:44:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 1750'
        },
        {
            id: 'txn_1032',
            ref: 'TXN-5D66B1',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_emmanuel',
            clientId: 'cl_sahel',
            actorName: 'Emmanuel Nfor',
            description: 'Early wage withdrawal',
            amount: 100000,
            fee: 5000,
            balanceBefore: 247500,
            balanceAfter: 142500,
            date: '2026-10-19T15:27:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 8035'
        },
        {
            id: 'txn_1031',
            ref: 'FND-1A349C',
            type: 'DEPOSIT',
            status: 'SUCCESS',
            employeeId: null,
            clientId: 'cl_kribi',
            actorName: 'Kribi Marine treasury',
            description: 'Payroll funding',
            amount: 8000000,
            fee: 0,
            balanceBefore: 0,
            balanceAfter: 0,
            date: '2026-10-19T09:20:00+01:00'
        },
        {
            id: 'txn_1030',
            ref: 'TXN-3C92A6',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_awa',
            clientId: 'cl_penda',
            actorName: 'Awa Fongang',
            description: 'Early wage withdrawal',
            amount: 25000,
            fee: 1250,
            balanceBefore: 294750,
            balanceAfter: 268500,
            date: '2026-10-15T12:03:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 7321'
        },
        {
            id: 'txn_1029',
            ref: 'TXN-7E1108',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_awa',
            clientId: 'cl_penda',
            actorName: 'Awa Fongang',
            description: 'Early wage withdrawal',
            amount: 40000,
            fee: 2000,
            balanceBefore: 336750,
            balanceAfter: 294750,
            date: '2026-10-08T09:36:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 7321'
        },
        {
            id: 'txn_1028',
            ref: 'TXN-4A097E',
            type: 'WITHDRAW',
            status: 'FAILED',
            employeeId: 'emp_awa',
            clientId: 'cl_penda',
            actorName: 'Awa Fongang',
            description: 'Early wage withdrawal',
            amount: 30000,
            fee: 1500,
            balanceBefore: 336750,
            balanceAfter: 336750,
            date: '2026-10-02T18:11:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 7321'
        },
        {
            id: 'txn_1027',
            ref: 'TXN-6E73C1',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_awa',
            clientId: 'cl_penda',
            actorName: 'Awa Fongang',
            description: 'Early wage withdrawal',
            amount: 50000,
            fee: 2500,
            balanceBefore: 389250,
            balanceAfter: 336750,
            date: '2026-09-24T10:12:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 7321'
        },
        {
            id: 'txn_1026',
            ref: 'TXN-2F28A4',
            type: 'WITHDRAW',
            status: 'SUCCESS',
            employeeId: 'emp_awa',
            clientId: 'cl_penda',
            actorName: 'Awa Fongang',
            description: 'Early wage withdrawal',
            amount: 30000,
            fee: 1500,
            balanceBefore: 420750,
            balanceAfter: 389250,
            date: '2026-09-18T15:40:00+01:00',
            operator: 'MTN',
            destinationMasked: '•••• 7321'
        }
    ];
    const invoices = [
        {
            id: 'inv_1042',
            number: 'INV-2026-1042',
            clientId: 'cl_penda',
            status: 'TREATED',
            periodFrom: '2026-10-01',
            periodTo: '2026-10-15',
            issuedDate: '2026-10-16',
            dueDate: '2026-10-23',
            totalAmount: 4280000,
            totalFees: 103500,
            taxes: 36500,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 4140000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 103500 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 36500 }
            ],
            transactionCount: 184,
            employeeCount: 176,
            paidAt: '2026-10-22',
            reference: 'PAY-2026-1042'
        },
        {
            id: 'inv_1041',
            number: 'INV-2026-1041',
            clientId: 'cl_kribi',
            status: 'PENDING_CONFIRMATION',
            periodFrom: '2026-10-01',
            periodTo: '2026-10-15',
            issuedDate: '2026-10-16',
            dueDate: '2026-10-30',
            totalAmount: 1960000,
            totalFees: 47000,
            taxes: 20000,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 1893000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 47000 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 20000 }
            ],
            transactionCount: 72,
            employeeCount: 68,
            reference: 'PAY-2026-1041'
        },
        {
            id: 'inv_1040',
            number: 'INV-2026-1040',
            clientId: 'cl_montfebe',
            status: 'NOT_TREATED',
            periodFrom: '2026-09-16',
            periodTo: '2026-09-30',
            issuedDate: '2026-10-01',
            dueDate: '2026-10-27',
            totalAmount: 820000,
            totalFees: 19800,
            taxes: 8200,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 792000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 19800 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 8200 }
            ],
            transactionCount: 31,
            employeeCount: 29,
            reference: 'PAY-2026-1040'
        },
        {
            id: 'inv_1039',
            number: 'INV-2026-1039',
            clientId: 'cl_sahel',
            status: 'TREATED',
            periodFrom: '2026-09-16',
            periodTo: '2026-09-30',
            issuedDate: '2026-10-01',
            dueDate: '2026-10-15',
            totalAmount: 3365000,
            totalFees: 81000,
            taxes: 34000,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 3250000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 81000 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 34000 }
            ],
            transactionCount: 129,
            employeeCount: 118,
            paidAt: '2026-10-14',
            reference: 'PAY-2026-1039'
        },
        {
            id: 'inv_1038',
            number: 'INV-2026-1038',
            clientId: 'cl_douala',
            status: 'TREATED',
            periodFrom: '2026-09-16',
            periodTo: '2026-09-30',
            issuedDate: '2026-10-01',
            dueDate: '2026-10-15',
            totalAmount: 1148000,
            totalFees: 28000,
            taxes: 12000,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 1108000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 28000 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 12000 }
            ],
            transactionCount: 44,
            employeeCount: 42,
            paidAt: '2026-10-13',
            reference: 'PAY-2026-1038'
        },
        {
            id: 'inv_1037',
            number: 'INV-2026-1037',
            clientId: 'cl_bamenda',
            status: 'NOT_TREATED',
            periodFrom: '2026-09-01',
            periodTo: '2026-09-15',
            issuedDate: '2026-09-16',
            dueDate: '2026-11-02',
            totalAmount: 2460000,
            totalFees: 59000,
            taxes: 26000,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 2375000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 59000 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 26000 }
            ],
            transactionCount: 97,
            employeeCount: 89,
            reference: 'PAY-2026-1037'
        },
        {
            id: 'inv_1036',
            number: 'INV-2026-1036',
            clientId: 'cl_penda',
            status: 'TREATED',
            periodFrom: '2026-09-16',
            periodTo: '2026-09-30',
            issuedDate: '2026-10-01',
            dueDate: '2026-10-15',
            totalAmount: 4120000,
            totalFees: 99600,
            taxes: 35400,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 3985000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 99600 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 35400 }
            ],
            transactionCount: 178,
            employeeCount: 171,
            paidAt: '2026-10-14',
            reference: 'PAY-2026-1036'
        },
        {
            id: 'inv_1035',
            number: 'INV-2026-1035',
            clientId: 'cl_penda',
            status: 'TREATED',
            periodFrom: '2026-09-01',
            periodTo: '2026-09-15',
            issuedDate: '2026-09-16',
            dueDate: '2026-09-30',
            totalAmount: 3980000,
            totalFees: 96200,
            taxes: 33800,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 3850000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 96200 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 33800 }
            ],
            transactionCount: 171,
            employeeCount: 166,
            paidAt: '2026-09-30',
            reference: 'PAY-2026-1035'
        },
        {
            id: 'inv_1034',
            number: 'INV-2026-1034',
            clientId: 'cl_penda',
            status: 'TREATED',
            periodFrom: '2026-08-16',
            periodTo: '2026-08-31',
            issuedDate: '2026-09-01',
            dueDate: '2026-09-15',
            totalAmount: 3760000,
            totalFees: 90900,
            taxes: 32100,
            lineItems: [
                { description: 'Earned wage access advanced', quantity: 1, amount: 3637000 },
                { description: 'AirliPay service fee · 2.5%', quantity: 1, amount: 90900 },
                { description: 'VAT · 0.9%', quantity: 1, amount: 32100 }
            ],
            transactionCount: 164,
            employeeCount: 159,
            paidAt: '2026-09-12',
            reference: 'PAY-2026-1034'
        }
    ];
    const payRuns = [
        {
            id: 'run_1028',
            reference: 'RUN-2026-1028',
            date: '2026-10-28',
            status: 'SCHEDULED',
            amount: 12840000,
            employeeCount: 1204,
            clientCount: 4,
            fundedPct: 78,
            note: 'Funding window closes 27 Oct · 16:00'
        },
        {
            id: 'run_1021',
            reference: 'RUN-2026-1021',
            date: '2026-10-21',
            status: 'SETTLED',
            amount: 11620000,
            employeeCount: 1148,
            clientCount: 4,
            fundedPct: 100,
            note: 'Settled in 42 minutes · 0 failures'
        },
        {
            id: 'run_1014',
            reference: 'RUN-2026-1014',
            date: '2026-10-14',
            status: 'SETTLED',
            amount: 10985000,
            employeeCount: 1092,
            clientCount: 4,
            fundedPct: 100,
            note: 'Settled in 38 minutes · 0 failures'
        },
        {
            id: 'run_1007',
            reference: 'RUN-2026-1007',
            date: '2026-10-07',
            status: 'NEEDS_ATTENTION',
            amount: 9864000,
            employeeCount: 1046,
            clientCount: 4,
            fundedPct: 100,
            note: '6 transfers failed · retry required'
        },
        {
            id: 'run_0930',
            reference: 'RUN-2026-0930',
            date: '2026-09-30',
            status: 'SETTLED',
            amount: 9780000,
            employeeCount: 1031,
            clientCount: 4,
            fundedPct: 100,
            note: 'Settled in 51 minutes · 0 failures'
        }
    ];
    const notifications = [
        {
            id: 'notif_1',
            title: 'Payout run scheduled for 28 Oct',
            detail: 'XAF 12,840,000 across 1,204 employees',
            tone: 'info',
            time: '12m ago'
        },
        {
            id: 'notif_2',
            title: '3 invoices need review',
            detail: 'Two not treated, one awaiting confirmation',
            tone: 'warning',
            time: '1h ago'
        },
        {
            id: 'notif_3',
            title: '3 withdrawals failed',
            detail: 'Operator errors on the last payout window',
            tone: 'error',
            time: 'Yesterday'
        }
    ];
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    function parseIso(value) {
        const date = value.slice(0, 10);
        const [year, month, day] = date.split('-').map(Number);
        const time = value.includes('T') ? value.slice(11, 16) : undefined;
        return { year, month, day, time };
    }
    function dateLabel(value) {
        if (value === '—') {
            return value;
        }
        const { year, month, day } = parseIso(value);
        return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]} ${year}`;
    }
    function shortDate(value) {
        if (value === '—') {
            return value;
        }
        const { month, day } = parseIso(value);
        return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]}`;
    }
    function dateTimeLabel(value) {
        if (value === '—' || value === 'Invitation sent') {
            return value;
        }
        const { year, month, day, time } = parseIso(value);
        return `${String(day).padStart(2, '0')} ${MONTHS[month - 1]} ${year}${time ? ` · ${time}` : ''}`;
    }
    function formatNumber(value) {
        return new Intl.NumberFormat('en-US').format(value);
    }
    function money(value) {
        return `XAF ${formatNumber(value)}`;
    }
    function compactMoney(value) {
        if (value >= 1000000000) {
            return `XAF ${(value / 1000000000).toFixed(2)}B`;
        }
        if (value >= 1000000) {
            return `XAF ${(value / 1000000).toFixed(2)}M`;
        }
        if (value >= 1000) {
            return `XAF ${(value / 1000).toFixed(0)}K`;
        }
        return money(value);
    }
    function clientRef(id) {
        return clients.find((client) => client.id === id);
    }
    function clientName(id) {
        var _a, _b;
        return (_b = (_a = clientRef(id)) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'Unknown client';
    }
    function employeeRef(id) {
        return id ? employees.find((employee) => employee.id === id) : undefined;
    }
    function employeeTransactions(id) {
        return transactions.filter((transaction) => transaction.employeeId === id);
    }
    function clientTransactions(clientId) {
        return transactions.filter((transaction) => transaction.clientId === clientId);
    }
    function clientRoster(clientId) {
        return employees.filter((employee) => employee.clientId === clientId);
    }
    function invoiceStats() {
        const outstanding = invoices.filter((invoice) => invoice.status === 'NOT_TREATED' || invoice.status === 'PENDING_CONFIRMATION');
        const treated = invoices.filter((invoice) => invoice.status === 'TREATED');
        return {
            outstandingCount: outstanding.length,
            outstandingAmount: outstanding.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
            treatedCount: treated.length,
            treatedAmount: treated.reduce((sum, invoice) => sum + invoice.totalAmount, 0),
            awaitingConfirmation: invoices.filter((invoice) => invoice.status === 'PENDING_CONFIRMATION').length,
            notTreated: invoices.filter((invoice) => invoice.status === 'NOT_TREATED').length,
            paidCount: treated.length,
            unpaidCount: outstanding.length,
            allCount: invoices.length
        };
    }
    const socialStats = {
        payrollVolume: 248650000,
        payrollChange: '+12.4%',
        activeEmployees: 12482,
        activeEmployeesChange: '+3.2%',
        payoutSuccess: 99.2,
        nextRun: payRuns[0]};
    const chartDeposits = [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103];
    const chartPayouts = [30, 36, 33, 42, 51, 47, 61, 58, 66, 63, 74, 71];
    const attentionItems = [
        {
            title: '3 withdrawals failed',
            detail: 'Operator errors in the 22 Oct batch',
            tone: 'error',
            action: 'Review failures'
        },
        {
            title: '3 invoices need review',
            detail: 'Two not treated and one awaiting confirmation',
            tone: 'warning',
            action: 'Open invoices'
        },
        {
            title: 'Payout run is 78% funded',
            detail: 'Funding window closes 27 Oct at 16:00',
            tone: 'info',
            action: 'View run'
        }
    ];
    const activityFeed = [
        {
            id: 'act_1',
            title: 'Withdrawal completed',
            detail: 'MTN · •••• 7321 · TXN-8F2A91',
            date: '23 Oct · 09:42',
            tone: 'success',
            actor: 'Awa Fongang',
            meta: 'XAF 45,000'
        },
        {
            id: 'act_2',
            title: 'Withdrawal completed',
            detail: 'Orange Money · •••• 7321 · TXN-9B205D',
            date: '20 Oct · 13:08',
            tone: 'success',
            actor: 'Awa Fongang',
            meta: 'XAF 35,000'
        },
        {
            id: 'act_3',
            title: 'Payout account updated',
            detail: 'Preferred mobile money account changed',
            date: '17 Oct · 16:30',
            tone: 'info',
            actor: 'Awa Fongang',
            meta: 'Profile'
        },
        {
            id: 'act_4',
            title: 'Withdrawal completed',
            detail: 'MTN · •••• 7321 · TXN-3C92A6',
            date: '15 Oct · 12:03',
            tone: 'success',
            actor: 'Awa Fongang',
            meta: 'XAF 25,000'
        },
        {
            id: 'act_5',
            title: 'Withdrawal completed',
            detail: 'MTN · •••• 7321 · TXN-7E1108',
            date: '08 Oct · 09:36',
            tone: 'success',
            actor: 'Awa Fongang',
            meta: 'XAF 40,000'
        },
        {
            id: 'act_6',
            title: 'Withdrawal failed',
            detail: 'Operator timeout · TXN-4A097E',
            date: '02 Oct · 18:11',
            tone: 'error',
            actor: 'Awa Fongang',
            meta: 'XAF 30,000'
        }
    ];
    const bankAccounts = [
        {
            id: 'bank_penda_1',
            bank: 'Afriland First Bank',
            accountMasked: '•••• 4821',
            label: 'Primary settlement',
            status: 'VERIFIED',
            added: '12 Feb 2024'
        },
        {
            id: 'bank_penda_2',
            bank: 'Ecobank Cameroon',
            accountMasked: '•••• 7740',
            label: 'Backup account',
            status: 'VERIFIED',
            added: '03 Jun 2025'
        },
        {
            id: 'bank_penda_3',
            bank: 'BICEC',
            accountMasked: '•••• 1108',
            label: 'Payroll reserve',
            status: 'PENDING',
            added: '30 Sep 2026'
        }
    ];
    const momoAccounts = [
        {
            operator: 'MTN',
            phoneMasked: '•••• 7321',
            label: 'Preferred payout',
            defaultAccount: true,
            status: 'VERIFIED'
        },
        {
            operator: 'ORANGE',
            phoneMasked: '•••• 4472',
            label: 'Backup payout',
            defaultAccount: false,
            status: 'VERIFIED'
        }
    ];
    function statusLabel(value) {
        return value
            .toLowerCase()
            .split('_')
            .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
            .join(' ');
    }

    function toneStyle(tone) {
        switch (tone) {
            case 'success':
                return { fg: colors.success, bg: colors.successSoft, icon: 'checkCircle' };
            case 'warning':
                return { fg: colors.warning, bg: colors.warningSoft, icon: 'clock' };
            case 'error':
                return { fg: colors.error, bg: colors.errorSoft, icon: 'alert' };
            case 'info':
                return { fg: colors.info, bg: colors.infoSoft, icon: 'info' };
            case 'mint':
                return { fg: colors.onMintSoft, bg: colors.mintSoft, icon: 'check' };
            case 'brand':
                return { fg: colors.cobaltText, bg: colors.cobaltSoft, icon: 'sparkle' };
            default:
                return { fg: colors.muted, bg: colors.surfaceSunken, icon: 'dot' };
        }
    }
    function statusTone(status) {
        const value = status.toUpperCase();
        if (['ACTIVE', 'SUCCESS', 'TREATED', 'SETTLED', 'VERIFIED'].includes(value)) {
            return 'success';
        }
        if (['PENDING', 'PENDING_CONFIRMATION', 'SCHEDULED', 'PROCESSING'].includes(value)) {
            return 'warning';
        }
        if (['FAILED', 'BLOCKED', 'BANNED', 'NOT_TREATED', 'NEEDS_ATTENTION'].includes(value)) {
            return 'error';
        }
        if (['DEACTIVATED'].includes(value)) {
            return 'neutral';
        }
        return 'neutral';
    }
    function button(parent, label, opts = {}) {
        var _a, _b;
        const height = (_a = opts.height) !== null && _a !== void 0 ? _a : (opts.compact ? 32 : 38);
        const variant = (_b = opts.variant) !== null && _b !== void 0 ? _b : 'primary';
        const styles = {
            primary: { bg: colors.mint, fg: colors.onMint },
            secondary: { bg: colors.surface, stroke: colors.border, fg: colors.ink },
            ghost: { bg: null, fg: colors.inkSoft },
            danger: { bg: colors.errorSoft, fg: colors.error },
            inverse: { bg: colors.onBrand, fg: colors.brandSurface }
        };
        const style = styles[variant];
        const node = hstack(`Button · ${label}`, {
            width: opts.width,
            height,
            gap: 7,
            paddingX: opts.compact ? 12 : 14,
            fill: style.bg,
            stroke: style.stroke,
            radius: radii.sm,
            justify: opts.width ? 'CENTER' : 'MIN',
            align: 'CENTER'
        });
        parent.appendChild(node);
        if (opts.icon) {
            icon(node, opts.icon, style.fg, opts.compact ? 15 : 16);
        }
        text(node, label, {
            token: 'button',
            color: style.fg,
            fill: false,
            hug: true
        });
        if (opts.trailingIcon) {
            icon(node, opts.trailingIcon, style.fg, 15);
        }
        if (opts.disabled) {
            node.opacity = 0.42;
        }
        return node;
    }
    function iconButton(parent, name, opts = {}) {
        var _a, _b, _c, _d, _e;
        const size = (_a = opts.size) !== null && _a !== void 0 ? _a : 34;
        const node = hstack(opts.label ? `Button · ${opts.label}` : `Icon button · ${name}`, {
            width: size,
            height: size,
            fill: (_b = opts.background) !== null && _b !== void 0 ? _b : null,
            stroke: opts.stroke,
            radius: (_c = opts.radius) !== null && _c !== void 0 ? _c : radii.sm,
            justify: 'CENTER',
            align: 'CENTER'
        });
        parent.appendChild(node);
        icon(node, name, (_d = opts.color) !== null && _d !== void 0 ? _d : colors.inkSoft, (_e = opts.iconSize) !== null && _e !== void 0 ? _e : 18);
        return node;
    }
    function avatarButton(parent, initials, online = false) {
        const holder = frame('Account menu', { width: 34, height: 34, fill: null });
        parent.appendChild(holder);
        avatar(holder, initials, { size: 32, bg: colors.mintSoft, color: colors.onMintSoft });
        if (online) {
            const dotMark = frame('Online', {
                width: 9,
                height: 9,
                fill: colors.success,
                stroke: colors.surface,
                strokeWeight: 2,
                radius: 999
            });
            holder.appendChild(dotMark);
            dotMark.x = 24;
            dotMark.y = 24;
        }
        return holder;
    }
    function statusPill(parent, status, opts = {}) {
        var _a, _b, _c;
        const tone = (_a = opts.tone) !== null && _a !== void 0 ? _a : statusTone(status);
        const style = toneStyle(tone);
        const height = opts.size === 'sm' ? 20 : 24;
        const node = hstack(`Status · ${(_b = opts.label) !== null && _b !== void 0 ? _b : status}`, {
            height,
            gap: 6,
            paddingX: 8,
            fill: style.bg,
            radius: 999,
            align: 'CENTER'
        });
        parent.appendChild(node);
        if (opts.dot !== false) {
            const mark = frame('Status dot', {
                width: 5,
                height: 5,
                fill: style.fg,
                radius: 999
            });
            node.appendChild(mark);
        }
        text(node, (_c = opts.label) !== null && _c !== void 0 ? _c : statusLabel(status), {
            token: 'micro',
            weight: 'semibold',
            color: style.fg,
            fill: false,
            hug: true
        });
        return node;
    }
    function tag(parent, label, tone = 'brand', opts = {}) {
        const style = toneStyle(tone);
        const node = hstack(`Tag · ${label}`, {
            height: opts.size === 'sm' ? 20 : 24,
            gap: 5,
            paddingX: 8,
            fill: style.bg,
            radius: radii.xs,
            align: 'CENTER'
        });
        parent.appendChild(node);
        if (opts.icon) {
            icon(node, opts.icon, style.fg, 12);
        }
        text(node, label, {
            token: 'micro',
            weight: 'semibold',
            color: style.fg,
            fill: false,
            hug: true
        });
        return node;
    }
    function countPill(parent, count, tone = 'neutral') {
        const style = toneStyle(tone);
        const node = hstack('Count', {
            height: 20,
            paddingX: 7,
            fill: style.bg,
            radius: radii.pill,
            justify: 'CENTER',
            align: 'CENTER'
        });
        parent.appendChild(node);
        text(node, count, {
            token: 'micro',
            weight: 'semibold',
            color: style.fg,
            fill: false,
            hug: true
        });
        return node;
    }
    function kbd(parent, label) {
        const node = hstack(`Shortcut ${label}`, {
            height: 20,
            paddingX: 6,
            fill: colors.surfaceSunken,
            stroke: colors.border,
            radius: 5,
            justify: 'CENTER',
            align: 'CENTER'
        });
        parent.appendChild(node);
        text(node, label, {
            token: 'micro',
            weight: 'medium',
            color: colors.muted,
            fill: false,
            hug: true
        });
        return node;
    }
    function iconTile(parent, name, opts = {}) {
        var _a, _b, _c;
        const style = toneStyle((_a = opts.tone) !== null && _a !== void 0 ? _a : 'brand');
        const size = (_b = opts.size) !== null && _b !== void 0 ? _b : 34;
        const node = hstack(`Icon tile · ${name}`, {
            width: size,
            height: size,
            fill: style.bg,
            radius: radii.sm,
            justify: 'CENTER',
            align: 'CENTER'
        });
        parent.appendChild(node);
        icon(node, name, style.fg, (_c = opts.iconSize) !== null && _c !== void 0 ? _c : 17);
        return node;
    }
    function searchField(parent, opts = {}) {
        var _a, _b, _c;
        const node = hstack('Global search', {
            width: (_a = opts.width) !== null && _a !== void 0 ? _a : 320,
            height: 38,
            gap: 9,
            paddingX: 12,
            fill: colors.fieldBg,
            stroke: colors.border,
            radius: radii.sm,
            align: 'CENTER'
        });
        parent.appendChild(node);
        icon(node, 'search', colors.mutedLight, 17);
        const isValue = Boolean(opts.value);
        text(node, (_c = (_b = opts.value) !== null && _b !== void 0 ? _b : opts.placeholder) !== null && _c !== void 0 ? _c : 'Search employees, clients, invoices…', {
            token: 'bodySmall',
            color: isValue ? colors.ink : colors.mutedLight,
            fill: false,
            hug: true
        });
        spacer(node, 1, true);
        if (opts.shortcut) {
            kbd(node, opts.shortcut);
        }
        return node;
    }
    function field(parent, opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const width = (_a = opts.width) !== null && _a !== void 0 ? _a : 320;
        const wrapper = vstack(`Field · ${(_c = (_b = opts.label) !== null && _b !== void 0 ? _b : opts.placeholder) !== null && _c !== void 0 ? _c : 'value'}`, {
            width,
            gap: 6,
            fill: null
        });
        parent.appendChild(wrapper);
        if (opts.label) {
            const labelRow = hstack('Field label', {
                width,
                height: 18,
                gap: 3,
                fill: null,
                align: 'CENTER'
            });
            wrapper.appendChild(labelRow);
            text(labelRow, opts.label, {
                token: 'label',
                weight: 'medium',
                color: colors.inkSoft,
                fill: false,
                hug: true
            });
            if (opts.required) {
                text(labelRow, '*', {
                    token: 'label',
                    weight: 'medium',
                    color: colors.error,
                    fill: false,
                    hug: true
                });
            }
        }
        const height = (_d = opts.height) !== null && _d !== void 0 ? _d : (opts.variant === 'textarea' ? 84 : 40);
        const input = hstack('Input', {
            width,
            height,
            gap: 8,
            paddingX: 12,
            fill: opts.disabled ? colors.surfaceSunken : colors.fieldBg,
            stroke: opts.error ? colors.error : colors.border,
            strokeWeight: opts.error ? 1.5 : 1,
            radius: radii.sm,
            align: opts.variant === 'textarea' ? 'MIN' : 'CENTER'
        });
        wrapper.appendChild(input);
        if (opts.icon) {
            icon(input, opts.icon, opts.disabled ? colors.mutedLight : colors.muted, 16);
        }
        const shownValue = (_f = (_e = opts.value) !== null && _e !== void 0 ? _e : opts.placeholder) !== null && _f !== void 0 ? _f : '';
        text(input, shownValue || ' ', {
            token: 'bodySmall',
            color: opts.value ? colors.ink : colors.mutedLight,
            fill: false,
            hug: true
        });
        spacer(input, 1, true);
        if (opts.variant === 'select') {
            icon(input, 'chevronDown', colors.muted, 15);
        }
        else if (opts.trailingIcon) {
            icon(input, opts.trailingIcon, colors.muted, 16);
        }
        if (opts.error || opts.helper) {
            text(wrapper, (_h = (_g = opts.error) !== null && _g !== void 0 ? _g : opts.helper) !== null && _h !== void 0 ? _h : '', {
                token: 'caption',
                color: opts.error ? colors.error : colors.muted,
                width,
                fill: false
            });
        }
        return wrapper;
    }
    function checkbox(parent, label, checked, opts = {}) {
        const row = hstack('Checkbox', {
            width: opts.width,
            height: 22,
            gap: 8,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        const box = frame('Checked box' , {
            width: 16,
            height: 16,
            fill: colors.cobalt ,
            stroke: colors.cobalt ,
            radius: 4
        });
        row.appendChild(box);
        {
            icon(box, 'check', colors.onPrimary, 11).x = 2.5;
            box.children[0].y = 2.5;
        }
        text(row, label, {
            token: 'bodySmall',
            color: colors.inkSoft,
            fill: false,
            hug: true
        });
        return row;
    }
    function toggle(parent, on, opts = {}) {
        var _a;
        const width = (_a = opts.width) !== null && _a !== void 0 ? _a : 36;
        const node = frame('Toggle on' , {
            width,
            height: 20,
            fill: colors.cobalt ,
            radius: 999
        });
        parent.appendChild(node);
        const knob = frame('Toggle knob', {
            width: 14,
            height: 14,
            fill: '#FFFFFF',
            radius: 999
        });
        node.appendChild(knob);
        knob.x = width - 17 ;
        knob.y = 3;
        return node;
    }
    function tabs(parent, items, width) {
        const row = hstack('Section tabs', {
            width,
            height: 42,
            gap: 26,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        items.forEach((item) => {
            const tab = vstack(`Tab · ${item.label}`, {
                gap: 10,
                fill: null,
                height: 42
            });
            row.appendChild(tab);
            const labelRow = hstack('Tab label', {
                gap: 7,
                fill: null,
                align: 'CENTER'
            });
            tab.appendChild(labelRow);
            text(labelRow, item.label, {
                token: 'bodySmall',
                weight: item.active ? 'semibold' : 'medium',
                color: item.active ? colors.ink : colors.muted,
                fill: false,
                hug: true
            });
            if (item.count) {
                countPill(labelRow, item.count, item.active ? 'mint' : 'neutral');
            }
            const underline = frame('Tab underline', {
                width: Math.max(12, item.label.length * 7),
                height: 2,
                fill: item.active ? colors.mint : null,
                radius: 999
            });
            tab.appendChild(underline);
        });
        return row;
    }
    function segmented(parent, items, activeIndex, opts = {}) {
        var _a;
        const height = (_a = opts.height) !== null && _a !== void 0 ? _a : 34;
        const control = hstack('Segmented control', {
            width: opts.width,
            height,
            gap: 2,
            padding: 3,
            fill: colors.surfaceSunken,
            stroke: colors.border,
            radius: radii.sm,
            align: 'CENTER'
        });
        parent.appendChild(control);
        items.forEach((item, index) => {
            const active = index === activeIndex;
            const segment = hstack(`Segment · ${item}`, {
                height: height - 6,
                paddingX: 12,
                fill: active ? colors.surface : null,
                stroke: active ? colors.border : undefined,
                radius: 6,
                justify: 'CENTER',
                align: 'CENTER'
            });
            control.appendChild(segment);
            text(segment, item, {
                token: 'micro',
                weight: active ? 'semibold' : 'medium',
                color: active ? colors.ink : colors.muted,
                fill: false,
                hug: true
            });
        });
        return control;
    }
    function breadcrumb(parent, items, width) {
        const row = hstack('Breadcrumb', {
            width,
            height: 20,
            gap: 6,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        items.forEach((item, index) => {
            const active = index === items.length - 1;
            text(row, item, {
                token: 'caption',
                weight: active ? 'medium' : 'regular',
                color: active ? colors.inkSoft : colors.mutedLight,
                fill: false,
                hug: true
            });
            if (!active) {
                icon(row, 'chevronRight', colors.mutedLight, 12);
            }
        });
        return row;
    }
    function progressBar(parent, pct, opts = {}) {
        var _a, _b, _c, _d;
        const width = (_a = opts.width) !== null && _a !== void 0 ? _a : 240;
        const height = (_b = opts.height) !== null && _b !== void 0 ? _b : 6;
        const trackNode = frame('Progress track', {
            width,
            height,
            fill: (_c = opts.track) !== null && _c !== void 0 ? _c : colors.surfaceSunken,
            radius: 999
        });
        parent.appendChild(trackNode);
        const clamped = Math.max(0, Math.min(100, pct));
        if (clamped > 0) {
            const fillNode = frame('Progress fill', {
                width: Math.round((width * clamped) / 100),
                height,
                fill: (_d = opts.color) !== null && _d !== void 0 ? _d : colors.mint,
                radius: 999
            });
            trackNode.appendChild(fillNode);
            fillNode.x = 0;
            fillNode.y = 0;
        }
        return trackNode;
    }
    function sparkline(parent, series, opts = {}) {
        var _a, _b, _c;
        const width = (_a = opts.width) !== null && _a !== void 0 ? _a : 76;
        const height = (_b = opts.height) !== null && _b !== void 0 ? _b : 28;
        const min = Math.min(...series);
        const max = Math.max(...series);
        const range = max - min || 1;
        const points = series.map((value, index) => {
            const x = (index / (series.length - 1)) * width;
            const y = height - 2 - ((value - min) / range) * (height - 6);
            return [x, y];
        });
        const line = points
            .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`)
            .join(' ');
        const area = `${line} L${width} ${height} L0 ${height} Z`;
        const color = (_c = opts.color) !== null && _c !== void 0 ? _c : colors.chartDeposit;
        const svg = [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">`,
            opts.fill === false
                ? ''
                : `<path d="${area}" fill="${color}" opacity="0.10"/>`,
            `<path d="${line}" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<circle cx="${points[points.length - 1][0].toFixed(1)}" cy="${points[points.length - 1][1].toFixed(1)}" r="2.2" fill="${color}"/>`,
            '</svg>'
        ].join('');
        const node = figma.createNodeFromSvg(svg);
        node.name = 'Sparkline';
        parent.appendChild(node);
        return node;
    }
    function areaChart(parent, opts) {
        var _a, _b, _c;
        const { width, height } = opts;
        const left = 42;
        const right = 12;
        const top = 12;
        const bottom = 26;
        const plotWidth = width - left - right;
        const plotHeight = height - top - bottom;
        const all = [...opts.seriesA, ...opts.seriesB];
        const max = Math.max(...all) * 1.1;
        const min = Math.min(...all) * 0.7;
        const range = max - min || 1;
        const colorA = (_a = opts.colorA) !== null && _a !== void 0 ? _a : colors.chartDeposit;
        const colorB = (_b = opts.colorB) !== null && _b !== void 0 ? _b : colors.chartPayout;
        const pointSet = (series) => series.map((value, index) => {
            const x = left + (index / (series.length - 1)) * plotWidth;
            const y = top + plotHeight - ((value - min) / range) * plotHeight;
            return { x, y };
        });
        const pointsA = pointSet(opts.seriesA);
        const pointsB = pointSet(opts.seriesB);
        const line = (points) => points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
        const area = (points) => `${line(points)} L${points[points.length - 1].x.toFixed(1)} ${(top + plotHeight).toFixed(1)} L${points[0].x.toFixed(1)} ${(top + plotHeight).toFixed(1)} Z`;
        const grid = [0, 1, 2, 3, 4]
            .map((index) => {
            const y = top + (plotHeight * index) / 4;
            return `<path d="M${left} ${y.toFixed(1)}H${width - right}" stroke="${colors.chartGrid}" stroke-width="1" ${index === 4 ? '' : 'stroke-dasharray="3 5"'}/>`;
        })
            .join('');
        const highlightIndex = opts.seriesA.length - 4;
        const highlight = (_c = pointsA[highlightIndex]) !== null && _c !== void 0 ? _c : pointsA[pointsA.length - 1];
        const svg = [
            `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">`,
            grid,
            `<path d="${area(pointsB)}" fill="${colorB}" opacity="0.10"/>`,
            `<path d="${area(pointsA)}" fill="${colorA}" opacity="0.12"/>`,
            `<path d="${line(pointsB)}" stroke="${colorB}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="${line(pointsA)}" stroke="${colorA}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="M${highlight.x.toFixed(1)} ${(top + plotHeight).toFixed(1)}V${(highlight.y + 4).toFixed(1)}" stroke="${colors.chartAxis}" stroke-width="1" stroke-dasharray="3 4" opacity="0.65"/>`,
            `<circle cx="${highlight.x.toFixed(1)}" cy="${highlight.y.toFixed(1)}" r="4.5" fill="${colors.surface}" stroke="${colorA}" stroke-width="2.2"/>`,
            '</svg>'
        ].join('');
        const node = frame('Cash movement chart', { width, height, fill: null });
        parent.appendChild(node);
        const art = figma.createNodeFromSvg(svg);
        art.name = 'Chart plot';
        node.appendChild(art);
        const labels = ['0', '25M', '50M', '75M', '100M'];
        labels.forEach((label, index) => {
            const nodeText = text(node, label, {
                token: 'caption',
                color: colors.mutedLight,
                width: 32,
                align: 'RIGHT',
                fill: false
            });
            nodeText.x = 2;
            nodeText.y = top + plotHeight - (plotHeight * index) / 4 - 8;
        });
        const xLabels = ['24 Sep', '30 Sep', '07 Oct', '14 Oct', '21 Oct'];
        xLabels.forEach((label, index) => {
            const nodeText = text(node, label, {
                token: 'caption',
                color: colors.mutedLight,
                width: 60,
                align: index === 0 ? 'LEFT' : index === xLabels.length - 1 ? 'RIGHT' : 'CENTER',
                fill: false
            });
            const x = left + (plotWidth * index) / (xLabels.length - 1);
            nodeText.x = x - (index === 0 ? 0 : index === xLabels.length - 1 ? 60 : 30);
            nodeText.y = top + plotHeight + 8;
        });
        const tooltip = hstack('Chart tooltip', {
            height: 26,
            gap: 6,
            paddingX: 8,
            fill: colors.brandSurface,
            radius: 6
        });
        node.appendChild(tooltip);
        const dotMark = frame('Tooltip dot', {
            width: 5,
            height: 5,
            fill: colorA,
            radius: 999
        });
        tooltip.appendChild(dotMark);
        text(tooltip, '23 Oct · XAF 23.8M', {
            token: 'micro',
            weight: 'semibold',
            color: colors.onBrand,
            fill: false,
            hug: true
        });
        tooltip.x = Math.min(width - 172, highlight.x - 24);
        tooltip.y = Math.max(0, highlight.y - 36);
        return node;
    }
    function legendItem(parent, label, color) {
        const node = hstack(`Legend · ${label}`, { gap: 6, height: 18, fill: null, align: 'CENTER' });
        parent.appendChild(node);
        const dotMark = frame('Legend dot', { width: 7, height: 7, fill: color, radius: 999 });
        node.appendChild(dotMark);
        text(node, label, {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        return node;
    }
    const TABLE_GUTTER = 16;
    function dataTable(parent, opts) {
        var _a;
        const rowHeight = (_a = opts.rowHeight) !== null && _a !== void 0 ? _a : 52;
        const table = vstack('Data table', {
            width: opts.width,
            fill: null,
            gap: 0,
            clip: true
        });
        parent.appendChild(table);
        const header = hstack('Table header', {
            width: opts.width,
            height: 38,
            gap: 0,
            paddingX: 20,
            fill: colors.tableHead,
            align: 'CENTER'
        });
        table.appendChild(header);
        opts.columns.forEach((column, index) => {
            var _a;
            const isLast = index === opts.columns.length - 1;
            const width = column.width - (isLast ? 0 : TABLE_GUTTER);
            const holder = hstack(`Header · ${column.label}`, {
                width,
                height: 38,
                fill: null,
                justify: column.align === 'RIGHT' ? 'MAX' : 'MIN',
                align: 'CENTER'
            });
            header.appendChild(holder);
            if (!isLast) {
                const gap = frame('Column gap', { width: TABLE_GUTTER, height: 1, fill: null });
                header.appendChild(gap);
            }
            text(holder, column.label, {
                token: 'micro',
                weight: 'semibold',
                color: colors.muted,
                align: (_a = column.align) !== null && _a !== void 0 ? _a : 'LEFT',
                fill: false,
                hug: true
            });
        });
        opts.rows.forEach((row, index) => {
            const selected = opts.selectedIndex === index;
            const rowNode = hstack(`Row · ${String(row[opts.columns[0].key])}`, {
                width: opts.width,
                height: rowHeight,
                gap: 0,
                paddingX: 20,
                fill: selected ? colors.rowSelected : opts.zebra && index % 2 === 1 ? colors.surfaceRaised : colors.surface,
                align: 'CENTER'
            });
            table.appendChild(rowNode);
            opts.columns.forEach((column, columnIndex) => {
                const value = row[column.key];
                const isLast = columnIndex === opts.columns.length - 1;
                const adjusted = Object.assign(Object.assign({}, column), { width: column.width - (isLast ? 0 : TABLE_GUTTER) });
                renderCell(rowNode, value, adjusted, rowHeight, isLast);
                if (!isLast) {
                    const gap = frame('Column gap', { width: TABLE_GUTTER, height: 1, fill: null });
                    rowNode.appendChild(gap);
                }
            });
            const rule = frame('Row rule', { width: opts.width, height: 1, fill: colors.border });
            table.appendChild(rule);
        });
        return table;
    }
    function renderCell(row, value, column, rowHeight, isLast) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const cell = typeof value === 'string' ? { text: value } : value !== null && value !== void 0 ? value : { text: '—' };
        const holder = hstack(`Cell · ${column.label}`, {
            width: column.width,
            height: rowHeight,
            gap: 8,
            fill: null,
            justify: column.align === 'RIGHT' ? 'MAX' : 'MIN',
            align: 'CENTER'
        });
        row.appendChild(holder);
        if (column.type === 'identity') {
            const style = toneStyle((_a = cell.avatarTone) !== null && _a !== void 0 ? _a : 'brand');
            avatar(holder, (_b = cell.initials) !== null && _b !== void 0 ? _b : initialsFor(cell.text), {
                size: 30,
                bg: style.bg,
                color: style.fg
            });
            const copy = vstack('Identity copy', { fill: null, gap: 1, width: column.width - 42 });
            holder.appendChild(copy);
            text(copy, clampText(cell.text, 34), {
                token: 'table',
                weight: 'semibold',
                color: (_c = cell.color) !== null && _c !== void 0 ? _c : colors.ink,
                width: column.width - 42,
                fill: false
            });
            if (cell.sub) {
                text(copy, clampText(cell.sub, 40), {
                    token: 'caption',
                    color: colors.muted,
                    width: column.width - 42,
                    fill: false
                });
            }
            return;
        }
        if (column.type === 'status') {
            statusPill(holder, (_d = cell.status) !== null && _d !== void 0 ? _d : cell.text, {
                tone: cell.tone,
                label: cell.text
            });
            return;
        }
        if (column.type === 'money') {
            const copy = vstack('Money cell', { fill: null, gap: 1, width: column.width });
            holder.appendChild(copy);
            setFillWidth(copy);
            text(copy, cell.text, {
                token: 'tableStrong',
                weight: cell.strong === false ? 'medium' : 'semibold',
                color: (_e = cell.color) !== null && _e !== void 0 ? _e : colors.ink,
                align: 'RIGHT',
                width: column.width,
                fill: false
            });
            if (cell.sub) {
                text(copy, cell.sub, {
                    token: 'caption',
                    color: colors.muted,
                    align: 'RIGHT',
                    width: column.width,
                    fill: false
                });
            }
            return;
        }
        if (column.type === 'meta' || column.type === 'action') {
            if (cell.icon) {
                icon(holder, cell.icon, colors.muted, 17);
                return;
            }
            if (column.type === 'action') {
                icon(holder, 'more', colors.muted, 17);
                return;
            }
        }
        const copy = vstack('Text cell', { fill: null, gap: 1, width: column.width });
        holder.appendChild(copy);
        text(copy, clampText(cell.text, 44), {
            token: 'table',
            weight: cell.strong ? 'semibold' : 'regular',
            color: (_f = cell.color) !== null && _f !== void 0 ? _f : (cell.strong ? colors.ink : colors.inkSoft),
            align: (_g = column.align) !== null && _g !== void 0 ? _g : 'LEFT',
            width: column.width,
            fill: false
        });
        if (cell.sub) {
            text(copy, clampText(cell.sub, 46), {
                token: 'caption',
                color: colors.muted,
                align: (_h = column.align) !== null && _h !== void 0 ? _h : 'LEFT',
                width: column.width,
                fill: false
            });
        }
        if (isLast && cell.icon) {
            icon(holder, cell.icon, colors.muted, 16);
        }
    }
    function initialsFor(name) {
        return name
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((part) => { var _a, _b; return (_b = (_a = part[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) !== null && _b !== void 0 ? _b : ''; })
            .join('');
    }
    function tableFooter(parent, opts) {
        var _a, _b, _c;
        const row = hstack('Table pagination', {
            width: opts.width,
            height: 46,
            paddingX: 20,
            fill: colors.surface,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        parent.appendChild(row);
        text(row, opts.shown, {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        const controls = hstack('Pagination controls', {
            gap: 6,
            fill: null,
            align: 'CENTER'
        });
        row.appendChild(controls);
        button(controls, 'Previous', { variant: 'secondary', compact: true, icon: 'chevronLeft', disabled: ((_a = opts.current) !== null && _a !== void 0 ? _a : 1) <= 1 });
        text(controls, `${(_b = opts.current) !== null && _b !== void 0 ? _b : 1} / ${(_c = opts.pages) !== null && _c !== void 0 ? _c : 1}`, {
            token: 'caption',
            weight: 'medium',
            color: colors.inkSoft,
            fill: false,
            hug: true
        }).name = 'Page count';
        button(controls, 'Next', { variant: 'secondary', compact: true, trailingIcon: 'chevronRight' });
        return row;
    }
    function metricCard(parent, opts) {
        var _a, _b, _c, _d, _e;
        const node = vstack(`Metric · ${opts.label}`, {
            width: (_a = opts.width) !== null && _a !== void 0 ? _a : 270,
            height: 128,
            gap: 10,
            padding: 16,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        parent.appendChild(node);
        const header = hstack('Metric header', {
            width: ((_b = opts.width) !== null && _b !== void 0 ? _b : 270) - 32,
            height: 20,
            fill: null
        });
        node.appendChild(header);
        const labelRow = hstack('Metric label', { gap: 7, fill: null, align: 'CENTER' });
        header.appendChild(labelRow);
        icon(labelRow, opts.icon, colors.muted, 15);
        text(labelRow, opts.label, {
            token: 'label',
            color: colors.muted,
            fill: false,
            hug: true
        });
        spacer(header, 1, true);
        const valueRow = hstack('Metric value row', {
            width: ((_c = opts.width) !== null && _c !== void 0 ? _c : 270) - 32,
            height: 40,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        node.appendChild(valueRow);
        text(valueRow, opts.value, {
            token: 'metric',
            size: 26,
            lineHeight: 32,
            weight: 'bold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        if (opts.series) {
            sparkline(valueRow, opts.series, {
                width: 56,
                height: 28,
                color: (_d = opts.seriesColor) !== null && _d !== void 0 ? _d : colors.chartDeposit
            });
        }
        const footer = hstack('Metric footer', { gap: 6, fill: null, align: 'CENTER' });
        node.appendChild(footer);
        if (opts.change) {
            const tone = opts.changeTone === 'down' ? 'error' : opts.changeTone === 'neutral' ? 'neutral' : 'success';
            tag(footer, opts.change, tone, {
                icon: opts.changeTone === 'down' ? 'trendDown' : opts.changeTone === 'neutral' ? 'dot' : 'trendUp',
                size: 'sm'
            });
        }
        text(footer, (_e = opts.footnote) !== null && _e !== void 0 ? _e : 'vs last month', {
            token: 'caption',
            color: colors.mutedLight,
            fill: false,
            hug: true
        });
        return node;
    }
    function infoBanner(parent, opts) {
        var _a, _b;
        const style = toneStyle((_a = opts.tone) !== null && _a !== void 0 ? _a : 'info');
        const node = hstack(`Banner · ${opts.title}`, {
            width: opts.width,
            height: opts.body ? undefined : 40,
            gap: 10,
            paddingX: 14,
            paddingTop: opts.body ? 10 : 0,
            paddingBottom: opts.body ? 10 : 0,
            fill: style.bg,
            radius: radii.sm,
            align: 'CENTER'
        });
        parent.appendChild(node);
        icon(node, (_b = opts.icon) !== null && _b !== void 0 ? _b : style.icon, style.fg, 17);
        const copy = vstack('Banner copy', { fill: null, gap: 1 });
        node.appendChild(copy);
        setFillWidth(copy);
        text(copy, opts.title, {
            token: 'label',
            weight: 'semibold',
            color: style.fg,
            fill: false
        });
        if (opts.body) {
            text(copy, opts.body, {
                token: 'caption',
                color: style.fg,
                fill: false
            });
        }
        if (opts.action) {
            spacer(node, 1, true);
            button(node, opts.action, { variant: 'ghost', compact: true });
        }
        return node;
    }
    function sectionHeader(parent, title, opts = {}) {
        const node = hstack(`Section · ${title}`, {
            width: opts.width,
            height: 32,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        parent.appendChild(node);
        const copy = hstack('Section copy', { gap: 8, fill: null, align: 'CENTER' });
        node.appendChild(copy);
        if (opts.icon) {
            icon(copy, opts.icon, colors.muted, 16);
        }
        text(copy, title, {
            token: 'h3',
            color: colors.ink,
            fill: false,
            hug: true
        });
        if (opts.subtitle) {
            text(copy, opts.subtitle, {
                token: 'caption',
                color: colors.muted,
                fill: false,
                hug: true
            });
        }
        if (opts.action) {
            button(node, opts.action, { variant: 'ghost', trailingIcon: 'chevronRight', compact: true });
        }
        return node;
    }
    function activityRow(parent, opts) {
        var _a;
        const tone = toneStyle(opts.tone);
        const width = (_a = opts.width) !== null && _a !== void 0 ? _a : 1128;
        const copyWidth = Math.max(200, width - 308);
        const row = hstack(`Activity · ${opts.title}`, {
            width,
            height: 62,
            gap: 12,
            paddingX: 16,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        const tile = hstack('Activity icon', {
            width: 30,
            height: 30,
            fill: tone.bg,
            radius: 999,
            justify: 'CENTER',
            align: 'CENTER'
        });
        row.appendChild(tile);
        icon(tile, tone.icon, tone.fg, 14);
        const copy = vstack('Activity copy', { gap: 1, fill: null, width: copyWidth });
        row.appendChild(copy);
        text(copy, opts.title, {
            token: 'table',
            weight: 'semibold',
            color: colors.ink,
            width: copyWidth,
            fill: false
        });
        text(copy, `${opts.actor} · ${opts.detail}`, {
            token: 'caption',
            color: colors.muted,
            width: copyWidth,
            fill: false
        });
        const right = vstack('Activity meta', { gap: 2, fill: null, align: 'MAX', width: 208 });
        row.appendChild(right);
        text(right, opts.meta, {
            token: 'table',
            weight: 'semibold',
            color: colors.ink,
            align: 'RIGHT',
            width: 208,
            fill: false
        });
        text(right, opts.date, {
            token: 'caption',
            color: colors.mutedLight,
            align: 'RIGHT',
            width: 208,
            fill: false
        });
        return row;
    }
    function detailField(parent, label, value, opts = {}) {
        var _a;
        const node = vstack(`Detail · ${label}`, {
            width: opts.width,
            gap: 3,
            fill: null
        });
        parent.appendChild(node);
        text(node, label.toUpperCase(), {
            token: 'micro',
            weight: 'semibold',
            color: colors.mutedLight,
            width: opts.width,
            fill: false
        });
        text(node, value, {
            token: 'bodySmall',
            weight: 'medium',
            color: (_a = opts.valueColor) !== null && _a !== void 0 ? _a : colors.ink,
            width: opts.width,
            fill: false
        });
        return node;
    }
    function keyValueRow(parent, label, value, opts = {}) {
        var _a;
        const row = hstack(`Key value · ${label}`, {
            width: opts.width,
            height: 24,
            gap: 12,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        parent.appendChild(row);
        text(row, label, {
            token: 'bodySmall',
            color: colors.muted,
            fill: false,
            hug: true
        });
        text(row, value, {
            token: 'bodySmall',
            weight: opts.strong ? 'semibold' : 'medium',
            color: (_a = opts.valueColor) !== null && _a !== void 0 ? _a : colors.ink,
            fill: false,
            hug: true
        });
        return row;
    }
    function horizontalRule(parent, width, color = colors.border) {
        const node = frame('Rule', { width: width !== null && width !== void 0 ? width : Math.max(1, parent.width), height: 1, fill: color });
        parent.appendChild(node);
        if (parent.layoutMode === 'VERTICAL' && width === undefined) {
            setFillWidth(node);
        }
        return node;
    }

    const WORKSPACE_NAV = [
        { key: 'overview', label: 'Overview', icon: 'overview' },
        { key: 'employees', label: 'Employees', icon: 'users' },
        { key: 'clients', label: 'Clients', icon: 'clients' },
        { key: 'team', label: 'Team & access', icon: 'team' }
    ];
    const MONEY_NAV = [
        { key: 'transactions', label: 'Transactions', icon: 'transactions' },
        { key: 'invoices', label: 'Invoices', icon: 'invoices' },
        { key: 'payments', label: 'Payments', icon: 'payments', badge: '3' }
    ];
    const ACCOUNT_NAV = [{ key: 'profile', label: 'My profile', icon: 'profile' }];
    function sidebarGroupLabel(parent, label) {
        const row = hstack(`Nav group · ${label}`, {
            width: 216,
            height: 16,
            paddingX: 10,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        text(row, label.toUpperCase(), {
            token: 'eyebrow',
            color: colors.sidebarFaint,
            fill: false,
            hug: true
        });
        return row;
    }
    function navItem(parent, item, active) {
        const node = hstack(`Nav · ${item.label}`, {
            width: 216,
            height: 36,
            gap: 10,
            paddingX: 10,
            fill: active ? colors.navActiveBg : null,
            radius: radii.sm,
            align: 'CENTER'
        });
        parent.appendChild(node);
        icon(node, item.icon, active ? colors.navActiveText : colors.sidebarMuted, 18);
        text(node, item.label, {
            token: 'label',
            weight: active ? 'semibold' : 'medium',
            color: active ? colors.sidebarText : colors.sidebarMuted,
            fill: false,
            hug: true
        });
        spacer(node, 1, true);
        if (item.badge) {
            const badge = hstack('Nav badge', {
                width: 18,
                height: 18,
                fill: colors.warningSoft,
                radius: 999,
                justify: 'CENTER',
                align: 'CENTER'
            });
            node.appendChild(badge);
            const badgeLabel = text(badge, item.badge, {
                token: 'micro',
                weight: 'semibold',
                color: colors.warning,
                align: 'CENTER',
                width: 18,
                fill: false
            });
            badgeLabel.y = 2;
        }
        return node;
    }
    function sidebar(parent, active) {
        const bar = vstack('Sidebar', {
            width: screen.sidebarWidth,
            height: screen.height,
            paddingX: 16,
            paddingTop: 18,
            paddingBottom: 16,
            gap: 12,
            fill: colors.sidebarBg
        });
        parent.appendChild(bar);
        const brand = hstack('Brand row', { width: 216, height: 40, gap: 8, fill: null, align: 'CENTER' });
        bar.appendChild(brand);
        brandMark(brand, 27);
        text(brand, 'AirliPay', {
            size: 20,
            lineHeight: 24,
            weight: 'extrabold',
            color: colors.sidebarText,
            letterSpacing: -0.6,
            fill: false,
            hug: true
        });
        text(brand, 'OPS', {
            token: 'micro',
            weight: 'semibold',
            color: colors.sidebarFaint,
            fill: false,
            hug: true
        }).name = 'Ops label';
        spacer(brand, 1, true);
        iconButton(brand, 'menu', {
            size: 28,
            iconSize: 17,
            color: colors.sidebarMuted
        });
        const switcher = hstack('Workspace switcher', {
            width: 216,
            height: 54,
            gap: 9,
            paddingX: 10,
            fill: colors.sidebarCard,
            stroke: colors.sidebarBorder,
            radius: radii.sm,
            align: 'CENTER'
        });
        bar.appendChild(switcher);
        const org = frame('Workspace mark', {
            width: 28,
            height: 28,
            fill: colors.mint,
            radius: radii.xs
        });
        switcher.appendChild(org);
        const orgLetter = text(org, 'A', {
            size: 15,
            weight: 'extrabold',
            lineHeight: 18,
            color: colors.onMint,
            align: 'CENTER',
            width: 28,
            fill: false
        });
        orgLetter.y = 5;
        const switcherCopy = vstack('Workspace copy', { gap: 1, fill: null, width: 140 });
        switcher.appendChild(switcherCopy);
        text(switcherCopy, 'AirliPay HQ', {
            token: 'label',
            weight: 'semibold',
            color: colors.sidebarText,
            width: 140,
            fill: false
        });
        text(switcherCopy, 'Operations workspace', {
            token: 'caption',
            color: colors.sidebarFaint,
            width: 140,
            fill: false
        });
        spacer(switcher, 1, true);
        icon(switcher, 'chevronDown', colors.sidebarFaint, 14);
        sidebarGroupLabel(bar, 'Workspace');
        WORKSPACE_NAV.forEach((item) => navItem(bar, item, item.key === active));
        sidebarGroupLabel(bar, 'Money');
        MONEY_NAV.forEach((item) => navItem(bar, item, item.key === active));
        sidebarGroupLabel(bar, 'Account');
        ACCOUNT_NAV.forEach((item) => navItem(bar, item, item.key === active));
        const flexible = frame('Sidebar spacer', { width: 1, height: 1, fill: null });
        bar.appendChild(flexible);
        setGrow(flexible);
        const command = hstack('Command shortcut', {
            width: 216,
            height: 38,
            gap: 8,
            paddingX: 10,
            fill: null,
            stroke: colors.sidebarBorder,
            radius: radii.sm,
            align: 'CENTER'
        });
        bar.appendChild(command);
        icon(command, 'command', colors.sidebarMuted, 16);
        text(command, 'Quick command', {
            token: 'caption',
            color: colors.sidebarMuted,
            fill: false,
            hug: true
        });
        spacer(command, 1, true);
        kbd(command, '⌘ K');
        const status = hstack('System status', {
            width: 216,
            height: 26,
            paddingX: 10,
            gap: 7,
            fill: null,
            align: 'CENTER'
        });
        bar.appendChild(status);
        const dotMark = frame('Operational dot', { width: 6, height: 6, fill: colors.success, radius: 999 });
        status.appendChild(dotMark);
        text(status, 'All systems operational', {
            token: 'caption',
            color: colors.sidebarMuted,
            fill: false,
            hug: true
        });
        spacer(status, 1, true);
        icon(status, 'external', colors.sidebarFaint, 13);
        const userCard = hstack('Sidebar account', {
            width: 216,
            height: 50,
            gap: 9,
            paddingX: 10,
            fill: colors.sidebarCard,
            radius: radii.sm,
            align: 'CENTER'
        });
        bar.appendChild(userCard);
        avatar(userCard, currentUser.initials, {
            size: 30,
            bg: colors.mintSoft,
            color: colors.onMintSoft
        });
        const userCopy = vstack('User copy', { gap: 1, width: 132, fill: null });
        userCard.appendChild(userCopy);
        text(userCopy, currentUser.name, {
            token: 'caption',
            weight: 'semibold',
            color: colors.sidebarText,
            width: 132,
            fill: false
        });
        text(userCopy, currentUser.role, {
            token: 'caption',
            color: colors.sidebarFaint,
            width: 132,
            fill: false
        });
        spacer(userCard, 1, true);
        icon(userCard, 'more', colors.sidebarMuted, 16);
        return bar;
    }
    function topbar(parent) {
        var _a;
        const bar = hstack('Top bar', {
            width: screen.width - screen.sidebarWidth,
            height: 63,
            paddingX: 28,
            gap: 16,
            fill: colors.topbarBg,
            align: 'CENTER'
        });
        parent.appendChild(bar);
        const environment = hstack('Environment', {
            height: 26,
            gap: 7,
            paddingX: 9,
            fill: colors.surfaceSunken,
            stroke: colors.border,
            radius: 999,
            align: 'CENTER'
        });
        bar.appendChild(environment);
        const dotMark = frame('Live dot', { width: 6, height: 6, fill: colors.success, radius: 999 });
        environment.appendChild(dotMark);
        text(environment, 'Production', {
            token: 'micro',
            weight: 'semibold',
            color: colors.inkSoft,
            fill: false,
            hug: true
        });
        text(bar, 'Operations', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        spacer(bar, 1, true);
        searchField(bar, {
            width: 312,
            placeholder: 'Search operations…',
            shortcut: '⌘ K'
        });
        spacer(bar, 1, true);
        const actions = hstack('Top bar actions', { gap: 4, fill: null, align: 'CENTER' });
        bar.appendChild(actions);
        const bell = iconButton(actions, 'bell', { size: 32, iconSize: 18, color: colors.inkSoft });
        const notificationDot = frame('Unread', {
            width: 7,
            height: 7,
            fill: colors.error,
            stroke: colors.surface,
            strokeWeight: 1.5,
            radius: 999
        });
        bell.appendChild(notificationDot);
        notificationDot.x = 19;
        notificationDot.y = 5;
        iconButton(actions, 'help', { size: 32, iconSize: 18, color: colors.inkSoft });
        const rule = frame('Top bar rule', { width: 1, height: 22, fill: colors.border });
        actions.appendChild(rule);
        avatarButton(actions, currentUser.initials, true);
        const userCopy = vstack('Top bar user', { gap: 0, fill: null, width: 92 });
        actions.appendChild(userCopy);
        text(userCopy, (_a = currentUser.name.split(' ')[0]) !== null && _a !== void 0 ? _a : currentUser.name, {
            token: 'caption',
            weight: 'semibold',
            color: colors.ink,
            width: 92,
            fill: false
        });
        text(userCopy, currentUser.role, {
            token: 'micro',
            color: colors.muted,
            width: 92,
            fill: false
        });
        icon(actions, 'chevronDown', colors.muted, 14);
        return bar;
    }
    function pageHeader(parent, opts) {
        var _a;
        const header = vstack('Page header', {
            width: screen.contentWidth,
            gap: 4,
            fill: null
        });
        parent.appendChild(header);
        breadcrumb(header, opts.breadcrumbs);
        const titleRow = hstack('Title row', {
            width: screen.contentWidth,
            height: 44,
            gap: 12,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        header.appendChild(titleRow);
        const left = hstack('Page title group', { gap: 10, fill: null, align: 'CENTER' });
        titleRow.appendChild(left);
        if (opts.titlePrefix) {
            opts.titlePrefix(left);
        }
        text(left, opts.title, {
            token: 'pageTitle',
            color: colors.ink,
            fill: false,
            hug: true
        });
        if (opts.titleAddon) {
            opts.titleAddon(left);
        }
        const actions = hstack('Page actions', { gap: 8, fill: null, align: 'CENTER' });
        titleRow.appendChild(actions);
        (_a = opts.actions) === null || _a === void 0 ? void 0 : _a.call(opts, actions);
        if (opts.subtitle) {
            text(header, opts.subtitle, {
                token: 'bodySmall',
                color: colors.muted,
                width: screen.contentWidth,
                fill: false
            });
        }
        if (opts.tabs) {
            const tabRow = tabs(header, opts.tabs);
            tabRow.y = tabRow.y;
            const rule = frame('Tabs rule', {
                width: screen.contentWidth,
                height: 1,
                fill: colors.border
            });
            header.appendChild(rule);
        }
        return header;
    }
    /**
     * Creates a 1440x960 desktop app frame with the shared EAS-inspired shell.
     * The builder receives the body region (1128px wide) below the page header.
     */
    function appScreen(spec, build) {
        var _a;
        const outer = frame((_a = spec.name) !== null && _a !== void 0 ? _a : spec.title, {
            width: screen.width,
            height: screen.height,
            fill: colors.canvas,
            clip: true
        });
        sidebar(outer, spec.nav);
        const main = vstack('Main column', {
            width: screen.width - screen.sidebarWidth,
            height: screen.height,
            fill: colors.canvas,
            gap: 0
        });
        outer.appendChild(main);
        main.x = screen.sidebarWidth;
        main.y = 0;
        topbar(main);
        const topRule = frame('Top bar border', {
            width: screen.width - screen.sidebarWidth,
            height: 1,
            fill: colors.border
        });
        main.appendChild(topRule);
        const content = vstack('Page content', {
            width: screen.width - screen.sidebarWidth,
            height: screen.height - screen.topbarHeight,
            paddingX: 32,
            paddingTop: 24,
            paddingBottom: 24,
            gap: 16,
            fill: colors.canvas,
            clip: true
        });
        main.appendChild(content);
        pageHeader(content, spec);
        const body = vstack('Page body', {
            width: screen.contentWidth,
            gap: 16,
            fill: null
        });
        content.appendChild(body);
        build(body);
        return outer;
    }

    function employeeTabs(active) {
        return [
            { label: 'Transactions', active: active === 'transactions' },
            { label: 'Mobile money', active: active === 'momo' },
            { label: 'Activity', active: active === 'activity' },
            { label: 'Bank accounts', active: active === 'bank' },
            { label: 'Cards', active: active === 'cards' }
        ];
    }
    function clientTabs(active) {
        return [
            { label: 'Transactions', active: active === 'transactions' },
            { label: 'Workforce', active: active === 'roster' },
            { label: 'Funding accounts', active: active === 'funding' },
            { label: 'Payment history', active: active === 'history' }
        ];
    }
    function invoiceTabs(active) {
        return [
            { label: 'Summary', active: active === 'summary' },
            { label: 'Transactions', active: active === 'transactions' },
            { label: 'Activity', active: active === 'activity' }
        ];
    }
    function employeeTitlePrefix(employee) {
        return (parent) => {
            avatar(parent, employee.initials, {
                size: 36,
                bg: colors.cobaltSoft,
                color: colors.cobaltText
            });
        };
    }
    function clientTitlePrefix(client) {
        return (parent) => {
            const mark = frame(`Client mark · ${client.monogram}`, {
                width: 36,
                height: 36,
                fill: colors.mintSoft,
                radius: radii.sm
            });
            parent.appendChild(mark);
            const label = text(mark, client.monogram, {
                size: 13,
                lineHeight: 16,
                weight: 'extrabold',
                color: colors.onMintSoft,
                align: 'CENTER',
                width: 36,
                fill: false
            });
            label.y = 10;
        };
    }
    function adminTitlePrefix(admin) {
        return (parent) => {
            avatar(parent, admin.initials, {
                size: 36,
                bg: colors.cobaltSoft,
                color: colors.cobaltText
            });
        };
    }
    function miniStat(parent, opts) {
        var _a, _b, _c, _d;
        const style = toneStyle((_a = opts.tone) !== null && _a !== void 0 ? _a : 'brand');
        const node = vstack(`Mini stat · ${opts.label}`, {
            width: (_b = opts.width) !== null && _b !== void 0 ? _b : 270,
            height: 76,
            gap: 4,
            padding: 14,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        parent.appendChild(node);
        const top = hstack('Mini stat header', {
            width: ((_c = opts.width) !== null && _c !== void 0 ? _c : 270) - 28,
            height: 18,
            gap: 7,
            fill: null,
            align: 'CENTER'
        });
        node.appendChild(top);
        if (opts.icon) {
            icon(top, opts.icon, style.fg, 14);
        }
        text(top, opts.label, {
            token: 'label',
            color: colors.muted,
            fill: false,
            hug: true
        });
        spacer(top, 1, true);
        if (opts.footnote) {
            text(top, opts.footnote, {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
        }
        text(node, opts.value, {
            token: 'h3',
            weight: 'semibold',
            color: colors.ink,
            width: ((_d = opts.width) !== null && _d !== void 0 ? _d : 270) - 28,
            fill: false
        });
        return node;
    }
    function filterButton(parent, label, opts = {}) {
        const node = hstack(`Filter · ${label}`, {
            height: 36,
            gap: 7,
            paddingX: 11,
            fill: opts.active ? colors.cobaltSoft : colors.surface,
            stroke: opts.active ? colors.cobalt : colors.border,
            radius: radii.sm,
            align: 'CENTER'
        });
        parent.appendChild(node);
        if (opts.icon) {
            icon(node, opts.icon, opts.active ? colors.cobaltText : colors.muted, 15);
        }
        text(node, label, {
            token: 'bodySmall',
            weight: opts.active ? 'semibold' : 'medium',
            color: opts.active ? colors.cobaltText : colors.inkSoft,
            fill: false,
            hug: true
        });
        icon(node, 'chevronDown', colors.muted, 13);
        return node;
    }
    function filterBar(parent, width = screen.contentWidth) {
        const row = hstack('Filter bar', {
            width,
            height: 44,
            gap: 10,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        return row;
    }
    function cardTitleBar(parent, opts) {
        var _a, _b;
        const paddingX = (_a = opts.paddingX) !== null && _a !== void 0 ? _a : 20;
        const row = hstack(`Card title · ${opts.title}`, {
            width: opts.width,
            height: 52,
            gap: 8,
            paddingX,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        parent.appendChild(row);
        const copy = hstack('Card title copy', { gap: 8, fill: null, align: 'CENTER' });
        row.appendChild(copy);
        if (opts.icon) {
            icon(copy, opts.icon, colors.muted, 16);
        }
        text(copy, opts.title, {
            token: 'bodyStrong',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        if (opts.subtitle) {
            text(copy, opts.subtitle, {
                token: 'caption',
                color: colors.muted,
                fill: false,
                hug: true
            });
        }
        if (opts.action) {
            button(row, opts.action, {
                variant: 'ghost',
                compact: true,
                trailingIcon: (_b = opts.actionIcon) !== null && _b !== void 0 ? _b : 'chevronRight'
            });
        }
        return row;
    }
    function fixtureNotice(parent, label, width = screen.contentWidth) {
        const node = hstack(`Review note · ${label}`, {
            width,
            height: 36,
            gap: 8,
            paddingX: 12,
            fill: colors.warningSoft,
            stroke: colors.warning,
            strokeWeight: 1,
            radius: radii.sm,
            align: 'CENTER'
        });
        parent.appendChild(node);
        icon(node, 'alert', colors.warning, 15);
        tag(node, label, 'warning', { size: 'sm' });
        text(node, 'This surface is clearly marked so it is not mistaken for a shipped capability.', {
            token: 'caption',
            color: colors.inkSoft,
            fill: false,
            hug: true
        });
        return node;
    }
    function detailsGrid(parent, items, opts = { width: 640 }) {
        var _a;
        const gap = (_a = opts.gap) !== null && _a !== void 0 ? _a : 20;
        const columns = items.length > 3 ? 3 : 2;
        const colWidth = Math.floor((opts.width - gap * (columns - 1)) / columns);
        const rows = Math.ceil(items.length / columns);
        const grid = vstack('Details grid', { width: opts.width, gap: 16, fill: null });
        parent.appendChild(grid);
        for (let row = 0; row < rows; row += 1) {
            const rowNode = hstack('Details row', {
                width: opts.width,
                gap,
                fill: null,
                align: 'MIN'
            });
            grid.appendChild(rowNode);
            items.slice(row * columns, row * columns + columns).forEach((item) => {
                var _a, _b, _c;
                const cell = vstack(`Detail · ${item.label}`, {
                    width: (_a = item.width) !== null && _a !== void 0 ? _a : colWidth,
                    gap: 3,
                    fill: null
                });
                rowNode.appendChild(cell);
                text(cell, item.label.toUpperCase(), {
                    token: 'micro',
                    weight: 'semibold',
                    color: colors.mutedLight,
                    width: (_b = item.width) !== null && _b !== void 0 ? _b : colWidth,
                    fill: false
                });
                text(cell, item.value, {
                    token: 'bodySmall',
                    weight: 'medium',
                    color: colors.ink,
                    width: (_c = item.width) !== null && _c !== void 0 ? _c : colWidth,
                    fill: false
                });
            });
        }
        return grid;
    }

    function isDarkTheme() {
        return colors.canvas === '#061322';
    }
    function A01SignIn() {
        const outer = frame('A01 · Sign in', {
            width: screen.width,
            height: screen.height,
            fill: colors.canvas,
            clip: true
        });
        const brandPanel = frame('Brand panel', {
            width: 800,
            height: screen.height,
            fill: colors.brandSurface,
            clip: true
        });
        outer.appendChild(brandPanel);
        const art = svg(brandPanel, routeArtSvg(640, 360, colors.mint), 'Air route artwork');
        art.x = 250;
        art.y = 560;
        art.opacity = 0.9;
        const content = vstack('Brand copy', {
            width: 672,
            height: 848,
            gap: 0,
            fill: null
        });
        brandPanel.appendChild(content);
        content.x = 64;
        content.y = 56;
        const lockup = hstack('Brand lockup', {
            width: 240,
            height: 34,
            gap: 10,
            fill: null,
            align: 'CENTER'
        });
        content.appendChild(lockup);
        brandMark(lockup, 30);
        text(lockup, 'AirliPay', {
            size: 23,
            lineHeight: 28,
            weight: 'extrabold',
            color: colors.onBrand,
            letterSpacing: -0.6,
            fill: false,
            hug: true
        });
        text(lockup, 'OPERATIONS', {
            token: 'micro',
            weight: 'semibold',
            color: colors.onBrandFaint,
            fill: false,
            hug: true
        });
        const topSpace = frame('Brand spacer', { width: 1, height: 138, fill: null });
        content.appendChild(topSpace);
        text(content, 'THE MONEY DESK', {
            token: 'eyebrow',
            color: colors.mint,
            fill: false,
            width: 520
        });
        text(content, 'Payroll, clearly.\nFrom funding to final payout.', {
            size: 46,
            lineHeight: 54,
            weight: 'extrabold',
            color: colors.onBrand,
            letterSpacing: -1.2,
            width: 620,
            fill: false
        });
        const intro = text(content, 'One calm place to manage employers, move money and keep every payout accountable — built on the same design language as the AirliPay app.', {
            token: 'body',
            color: colors.onBrandMuted,
            width: 520,
            fill: false
        });
        intro.y = intro.y;
        const stats = hstack('Brand metrics', { width: 672, height: 92, gap: 12, fill: null, align: 'CENTER' });
        content.appendChild(stats);
        const statData = [
            { value: '12,482', label: 'active employees' },
            { value: '99.2%', label: 'payout success' },
            { value: '18', label: 'live employers' }
        ];
        statData.forEach((stat) => {
            const tile = vstack('Brand metric', {
                width: 216,
                height: 88,
                padding: 14,
                gap: 2,
                fill: mix(colors.brandSurface, '#FFFFFF', 0.07),
                stroke: mix(colors.brandSurface, '#FFFFFF', 0.12),
                radius: radii.md,
                justify: 'CENTER'
            });
            stats.appendChild(tile);
            text(tile, stat.value, {
                size: 24,
                lineHeight: 30,
                weight: 'bold',
                color: colors.onBrand,
                width: 188,
                fill: false
            });
            text(tile, stat.label, {
                token: 'caption',
                color: colors.onBrandMuted,
                width: 188,
                fill: false
            });
        });
        const flex = frame('Brand spacer', { width: 1, height: 1, fill: null });
        content.appendChild(flex);
        setGrow(flex);
        const footer = hstack('Brand footer', {
            width: 672,
            height: 36,
            gap: 10,
            fill: null,
            align: 'CENTER'
        });
        content.appendChild(footer);
        icon(footer, 'shieldCheck', colors.onBrandFaint, 15);
        text(footer, 'Role-based access · audit trail · session timeout', {
            token: 'caption',
            color: colors.onBrandFaint,
            fill: false,
            hug: true
        });
        spacer(footer, 1, true);
        text(footer, 'Yaoundé · Douala', {
            token: 'caption',
            color: colors.onBrandFaint,
            fill: false,
            hug: true
        });
        const right = frame('Sign-in panel', {
            width: 640,
            height: screen.height,
            fill: colors.canvas,
            clip: true
        });
        outer.appendChild(right);
        right.x = 800;
        const themePill = hstack('Theme indicator', {
            height: 28,
            gap: 7,
            paddingX: 10,
            fill: colors.surface,
            stroke: colors.border,
            radius: 999,
            align: 'CENTER'
        });
        right.appendChild(themePill);
        icon(themePill, isDarkTheme() ? 'moon' : 'sun', colors.muted, 14);
        text(themePill, isDarkTheme() ? 'Dark theme' : 'Light theme', {
            token: 'micro',
            weight: 'semibold',
            color: colors.muted,
            fill: false,
            hug: true
        });
        themePill.x = 640 - 32 - themePill.width;
        themePill.y = 32;
        const form = vstack('Sign-in card', {
            width: 448,
            gap: 18,
            padding: 32,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.xl
        });
        right.appendChild(form);
        form.x = 96;
        form.y = 152;
        const lockupRow = hstack('Console lockup', { width: 384, height: 28, gap: 8, fill: null, align: 'CENTER' });
        form.appendChild(lockupRow);
        brandMark(lockupRow, 24);
        text(lockupRow, 'Operations console', {
            token: 'caption',
            weight: 'semibold',
            color: colors.muted,
            fill: false,
            hug: true
        });
        spacer(lockupRow, 1, true);
        tag(lockupRow, 'v2.0', 'neutral', { size: 'sm' });
        const heading = vstack('Sign-in heading', { width: 384, gap: 6, fill: null });
        form.appendChild(heading);
        text(heading, 'Sign in to operations', {
            token: 'pageTitle',
            color: colors.ink,
            width: 384,
            fill: false
        });
        text(heading, 'Use the username issued by your AirliPay administrator.', {
            token: 'bodySmall',
            color: colors.muted,
            width: 384,
            fill: false
        });
        field(form, {
            label: 'Username',
            placeholder: 'e.g. nadege.mballa',
            width: 384,
            icon: 'profile',
            required: true
        });
        field(form, {
            label: 'Password',
            placeholder: 'Enter your password',
            width: 384,
            icon: 'lock',
            trailingIcon: 'eye',
            required: true
        });
        const optionsRow = hstack('Sign-in options', {
            width: 384,
            height: 22,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        form.appendChild(optionsRow);
        checkbox(optionsRow, 'Remember this device');
        text(optionsRow, 'Need help?', {
            token: 'caption',
            weight: 'semibold',
            color: colors.cobaltText,
            fill: false,
            hug: true
        });
        button(form, 'Sign in', {
            width: 384,
            height: 44,
            trailingIcon: 'arrowRight'
        });
        const note = hstack('Sign-in note', {
            width: 384,
            gap: 8,
            padding: 12,
            fill: colors.surfaceSunken,
            radius: radii.sm,
            align: 'MIN'
        });
        form.appendChild(note);
        icon(note, 'lock', colors.muted, 15);
        const noteCopy = vstack('Note copy', { width: 334, gap: 2, fill: null });
        note.appendChild(noteCopy);
        text(noteCopy, 'Access is managed by your administrator', {
            token: 'caption',
            weight: 'semibold',
            color: colors.inkSoft,
            width: 334,
            fill: false
        });
        text(noteCopy, 'Contact support@airlipay.cm if you cannot sign in.', {
            token: 'caption',
            color: colors.muted,
            width: 334,
            fill: false
        });
        const rightFooter = hstack('Sign-in footer', {
            width: 576,
            height: 20,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        right.appendChild(rightFooter);
        rightFooter.x = 32;
        rightFooter.y = screen.height - 52;
        text(rightFooter, 'AirliPay Operations', {
            token: 'caption',
            color: colors.mutedLight,
            fill: false,
            hug: true
        });
        const footerRight = hstack('Locale', { gap: 6, fill: null, align: 'CENTER' });
        rightFooter.appendChild(footerRight);
        icon(footerRight, 'globe', colors.mutedLight, 13);
        text(footerRight, 'EN · Cameroun', {
            token: 'caption',
            color: colors.mutedLight,
            fill: false,
            hug: true
        });
        return outer;
    }
    function overviewTransactions(parent, width) {
        const shell = vstack('Overview transactions', {
            width,
            height: 218,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md,
            clip: true
        });
        parent.appendChild(shell);
        cardTitleBar(shell, {
            width,
            title: 'Recent transactions',
            subtitle: 'Live across all employers',
            action: 'View ledger',
            icon: 'transactions'
        });
        const header = hstack('Mini table header', {
            width,
            height: 30,
            paddingX: 20,
            fill: colors.tableHead,
            align: 'CENTER'
        });
        shell.appendChild(header);
        const widths = [254, 200, 126, 104];
        ['TRANSACTION', 'EMPLOYEE', 'AMOUNT', 'STATUS'].forEach((label, index) => {
            const holder = hstack('Header cell', {
                width: widths[index],
                height: 30,
                fill: null,
                justify: index >= 2 ? 'MAX' : 'MIN',
                align: 'CENTER'
            });
            header.appendChild(holder);
            text(holder, label, {
                token: 'micro',
                weight: 'semibold',
                color: colors.muted,
                align: index >= 2 ? 'RIGHT' : 'LEFT',
                fill: false,
                hug: true
            });
        });
        if (widths.reduce((sum, value) => sum + value, 0) < width - 40) {
            spacer(header, 1, true);
        }
        transactions.slice(0, 3).forEach((tx) => {
            const row = hstack('Mini table row', {
                width,
                height: 44,
                paddingX: 20,
                fill: colors.surface,
                align: 'CENTER'
            });
            shell.appendChild(row);
            const txCell = hstack('Transaction cell', { width: 254, gap: 8, fill: null, align: 'CENTER' });
            row.appendChild(txCell);
            iconTile(txCell, tx.type === 'DEPOSIT' ? 'arrowDownLeft' : 'arrowUpRight', {
                tone: tx.type === 'DEPOSIT' ? 'success' : 'brand',
                size: 24,
                iconSize: 13
            });
            const txCopy = vstack('Transaction copy', { width: 216, gap: 1, fill: null });
            txCell.appendChild(txCopy);
            text(txCopy, tx.type === 'DEPOSIT' ? 'Payroll funding' : 'Early withdrawal', {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                width: 216,
                fill: false
            });
            text(txCopy, `${tx.ref} · ${tx.type === 'WITHDRAW' ? tx.operator : 'Bank transfer'}`, {
                token: 'caption',
                color: colors.muted,
                width: 216,
                fill: false
            });
            const employee = hstack('Employee cell', { width: 200, fill: null, align: 'CENTER' });
            row.appendChild(employee);
            text(employee, tx.actorName, {
                token: 'caption',
                color: colors.inkSoft,
                width: 200,
                fill: false
            });
            const amount = hstack('Amount cell', { width: 126, fill: null, justify: 'MAX', align: 'CENTER' });
            row.appendChild(amount);
            text(amount, money(tx.amount), {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                align: 'RIGHT',
                fill: false,
                hug: true
            });
            const status = hstack('Status cell', { width: 104, fill: null, justify: 'MAX', align: 'CENTER' });
            row.appendChild(status);
            statusPill(status, tx.status, { size: 'sm' });
            const rule = frame('Row rule', { width, height: 1, fill: colors.border });
            shell.appendChild(rule);
        });
    }
    function attentionCard(parent, width) {
        const shell = vstack('Needs attention', {
            width,
            height: 218,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md,
            clip: true
        });
        parent.appendChild(shell);
        cardTitleBar(shell, {
            width,
            title: 'Needs attention',
            subtitle: '3 items',
            action: 'Review',
            icon: 'alert'
        });
        attentionItems.slice(0, 3).forEach((item, index) => {
            const row = hstack('Attention row', {
                width,
                height: 52,
                gap: 10,
                paddingX: 20,
                fill: null,
                align: 'CENTER'
            });
            shell.appendChild(row);
            const style = item.tone === 'error' ? 'error' : item.tone === 'warning' ? 'warning' : 'info';
            iconTile(row, style === 'error' ? 'alert' : style === 'warning' ? 'clock' : 'info', {
                tone: style,
                size: 28,
                iconSize: 14
            });
            const copy = vstack('Attention copy', { gap: 1, fill: null, width: 224 });
            row.appendChild(copy);
            text(copy, item.title, {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                width: 224,
                fill: false
            });
            text(copy, item.detail, {
                token: 'caption',
                color: colors.muted,
                width: 224,
                fill: false
            });
            spacer(row, 1, true);
            icon(row, 'chevronRight', colors.mutedLight, 14);
            if (index < 2) {
                const rule = frame('Row rule', { width, height: 1, fill: colors.border });
                shell.appendChild(rule);
            }
        });
    }
    function nextRunCard(parent, width) {
        const node = vstack('Next payout run', {
            width,
            height: 336,
            padding: 20,
            gap: 10,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        parent.appendChild(node);
        const top = hstack('Next run header', {
            width: width - 40,
            height: 22,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        node.appendChild(top);
        const topCopy = hstack('Next run label', { gap: 7, fill: null, align: 'CENTER' });
        top.appendChild(topCopy);
        icon(topCopy, 'calendar', colors.muted, 15);
        text(topCopy, 'Next payout run', {
            token: 'label',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        statusPill(top, socialStats.nextRun.status, { size: 'sm' });
        const amountBlock = vstack('Next run amount', { width: width - 40, gap: 1, fill: null });
        node.appendChild(amountBlock);
        text(amountBlock, '28 October 2026 · 09:00', {
            token: 'bodySmall',
            color: colors.muted,
            width: width - 40,
            fill: false
        });
        text(amountBlock, compactMoney(socialStats.nextRun.amount), {
            token: 'metric',
            color: colors.ink,
            width: width - 40,
            fill: false
        });
        text(node, `${formatNumber(socialStats.nextRun.employeeCount)} employees · ${socialStats.nextRun.clientCount} clients`, {
            token: 'caption',
            color: colors.muted,
            width: width - 40,
            fill: false
        });
        horizontalRule(node, width - 40);
        const funding = hstack('Funding header', {
            width: width - 40,
            height: 18,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        node.appendChild(funding);
        text(funding, 'Funded', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        text(funding, `${socialStats.nextRun.fundedPct}%`, {
            token: 'caption',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        progressBar(node, socialStats.nextRun.fundedPct, {
            width: width - 40,
            height: 6,
            color: colors.mint
        });
        const steps = hstack('Run steps', {
            width: width - 40,
            height: 22,
            gap: 6,
            fill: null,
            align: 'CENTER'
        });
        node.appendChild(steps);
        tag(steps, 'Funding', 'success', { size: 'sm' });
        icon(steps, 'chevronRight', colors.mutedLight, 12);
        tag(steps, 'Validation', 'neutral', { size: 'sm' });
        icon(steps, 'chevronRight', colors.mutedLight, 12);
        tag(steps, 'Settled', 'neutral', { size: 'sm' });
        const note = hstack('Funding note', { width: width - 40, height: 16, gap: 6, fill: null, align: 'CENTER' });
        node.appendChild(note);
        icon(note, 'clock', colors.warning, 13);
        text(note, 'Funding closes 27 Oct at 16:00', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        button(node, 'Review payout run', {
            width: width - 40,
            height: 36,
            variant: 'secondary',
            trailingIcon: 'arrowRight'
        });
    }
    function A02Overview() {
        return appScreen({
            nav: 'overview',
            breadcrumbs: ['AirliPay', 'Operations', 'Overview'],
            title: 'Operations overview',
            subtitle: 'Thursday, 23 October 2026 · All times WAT',
            actions: (row) => {
                button(row, 'Export', { variant: 'secondary', icon: 'download' });
                button(row, 'New pay run', { variant: 'primary', icon: 'plus' });
            }
        }, (body) => {
            const invoice = invoiceStats();
            const kpis = hstack('KPI row', {
                width: screen.contentWidth,
                height: 128,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(kpis);
            metricCard(kpis, {
                label: 'Payroll volume',
                value: compactMoney(socialStats.payrollVolume),
                change: socialStats.payrollChange,
                changeTone: 'up',
                icon: 'trendUp',
                series: chartDeposits,
                seriesColor: colors.chartDeposit,
                width: 270
            });
            metricCard(kpis, {
                label: 'Active employees',
                value: formatNumber(socialStats.activeEmployees),
                change: socialStats.activeEmployeesChange,
                changeTone: 'up',
                icon: 'users',
                series: chartPayouts,
                seriesColor: colors.chartPayout,
                width: 270
            });
            metricCard(kpis, {
                label: 'Payout success',
                value: `${socialStats.payoutSuccess}%`,
                change: '-0.3pp',
                changeTone: 'down',
                icon: 'checkCircle',
                series: [96, 97, 96, 98, 99, 99, 98, 99, 99, 100, 99, 99],
                seriesColor: colors.chartPayout,
                width: 270
            });
            metricCard(kpis, {
                label: 'Outstanding invoices',
                value: compactMoney(invoice.outstandingAmount),
                change: `${invoice.outstandingCount} open`,
                changeTone: 'neutral',
                footnote: 'awaiting action',
                icon: 'invoices',
                series: [42, 38, 45, 40, 31, 36, 29, 33, 27, 31, 24, 26],
                seriesColor: colors.warning,
                width: 270
            });
            const middle = hstack('Overview middle', {
                width: screen.contentWidth,
                height: 336,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(middle);
            const chartCard = vstack('Cash movement card', {
                width: 744,
                height: 336,
                padding: 20,
                gap: 8,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            middle.appendChild(chartCard);
            const chartHeader = hstack('Chart header', {
                width: 704,
                height: 32,
                fill: null,
                justify: 'SPACE_BETWEEN',
                align: 'CENTER'
            });
            chartCard.appendChild(chartHeader);
            const chartTitle = vstack('Chart title', { gap: 1, fill: null, width: 400 });
            chartHeader.appendChild(chartTitle);
            text(chartTitle, 'Cash movement', {
                token: 'h3',
                color: colors.ink,
                width: 400,
                fill: false
            });
            text(chartTitle, 'Deposits and employee withdrawals · last 30 days', {
                token: 'caption',
                color: colors.muted,
                width: 400,
                fill: false
            });
            segmented(chartHeader, ['7D', '30D', '90D'], 1);
            const legend = hstack('Chart legend', { width: 704, height: 18, gap: 16, fill: null, align: 'CENTER' });
            chartCard.appendChild(legend);
            legendItem(legend, 'Employer funding', colors.chartDeposit);
            legendItem(legend, 'Employee payouts', colors.chartPayout);
            spacer(legend, 1, true);
            text(legend, 'Updated 2m ago', {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            areaChart(chartCard, {
                width: 704,
                height: 228,
                seriesA: chartDeposits,
                seriesB: chartPayouts
            });
            nextRunCard(middle, 368);
            const bottom = hstack('Overview bottom', {
                width: screen.contentWidth,
                height: 218,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(bottom);
            overviewTransactions(bottom, 744);
            attentionCard(bottom, 368);
        });
    }
    function preferenceRow(parent, label, detail, opts) {
        const row = hstack(`Preference · ${label}`, {
            width: opts.width,
            height: 50,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        const copy = vstack('Preference copy', { gap: 1, fill: null, width: opts.width - 120 });
        row.appendChild(copy);
        text(copy, label, {
            token: 'bodySmall',
            weight: 'medium',
            color: colors.ink,
            width: opts.width - 120,
            fill: false
        });
        text(copy, detail, {
            token: 'caption',
            color: colors.muted,
            width: opts.width - 120,
            fill: false
        });
        spacer(row, 1, true);
        if (opts.on !== undefined) {
            const on = opts.on;
            const toggleMark = frame(on ? 'Enabled' : 'Disabled', {
                width: 36,
                height: 20,
                fill: on ? colors.cobalt : colors.borderStrong,
                radius: 999
            });
            row.appendChild(toggleMark);
            const knob = frame('Knob', { width: 14, height: 14, fill: '#FFFFFF', radius: 999 });
            toggleMark.appendChild(knob);
            knob.x = on ? 19 : 3;
            knob.y = 3;
        }
        else if (opts.action) {
            text(row, opts.action, {
                token: 'caption',
                weight: 'semibold',
                color: colors.cobaltText,
                fill: false,
                hug: true
            });
        }
        return row;
    }
    function A03Profile() {
        return appScreen({
            nav: 'profile',
            breadcrumbs: ['AirliPay', 'Operations', 'My profile'],
            title: 'My profile',
            subtitle: 'Your AirliPay identity, access and recent account activity.',
            actions: (row) => {
                button(row, 'Sign out', { variant: 'secondary', icon: 'logout' });
            }
        }, (body) => {
            const top = hstack('Profile identity', {
                width: screen.contentWidth,
                height: 156,
                gap: 20,
                padding: 24,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                align: 'CENTER'
            });
            body.appendChild(top);
            avatar(top, currentUser.initials, {
                size: 64,
                bg: colors.cobaltSoft,
                color: colors.cobaltText
            });
            const identity = vstack('Profile identity copy', { gap: 4, fill: null, width: 410 });
            top.appendChild(identity);
            text(identity, currentUser.name, {
                token: 'h2',
                color: colors.ink,
                width: 410,
                fill: false
            });
            text(identity, `${currentUser.role} · ${currentUser.focus}`, {
                token: 'bodySmall',
                color: colors.muted,
                width: 410,
                fill: false
            });
            const chips = hstack('Profile tags', { gap: 6, fill: null, align: 'CENTER' });
            identity.appendChild(chips);
            statusPill(chips, currentUser.status, { size: 'sm' });
            tag(chips, currentUser.twoFactor ? '2FA enabled' : '2FA off', currentUser.twoFactor ? 'success' : 'warning', {
                icon: 'shieldCheck',
                size: 'sm'
            });
            tag(chips, 'Super admin', 'brand', { icon: 'key', size: 'sm' });
            spacer(top, 1, true);
            const meta = hstack('Profile meta', { gap: 28, fill: null, align: 'CENTER' });
            top.appendChild(meta);
            detailField(meta, 'Email', currentUser.email, { width: 190 });
            detailField(meta, 'Phone', currentUser.phone, { width: 150 });
            detailField(meta, 'Member since', currentUser.joined, { width: 110 });
            const lower = hstack('Profile lower', {
                width: screen.contentWidth,
                height: 568,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(lower);
            const details = vstack('Account details card', {
                width: 744,
                height: 568,
                padding: 24,
                gap: 16,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            lower.appendChild(details);
            sectionHeader(details, 'Account details', {
                width: 696,
                subtitle: 'Shared with your organisation',
                icon: 'profile'
            });
            detailsGrid(details, [
                { label: 'Full name', value: currentUser.name },
                { label: 'Username', value: 'nadege.mballa' },
                { label: 'Email address', value: currentUser.email },
                { label: 'Primary phone', value: currentUser.phone },
                { label: 'City', value: currentUser.city },
                { label: 'Region', value: currentUser.region },
                { label: 'Street address', value: currentUser.street },
                { label: 'Activated', value: currentUser.activated },
                { label: 'Role', value: currentUser.role }
            ], { width: 696, gap: 18 });
            horizontalRule(details, 696);
            sectionHeader(details, 'Preferences', {
                width: 696,
                subtitle: 'Stored with your admin account',
                icon: 'settings'
            });
            const preferenceWidth = 696;
            preferenceRow(details, 'Product notifications', 'Payout runs, failed transfers and invoices', {
                on: true,
                width: preferenceWidth
            });
            horizontalRule(details, 696);
            preferenceRow(details, 'Default language', 'English', {
                action: 'Change',
                width: preferenceWidth
            });
            horizontalRule(details, 696);
            preferenceRow(details, 'Timezone', 'West Africa Time · GMT+1', {
                action: 'Change',
                width: preferenceWidth
            });
            const security = vstack('Security card', {
                width: 368,
                height: 568,
                padding: 24,
                gap: 14,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            lower.appendChild(security);
            sectionHeader(security, 'Security', {
                width: 320,
                subtitle: 'Review your access',
                icon: 'shieldCheck'
            });
            const shieldRow = hstack('Security state', {
                width: 320,
                height: 64,
                padding: 12,
                gap: 10,
                fill: colors.successSoft,
                radius: radii.sm,
                align: 'CENTER'
            });
            security.appendChild(shieldRow);
            icon(shieldRow, 'shieldCheck', colors.success, 19);
            const shieldCopy = vstack('Security state copy', { gap: 1, fill: null, width: 270 });
            shieldRow.appendChild(shieldCopy);
            setFillWidth(shieldCopy);
            text(shieldCopy, 'Protected account', {
                token: 'caption',
                weight: 'semibold',
                color: colors.success,
                fill: false
            });
            text(shieldCopy, '2FA and audit trail are active.', {
                token: 'caption',
                color: colors.muted,
                fill: false
            });
            keyValueRow(security, 'Two-factor authentication', 'Enabled', { width: 320 });
            horizontalRule(security, 320);
            keyValueRow(security, 'Last sign in', currentUser.lastActive, { width: 320 });
            horizontalRule(security, 320);
            keyValueRow(security, 'Password', 'Reset via email', { width: 320 });
            horizontalRule(security, 320);
            const sessionsTitle = hstack('Sessions title', { width: 320, height: 24, fill: null, align: 'CENTER' });
            security.appendChild(sessionsTitle);
            text(sessionsTitle, 'Recent sessions', {
                token: 'bodySmall',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            [
                { device: 'MacBook Pro · Chrome', place: 'Douala, CM', time: 'Current session' },
                { device: 'iPhone 15 · AirliPay app', place: 'Douala, CM', time: '2h ago' }
            ].forEach((session) => {
                const row = hstack('Session row', {
                    width: 320,
                    height: 46,
                    fill: null,
                    align: 'CENTER'
                });
                security.appendChild(row);
                iconTile(row, 'globe', { tone: 'neutral', size: 26, iconSize: 14 });
                const copy = vstack('Session copy', { width: 250, gap: 1, fill: null });
                row.appendChild(copy);
                text(copy, session.device, {
                    token: 'caption',
                    weight: 'medium',
                    color: colors.ink,
                    width: 250,
                    fill: false
                });
                text(copy, `${session.place} · ${session.time}`, {
                    token: 'caption',
                    color: colors.muted,
                    width: 250,
                    fill: false
                });
            });
            const contact = hstack('Security contact', {
                width: 320,
                height: 46,
                paddingX: 12,
                gap: 8,
                fill: colors.surfaceSunken,
                radius: radii.sm,
                align: 'CENTER'
            });
            security.appendChild(contact);
            icon(contact, 'help', colors.brandSurface, 16);
            text(contact, 'Security changes go through CIOps.', {
                token: 'caption',
                color: colors.muted,
                fill: false
            });
            const notificationsRow = hstack('Unread notifications', {
                width: 320,
                height: 20,
                fill: null,
                align: 'CENTER'
            });
            security.appendChild(notificationsRow);
            text(notificationsRow, `${notifications.length} unread operations alerts`, {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            spacer(notificationsRow, 1, true);
            text(notificationsRow, 'Open inbox', {
                token: 'caption',
                weight: 'semibold',
                color: colors.cobaltText,
                fill: false,
                hug: true
            });
        });
    }

    const selectedEmployee = employees[0];
    function employeePageOptions(employee, active) {
        return {
            nav: 'employees',
            breadcrumbs: ['Employees', employee.name],
            title: employee.name,
            titlePrefix: employeeTitlePrefix(employee),
            titleAddon: (row) => statusPill(row, employee.status, { size: 'sm' }),
            subtitle: `${employee.employeeId} · ${clientName(employee.clientId)} · ${employee.operator} payout to ${employee.momoMasked}`,
            actions: (row) => {
                button(row, 'Edit employee', { variant: 'secondary', icon: 'edit' });
                iconButton(row, 'more', { size: 38, stroke: colors.border, background: colors.surface });
            },
            tabs: employeeTabs(active)
        };
    }
    function snapshotField$1(parent, label, value, width) {
        const node = vstack(`Snapshot · ${label}`, { width, gap: 2, fill: null });
        parent.appendChild(node);
        text(node, label.toUpperCase(), {
            token: 'micro',
            weight: 'semibold',
            color: colors.mutedLight,
            width,
            fill: false
        });
        text(node, value, {
            token: 'bodySmall',
            weight: 'medium',
            color: colors.ink,
            width,
            fill: false
        });
        return node;
    }
    function employeeSnapshot(parent, employee) {
        const row = hstack('Employee snapshot', {
            width: screen.contentWidth,
            height: 156,
            gap: 16,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        const detailsCard = vstack('Employment card', {
            width: 744,
            height: 156,
            padding: 20,
            gap: 12,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        row.appendChild(detailsCard);
        const labelRow = hstack('Employment header', {
            width: 704,
            height: 18,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        detailsCard.appendChild(labelRow);
        text(labelRow, 'EMPLOYMENT & CONTACT', {
            token: 'eyebrow',
            color: colors.mutedLight,
            fill: false,
            hug: true
        });
        tag(labelRow, 'Roster verified', 'success', { icon: 'checkCircle', size: 'sm' });
        const grid = hstack('Snapshot grid', { width: 704, height: 86, gap: 24, fill: null, align: 'MIN' });
        detailsCard.appendChild(grid);
        const columns = [
            [
                { label: 'Employer', value: clientName(employee.clientId) },
                { label: 'Base salary', value: money(employee.baseSalary) }
            ],
            [
                { label: 'Employee ID', value: employee.employeeId },
                { label: 'Joined', value: employee.joined }
            ],
            [
                { label: 'Primary phone', value: employee.phone },
                { label: 'Location', value: `${employee.city}, ${employee.region}` }
            ]
        ];
        columns.forEach((column, index) => {
            const col = vstack('Snapshot column', {
                width: index === 0 ? 240 : 208,
                gap: 10,
                fill: null
            });
            grid.appendChild(col);
            column.forEach((item) => snapshotField$1(col, item.label, item.value, index === 0 ? 240 : 208));
        });
        const balanceCard = vstack('Balance card', {
            width: 368,
            height: 156,
            padding: 20,
            gap: 5,
            fill: colors.mintSoft,
            radius: radii.md
        });
        row.appendChild(balanceCard);
        const balanceHeader = hstack('Balance header', { width: 328, height: 18, fill: null, align: 'CENTER' });
        balanceCard.appendChild(balanceHeader);
        icon(balanceHeader, 'wallet', colors.onMintSoft, 15);
        text(balanceHeader, 'AVAILABLE BALANCE', {
            token: 'eyebrow',
            color: colors.onMintSoft,
            fill: false,
            hug: true
        });
        text(balanceCard, money(employee.balance), {
            size: 28,
            lineHeight: 34,
            weight: 'bold',
            color: colors.onMintSoft,
            letterSpacing: -0.6,
            width: 328,
            fill: false
        });
        const meta = hstack('Balance meta', { width: 328, height: 18, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        balanceCard.appendChild(meta);
        text(meta, `Base salary ${money(employee.baseSalary)}`, {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        text(meta, 'Next payday 28 Oct', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        const progressRow = hstack('Early pay progress', { width: 328, height: 18, fill: null, align: 'CENTER' });
        balanceCard.appendChild(progressRow);
        text(progressRow, 'Early access used this month', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        spacer(progressRow, 1, true);
        text(progressRow, '64%', {
            token: 'caption',
            weight: 'semibold',
            color: colors.onMintSoft,
            fill: false,
            hug: true
        });
        progressBar(balanceCard, 64, { width: 328, height: 5, color: colors.onMintSoft, track: mix(colors.mintSoft, colors.onMintSoft, 0.14) });
        return row;
    }
    function txCell(tx) {
        var _a;
        return {
            text: tx.type === 'WITHDRAW' ? 'Withdrawal' : 'Payroll funding',
            sub: `${tx.ref} · ${(_a = tx.operator) !== null && _a !== void 0 ? _a : 'Bank transfer'}${tx.destinationMasked ? ` ${tx.destinationMasked}` : ''}`
        };
    }
    function employeeLedgerCard(employee) {
        const card = vstack('Employee ledger card', {
            width: screen.contentWidth,
            height: 517,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md,
            clip: true
        });
        const rows = employeeTransactions(employee.id);
        cardTitleBar(card, {
            width: screen.contentWidth,
            title: 'Transactions',
            subtitle: `${rows.length} entries · newest first`,
            icon: 'transactions',
            action: 'Download CSV',
            actionIcon: 'download'
        });
        const toolbar = filterBar(card);
        segmented(toolbar, ['All', 'Successful', 'Failed'], 0);
        spacer(toolbar, 1, true);
        filterButton(toolbar, 'Last 30 days', { icon: 'calendar' });
        filterButton(toolbar, 'All types', { icon: 'filter' });
        const columns = [
            { key: 'date', label: 'DATE', width: 150 },
            { key: 'transaction', label: 'TRANSACTION', width: 320 },
            { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
            { key: 'fee', label: 'FEE', width: 90, type: 'money', align: 'RIGHT' },
            { key: 'balance', label: 'BALANCE AFTER', width: 170, type: 'money', align: 'RIGHT' },
            { key: 'status', label: 'STATUS', width: 118, type: 'status', align: 'RIGHT' },
            { key: 'more', label: '', width: 100, type: 'action', align: 'RIGHT' }
        ];
        const tableRows = rows.map((tx) => ({
            date: dateTimeLabel(tx.date),
            transaction: txCell(tx),
            amount: { text: money(tx.amount), color: tx.type === 'DEPOSIT' ? colors.success : colors.ink },
            fee: { text: money(tx.fee), color: colors.muted },
            balance: { text: tx.type === 'WITHDRAW' ? money(tx.balanceAfter) : '—' },
            status: { text: statusLabel(tx.status), status: tx.status },
            more: { text: '' }
        }));
        dataTable(card, { width: screen.contentWidth, columns, rows: tableRows, rowHeight: 47 });
        tableFooter(card, {
            width: screen.contentWidth,
            shown: `Showing 1–${rows.length} of ${rows.length} ledger entries`,
            current: 1,
            pages: 1
        });
        return card;
    }
    function payoutDestinationCard(parent, operator, masked, preferred, status) {
        const node = vstack(`Payout · ${operator}`, {
            width: 344,
            height: 160,
            padding: 16,
            gap: 8,
            fill: colors.surfaceSunken,
            stroke: colors.border,
            radius: radii.md
        });
        parent.appendChild(node);
        const header = hstack('Destination header', { width: 312, height: 26, fill: null, align: 'CENTER' });
        node.appendChild(header);
        const tile = hstack('Operator tile', {
            width: 28,
            height: 28,
            fill: operator === 'MTN' ? colors.cobaltSoft : colors.warningSoft,
            radius: radii.sm,
            justify: 'CENTER',
            align: 'CENTER'
        });
        header.appendChild(tile);
        icon(tile, 'phone', operator === 'MTN' ? colors.cobaltText : colors.warning, 14);
        const copy = vstack('Operator copy', { gap: 0, fill: null, width: 150 });
        header.appendChild(copy);
        text(copy, `${operator} Mobile Money`, {
            token: 'caption',
            weight: 'semibold',
            color: colors.ink,
            width: 150,
            fill: false
        });
        text(copy, 'Verified payout account', {
            token: 'caption',
            color: colors.muted,
            width: 150,
            fill: false
        });
        spacer(header, 1, true);
        if (preferred) {
            tag(header, 'Preferred', 'success', { size: 'sm' });
        }
        text(node, masked, {
            size: 24,
            lineHeight: 30,
            weight: 'bold',
            color: colors.ink,
            letterSpacing: -0.3,
            width: 312,
            fill: false
        });
        const footer = hstack('Destination footer', { width: 312, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        node.appendChild(footer);
        statusPill(footer, status, { size: 'sm' });
        button(footer, 'Manage', { variant: 'ghost', compact: true, trailingIcon: 'chevronRight' });
        return node;
    }
    function B01Employees() {
        return appScreen({
            nav: 'employees',
            breadcrumbs: ['AirliPay', 'Operations', 'Employees'],
            title: 'Employees',
            subtitle: '12,482 active employees across 18 employers. Showing the most recent roster entries.',
            actions: (row) => {
                button(row, 'Import', { variant: 'secondary', icon: 'upload', compact: true });
                button(row, 'Add employee', { variant: 'primary', icon: 'plus', compact: true });
            }
        }, (body) => {
            const stats = hstack('Employee stats', {
                width: screen.contentWidth,
                height: 76,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(stats);
            miniStat(stats, {
                label: 'Active employees',
                value: '12,482',
                icon: 'users',
                tone: 'success',
                footnote: '+3.2%',
                width: 365
            });
            miniStat(stats, {
                label: 'Payout-ready',
                value: '12,150',
                icon: 'checkCircle',
                tone: 'brand',
                footnote: '97.3%',
                width: 365
            });
            miniStat(stats, {
                label: 'Missing destination',
                value: '14',
                icon: 'alert',
                tone: 'warning',
                footnote: 'needs action',
                width: 365
            });
            const filters = filterBar(body);
            searchField(filters, { width: 300, placeholder: 'Search name, employee ID or phone' });
            filterButton(filters, 'All employers', { icon: 'clients' });
            filterButton(filters, 'Status', { icon: 'filter' });
            spacer(filters, 1, true);
            text(filters, 'Updated 2m ago', {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            const main = hstack('Employee content', {
                width: screen.contentWidth,
                height: 584,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(main);
            const tableCard = vstack('Employees table card', {
                width: 776,
                height: 584,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            main.appendChild(tableCard);
            cardTitleBar(tableCard, {
                width: 776,
                title: 'Employee roster',
                subtitle: '8 shown',
                icon: 'users',
                action: 'Columns',
                actionIcon: 'sliders'
            });
            const columns = [
                { key: 'employee', label: 'EMPLOYEE', width: 290, type: 'identity' },
                { key: 'employer', label: 'EMPLOYER', width: 186 },
                { key: 'status', label: 'STATUS', width: 104, type: 'status' },
                { key: 'wallet', label: 'WALLET', width: 130, type: 'money', align: 'RIGHT' },
                { key: 'more', label: '', width: 26, type: 'action', align: 'RIGHT' }
            ];
            const rows = employees.slice(0, 8).map((employee) => ({
                employee: {
                    text: employee.name,
                    sub: `${employee.employeeId} · ${employee.email}`,
                    initials: employee.initials,
                    avatarTone: employee.status === 'BLOCKED' ? 'error' : 'brand'
                },
                employer: { text: clientName(employee.clientId) },
                status: { text: statusLabel(employee.status), status: employee.status },
                wallet: { text: money(employee.balance) },
                more: { text: '' }
            }));
            dataTable(tableCard, {
                width: 776,
                columns,
                rows,
                rowHeight: 55,
                selectedIndex: 0
            });
            tableFooter(tableCard, {
                width: 776,
                shown: '8 of 12,482 employees',
                current: 1,
                pages: 624
            });
            const inspector = vstack('Employee inspector', {
                width: 336,
                height: 584,
                padding: 20,
                gap: 10,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            main.appendChild(inspector);
            const inspectorHeader = hstack('Inspector identity', { width: 296, height: 44, gap: 10, fill: null, align: 'CENTER' });
            inspector.appendChild(inspectorHeader);
            avatar(inspectorHeader, selectedEmployee.initials, {
                size: 40,
                bg: colors.cobaltSoft,
                color: colors.cobaltText
            });
            const identity = vstack('Inspector name', { gap: 1, fill: null, width: 214 });
            inspectorHeader.appendChild(identity);
            text(identity, selectedEmployee.name, {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 214,
                fill: false
            });
            text(identity, selectedEmployee.employeeId, {
                token: 'caption',
                color: colors.muted,
                width: 214,
                fill: false
            });
            statusPill(inspectorHeader, selectedEmployee.status, { size: 'sm' });
            horizontalRule(inspector, 296);
            const balance = vstack('Inspector balance', {
                width: 296,
                height: 82,
                padding: 12,
                gap: 2,
                fill: colors.mintSoft,
                radius: radii.sm
            });
            inspector.appendChild(balance);
            text(balance, 'AVAILABLE BALANCE', {
                token: 'eyebrow',
                color: colors.muted,
                width: 272,
                fill: false
            });
            text(balance, money(selectedEmployee.balance), {
                token: 'h3',
                weight: 'bold',
                color: colors.onMintSoft,
                width: 272,
                fill: false
            });
            text(balance, 'Next payday 28 Oct 2026', {
                token: 'caption',
                color: colors.muted,
                width: 272,
                fill: false
            });
            keyValueRow(inspector, 'Employer', clientName(selectedEmployee.clientId), { width: 296 });
            keyValueRow(inspector, 'Base salary', money(selectedEmployee.baseSalary), { width: 296 });
            keyValueRow(inspector, 'Payout destination', `${selectedEmployee.operator} ${selectedEmployee.momoMasked}`, {
                width: 296
            });
            keyValueRow(inspector, 'Location', `${selectedEmployee.city}, ${selectedEmployee.region}`, {
                width: 296
            });
            horizontalRule(inspector, 296);
            const recentHeader = hstack('Recent activity header', {
                width: 296,
                height: 22,
                fill: null,
                justify: 'SPACE_BETWEEN',
                align: 'CENTER'
            });
            inspector.appendChild(recentHeader);
            text(recentHeader, 'Recent activity', {
                token: 'bodySmall',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            text(recentHeader, 'View all', {
                token: 'caption',
                weight: 'semibold',
                color: colors.cobaltText,
                fill: false,
                hug: true
            });
            employeeTransactions(selectedEmployee.id)
                .slice(0, 2)
                .forEach((tx) => {
                const row = hstack('Recent activity row', { width: 296, height: 34, gap: 8, fill: null, align: 'CENTER' });
                inspector.appendChild(row);
                iconTile(row, tx.status === 'FAILED' ? 'alert' : 'arrowUpRight', {
                    tone: tx.status === 'FAILED' ? 'error' : 'success',
                    size: 24,
                    iconSize: 12
                });
                const copy = vstack('Recent copy', { gap: 0, fill: null, width: 230 });
                row.appendChild(copy);
                text(copy, tx.status === 'FAILED' ? 'Withdrawal failed' : 'Withdrawal sent', {
                    token: 'caption',
                    weight: 'medium',
                    color: colors.ink,
                    width: 230,
                    fill: false
                });
                text(copy, `${dateLabel(tx.date)} · ${money(tx.amount)}`, {
                    token: 'caption',
                    color: colors.muted,
                    width: 230,
                    fill: false
                });
            });
            spacer(inspector, 1, true);
            button(inspector, 'Open profile', { width: 296, variant: 'primary', trailingIcon: 'arrowRight' });
            button(inspector, 'Edit employee', { width: 296, variant: 'secondary', icon: 'edit' });
        });
    }
    function formSectionTitle(parent, title, subtitle, width) {
        const row = hstack(`Form section · ${title}`, {
            width,
            height: 24,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        parent.appendChild(row);
        text(row, title, {
            token: 'bodyStrong',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        text(row, subtitle, {
            token: 'caption',
            color: colors.mutedLight,
            fill: false,
            hug: true
        });
        horizontalRule(parent, width);
    }
    function fieldRow(parent, left, right, width = 696) {
        const row = hstack('Form row', { width, gap: 16, fill: null, align: 'MIN' });
        parent.appendChild(row);
        field(row, Object.assign(Object.assign({}, left), { width: 340 }));
        if (right) {
            field(row, Object.assign(Object.assign({}, right), { width: 340 }));
        }
        return row;
    }
    function employeeFormBody(body, employee) {
        const form = vstack('Employee form', {
            width: 744,
            height: 740,
            padding: 24,
            gap: 13,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        body.appendChild(form);
        formSectionTitle(form, 'Identity', 'Employee details from the roster', 696);
        fieldRow(form, {
            label: 'Full name',
            value: employee === null || employee === void 0 ? void 0 : employee.name,
            placeholder: 'e.g. Awa Fongang',
            icon: 'profile',
            required: true
        }, {
            label: 'Work email',
            value: employee === null || employee === void 0 ? void 0 : employee.email,
            placeholder: 'name@employer.cm',
            icon: 'mail',
            required: true
        });
        fieldRow(form, {
            label: 'Date of birth',
            value: employee === null || employee === void 0 ? void 0 : employee.dob,
            placeholder: 'DD/MM/YYYY',
            icon: 'calendar',
            required: true
        }, {
            label: 'Sex',
            value: (employee === null || employee === void 0 ? void 0 : employee.sex) === 'F' ? 'Female' : (employee === null || employee === void 0 ? void 0 : employee.sex) === 'M' ? 'Male' : undefined,
            placeholder: 'Select sex',
            variant: 'select',
            required: true
        });
        formSectionTitle(form, 'Employment', 'Set the employer and payroll profile', 696);
        fieldRow(form, {
            label: 'Employer',
            value: employee ? clientName(employee.clientId) : undefined,
            placeholder: 'Select employer',
            variant: 'select',
            required: true
        }, {
            label: 'Employee ID',
            value: employee === null || employee === void 0 ? void 0 : employee.employeeId,
            placeholder: 'e.g. EMP-10482',
            required: true
        });
        fieldRow(form, {
            label: 'Base salary · monthly',
            value: employee ? money(employee.baseSalary) : undefined,
            placeholder: 'XAF 0',
            required: true
        }, {
            label: 'Payout channel',
            value: employee ? `${employee.operator} Mobile Money` : 'Mobile money',
            placeholder: 'Select channel',
            variant: 'select',
            required: true
        });
        formSectionTitle(form, 'Contact & address', 'Used for account recovery and location reporting', 696);
        fieldRow(form, {
            label: 'Street',
            value: employee === null || employee === void 0 ? void 0 : employee.street,
            placeholder: 'Street address',
            icon: 'mapPin'
        }, {
            label: 'City',
            value: employee === null || employee === void 0 ? void 0 : employee.city,
            placeholder: 'City'
        });
        fieldRow(form, {
            label: 'Region',
            value: employee === null || employee === void 0 ? void 0 : employee.region,
            placeholder: 'Select region',
            variant: 'select'
        }, {
            label: 'Primary phone',
            value: employee === null || employee === void 0 ? void 0 : employee.phone,
            placeholder: '+237 6 00 00 00 00',
            icon: 'phone',
            required: true
        });
        fieldRow(form, {
            label: 'Secondary phone',
            placeholder: '+237 6 00 00 00 00',
            icon: 'phone'
        }, null);
        const footer = hstack('Form footer', { width: 696, height: 22, gap: 8, fill: null, align: 'CENTER' });
        form.appendChild(footer);
        icon(footer, 'info', colors.mutedLight, 13);
        text(footer, employee ? 'Changes are audited and visible to the employer.' : 'An invitation and payout setup link will be sent after creation.', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        if (employee) {
            const helper = vstack('Employee helper', {
                width: 368,
                height: 740,
                padding: 24,
                gap: 14,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(helper);
            const identity = hstack('Helper identity', { width: 320, height: 44, gap: 10, fill: null, align: 'CENTER' });
            helper.appendChild(identity);
            avatar(identity, employee.initials, { size: 40 });
            const identityCopy = vstack('Helper identity copy', { gap: 1, fill: null, width: 270 });
            identity.appendChild(identityCopy);
            text(identityCopy, employee.name, {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 270,
                fill: false
            });
            text(identityCopy, `${employee.employeeId} · ${clientName(employee.clientId)}`, {
                token: 'caption',
                color: colors.muted,
                width: 270,
                fill: false
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Record health', {
                width: 320,
                icon: 'shieldCheck'
            });
            keyValueRow(helper, 'Identity verified', 'Complete', { width: 320 });
            keyValueRow(helper, 'Payout destination', `${employee.operator} ${employee.momoMasked}`, { width: 320 });
            keyValueRow(helper, 'Employer match', 'Verified', { width: 320 });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Danger zone', { width: 320, icon: 'alert' });
            infoBanner(helper, {
                title: 'Deactivating stops new payouts',
                body: 'Ledger history is retained. Reactivation is available to an admin.',
                tone: 'warning',
                width: 320
            });
            button(helper, 'Deactivate employee', { width: 320, variant: 'danger', icon: 'pause' });
            spacer(helper, 1, true);
            text(helper, 'Last updated 18 Oct 2026 by Nadège Mballa', {
                token: 'caption',
                color: colors.mutedLight,
                width: 320,
                fill: false
            });
        }
        else {
            const helper = vstack('New employee helper', {
                width: 368,
                height: 740,
                padding: 24,
                gap: 16,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(helper);
            sectionHeader(helper, 'Before you create', { width: 320, icon: 'info' });
            [
                { number: '1', title: 'Verify the employer', body: 'The employee inherits payout funding from this client.' },
                { number: '2', title: 'Confirm the destination', body: 'The employee chooses a mobile money or bank account at setup.' },
                { number: '3', title: 'Send the invitation', body: 'The AirliPay app completes activation and terms acceptance.' }
            ].forEach((step) => {
                const row = hstack('Setup step', { width: 320, height: 70, gap: 10, fill: null, align: 'MIN' });
                helper.appendChild(row);
                const number = hstack('Step number', {
                    width: 26,
                    height: 26,
                    fill: colors.cobaltSoft,
                    radius: 999,
                    justify: 'CENTER',
                    align: 'CENTER'
                });
                row.appendChild(number);
                text(number, step.number, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.cobaltText,
                    align: 'CENTER',
                    width: 26,
                    fill: false
                });
                const copy = vstack('Step copy', { gap: 2, fill: null, width: 284 });
                row.appendChild(copy);
                text(copy, step.title, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    width: 284,
                    fill: false
                });
                text(copy, step.body, {
                    token: 'caption',
                    color: colors.muted,
                    width: 284,
                    fill: false
                });
            });
            horizontalRule(helper, 320);
            const importCard = vstack('Bulk import card', {
                width: 320,
                height: 210,
                padding: 16,
                gap: 10,
                fill: colors.surfaceSunken,
                stroke: colors.border,
                strokeWeight: 1,
                radius: radii.md
            });
            helper.appendChild(importCard);
            const importHeader = hstack('Import header', { width: 288, height: 20, gap: 7, fill: null, align: 'CENTER' });
            importCard.appendChild(importHeader);
            icon(importHeader, 'upload', colors.cobaltText, 15);
            text(importHeader, 'Adding a whole roster?', {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            text(importCard, 'Upload a CSV with up to 5,000 employees. We validate employer IDs and payout channels before creating anything.', {
                token: 'caption',
                color: colors.muted,
                width: 288,
                fill: false
            });
            button(importCard, 'Choose CSV file', { width: 288, variant: 'secondary', icon: 'upload' });
            button(importCard, 'Download template', { width: 288, variant: 'ghost', trailingIcon: 'download' });
            spacer(helper, 1, true);
            infoBanner(helper, {
                title: 'PII handling',
                body: 'Only authorised admins can view employee identity and contact data.',
                tone: 'info',
                width: 320
            });
        }
    }
    function B02NewEmployee() {
        return appScreen({
            nav: 'employees',
            breadcrumbs: ['Employees', 'New employee'],
            title: 'New employee',
            subtitle: 'Create an employee record for an AirliPay client. Required fields are marked.',
            actions: (row) => {
                button(row, 'Cancel', { variant: 'ghost' });
                button(row, 'Create employee', { variant: 'primary', icon: 'plus' });
            }
        }, (body) => {
            const layout = hstack('Form layout', {
                width: screen.contentWidth,
                height: 740,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(layout);
            employeeFormBody(layout);
        });
    }
    function B03EmployeeProfile() {
        return appScreen(employeePageOptions(selectedEmployee, 'transactions'), (body) => {
            employeeSnapshot(body, selectedEmployee);
            body.appendChild(employeeLedgerCard(selectedEmployee));
        });
    }
    function B04MomoAccounts() {
        return appScreen(employeePageOptions(selectedEmployee, 'momo'), (body) => {
            employeeSnapshot(body, selectedEmployee);
            const row = hstack('Momo content', {
                width: screen.contentWidth,
                height: 517,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(row);
            const left = vstack('Payout destinations card', {
                width: 744,
                height: 517,
                padding: 20,
                gap: 13,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            row.appendChild(left);
            sectionHeader(left, 'Payout destinations', {
                width: 704,
                subtitle: 'Preferred first, fallback second',
                icon: 'phone'
            });
            const cards = hstack('Destination cards', { width: 704, height: 160, gap: 16, fill: null, align: 'CENTER' });
            left.appendChild(cards);
            momoAccounts.forEach((account, index) => payoutDestinationCard(cards, account.operator, account.phoneMasked, index === 0, account.status));
            horizontalRule(left, 704);
            sectionHeader(left, 'Recent payouts to these accounts', { width: 704, icon: 'clock' });
            employeeTransactions(selectedEmployee.id)
                .slice(0, 3)
                .forEach((tx) => {
                const payoutRow = hstack('Recent payout row', {
                    width: 704,
                    height: 44,
                    fill: null,
                    align: 'CENTER'
                });
                left.appendChild(payoutRow);
                iconTile(payoutRow, 'phone', { tone: 'neutral', size: 26, iconSize: 13 });
                const copy = vstack('Payout copy', { gap: 1, fill: null, width: 440 });
                payoutRow.appendChild(copy);
                text(copy, `${tx.operator} · ${tx.destinationMasked}`, {
                    token: 'caption',
                    weight: 'medium',
                    color: colors.ink,
                    width: 440,
                    fill: false
                });
                text(copy, dateTimeLabel(tx.date), {
                    token: 'caption',
                    color: colors.muted,
                    width: 440,
                    fill: false
                });
                spacer(payoutRow, 1, true);
                text(payoutRow, money(tx.amount), {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    fill: false,
                    hug: true
                });
                statusPill(payoutRow, tx.status, { size: 'sm' });
            });
            const coolingNote = hstack('Destination note', {
                width: 704,
                height: 40,
                paddingX: 12,
                gap: 8,
                fill: colors.infoSoft,
                radius: radii.sm,
                align: 'CENTER'
            });
            left.appendChild(coolingNote);
            icon(coolingNote, 'info', colors.info, 14);
            text(coolingNote, 'New destinations enter a 24-hour cooling period before payouts.', {
                token: 'caption',
                color: colors.info,
                fill: false,
                hug: true
            });
            const right = vstack('Payout rules', {
                width: 368,
                height: 517,
                padding: 20,
                gap: 12,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            row.appendChild(right);
            sectionHeader(right, 'Payout rules', { width: 328, icon: 'sliders' });
            keyValueRow(right, 'Preferred', `MTN · ${momoAccounts[0].phoneMasked}`, { width: 328 });
            keyValueRow(right, 'Fallback', `Orange · ${momoAccounts[1].phoneMasked}`, { width: 328 });
            keyValueRow(right, 'Currency', 'XAF', { width: 328 });
            keyValueRow(right, 'Schedule', 'Payday + on demand', { width: 328 });
            horizontalRule(right, 328);
            sectionHeader(right, 'Account safety', { width: 328, icon: 'shieldCheck' });
            const safety = vstack('Safety steps', {
                width: 328,
                gap: 8,
                padding: 14,
                fill: colors.surfaceSunken,
                radius: radii.sm
            });
            right.appendChild(safety);
            [
                'Both accounts are verified against the employee name.',
                'Changes are blocked during a payout run.',
                'Notifications are sent on every change.'
            ].forEach((line) => {
                const item = hstack('Safety line', { width: 300, gap: 7, fill: null, align: 'MIN' });
                safety.appendChild(item);
                icon(item, 'checkCircle', colors.success, 13);
                text(item, line, {
                    token: 'caption',
                    color: colors.muted,
                    width: 280,
                    fill: false
                });
            });
            spacer(right, 1, true);
            tag(right, 'Data: user_mobile_money_accounts', 'brand', { icon: 'database', size: 'sm' });
            button(right, 'Update preference', { width: 328, variant: 'secondary', icon: 'edit' });
        });
    }
    function B05Activity() {
        return appScreen(employeePageOptions(selectedEmployee, 'activity'), (body) => {
            employeeSnapshot(body, selectedEmployee);
            const card = vstack('Activity card', {
                width: screen.contentWidth,
                height: 517,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            body.appendChild(card);
            cardTitleBar(card, {
                width: screen.contentWidth,
                title: 'Activity',
                subtitle: 'Account events and payout history',
                icon: 'activity',
                action: 'Export activity',
                actionIcon: 'download'
            });
            const toolbar = filterBar(card);
            segmented(toolbar, ['All events', 'Payouts', 'Profile'], 0);
            spacer(toolbar, 1, true);
            tag(toolbar, 'Fixture surface', 'warning', { icon: 'alert', size: 'sm' });
            filterButton(toolbar, 'Last 90 days', { icon: 'calendar' });
            activityFeed.slice(0, 6).forEach((item, index) => {
                activityRow(card, {
                    title: item.title,
                    detail: item.detail,
                    date: item.date,
                    actor: item.actor,
                    meta: item.meta,
                    tone: item.tone,
                    width: screen.contentWidth
                });
                if (index < 5) {
                    horizontalRule(card, screen.contentWidth);
                }
            });
            const footer = hstack('Activity footer', {
                width: screen.contentWidth,
                height: 40,
                paddingX: 20,
                gap: 7,
                fill: colors.warningSoft,
                align: 'CENTER'
            });
            card.appendChild(footer);
            icon(footer, 'alert', colors.warning, 14);
            text(footer, 'Illustrative feed. A real audit endpoint is required before this view ships.', {
                token: 'caption',
                color: colors.warning,
                fill: false,
                hug: true
            });
        });
    }
    function B06BankAccounts() {
        return appScreen(employeePageOptions(selectedEmployee, 'bank'), (body) => {
            employeeSnapshot(body, selectedEmployee);
            const card = vstack('Bank accounts card', {
                width: screen.contentWidth,
                height: 517,
                padding: 20,
                gap: 16,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(card);
            sectionHeader(card, 'Linked bank accounts', {
                width: 1088,
                subtitle: 'Used for larger settlements',
                icon: 'bank'
            });
            const accountRow = hstack('Bank cards', { width: 1088, height: 150, gap: 16, fill: null, align: 'CENTER' });
            card.appendChild(accountRow);
            bankAccounts.forEach((account, index) => {
                const node = vstack('Bank account', {
                    width: 352,
                    height: 150,
                    padding: 16,
                    gap: 6,
                    fill: index === 0 ? colors.cobaltSoft : colors.surfaceSunken,
                    stroke: index === 0 ? colors.cobalt : colors.border,
                    radius: radii.md
                });
                accountRow.appendChild(node);
                const top = hstack('Bank top', { width: 320, height: 28, fill: null, align: 'CENTER' });
                node.appendChild(top);
                iconTile(top, 'bank', { tone: index === 0 ? 'brand' : 'neutral', size: 28, iconSize: 14 });
                const copy = vstack('Bank copy', { gap: 0, fill: null, width: 200 });
                top.appendChild(copy);
                text(copy, account.bank, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    width: 200,
                    fill: false
                });
                text(copy, account.label, {
                    token: 'caption',
                    color: colors.muted,
                    width: 200,
                    fill: false
                });
                spacer(top, 1, true);
                if (index === 0) {
                    tag(top, 'Primary', 'brand', { size: 'sm' });
                }
                text(node, account.accountMasked, {
                    size: 22,
                    lineHeight: 28,
                    weight: 'bold',
                    color: colors.ink,
                    width: 320,
                    fill: false
                });
                const footer = hstack('Bank footer', { width: 320, height: 20, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
                node.appendChild(footer);
                statusPill(footer, account.status, { size: 'sm' });
                text(footer, `Added ${account.added}`, {
                    token: 'caption',
                    color: colors.mutedLight,
                    fill: false,
                    hug: true
                });
            });
            horizontalRule(card, 1088);
            const lower = hstack('Bank lower', { width: 1088, height: 174, gap: 16, fill: null, align: 'MIN' });
            card.appendChild(lower);
            const settlement = vstack('Settlement settings', {
                width: 536,
                height: 174,
                padding: 16,
                gap: 8,
                fill: colors.surfaceSunken,
                radius: radii.md
            });
            lower.appendChild(settlement);
            text(settlement, 'Settlement settings', {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 504,
                fill: false
            });
            text(settlement, 'Primary bank account', {
                token: 'caption',
                color: colors.muted,
                width: 504,
                fill: false
            });
            keyValueRow(settlement, 'Afriland First Bank', '•••• 4821', { width: 504 });
            divider(settlement, colors.border);
            keyValueRow(settlement, 'Auto-settle employer funding', 'Enabled', { width: 504, valueColor: colors.success });
            const statusCard = vstack('Verification card', {
                width: 536,
                height: 174,
                padding: 16,
                gap: 8,
                fill: colors.warningSoft,
                radius: radii.md
            });
            lower.appendChild(statusCard);
            const statusTitle = hstack('Verification title', { width: 504, height: 20, gap: 7, fill: null, align: 'CENTER' });
            statusCard.appendChild(statusTitle);
            icon(statusTitle, 'alert', colors.warning, 15);
            text(statusTitle, 'Fixture surface', {
                token: 'caption',
                weight: 'semibold',
                color: colors.warning,
                fill: false,
                hug: true
            });
            text(statusCard, 'The current bank page generates random accounts. The API exposes a list-banks endpoint; a real account model and verification flow are still required.', {
                token: 'caption',
                color: colors.inkSoft,
                width: 504,
                fill: false
            });
            button(statusCard, 'View API note', { variant: 'ghost', compact: true, trailingIcon: 'external' });
            const actionRow = hstack('Bank actions', { width: 1088, height: 38, gap: 8, fill: null, align: 'CENTER' });
            card.appendChild(actionRow);
            button(actionRow, 'Add bank account', { variant: 'secondary', icon: 'plus' });
            button(actionRow, 'Set primary account', { variant: 'ghost', icon: 'checkCircle' });
            spacer(actionRow, 1, true);
            tag(actionRow, 'Read-only in v1', 'neutral', { size: 'sm' });
        });
    }
    function B07DebitCards() {
        return appScreen(employeePageOptions(selectedEmployee, 'cards'), (body) => {
            employeeSnapshot(body, selectedEmployee);
            const row = hstack('Cards content', {
                width: screen.contentWidth,
                height: 517,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(row);
            const visual = vstack('Card visual card', {
                width: 744,
                height: 517,
                padding: 24,
                gap: 18,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            row.appendChild(visual);
            sectionHeader(visual, 'AirliPay debit card', {
                width: 696,
                subtitle: 'Concept exploration',
                icon: 'card'
            });
            const cardArt = frame('Debit card artwork', {
                width: 420,
                height: 252,
                fill: colors.brandSurface,
                radius: radii.xl,
                clip: true
            });
            visual.appendChild(cardArt);
            const glow = frame('Card glow', {
                width: 300,
                height: 300,
                fill: mix(colors.brandSurface, colors.mint, 0.18),
                radius: 999
            });
            cardArt.appendChild(glow);
            glow.x = 260;
            glow.y = -100;
            const brand = hstack('Card brand', { width: 360, height: 30, gap: 8, fill: null, align: 'CENTER' });
            cardArt.appendChild(brand);
            brand.x = 24;
            brand.y = 22;
            icon(brand, 'wallet', colors.onBrand, 20);
            text(brand, 'Awa Fongang', {
                token: 'caption',
                weight: 'semibold',
                color: colors.onBrand,
                fill: false,
                hug: true
            });
            const chip = frame('Card chip', {
                width: 40,
                height: 30,
                fill: colors.mint,
                radius: 6
            });
            cardArt.appendChild(chip);
            chip.x = 24;
            chip.y = 82;
            const chipLine = frame('Chip rule', { width: 28, height: 1, fill: colors.brandSurface });
            chip.appendChild(chipLine);
            chipLine.x = 6;
            chipLine.y = 15;
            text(cardArt, '••••  ••••  ••••  7321', {
                size: 22,
                lineHeight: 28,
                weight: 'semibold',
                color: colors.onBrand,
                letterSpacing: 1.4,
                width: 360,
                fill: false
            }).y = 138;
            const cardText = cardArt.children[cardArt.children.length - 1];
            cardText.x = 24;
            const holder = text(cardArt, 'AWA FONGANG', {
                token: 'micro',
                weight: 'semibold',
                color: colors.onBrandMuted,
                width: 240,
                fill: false
            });
            holder.x = 24;
            holder.y = 214;
            const network = text(cardArt, 'airlipay', {
                size: 16,
                weight: 'extrabold',
                lineHeight: 20,
                color: colors.mint,
                width: 120,
                align: 'RIGHT',
                fill: false
            });
            network.x = 276;
            network.y = 210;
            const description = vstack('Card copy', { width: 696, gap: 10, fill: null });
            visual.appendChild(description);
            text(description, 'A physical card, funded by the same wallet', {
                token: 'h3',
                color: colors.ink,
                width: 696,
                fill: false
            });
            text(description, 'This concept explores instant issuance, tap-to-pay and merchant controls. It is not a shipped capability and no card API exists today.', {
                token: 'bodySmall',
                color: colors.muted,
                width: 650,
                fill: false
            });
            const featureRow = hstack('Card features', { width: 696, height: 60, gap: 10, fill: null, align: 'CENTER' });
            description.appendChild(featureRow);
            [
                { icon: 'zap', label: 'Instant issue' },
                { icon: 'lock', label: 'Freeze anytime' },
                { icon: 'globe', label: 'Tap to pay' }
            ].forEach((feature) => {
                const tile = hstack('Feature', {
                    gap: 7,
                    height: 32,
                    paddingX: 10,
                    fill: colors.surfaceSunken,
                    radius: radii.sm,
                    align: 'CENTER'
                });
                featureRow.appendChild(tile);
                icon(tile, feature.icon, colors.cobaltText, 14);
                text(tile, feature.label, {
                    token: 'caption',
                    weight: 'medium',
                    color: colors.inkSoft,
                    fill: false,
                    hug: true
                });
            });
            const side = vstack('Card roadmap', {
                width: 368,
                height: 517,
                padding: 20,
                gap: 14,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            row.appendChild(side);
            tag(side, 'Concept · not shipped', 'warning', { icon: 'alert', size: 'sm' });
            text(side, 'What would need to exist', {
                token: 'h3',
                color: colors.ink,
                width: 328,
                fill: false
            });
            [
                'Card issuer and KYC partnership',
                'Wallet-to-card funding and limits',
                'Merchant controls and dispute handling',
                'Frozen / lost-card lifecycle'
            ].forEach((item, index) => {
                const rowItem = hstack('Roadmap item', { width: 328, height: 42, gap: 9, fill: null, align: 'CENTER' });
                side.appendChild(rowItem);
                const num = hstack('Roadmap number', {
                    width: 22,
                    height: 22,
                    fill: colors.surfaceSunken,
                    radius: 999,
                    justify: 'CENTER',
                    align: 'CENTER'
                });
                rowItem.appendChild(num);
                text(num, String(index + 1), {
                    token: 'micro',
                    weight: 'semibold',
                    color: colors.muted,
                    align: 'CENTER',
                    width: 22,
                    fill: false
                });
                text(rowItem, item, {
                    token: 'caption',
                    color: colors.inkSoft,
                    width: 288,
                    fill: false
                });
            });
            horizontalRule(side, 328);
            text(side, 'Not part of the current route map. The debit-cards page reuses the bank-accounts fixture today.', {
                token: 'caption',
                color: colors.muted,
                width: 328,
                fill: false
            });
            spacer(side, 1, true);
            button(side, 'Notify me when ready', { width: 328, variant: 'secondary', icon: 'bell', disabled: true });
        });
    }
    function B08EditEmployee() {
        return appScreen({
            nav: 'employees',
            breadcrumbs: ['Employees', selectedEmployee.name, 'Edit'],
            title: 'Edit employee',
            subtitle: `Update ${selectedEmployee.name}'s identity, employment and payout details.`,
            actions: (row) => {
                button(row, 'Cancel', { variant: 'ghost' });
                button(row, 'Save changes', { variant: 'primary', icon: 'check' });
            }
        }, (body) => {
            const layout = hstack('Edit form layout', {
                width: screen.contentWidth,
                height: 740,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(layout);
            employeeFormBody(layout, selectedEmployee);
        });
    }

    const selectedClient = clients[0];
    function clientPageOptions(client, active) {
        return {
            nav: 'clients',
            breadcrumbs: ['Clients', client.name],
            title: client.name,
            titlePrefix: clientTitlePrefix(client),
            titleAddon: (row) => statusPill(row, client.status, { size: 'sm' }),
            subtitle: `${client.industry} · ${formatNumber(client.employeeCount)} employees · Account manager ${client.manager}`,
            actions: (row) => {
                button(row, 'Payout settings', { variant: 'secondary', icon: 'settings' });
                iconButton(row, 'more', { size: 38, stroke: colors.border, background: colors.surface });
            },
            tabs: clientTabs(active)
        };
    }
    function snapshotField(parent, label, value, width) {
        const node = vstack(`Client snapshot · ${label}`, { width, gap: 2, fill: null });
        parent.appendChild(node);
        text(node, label.toUpperCase(), {
            token: 'micro',
            weight: 'semibold',
            color: colors.mutedLight,
            width,
            fill: false
        });
        text(node, value, {
            token: 'bodySmall',
            weight: 'medium',
            color: colors.ink,
            width,
            fill: false
        });
        return node;
    }
    function clientSnapshot(parent, client) {
        const row = hstack('Client snapshot', {
            width: screen.contentWidth,
            height: 156,
            gap: 16,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        const detailsCard = vstack('Company card', {
            width: 744,
            height: 156,
            padding: 20,
            gap: 12,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        row.appendChild(detailsCard);
        const labelRow = hstack('Company header', {
            width: 704,
            height: 18,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        detailsCard.appendChild(labelRow);
        text(labelRow, 'COMPANY & CONTACT', {
            token: 'eyebrow',
            color: colors.mutedLight,
            fill: false,
            hug: true
        });
        tag(labelRow, 'KYC verified', 'success', { icon: 'checkCircle', size: 'sm' });
        const grid = hstack('Company snapshot grid', {
            width: 704,
            height: 86,
            gap: 24,
            fill: null,
            align: 'MIN'
        });
        detailsCard.appendChild(grid);
        const columns = [
            [
                { label: 'Industry', value: client.industry },
                { label: 'Tax ID', value: client.taxId }
            ],
            [
                { label: 'Account email', value: client.email },
                { label: 'Primary phone', value: client.phone }
            ],
            [
                { label: 'Account manager', value: client.manager },
                { label: 'Joined', value: client.joined }
            ]
        ];
        const columnWidths = [232, 216, 208];
        columnWidths.forEach((width, index) => {
            const col = vstack('Company column', {
                width,
                gap: 10,
                fill: null
            });
            grid.appendChild(col);
            columnWidths[index] = width;
            columns[index].forEach((item) => snapshotField(col, item.label, item.value, width));
        });
        const payoutCard = vstack('Next client payout', {
            width: 368,
            height: 156,
            padding: 20,
            gap: 5,
            fill: colors.cobaltSoft,
            radius: radii.md
        });
        row.appendChild(payoutCard);
        const header = hstack('Payout header', { width: 328, height: 18, fill: null, align: 'CENTER' });
        payoutCard.appendChild(header);
        icon(header, 'calendar', colors.cobaltText, 15);
        text(header, 'NEXT PAYOUT', {
            token: 'eyebrow',
            color: colors.cobaltText,
            fill: false,
            hug: true
        });
        spacer(header, 1, true);
        tag(header, client.status === 'ACTIVE' ? 'Scheduled' : 'Needs setup', client.status === 'ACTIVE' ? 'brand' : 'warning', {
            size: 'sm'
        });
        text(payoutCard, dateLabel(client.nextPaymentDate), {
            size: 26,
            lineHeight: 32,
            weight: 'bold',
            color: colors.ink,
            width: 328,
            fill: false
        });
        text(payoutCard, money(client.revenue), {
            token: 'h3',
            weight: 'semibold',
            color: colors.cobaltText,
            width: 328,
            fill: false
        });
        const meta = hstack('Payout meta', { width: 328, height: 18, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        payoutCard.appendChild(meta);
        text(meta, `${formatNumber(client.employeeCount)} employees`, {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        text(meta, `Funding ${money(client.fundingBalance)}`, {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        text(payoutCard, `Commission ${client.commissionPct}% · ${client.bank} ${client.accountMasked}`, {
            token: 'caption',
            color: colors.muted,
            width: 328,
            fill: false
        });
        return row;
    }
    function clientTxCell(tx) {
        var _a;
        return {
            text: tx.type === 'WITHDRAW' ? 'Withdrawal' : 'Payroll funding',
            sub: `${tx.ref}${tx.operator ? ` · ${tx.operator} ${(_a = tx.destinationMasked) !== null && _a !== void 0 ? _a : ''}` : ''}`
        };
    }
    function clientLedgerCard(client) {
        const card = vstack('Client ledger card', {
            width: screen.contentWidth,
            height: 517,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md,
            clip: true
        });
        const all = clientTransactions(client.id);
        const rows = all.slice(0, 7);
        cardTitleBar(card, {
            width: screen.contentWidth,
            title: 'Transactions',
            subtitle: 'Funding and employee payouts',
            icon: 'transactions',
            action: 'Download CSV',
            actionIcon: 'download'
        });
        const toolbar = filterBar(card);
        segmented(toolbar, ['All', 'Withdrawals', 'Funding'], 0);
        spacer(toolbar, 1, true);
        filterButton(toolbar, 'Last 30 days', { icon: 'calendar' });
        filterButton(toolbar, 'All employees', { icon: 'users' });
        const columns = [
            { key: 'date', label: 'DATE', width: 140 },
            { key: 'transaction', label: 'TRANSACTION', width: 280 },
            { key: 'employee', label: 'EMPLOYEE', width: 200 },
            { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
            { key: 'fee', label: 'FEE', width: 96, type: 'money', align: 'RIGHT' },
            { key: 'status', label: 'STATUS', width: 92, type: 'status', align: 'RIGHT' },
            { key: 'more', label: '', width: 124, type: 'action', align: 'RIGHT' }
        ];
        const tableRows = rows.map((tx) => ({
            date: dateTimeLabel(tx.date),
            transaction: clientTxCell(tx),
            employee: { text: tx.actorName, sub: tx.employeeId ? 'Employee' : 'Employer treasury' },
            amount: { text: money(tx.amount), color: tx.type === 'DEPOSIT' ? colors.success : colors.ink },
            fee: { text: money(tx.fee), color: colors.muted },
            status: { text: statusLabel(tx.status), status: tx.status },
            more: { text: '' }
        }));
        dataTable(card, { width: screen.contentWidth, columns, rows: tableRows, rowHeight: 47 });
        tableFooter(card, {
            width: screen.contentWidth,
            shown: `Showing 1–${rows.length} of ${all.length} transactions`,
            current: 1,
            pages: Math.max(1, Math.ceil(all.length / 7))
        });
        return card;
    }
    function clientFormBody(body, client) {
        const form = vstack('Client form', {
            width: 744,
            height: 740,
            padding: 24,
            gap: 13,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        body.appendChild(form);
        formSectionTitle(form, 'Company', 'Legal and commercial details', 696);
        fieldRow(form, {
            label: 'Client name',
            value: client === null || client === void 0 ? void 0 : client.name,
            placeholder: 'e.g. Penda Logistics',
            icon: 'clients',
            required: true
        }, {
            label: 'Industry',
            value: client === null || client === void 0 ? void 0 : client.industry,
            placeholder: 'e.g. Freight & logistics',
            required: true
        });
        fieldRow(form, {
            label: 'Tax ID',
            value: client === null || client === void 0 ? void 0 : client.taxId,
            placeholder: 'e.g. M0801224587',
            icon: 'file'
        }, {
            label: 'Client commission',
            value: client ? `${client.commissionPct}%` : undefined,
            placeholder: 'e.g. 2.5%',
            required: true
        });
        formSectionTitle(form, 'Primary contact & address', 'Used for billing and account recovery', 696);
        fieldRow(form, {
            label: 'Account email',
            value: client === null || client === void 0 ? void 0 : client.email,
            placeholder: 'finance@company.cm',
            icon: 'mail',
            required: true
        }, {
            label: 'Primary phone',
            value: client === null || client === void 0 ? void 0 : client.phone,
            placeholder: '+237 6 00 00 00 00',
            icon: 'phone',
            required: true
        });
        fieldRow(form, {
            label: 'Secondary phone',
            placeholder: '+237 6 00 00 00 00',
            icon: 'phone'
        }, {
            label: 'Street',
            value: client === null || client === void 0 ? void 0 : client.street,
            placeholder: 'Street address',
            icon: 'mapPin'
        });
        fieldRow(form, {
            label: 'City',
            value: client === null || client === void 0 ? void 0 : client.city,
            placeholder: 'City'
        }, {
            label: 'Region',
            value: client === null || client === void 0 ? void 0 : client.region,
            placeholder: 'Select region',
            variant: 'select'
        });
        formSectionTitle(form, 'Funding & access', 'The employer funds payouts before each run', 696);
        fieldRow(form, {
            label: 'Next payment date',
            value: client ? dateLabel(client.nextPaymentDate) : undefined,
            placeholder: 'DD/MM/YYYY',
            icon: 'calendar'
        }, {
            label: 'Settlement bank',
            value: client === null || client === void 0 ? void 0 : client.bank,
            placeholder: 'Select bank account',
            variant: 'select',
            required: true
        });
        fieldRow(form, {
            label: 'Bank account number',
            value: client === null || client === void 0 ? void 0 : client.accountMasked,
            placeholder: 'Account number',
            icon: 'bank',
            required: true
        }, null);
        const footer = hstack('Form footer', { width: 696, height: 22, gap: 8, fill: null, align: 'CENTER' });
        form.appendChild(footer);
        icon(footer, 'mail', colors.cobaltText, 13);
        text(footer, client
            ? 'Access is unchanged. Use “Reset access” to send a new sign-in link.'
            : 'The primary contact receives a secure setup invitation by email.', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        if (client) {
            const helper = vstack('Client helper', {
                width: 368,
                height: 740,
                padding: 24,
                gap: 14,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(helper);
            const identity = hstack('Client helper identity', { width: 320, height: 44, gap: 10, fill: null, align: 'CENTER' });
            helper.appendChild(identity);
            clientTitlePrefix(client)(identity);
            const copy = vstack('Client helper copy', { gap: 1, fill: null, width: 270 });
            identity.appendChild(copy);
            text(copy, client.name, {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 270,
                fill: false
            });
            text(copy, `${formatNumber(client.employeeCount)} employees · ${client.city}`, {
                token: 'caption',
                color: colors.muted,
                width: 270,
                fill: false
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Account health', { width: 320, icon: 'shieldCheck' });
            keyValueRow(helper, 'KYC & tax details', 'Verified', { width: 320 });
            keyValueRow(helper, 'Funding source', `${client.bank} ${client.accountMasked}`, { width: 320 });
            keyValueRow(helper, 'Next payout', dateLabel(client.nextPaymentDate), { width: 320 });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Access', { width: 320, icon: 'key' });
            button(helper, 'Reset client access', { width: 320, variant: 'secondary', icon: 'mail' });
            text(helper, 'A password is never displayed or created by an administrator.', {
                token: 'caption',
                color: colors.muted,
                width: 320,
                fill: false
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Danger zone', { width: 320, icon: 'alert' });
            infoBanner(helper, {
                title: 'Deactivation pauses all payouts',
                body: 'The workforce and billing history remain available.',
                tone: 'warning',
                width: 320
            });
            spacer(helper, 1, true);
            button(helper, 'Deactivate client', { width: 320, variant: 'danger', icon: 'pause' });
        }
        else {
            const helper = vstack('New client helper', {
                width: 368,
                height: 740,
                padding: 24,
                gap: 16,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(helper);
            sectionHeader(helper, 'Onboarding path', { width: 320, icon: 'sparkle' });
            [
                { number: '1', title: 'Company details', body: 'Identity, tax ID and commission terms.' },
                { number: '2', title: 'Funding account', body: 'The employer funds payouts before the first run.' },
                { number: '3', title: 'Secure invitation', body: 'The primary contact sets a password and signs in.' }
            ].forEach((step) => {
                const row = hstack('Onboarding step', { width: 320, height: 64, gap: 10, fill: null, align: 'MIN' });
                helper.appendChild(row);
                const number = hstack('Step number', {
                    width: 26,
                    height: 26,
                    fill: colors.cobaltSoft,
                    radius: 999,
                    justify: 'CENTER',
                    align: 'CENTER'
                });
                row.appendChild(number);
                text(number, step.number, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.cobaltText,
                    align: 'CENTER',
                    width: 26,
                    fill: false
                });
                const content = vstack('Step copy', { width: 284, gap: 2, fill: null });
                row.appendChild(content);
                text(content, step.title, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    width: 284,
                    fill: false
                });
                text(content, step.body, {
                    token: 'caption',
                    color: colors.muted,
                    width: 284,
                    fill: false
                });
            });
            horizontalRule(helper, 320);
            const invite = vstack('Invitation card', {
                width: 320,
                gap: 8,
                padding: 16,
                fill: colors.cobaltSoft,
                radius: radii.md
            });
            helper.appendChild(invite);
            const inviteHeader = hstack('Invitation header', { width: 288, height: 20, gap: 7, fill: null, align: 'CENTER' });
            invite.appendChild(inviteHeader);
            icon(inviteHeader, 'lock', colors.cobaltText, 15);
            text(inviteHeader, 'Replacing raw passwords', {
                token: 'caption',
                weight: 'semibold',
                color: colors.cobaltText,
                fill: false,
                hug: true
            });
            text(invite, 'This design uses an email invitation. Admin-created passwords are not shown and require a small backend change.', {
                token: 'caption',
                color: colors.inkSoft,
                width: 288,
                fill: false
            });
            button(invite, 'Send invitation on create', {
                width: 288,
                variant: 'primary',
                icon: 'mail',
                disabled: true
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Funding requirement', { width: 320, icon: 'bank' });
            keyValueRow(helper, 'First payout needs', 'Funded balance', { width: 320 });
            keyValueRow(helper, 'Minimum notice', '2 business days', { width: 320 });
            spacer(helper, 1, true);
            text(helper, 'Commission terms are locked after creation. Commercial changes require a super-admin override.', {
                token: 'caption',
                color: colors.muted,
                width: 320,
                fill: false
            });
        }
    }
    function C01Clients() {
        return appScreen({
            nav: 'clients',
            breadcrumbs: ['AirliPay', 'Operations', 'Clients'],
            title: 'Clients',
            subtitle: '18 live employers · XAF 46.6M covered this pay cycle · 4 payouts scheduled.',
            actions: (row) => {
                button(row, 'Export', { variant: 'secondary', icon: 'download', compact: true });
                button(row, 'Add client', { variant: 'primary', icon: 'plus', compact: true });
            }
        }, (body) => {
            const stats = hstack('Client stats', {
                width: screen.contentWidth,
                height: 76,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(stats);
            miniStat(stats, {
                label: 'Active employers',
                value: '18',
                icon: 'clients',
                tone: 'brand',
                footnote: '+2 this quarter',
                width: 365
            });
            miniStat(stats, {
                label: 'Employees covered',
                value: '12,482',
                icon: 'users',
                tone: 'success',
                footnote: '+3.2%',
                width: 365
            });
            miniStat(stats, {
                label: 'Next scheduled payout',
                value: 'XAF 12.84M',
                icon: 'send',
                tone: 'info',
                footnote: '28 Oct',
                width: 365
            });
            const filters = filterBar(body);
            searchField(filters, { width: 300, placeholder: 'Search clients, contact or tax ID' });
            filterButton(filters, 'All industries', { icon: 'briefcase' });
            filterButton(filters, 'Status', { icon: 'filter' });
            spacer(filters, 1, true);
            filterButton(filters, 'Sort: Payout date', { icon: 'calendar' });
            const main = hstack('Client content', {
                width: screen.contentWidth,
                height: 584,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(main);
            const tableCard = vstack('Client table card', {
                width: 776,
                height: 584,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            main.appendChild(tableCard);
            cardTitleBar(tableCard, {
                width: 776,
                title: 'Employer portfolio',
                subtitle: '6 shown',
                icon: 'clients',
                action: 'Columns',
                actionIcon: 'sliders'
            });
            const columns = [
                { key: 'client', label: 'CLIENT', width: 280, type: 'identity' },
                { key: 'industry', label: 'INDUSTRY', width: 156 },
                { key: 'employees', label: 'EMPLOYEES', width: 96, type: 'money', align: 'RIGHT' },
                { key: 'payout', label: 'NEXT PAYOUT', width: 124 },
                { key: 'status', label: 'STATUS', width: 80, type: 'status', align: 'RIGHT' }
            ];
            const rows = clients.map((client) => ({
                client: {
                    text: client.name,
                    sub: `${client.city} · ${client.manager}`,
                    initials: client.monogram,
                    avatarTone: client.status === 'BLOCKED' ? 'error' : client.status === 'PENDING' ? 'warning' : 'brand'
                },
                industry: { text: client.industry },
                employees: { text: formatNumber(client.employeeCount), color: colors.inkSoft },
                payout: { text: dateLabel(client.nextPaymentDate), sub: money(client.revenue) },
                status: { text: statusLabel(client.status), status: client.status }
            }));
            dataTable(tableCard, { width: 776, columns, rows, rowHeight: 64, selectedIndex: 0 });
            const portfolio = hstack('Portfolio note', {
                width: 776,
                height: 56,
                paddingX: 20,
                gap: 8,
                fill: colors.surfaceSunken,
                align: 'CENTER'
            });
            tableCard.appendChild(portfolio);
            icon(portfolio, 'invoices', colors.cobaltText, 15);
            const portfolioStats = invoiceStats();
            text(portfolio, `XAF ${(invoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0) / 1000000).toFixed(2)}M invoiced`, {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            spacer(portfolio, 1, true);
            text(portfolio, `${portfolioStats.outstandingCount} invoices outstanding`, {
                token: 'caption',
                color: colors.warning,
                fill: false,
                hug: true
            });
            tableFooter(tableCard, {
                width: 776,
                shown: '6 of 18 clients',
                current: 1,
                pages: 3
            });
            const inspector = vstack('Client inspector', {
                width: 336,
                height: 584,
                padding: 20,
                gap: 10,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            main.appendChild(inspector);
            const header = hstack('Client inspector header', { width: 296, height: 44, gap: 10, fill: null, align: 'CENTER' });
            inspector.appendChild(header);
            clientTitlePrefix(selectedClient)(header);
            const identity = vstack('Client inspector identity', { gap: 1, fill: null, width: 208 });
            header.appendChild(identity);
            text(identity, selectedClient.name, {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 208,
                fill: false
            });
            text(identity, selectedClient.industry, {
                token: 'caption',
                color: colors.muted,
                width: 208,
                fill: false
            });
            statusPill(header, selectedClient.status, { size: 'sm' });
            horizontalRule(inspector, 296);
            const funding = vstack('Client funding', {
                width: 296,
                height: 88,
                padding: 12,
                gap: 3,
                fill: colors.cobaltSoft,
                radius: radii.sm
            });
            inspector.appendChild(funding);
            text(funding, 'AVAILABLE FUNDING', {
                token: 'eyebrow',
                color: colors.cobaltText,
                width: 272,
                fill: false
            });
            text(funding, money(selectedClient.fundingBalance), {
                token: 'h3',
                weight: 'bold',
                color: colors.ink,
                width: 272,
                fill: false
            });
            text(funding, `Covers ${formatNumber(selectedClient.employeeCount)} employees`, {
                token: 'caption',
                color: colors.muted,
                width: 272,
                fill: false
            });
            keyValueRow(inspector, 'Next payout', dateLabel(selectedClient.nextPaymentDate), { width: 296 });
            keyValueRow(inspector, 'Projected amount', money(selectedClient.revenue), { width: 296 });
            keyValueRow(inspector, 'Account manager', selectedClient.manager, { width: 296 });
            keyValueRow(inspector, 'Settlement account', `Afriland · ${selectedClient.accountMasked}`, {
                width: 296
            });
            horizontalRule(inspector, 296);
            const invoiceHeader = hstack('Invoice history header', {
                width: 296,
                height: 22,
                fill: null,
                justify: 'SPACE_BETWEEN',
                align: 'CENTER'
            });
            inspector.appendChild(invoiceHeader);
            text(invoiceHeader, 'Latest invoice', {
                token: 'bodySmall',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            text(invoiceHeader, 'View all', {
                token: 'caption',
                weight: 'semibold',
                color: colors.cobaltText,
                fill: false,
                hug: true
            });
            const invoice = invoices.find((item) => item.clientId === selectedClient.id);
            if (invoice) {
                const row = hstack('Latest invoice row', { width: 296, height: 50, gap: 8, fill: null, align: 'CENTER' });
                inspector.appendChild(row);
                iconTile(row, 'invoices', { tone: 'brand', size: 28, iconSize: 14 });
                const copy = vstack('Invoice copy', { gap: 1, fill: null });
                row.appendChild(copy);
                setFillWidth(copy);
                text(copy, invoice.number, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    fill: false
                });
                text(copy, `${money(invoice.totalAmount)} · ${dateLabel(invoice.issuedDate)}`, {
                    token: 'caption',
                    color: colors.muted,
                    fill: false
                });
                statusPill(row, invoice.status, { size: 'sm' });
            }
            spacer(inspector, 1, true);
            button(inspector, 'Open client', { width: 296, variant: 'primary', trailingIcon: 'arrowRight' });
            button(inspector, 'View payouts', { width: 296, variant: 'secondary', icon: 'send' });
        });
    }
    function C02NewClient() {
        return appScreen({
            nav: 'clients',
            breadcrumbs: ['Clients', 'New client'],
            title: 'New client',
            subtitle: 'Onboard an employer and connect the account that funds payroll.',
            actions: (row) => {
                button(row, 'Cancel', { variant: 'ghost' });
                button(row, 'Create client', { variant: 'primary', icon: 'plus' });
            }
        }, (body) => {
            const layout = hstack('Client form layout', {
                width: screen.contentWidth,
                height: 740,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(layout);
            clientFormBody(layout);
        });
    }
    function C03ClientProfile() {
        return appScreen(clientPageOptions(selectedClient, 'transactions'), (body) => {
            clientSnapshot(body, selectedClient);
            body.appendChild(clientLedgerCard(selectedClient));
        });
    }
    function C04ClientRoster() {
        return appScreen(clientPageOptions(selectedClient, 'roster'), (body) => {
            const stats = hstack('Roster stats', {
                width: screen.contentWidth,
                height: 76,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(stats);
            miniStat(stats, {
                label: 'Workforce',
                value: formatNumber(selectedClient.employeeCount),
                icon: 'users',
                tone: 'brand',
                footnote: `${selectedClient.city}`,
                width: 365
            });
            miniStat(stats, {
                label: 'Active employees',
                value: '1,806',
                icon: 'checkCircle',
                tone: 'success',
                footnote: '98.0%',
                width: 365
            });
            miniStat(stats, {
                label: 'Payout account missing',
                value: '22',
                icon: 'alert',
                tone: 'warning',
                footnote: 'needs action',
                width: 365
            });
            const filters = filterBar(body);
            searchField(filters, { width: 300, placeholder: 'Search employee name or ID' });
            filterButton(filters, 'All statuses', { icon: 'filter' });
            filterButton(filters, 'Payout channel', { icon: 'phone' });
            spacer(filters, 1, true);
            button(filters, 'Import roster', { variant: 'secondary', icon: 'upload', compact: true });
            button(filters, 'Add employee', { variant: 'primary', icon: 'plus', compact: true });
            const card = vstack('Roster card', {
                width: screen.contentWidth,
                height: 537,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            body.appendChild(card);
            cardTitleBar(card, {
                width: screen.contentWidth,
                title: 'Workforce roster',
                subtitle: '6 shown',
                icon: 'users',
                action: 'Download CSV',
                actionIcon: 'download'
            });
            const columns = [
                { key: 'employee', label: 'EMPLOYEE', width: 290, type: 'identity' },
                { key: 'employeeId', label: 'EMPLOYEE ID', width: 150 },
                { key: 'payout', label: 'PAYOUT DESTINATION', width: 220 },
                { key: 'salary', label: 'BASE SALARY', width: 140, type: 'money', align: 'RIGHT' },
                { key: 'wallet', label: 'WALLET', width: 160, type: 'money', align: 'RIGHT' },
                { key: 'status', label: 'STATUS', width: 128, type: 'status', align: 'RIGHT' }
            ];
            const roster = clientRoster(selectedClient.id);
            const rows = roster.map((employee) => ({
                employee: {
                    text: employee.name,
                    sub: employee.email,
                    initials: employee.initials,
                    avatarTone: employee.status === 'PENDING' ? 'warning' : employee.status === 'DEACTIVATED' ? 'neutral' : 'brand'
                },
                employeeId: { text: employee.employeeId },
                payout: { text: `${employee.operator} ${employee.momoMasked}`, sub: employee.bank },
                salary: { text: money(employee.baseSalary) },
                wallet: { text: money(employee.balance) },
                status: { text: statusLabel(employee.status), status: employee.status }
            }));
            dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 56 });
            const note = hstack('Roster note', {
                width: screen.contentWidth,
                height: 40,
                paddingX: 20,
                gap: 7,
                fill: colors.surfaceSunken,
                align: 'CENTER'
            });
            card.appendChild(note);
            icon(note, 'info', colors.muted, 14);
            text(note, 'Roster actions must write to the employee record, never the client record. The current implementation sends the wrong resource.', {
                token: 'caption',
                color: colors.warning,
                fill: false,
                hug: true
            });
            tableFooter(card, {
                width: screen.contentWidth,
                shown: `6 of ${formatNumber(selectedClient.employeeCount)} employees`,
                current: 1,
                pages: 307
            });
        });
    }
    function C05ClientFunding() {
        return appScreen(clientPageOptions(selectedClient, 'funding'), (body) => {
            clientSnapshot(body, selectedClient);
            const card = vstack('Funding accounts card', {
                width: screen.contentWidth,
                height: 517,
                padding: 20,
                gap: 16,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(card);
            const header = sectionHeader(card, 'Funding accounts', {
                width: 1088,
                subtitle: 'Employer money in, employee payouts out',
                icon: 'bank'
            });
            tag(header, 'Fixture surface', 'warning', { icon: 'alert', size: 'sm' });
            const accountRow = hstack('Funding account cards', {
                width: 1088,
                height: 150,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            card.appendChild(accountRow);
            const banks = [
                { name: 'Afriland First Bank', masked: '•••• 4821', balance: selectedClient.fundingBalance, label: 'Primary funding' },
                { name: 'Ecobank Cameroon', masked: '•••• 7740', balance: 0, label: 'Backup funding' },
                { name: 'BICEC', masked: '•••• 1108', balance: 0, label: 'Verification pending' }
            ];
            banks.forEach((bank, index) => {
                const tile = vstack('Funding account', {
                    width: 352,
                    height: 150,
                    padding: 16,
                    gap: 5,
                    fill: index === 0 ? colors.cobaltSoft : colors.surfaceSunken,
                    stroke: index === 0 ? colors.cobalt : colors.border,
                    radius: radii.md
                });
                accountRow.appendChild(tile);
                const top = hstack('Funding top', { width: 320, height: 28, fill: null, align: 'CENTER' });
                tile.appendChild(top);
                iconTile(top, 'bank', { tone: index === 0 ? 'brand' : 'neutral', size: 28, iconSize: 14 });
                const copy = vstack('Funding copy', { gap: 0, fill: null, width: 200 });
                top.appendChild(copy);
                text(copy, bank.name, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    width: 200,
                    fill: false
                });
                text(copy, bank.label, {
                    token: 'caption',
                    color: colors.muted,
                    width: 200,
                    fill: false
                });
                spacer(top, 1, true);
                statusPill(top, index === 2 ? 'PENDING' : 'VERIFIED', { size: 'sm' });
                text(tile, bank.masked, {
                    size: 22,
                    lineHeight: 28,
                    weight: 'bold',
                    color: colors.ink,
                    width: 320,
                    fill: false
                });
                text(tile, index === 0 ? money(bank.balance) : 'No balance yet', {
                    token: 'caption',
                    color: index === 0 ? colors.cobaltText : colors.muted,
                    width: 320,
                    fill: false
                });
                if (index === 0) {
                    tag(tile, 'Primary', 'brand', { size: 'sm' });
                }
            });
            const lower = hstack('Funding lower', {
                width: 1088,
                height: 174,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            card.appendChild(lower);
            const schedule = vstack('Settlement schedule', {
                width: 536,
                height: 174,
                padding: 16,
                gap: 8,
                fill: colors.surfaceSunken,
                radius: radii.md
            });
            lower.appendChild(schedule);
            text(schedule, 'Settlement schedule', {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 504,
                fill: false
            });
            keyValueRow(schedule, 'Next payout', dateLabel(selectedClient.nextPaymentDate), { width: 504 });
            keyValueRow(schedule, 'Projected amount', money(selectedClient.revenue), { width: 504 });
            keyValueRow(schedule, 'Funding close', '27 Oct 2026 · 16:00', { width: 504 });
            progressBar(schedule, 78, { width: 504, height: 6, color: colors.mint });
            const verification = vstack('Funding verification', {
                width: 536,
                height: 174,
                padding: 16,
                gap: 8,
                fill: colors.warningSoft,
                radius: radii.md
            });
            lower.appendChild(verification);
            const verificationHeader = hstack('Verification header', { width: 504, height: 20, gap: 7, fill: null, align: 'CENTER' });
            verification.appendChild(verificationHeader);
            icon(verificationHeader, 'alert', colors.warning, 15);
            text(verificationHeader, 'Fixture surface · needs API', {
                token: 'caption',
                weight: 'semibold',
                color: colors.warning,
                fill: false,
                hug: true
            });
            text(verification, 'Client bank accounts are randomly generated today. A dedicated client-bank model, verification state and funding webhook are required before this screen can ship.', {
                token: 'caption',
                color: colors.inkSoft,
                width: 504,
                fill: false
            });
            button(verification, 'Read data contract', { variant: 'ghost', compact: true, trailingIcon: 'external' });
            spacer(verification, 1, true);
            tag(verification, 'Read-only in v1', 'neutral', { size: 'sm' });
            const actionRow = hstack('Funding actions', {
                width: 1088,
                height: 38,
                gap: 8,
                fill: null,
                align: 'CENTER'
            });
            card.appendChild(actionRow);
            button(actionRow, 'Add funding account', { variant: 'secondary', icon: 'plus' });
            button(actionRow, 'Set primary account', { variant: 'ghost', icon: 'checkCircle' });
            spacer(actionRow, 1, true);
        });
    }
    function C06PaymentHistory() {
        return appScreen(clientPageOptions(selectedClient, 'history'), (body) => {
            clientSnapshot(body, selectedClient);
            const card = vstack('Payment history card', {
                width: screen.contentWidth,
                height: 517,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            body.appendChild(card);
            cardTitleBar(card, {
                width: screen.contentWidth,
                title: 'Payment history',
                subtitle: 'Invoices and billing periods',
                icon: 'invoices',
                action: 'Export history',
                actionIcon: 'download'
            });
            const toolbar = filterBar(card);
            segmented(toolbar, ['All invoices', 'Treated', 'Outstanding'], 0);
            spacer(toolbar, 1, true);
            filterButton(toolbar, '2026', { icon: 'calendar' });
            filterButton(toolbar, 'All statuses', { icon: 'filter' });
            const pendaInvoices = invoices.filter((invoice) => invoice.clientId === selectedClient.id);
            const columns = [
                { key: 'invoice', label: 'INVOICE', width: 240 },
                { key: 'period', label: 'PERIOD', width: 240 },
                { key: 'amount', label: 'AMOUNT', width: 160, type: 'money', align: 'RIGHT' },
                { key: 'status', label: 'STATUS', width: 160, type: 'status' },
                { key: 'due', label: 'DUE DATE', width: 140 },
                { key: 'action', label: '', width: 148, type: 'action', align: 'RIGHT' }
            ];
            const rows = pendaInvoices.map((invoice) => ({
                invoice: { text: invoice.number, sub: invoice.reference, strong: true },
                period: { text: `${dateLabel(invoice.periodFrom)} – ${dateLabel(invoice.periodTo)}` },
                amount: { text: money(invoice.totalAmount) },
                status: { text: statusLabel(invoice.status), status: invoice.status },
                due: { text: dateLabel(invoice.dueDate) },
                action: { text: '' }
            }));
            dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 69 });
            const summary = hstack('Payment summary strip', {
                width: screen.contentWidth,
                height: 56,
                paddingX: 20,
                gap: 8,
                fill: colors.surfaceSunken,
                align: 'CENTER'
            });
            card.appendChild(summary);
            icon(summary, 'invoices', colors.cobaltText, 15);
            const total = pendaInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);
            text(summary, `Lifetime invoiced ${money(total)}`, {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            spacer(summary, 1, true);
            statusPill(summary, 'TREATED', { tone: 'success', label: `${pendaInvoices.filter((invoice) => invoice.status === 'TREATED').length} treated`, size: 'sm' });
            text(summary, 'Status writes must target the invoice resource', {
                token: 'caption',
                color: colors.warning,
                fill: false,
                hug: true
            });
            tableFooter(card, {
                width: screen.contentWidth,
                shown: `${pendaInvoices.length} invoices`,
                current: 1,
                pages: 1
            });
        });
    }
    function C07ClientPayouts() {
        return appScreen({
            nav: 'clients',
            breadcrumbs: ['Clients', 'Client payouts'],
            title: 'Client payouts',
            subtitle: 'Legacy payment schedule mapped to the redesigned employer payout view.',
            actions: (row) => {
                button(row, 'Export schedule', { variant: 'secondary', icon: 'download' });
                button(row, 'Review funding', { variant: 'primary', icon: 'send' });
            }
        }, (body) => {
            fixtureNotice(body, 'LEGACY FIXTURE', screen.contentWidth);
            const stats = hstack('Payout stats', {
                width: screen.contentWidth,
                height: 76,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(stats);
            miniStat(stats, {
                label: 'Scheduled this week',
                value: 'XAF 12.84M',
                icon: 'send',
                tone: 'brand',
                footnote: '28 Oct',
                width: 365
            });
            miniStat(stats, {
                label: 'Funded employers',
                value: '4 of 6',
                icon: 'checkCircle',
                tone: 'success',
                footnote: 'ready to run',
                width: 365
            });
            miniStat(stats, {
                label: 'Funding gaps',
                value: 'XAF 3.28M',
                icon: 'alert',
                tone: 'warning',
                footnote: '2 employers',
                width: 365
            });
            const filters = filterBar(body);
            searchField(filters, { width: 300, placeholder: 'Search employer or payout' });
            filterButton(filters, 'All pay dates', { icon: 'calendar' });
            filterButton(filters, 'Funding status', { icon: 'filter' });
            spacer(filters, 1, true);
            segmented(filters, ['Week', 'Month'], 0);
            const card = vstack('Payout schedule card', {
                width: screen.contentWidth,
                height: 532,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            body.appendChild(card);
            cardTitleBar(card, {
                width: screen.contentWidth,
                title: 'Payment schedule',
                subtitle: 'Next pay cycle · 28 Oct–02 Nov',
                icon: 'calendar',
                action: 'Open payments',
                actionIcon: 'chevronRight'
            });
            const columns = [
                { key: 'date', label: 'PAY DATE', width: 140 },
                { key: 'client', label: 'CLIENT', width: 250, type: 'identity' },
                { key: 'period', label: 'PERIOD ENDING', width: 140 },
                { key: 'employees', label: 'EMPLOYEES', width: 120, type: 'money', align: 'RIGHT' },
                { key: 'amount', label: 'AMOUNT', width: 160, type: 'money', align: 'RIGHT' },
                { key: 'funding', label: 'FUNDING', width: 150, type: 'status' },
                { key: 'action', label: '', width: 128, type: 'action', align: 'RIGHT' }
            ];
            const rows = clients.map((client) => {
                const funded = client.fundingBalance >= client.revenue && client.revenue > 0;
                const fundingLabel = client.status === 'BLOCKED' ? 'At risk' : funded ? 'Funded' : 'Awaiting funding';
                const fundingTone = client.status === 'BLOCKED' ? 'error' : funded ? 'success' : 'warning';
                return {
                    date: { text: dateLabel(client.nextPaymentDate) },
                    client: {
                        text: client.name,
                        sub: client.industry,
                        initials: client.monogram,
                        avatarTone: fundableTone(client)
                    },
                    period: { text: '27 Oct 2026' },
                    employees: { text: formatNumber(client.employeeCount) },
                    amount: { text: money(client.revenue) },
                    funding: {
                        text: fundingLabel,
                        status: funded ? 'FUNDED' : 'AWAITING',
                        tone: fundingTone
                    },
                    action: { text: '' }
                };
            });
            dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 64 });
            tableFooter(card, {
                width: screen.contentWidth,
                shown: '6 of 18 client payouts',
                current: 1,
                pages: 3
            });
        });
    }
    function fundableTone(client) {
        if (client.status === 'BLOCKED') {
            return 'error';
        }
        if (client.status === 'PENDING') {
            return 'warning';
        }
        return 'brand';
    }
    function C08EditClient() {
        return appScreen({
            nav: 'clients',
            breadcrumbs: ['Clients', selectedClient.name, 'Edit'],
            title: 'Edit client',
            subtitle: `Update ${selectedClient.name}'s company, contact and funding details.`,
            actions: (row) => {
                button(row, 'Cancel', { variant: 'ghost' });
                button(row, 'Save changes', { variant: 'primary', icon: 'check' });
            }
        }, (body) => {
            const layout = hstack('Edit client layout', {
                width: screen.contentWidth,
                height: 740,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(layout);
            clientFormBody(layout, selectedClient);
        });
    }

    const selectedAdmin = admins[1];
    function adminPageOptions(admin) {
        return {
            nav: 'team',
            breadcrumbs: ['Team & access', admin.name],
            title: admin.name,
            titlePrefix: adminTitlePrefix(admin),
            titleAddon: (row) => statusPill(row, admin.status, { size: 'sm' }),
            subtitle: `${admin.role} · ${admin.focus} · ${admin.email}`,
            actions: (row) => {
                button(row, 'Edit admin', { variant: 'secondary', icon: 'edit' });
                iconButton(row, 'more', { size: 38, stroke: colors.border, background: colors.surface });
            }
        };
    }
    function roleCard(parent, opts) {
        const node = vstack(`Role · ${opts.name}`, {
            width: 296,
            gap: 6,
            padding: 14,
            fill: colors.surfaceSunken,
            stroke: colors.border,
            radius: radii.sm
        });
        parent.appendChild(node);
        const top = hstack('Role header', { width: 268, height: 22, fill: null, align: 'CENTER' });
        node.appendChild(top);
        text(top, opts.name, {
            token: 'caption',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        spacer(top, 1, true);
        tag(top, opts.count, opts.tone, { size: 'sm' });
        text(node, opts.description, {
            token: 'caption',
            color: colors.muted,
            width: 268,
            fill: false
        });
        return node;
    }
    function adminFormBody(body, admin) {
        const form = vstack('Admin form', {
            width: 744,
            height: 740,
            padding: 24,
            gap: 13,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        body.appendChild(form);
        formSectionTitle(form, 'Identity & access', 'Who they are and what they can reach', 696);
        fieldRow(form, {
            label: 'Full name',
            value: admin === null || admin === void 0 ? void 0 : admin.name,
            placeholder: 'e.g. Jude Ekema',
            icon: 'profile',
            required: true
        }, {
            label: 'Work email',
            value: admin === null || admin === void 0 ? void 0 : admin.email,
            placeholder: 'name@airlipay.cm',
            icon: 'mail',
            required: true
        });
        fieldRow(form, {
            label: 'Role',
            value: admin === null || admin === void 0 ? void 0 : admin.role,
            placeholder: 'Select role',
            variant: 'select',
            required: true
        }, {
            label: 'Workspace focus',
            value: admin === null || admin === void 0 ? void 0 : admin.focus,
            placeholder: 'Select focus',
            variant: 'select',
            required: true
        });
        formSectionTitle(form, 'Contact & address', 'Used for recovery and audit records', 696);
        fieldRow(form, {
            label: 'Primary phone',
            value: admin === null || admin === void 0 ? void 0 : admin.phone,
            placeholder: '+237 6 00 00 00 00',
            icon: 'phone',
            required: true
        }, {
            label: 'Secondary phone',
            placeholder: '+237 6 00 00 00 00',
            icon: 'phone'
        });
        fieldRow(form, {
            label: 'Street',
            value: admin === null || admin === void 0 ? void 0 : admin.street,
            placeholder: 'Street address',
            icon: 'mapPin'
        }, {
            label: 'City',
            value: admin === null || admin === void 0 ? void 0 : admin.city,
            placeholder: 'City'
        });
        fieldRow(form, {
            label: 'Region',
            value: admin === null || admin === void 0 ? void 0 : admin.region,
            placeholder: 'Select region',
            variant: 'select'
        }, null);
        formSectionTitle(form, 'Invitation', 'The admin receives a secure setup link', 696);
        const invite = hstack('Invitation note', {
            width: 696,
            height: 84,
            padding: 14,
            gap: 10,
            fill: colors.cobaltSoft,
            radius: radii.sm,
            align: 'CENTER'
        });
        form.appendChild(invite);
        iconTile(invite, 'mail', { tone: 'brand', size: 32, iconSize: 16 });
        const inviteCopy = vstack('Invitation copy', { gap: 2, fill: null, width: 598 });
        invite.appendChild(inviteCopy);
        text(inviteCopy, admin ? 'Send a new sign-in link' : 'Send an invitation email', {
            token: 'caption',
            weight: 'semibold',
            color: colors.ink,
            width: 598,
            fill: false
        });
        text(inviteCopy, admin
            ? 'The current password is never exposed. A reset link expires after 30 minutes.'
            : 'No password is created by the administrator. The link expires after 48 hours and requires 2FA setup.', {
            token: 'caption',
            color: colors.muted,
            width: 598,
            fill: false
        });
        const note = hstack('Form note', { width: 696, height: 18, gap: 7, fill: null, align: 'CENTER' });
        form.appendChild(note);
        icon(note, 'info', colors.mutedLight, 13);
        text(note, 'Granular roles are a proposed extension. Today the backend exposes a numeric admin role.', {
            token: 'caption',
            color: colors.muted,
            fill: false,
            hug: true
        });
        if (admin) {
            const helper = vstack('Admin helper', {
                width: 368,
                height: 740,
                padding: 24,
                gap: 14,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(helper);
            const identity = hstack('Admin helper identity', { width: 320, height: 44, gap: 10, fill: null, align: 'CENTER' });
            helper.appendChild(identity);
            avatar(identity, admin.initials, { size: 40 });
            const copy = vstack('Admin helper copy', { gap: 1, fill: null, width: 270 });
            identity.appendChild(copy);
            text(copy, admin.name, {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 270,
                fill: false
            });
            text(copy, `${admin.role} · ${admin.focus}`, {
                token: 'caption',
                color: colors.muted,
                width: 270,
                fill: false
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Account', { width: 320, icon: 'shieldCheck' });
            keyValueRow(helper, 'Last active', admin.lastActive, { width: 320 });
            keyValueRow(helper, '2FA', admin.twoFactor ? 'Enabled' : 'Not enabled', { width: 320 });
            keyValueRow(helper, 'Member since', admin.joined, { width: 320 });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Access', { width: 320, icon: 'key' });
            button(helper, 'Reset admin access', { width: 320, variant: 'secondary', icon: 'mail' });
            button(helper, 'View audit log', { width: 320, variant: 'ghost', icon: 'activity' });
            text(helper, 'Access changes are logged and notify the super admin.', {
                token: 'caption',
                color: colors.muted,
                width: 320,
                fill: false
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Danger zone', { width: 320, icon: 'alert' });
            infoBanner(helper, {
                title: 'Removing an admin revokes access immediately',
                body: 'Their audit history is retained.',
                tone: 'warning',
                width: 320
            });
            spacer(helper, 1, true);
            button(helper, 'Remove from team', { width: 320, variant: 'danger', icon: 'logout' });
        }
        else {
            const helper = vstack('Invite helper', {
                width: 368,
                height: 740,
                padding: 24,
                gap: 16,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            body.appendChild(helper);
            sectionHeader(helper, 'Invitation preview', { width: 320, icon: 'mail' });
            const emailPreview = vstack('Email preview', {
                width: 320,
                gap: 10,
                padding: 16,
                fill: colors.surfaceSunken,
                stroke: colors.border,
                radius: radii.md
            });
            helper.appendChild(emailPreview);
            const previewHeader = hstack('Email preview header', { width: 288, height: 24, gap: 8, fill: null, align: 'CENTER' });
            emailPreview.appendChild(previewHeader);
            iconTile(previewHeader, 'sparkle', { tone: 'brand', size: 24, iconSize: 12 });
            text(previewHeader, 'AirliPay Operations', {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            text(emailPreview, 'You have been invited to the AirliPay operations console.', {
                token: 'caption',
                color: colors.inkSoft,
                width: 288,
                fill: false
            });
            button(emailPreview, 'Set up my account', {
                width: 288,
                variant: 'primary',
                disabled: true
            });
            text(emailPreview, 'Preview · this button is disabled in the design.', {
                token: 'caption',
                color: colors.mutedLight,
                width: 288,
                fill: false
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Security requirements', { width: 320, icon: 'lock' });
            ['Two-factor authentication is required.', 'Sessions expire after 30 minutes of inactivity.', 'Every action is written to the audit log.'].forEach((line) => {
                const row = hstack('Security line', { width: 320, height: 28, gap: 7, fill: null, align: 'CENTER' });
                helper.appendChild(row);
                icon(row, 'checkCircle', colors.success, 13);
                text(row, line, {
                    token: 'caption',
                    color: colors.muted,
                    width: 294,
                    fill: false
                });
            });
            horizontalRule(helper, 320);
            sectionHeader(helper, 'Onboarding check', { width: 320, icon: 'key' });
            keyValueRow(helper, 'Invitation channel', 'Email', { width: 320 });
            keyValueRow(helper, 'Expires', '48 hours', { width: 320 });
            keyValueRow(helper, 'First action', 'Enable 2FA', { width: 320 });
            spacer(helper, 1, true);
            tag(helper, 'No raw password field', 'success', { icon: 'shieldCheck', size: 'sm' });
        }
    }
    function D01Team() {
        return appScreen({
            nav: 'team',
            breadcrumbs: ['AirliPay', 'Operations', 'Team & access'],
            title: 'Team & access',
            subtitle: '4 administrators · 3 with two-factor enabled · 1 pending invitation.',
            actions: (row) => {
                button(row, 'Audit log', { variant: 'secondary', icon: 'activity' });
                button(row, 'Invite admin', { variant: 'primary', icon: 'plus' });
            }
        }, (body) => {
            const stats = hstack('Team stats', { width: screen.contentWidth, height: 76, gap: 16, fill: null, align: 'CENTER' });
            body.appendChild(stats);
            miniStat(stats, { label: 'Administrators', value: '4', icon: 'team', tone: 'brand', footnote: '2 roles', width: 365 });
            miniStat(stats, { label: 'Two-factor enabled', value: '3 of 4', icon: 'shieldCheck', tone: 'success', footnote: '75%', width: 365 });
            miniStat(stats, { label: 'Pending invitations', value: '1', icon: 'mail', tone: 'warning', footnote: '48h expiry', width: 365 });
            const filters = filterBar(body);
            searchField(filters, { width: 300, placeholder: 'Search name, email or role' });
            filterButton(filters, 'All roles', { icon: 'key' });
            filterButton(filters, 'Status', { icon: 'filter' });
            spacer(filters, 1, true);
            segmented(filters, ['Table', 'Activity'], 0);
            const main = hstack('Team content', {
                width: screen.contentWidth,
                height: 584,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(main);
            const tableCard = vstack('Team table card', {
                width: 776,
                height: 584,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            main.appendChild(tableCard);
            cardTitleBar(tableCard, {
                width: 776,
                title: 'Administrators',
                subtitle: '4 members',
                icon: 'team',
                action: 'Manage roles',
                actionIcon: 'sliders'
            });
            const columns = [
                { key: 'member', label: 'MEMBER', width: 300, type: 'identity' },
                { key: 'role', label: 'ACCESS', width: 140 },
                { key: 'active', label: 'LAST ACTIVE', width: 160 },
                { key: 'status', label: 'STATUS', width: 136, type: 'status', align: 'RIGHT' }
            ];
            const rows = admins.map((admin) => ({
                member: {
                    text: admin.name,
                    sub: admin.email,
                    initials: admin.initials,
                    avatarTone: admin.status === 'PENDING' ? 'warning' : 'brand'
                },
                role: { text: admin.role, sub: admin.focus },
                active: { text: admin.lastActive },
                status: { text: statusLabel(admin.status), status: admin.status }
            }));
            dataTable(tableCard, { width: 776, columns, rows, rowHeight: 64, selectedIndex: 1 });
            const coverage = vstack('Role coverage', {
                width: 776,
                height: 168,
                gap: 12,
                padding: 16,
                fill: colors.surfaceSunken
            });
            tableCard.appendChild(coverage);
            const coverageTitle = hstack('Role coverage title', { width: 744, height: 20, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
            coverage.appendChild(coverageTitle);
            text(coverageTitle, 'Access coverage', {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            tag(coverageTitle, 'Proposed role model', 'brand', { size: 'sm' });
            const coverageRow = hstack('Coverage row', { width: 744, height: 36, gap: 20, fill: null, align: 'CENTER' });
            coverage.appendChild(coverageRow);
            [
                { label: 'Super admin', value: 1, pct: 25 },
                { label: 'Admin', value: 3, pct: 75 },
                { label: 'Finance access', value: 1, pct: 25 },
                { label: 'Support access', value: 1, pct: 25 }
            ].forEach((item) => {
                const col = vstack('Coverage metric', { gap: 5, fill: null, width: 168 });
                coverageRow.appendChild(col);
                const row = hstack('Coverage label', { width: 168, fill: null, align: 'CENTER' });
                col.appendChild(row);
                text(row, item.label, {
                    token: 'caption',
                    color: colors.muted,
                    fill: false,
                    hug: true
                });
                spacer(row, 1, true);
                text(row, String(item.value), {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    fill: false,
                    hug: true
                });
                progressBar(col, item.pct, { width: 168, height: 4, color: colors.cobalt });
            });
            horizontalRule(coverage, 744);
            const pending = hstack('Pending invitation', { width: 744, height: 26, gap: 8, fill: null, align: 'CENTER' });
            coverage.appendChild(pending);
            icon(pending, 'mail', colors.warning, 14);
            text(pending, 'Claudia Mbah has a pending invitation · expires in 36 hours', {
                token: 'caption',
                color: colors.muted,
                fill: false,
                hug: true
            });
            spacer(pending, 1, true);
            button(pending, 'Resend', { variant: 'ghost', compact: true, trailingIcon: 'send' });
            tableFooter(tableCard, {
                width: 776,
                shown: '4 administrators',
                current: 1,
                pages: 1
            });
            const inspector = vstack('Access model', {
                width: 336,
                height: 584,
                padding: 20,
                gap: 12,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            main.appendChild(inspector);
            const title = hstack('Access model title', { width: 296, height: 24, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
            inspector.appendChild(title);
            text(title, 'Access model', {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            tag(title, 'Proposal', 'brand', { size: 'sm' });
            roleCard(inspector, {
                name: 'Super admin',
                description: 'Full workspace access, billing and role changes.',
                count: '1 person',
                tone: 'brand'
            });
            roleCard(inspector, {
                name: 'Finance admin',
                description: 'Payout runs, invoices and reconciliation.',
                count: '1 person',
                tone: 'success'
            });
            roleCard(inspector, {
                name: 'Operations admin',
                description: 'Clients, employees, payouts and support cases.',
                count: '2 people',
                tone: 'neutral'
            });
            horizontalRule(inspector, 296);
            text(inspector, 'The current backend only stores a numeric admin role. Granular roles and 2FA state are a proposed access model for implementation.', {
                token: 'caption',
                color: colors.muted,
                width: 296,
                fill: false
            });
            spacer(inspector, 1, true);
            button(inspector, 'Review permission matrix', {
                width: 296,
                variant: 'secondary',
                trailingIcon: 'arrowRight'
            });
        });
    }
    function D02InviteAdmin() {
        return appScreen({
            nav: 'team',
            breadcrumbs: ['Team & access', 'Invite admin'],
            title: 'Invite admin',
            subtitle: 'Invite a staff member to the AirliPay operations console. No password is created here.',
            actions: (row) => {
                button(row, 'Cancel', { variant: 'ghost' });
                button(row, 'Send invitation', { variant: 'primary', icon: 'send' });
            }
        }, (body) => {
            const layout = hstack('Admin form layout', {
                width: screen.contentWidth,
                height: 740,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(layout);
            adminFormBody(layout);
        });
    }
    function adminEvents(admin) {
        return [
            {
                title: 'Signed in to operations',
                detail: `${admin.city}, CM · Chrome`,
                date: admin.lastActive,
                tone: 'success'
            },
            {
                title: 'Approved payout run RUN-2026-1021',
                detail: 'XAF 11.62M · 1,148 employees',
                date: '21 Oct 2026 · 17:02',
                tone: 'info'
            },
            {
                title: 'Updated invoice INV-2026-1039',
                detail: 'Marked as treated',
                date: '20 Oct 2026 · 14:36',
                tone: 'info'
            },
            {
                title: 'Changed 2FA method',
                detail: 'Authenticator app verified',
                date: '18 Oct 2026 · 09:14',
                tone: 'success'
            },
            {
                title: 'Invitation accepted',
                detail: 'Security policy and access reviewed',
                date: admin.activated,
                tone: 'neutral'
            }
        ];
    }
    function D03AdminProfile() {
        return appScreen(adminPageOptions(selectedAdmin), (body) => {
            const top = hstack('Admin snapshot', {
                width: screen.contentWidth,
                height: 156,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(top);
            const details = vstack('Admin details card', {
                width: 744,
                height: 156,
                padding: 20,
                gap: 12,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            top.appendChild(details);
            const labelRow = hstack('Admin details header', {
                width: 704,
                height: 18,
                fill: null,
                justify: 'SPACE_BETWEEN',
                align: 'CENTER'
            });
            details.appendChild(labelRow);
            text(labelRow, 'ADMIN & CONTACT', {
                token: 'eyebrow',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            tag(labelRow, 'UI gap resolved', 'warning', { icon: 'alert', size: 'sm' });
            const detailsData = [
                { label: 'Email', value: selectedAdmin.email },
                { label: 'Phone', value: selectedAdmin.phone },
                { label: 'Joined', value: selectedAdmin.joined },
                { label: 'Activated', value: selectedAdmin.activated },
                { label: 'Location', value: `${selectedAdmin.city}, ${selectedAdmin.region}` },
                { label: 'Last active', value: selectedAdmin.lastActive }
            ];
            const widths = [232, 216, 208];
            const gridWrap = vstack('Admin field rows', { width: 704, gap: 10, fill: null });
            details.appendChild(gridWrap);
            for (let rowIndex = 0; rowIndex < 2; rowIndex += 1) {
                const row = hstack('Admin field row', { width: 704, gap: 24, fill: null, align: 'MIN' });
                gridWrap.appendChild(row);
                for (let colIndex = 0; colIndex < 3; colIndex += 1) {
                    const item = detailsData[rowIndex * 3 + colIndex];
                    const cell = vstack('Admin field', { width: widths[colIndex], gap: 2, fill: null });
                    row.appendChild(cell);
                    text(cell, item.label.toUpperCase(), {
                        token: 'micro',
                        weight: 'semibold',
                        color: colors.mutedLight,
                        width: widths[colIndex],
                        fill: false
                    });
                    text(cell, item.value, {
                        token: 'bodySmall',
                        weight: 'medium',
                        color: colors.ink,
                        width: widths[colIndex],
                        fill: false
                    });
                }
            }
            const access = vstack('Admin access card', {
                width: 368,
                height: 156,
                padding: 20,
                gap: 5,
                fill: colors.cobaltSoft,
                radius: radii.md
            });
            top.appendChild(access);
            const accessHeader = hstack('Access header', { width: 328, height: 18, fill: null, align: 'CENTER' });
            access.appendChild(accessHeader);
            icon(accessHeader, 'key', colors.cobaltText, 15);
            text(accessHeader, 'ACCESS', {
                token: 'eyebrow',
                color: colors.cobaltText,
                fill: false,
                hug: true
            });
            text(access, selectedAdmin.role, {
                size: 26,
                lineHeight: 32,
                weight: 'bold',
                color: colors.ink,
                width: 328,
                fill: false
            });
            text(access, `${selectedAdmin.focus} · workspace access`, {
                token: 'bodySmall',
                color: colors.muted,
                width: 328,
                fill: false
            });
            const accessMeta = hstack('Access meta', { width: 328, height: 24, gap: 6, fill: null, align: 'CENTER' });
            access.appendChild(accessMeta);
            statusPill(accessMeta, selectedAdmin.status, { size: 'sm' });
            tag(accessMeta, selectedAdmin.twoFactor ? '2FA enabled' : '2FA missing', selectedAdmin.twoFactor ? 'success' : 'warning', {
                icon: 'shieldCheck',
                size: 'sm'
            });
            const lower = hstack('Admin lower', {
                width: screen.contentWidth,
                height: 568,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(lower);
            const timelineCard = vstack('Admin activity card', {
                width: 744,
                height: 568,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            lower.appendChild(timelineCard);
            cardTitleBar(timelineCard, {
                width: 744,
                title: 'Recent admin activity',
                subtitle: 'Last 30 days',
                icon: 'activity',
                action: 'Open audit log',
                actionIcon: 'external'
            });
            adminEvents(selectedAdmin).forEach((event, index) => {
                const row = hstack('Admin event', {
                    width: 744,
                    height: 84,
                    gap: 12,
                    paddingX: 20,
                    fill: null,
                    align: 'CENTER'
                });
                timelineCard.appendChild(row);
                iconTile(row, event.tone === 'success' ? 'checkCircle' : event.tone === 'info' ? 'activity' : 'key', {
                    tone: event.tone === 'success' ? 'success' : event.tone === 'info' ? 'brand' : 'neutral',
                    size: 30,
                    iconSize: 15
                });
                const copy = vstack('Event copy', { gap: 2, fill: null, width: 468 });
                row.appendChild(copy);
                text(copy, event.title, {
                    token: 'caption',
                    weight: 'semibold',
                    color: colors.ink,
                    width: 468,
                    fill: false
                });
                text(copy, event.detail, {
                    token: 'caption',
                    color: colors.muted,
                    width: 468,
                    fill: false
                });
                spacer(row, 1, true);
                text(row, event.date, {
                    token: 'caption',
                    color: colors.mutedLight,
                    align: 'RIGHT',
                    width: 180,
                    fill: false
                });
                if (index < adminEvents(selectedAdmin).length - 1) {
                    horizontalRule(timelineCard, 744);
                }
            });
            const auditNote = hstack('Audit note', {
                width: 744,
                height: 42,
                paddingX: 20,
                gap: 7,
                fill: colors.surfaceSunken,
                align: 'CENTER'
            });
            timelineCard.appendChild(auditNote);
            icon(auditNote, 'info', colors.muted, 14);
            text(auditNote, 'Audit events are illustrative until an admin audit endpoint exists. The page itself is currently blank.', {
                token: 'caption',
                color: colors.warning,
                fill: false,
                hug: true
            });
            const right = vstack('Admin permissions card', {
                width: 368,
                height: 568,
                padding: 20,
                gap: 8,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            lower.appendChild(right);
            sectionHeader(right, 'Permissions', { width: 328, icon: 'shieldCheck' });
            const permissions = [
                { label: 'Payout runs', value: 'Approve', pct: 100 },
                { label: 'Invoices', value: 'Manage', pct: 100 },
                { label: 'Employees', value: 'View', pct: 55 },
                { label: 'Team access', value: 'None', pct: 0 }
            ];
            permissions.forEach((permission) => {
                const group = vstack('Permission group', { width: 328, gap: 4, fill: null });
                right.appendChild(group);
                const row = hstack('Permission row', { width: 328, height: 22, fill: null, align: 'CENTER' });
                group.appendChild(row);
                text(row, permission.label, {
                    token: 'caption',
                    color: colors.inkSoft,
                    fill: false,
                    hug: true
                });
                spacer(row, 1, true);
                text(row, permission.value, {
                    token: 'caption',
                    weight: 'semibold',
                    color: permission.value === 'None' ? colors.mutedLight : colors.ink,
                    fill: false,
                    hug: true
                });
                progressBar(group, permission.pct, { width: 328, height: 4, color: colors.cobalt });
            });
            horizontalRule(right, 328);
            sectionHeader(right, 'Session', { width: 328, icon: 'globe' });
            keyValueRow(right, 'Device', 'MacBook Pro · Chrome', { width: 328 });
            keyValueRow(right, 'Location', `${selectedAdmin.city}, CM`, { width: 328 });
            keyValueRow(right, 'Signed in', selectedAdmin.lastActive, { width: 328 });
            spacer(right, 1, true);
            infoBanner(right, {
                title: 'Proposed role model',
                body: 'The API stores a numeric role.',
                tone: 'warning',
                width: 328
            });
            button(right, 'Review access', { width: 328, variant: 'secondary', icon: 'key' });
        });
    }
    function D04EditAdmin() {
        return appScreen({
            nav: 'team',
            breadcrumbs: ['Team & access', selectedAdmin.name, 'Edit'],
            title: 'Edit admin',
            subtitle: `Update ${selectedAdmin.name}'s identity, access and contact details.`,
            actions: (row) => {
                button(row, 'Cancel', { variant: 'ghost' });
                button(row, 'Save changes', { variant: 'primary', icon: 'check' });
            }
        }, (body) => {
            const layout = hstack('Edit admin layout', {
                width: screen.contentWidth,
                height: 740,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(layout);
            adminFormBody(layout, selectedAdmin);
        });
    }

    const selectedInvoice = invoices[0];
    function txTypeLabel(tx) {
        return tx.type === 'WITHDRAW' ? 'Withdrawal' : 'Payroll funding';
    }
    function E01Transactions() {
        const withdrawals = transactions.filter((tx) => tx.type === 'WITHDRAW');
        const deposits = transactions.filter((tx) => tx.type === 'DEPOSIT');
        const withdrawalsTotal = withdrawals.reduce((sum, tx) => sum + tx.amount, 0);
        const depositsTotal = deposits.reduce((sum, tx) => sum + tx.amount, 0);
        const failed = withdrawals.filter((tx) => tx.status === 'FAILED').length;
        return appScreen({
            nav: 'transactions',
            breadcrumbs: ['AirliPay', 'Operations', 'Transactions'],
            title: 'Transactions ledger',
            subtitle: 'Every funding movement and employee payout in one auditable ledger.',
            actions: (row) => {
                button(row, 'Export CSV', { variant: 'secondary', icon: 'download' });
            }
        }, (body) => {
            const stats = hstack('Ledger stats', {
                width: screen.contentWidth,
                height: 76,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(stats);
            miniStat(stats, {
                label: 'Employer funding',
                value: money(depositsTotal),
                icon: 'arrowDownLeft',
                tone: 'success',
                footnote: `${deposits.length} deposits`,
                width: 365
            });
            miniStat(stats, {
                label: 'Employee payouts',
                value: money(withdrawalsTotal),
                icon: 'arrowUpRight',
                tone: 'brand',
                footnote: `${withdrawals.length} withdrawals`,
                width: 365
            });
            miniStat(stats, {
                label: 'Failed withdrawals',
                value: String(failed),
                icon: 'alert',
                tone: failed > 0 ? 'error' : 'success',
                footnote: 'needs review',
                width: 365
            });
            const toolbar = filterBar(body);
            searchField(toolbar, { width: 300, placeholder: 'Search reference, employee or phone' });
            segmented(toolbar, ['All', 'Withdrawals', 'Funding'], 0);
            filterButton(toolbar, '23 Oct 2026', { icon: 'calendar' });
            filterButton(toolbar, 'All employers', { icon: 'clients' });
            filterButton(toolbar, 'Status', { icon: 'filter' });
            spacer(toolbar, 1, true);
            text(toolbar, 'Updated live', {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            const card = vstack('Transactions card', {
                width: screen.contentWidth,
                height: 588,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            body.appendChild(card);
            cardTitleBar(card, {
                width: screen.contentWidth,
                title: 'All transactions',
                subtitle: `${transactions.length} in this sample`,
                icon: 'transactions',
                action: 'Download CSV',
                actionIcon: 'download'
            });
            const columns = [
                { key: 'date', label: 'DATE', width: 140 },
                { key: 'transaction', label: 'TRANSACTION', width: 260 },
                { key: 'employee', label: 'EMPLOYEE', width: 200 },
                { key: 'employer', label: 'EMPLOYER', width: 150 },
                { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
                { key: 'status', label: 'STATUS', width: 100, type: 'status', align: 'RIGHT' },
                { key: 'more', label: '', width: 98, type: 'action', align: 'RIGHT' }
            ];
            const rows = transactions.slice(0, 7).map((tx) => {
                var _a, _b, _c;
                return ({
                    date: { text: dateTimeLabel(tx.date).split(' · ')[0], sub: tx.date.slice(11, 16) },
                    transaction: {
                        text: txTypeLabel(tx),
                        sub: `${tx.ref}${tx.operator ? ` · ${tx.operator} ${(_a = tx.destinationMasked) !== null && _a !== void 0 ? _a : ''}` : ''}`
                    },
                    employee: {
                        text: tx.actorName,
                        sub: tx.employeeId ? ((_c = (_b = employeeRef(tx.employeeId)) === null || _b === void 0 ? void 0 : _b.employeeId) !== null && _c !== void 0 ? _c : tx.employeeId) : 'Treasury account'
                    },
                    employer: { text: clientName(tx.clientId) },
                    amount: { text: money(tx.amount), color: tx.type === 'DEPOSIT' ? colors.success : colors.ink },
                    status: { text: statusLabel(tx.status), status: tx.status },
                    more: { text: '' }
                });
            });
            dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 60 });
            tableFooter(card, {
                width: screen.contentWidth,
                shown: `Showing 1–7 of ${transactions.length} transactions`,
                current: 1,
                pages: 3
            });
        });
    }
    function E02Invoices() {
        const stats = invoiceStats();
        return appScreen({
            nav: 'invoices',
            breadcrumbs: ['AirliPay', 'Operations', 'Invoices'],
            title: 'Invoices',
            subtitle: 'Reimbursement invoices generated from employee early-wage activity.',
            actions: (row) => {
                button(row, 'Export', { variant: 'secondary', icon: 'download' });
            }
        }, (body) => {
            const statRow = hstack('Invoice stats', {
                width: screen.contentWidth,
                height: 76,
                gap: 16,
                fill: null,
                align: 'CENTER'
            });
            body.appendChild(statRow);
            miniStat(statRow, {
                label: 'Outstanding',
                value: compactMoney(stats.outstandingAmount),
                icon: 'invoices',
                tone: 'warning',
                footnote: `${stats.outstandingCount} invoices`,
                width: 365
            });
            miniStat(statRow, {
                label: 'Treated this period',
                value: compactMoney(stats.treatedAmount),
                icon: 'checkCircle',
                tone: 'success',
                footnote: `${stats.treatedCount} invoices`,
                width: 365
            });
            miniStat(statRow, {
                label: 'Awaiting client confirmation',
                value: String(stats.awaitingConfirmation),
                icon: 'clock',
                tone: 'brand',
                footnote: '1 employer',
                width: 365
            });
            const toolbar = filterBar(body);
            searchField(toolbar, { width: 300, placeholder: 'Search invoice number or client' });
            segmented(toolbar, ['All', 'Treated', 'Outstanding'], 0);
            filterButton(toolbar, 'All clients', { icon: 'clients' });
            filterButton(toolbar, '2026', { icon: 'calendar' });
            spacer(toolbar, 1, true);
            text(toolbar, 'Status writes stay on the invoice resource', {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            const card = vstack('Invoice table card', {
                width: screen.contentWidth,
                height: 584,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            body.appendChild(card);
            cardTitleBar(card, {
                width: screen.contentWidth,
                title: 'Invoices',
                subtitle: `${invoices.length} in this year`,
                icon: 'invoices',
                action: 'Download all',
                actionIcon: 'download'
            });
            const columns = [
                { key: 'invoice', label: 'INVOICE', width: 220 },
                { key: 'client', label: 'CLIENT', width: 230 },
                { key: 'period', label: 'PERIOD', width: 210 },
                { key: 'amount', label: 'TOTAL AMOUNT', width: 160, type: 'money', align: 'RIGHT' },
                { key: 'status', label: 'STATUS', width: 140, type: 'status' },
                { key: 'due', label: 'DUE DATE', width: 128 }
            ];
            const rows = invoices.slice(0, 7).map((invoice) => ({
                invoice: {
                    text: invoice.number,
                    sub: invoice.reference,
                    strong: true
                },
                client: {
                    text: clientName(invoice.clientId),
                    sub: invoice.employeeCount + ' employees'
                },
                period: { text: `${shortDate(invoice.periodFrom)} – ${shortDate(invoice.periodTo)} 2026` },
                amount: { text: money(invoice.totalAmount) },
                status: {
                    text: invoice.status === 'PENDING_CONFIRMATION'
                        ? 'Pending'
                        : invoice.status === 'NOT_TREATED'
                            ? 'Not treated'
                            : 'Treated',
                    status: invoice.status
                },
                due: { text: dateLabel(invoice.dueDate) }
            }));
            dataTable(card, { width: screen.contentWidth, columns, rows, rowHeight: 57, selectedIndex: 0 });
            const summary = hstack('Invoice summary', {
                width: screen.contentWidth,
                height: 44,
                paddingX: 20,
                gap: 8,
                fill: colors.surfaceSunken,
                align: 'CENTER'
            });
            card.appendChild(summary);
            icon(summary, 'info', colors.cobaltText, 14);
            text(summary, `${stats.outstandingCount} invoices await action · ${stats.notTreated} not treated, ${stats.awaitingConfirmation} pending confirmation`, {
                token: 'caption',
                color: colors.inkSoft,
                fill: false,
                hug: true
            });
            spacer(summary, 1, true);
            text(summary, 'Overview “paid / unpaid” are metrics, not invoice statuses', {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            tableFooter(card, {
                width: screen.contentWidth,
                shown: `Showing 1–7 of ${invoices.length} invoices`,
                current: 1,
                pages: 2
            });
        });
    }
    function invoiceLineRow(parent, label, amount, opts = {}) {
        var _a;
        const width = (_a = opts.width) !== null && _a !== void 0 ? _a : 688;
        const row = hstack('Invoice line', {
            width,
            height: opts.header ? 22 : 28,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        parent.appendChild(row);
        text(row, label, {
            token: opts.header ? 'micro' : 'caption',
            weight: opts.header || opts.strong ? 'semibold' : 'regular',
            color: opts.header ? colors.mutedLight : colors.ink,
            fill: false,
            hug: true
        });
        text(row, amount, {
            token: opts.header ? 'micro' : 'caption',
            weight: opts.header || opts.strong ? 'semibold' : 'regular',
            color: opts.header ? colors.mutedLight : colors.ink,
            fill: false,
            hug: true
        });
    }
    function invoiceStatusCard(parent, invoice) {
        var _a, _b;
        const card = vstack('Invoice status card', {
            width: 368,
            height: 258,
            padding: 20,
            gap: 10,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        parent.appendChild(card);
        const header = hstack('Status header', { width: 328, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        card.appendChild(header);
        text(header, 'Invoice status', {
            token: 'bodyStrong',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        statusPill(header, invoice.status, { size: 'sm' });
        const stamp = hstack('Status stamp', {
            width: 328,
            height: 44,
            paddingX: 12,
            gap: 9,
            fill: colors.successSoft,
            radius: radii.sm,
            align: 'CENTER'
        });
        card.appendChild(stamp);
        icon(stamp, 'checkCircle', colors.success, 17);
        const stampCopy = vstack('Stamp copy', { gap: 1, fill: null });
        stamp.appendChild(stampCopy);
        setFillWidth(stampCopy);
        text(stampCopy, 'Reimbursement paid', {
            token: 'caption',
            weight: 'semibold',
            color: colors.success,
            fill: false
        });
        text(stampCopy, `Treated ${dateLabel((_a = invoice.paidAt) !== null && _a !== void 0 ? _a : invoice.dueDate)}`, {
            token: 'caption',
            color: colors.muted,
            fill: false
        });
        const timeline = vstack('Invoice timeline', { width: 328, gap: 4, fill: null });
        card.appendChild(timeline);
        [
            { label: 'Issued', date: dateLabel(invoice.issuedDate), done: true },
            { label: 'Sent to client', date: dateLabel(invoice.issuedDate), done: true },
            { label: 'Client confirmed', date: '21 Oct 2026', done: true },
            { label: 'Treated', date: dateLabel((_b = invoice.paidAt) !== null && _b !== void 0 ? _b : invoice.dueDate), done: true }
        ].forEach((step) => {
            const row = hstack('Timeline step', { width: 328, height: 22, gap: 8, fill: null, align: 'CENTER' });
            timeline.appendChild(row);
            const mark = frame('Step dot', {
                width: 8,
                height: 8,
                fill: step.done ? colors.success : colors.borderStrong,
                radius: 999
            });
            row.appendChild(mark);
            text(row, step.label, {
                token: 'caption',
                weight: 'medium',
                color: colors.ink,
                fill: false,
                hug: true
            });
            spacer(row, 1, true);
            text(row, step.date, {
                token: 'caption',
                color: colors.muted,
                fill: false,
                hug: true
            });
        });
        const footer = hstack('Invoice status footer', { width: 328, height: 18, gap: 6, fill: null, align: 'CENTER' });
        card.appendChild(footer);
        icon(footer, 'info', colors.mutedLight, 13);
        text(footer, 'Treated by Jude Ekema · 22 Oct 2026', {
            token: 'caption',
            color: colors.mutedLight,
            fill: false,
            hug: true
        });
    }
    function invoicePaymentCard(parent, invoice) {
        const card = vstack('Invoice payment card', {
            width: 368,
            height: 156,
            padding: 20,
            gap: 6,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        parent.appendChild(card);
        const header = hstack('Payment header', { width: 328, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        card.appendChild(header);
        text(header, 'Payment', {
            token: 'bodyStrong',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        tag(header, 'Settled', 'success', { size: 'sm' });
        keyValueRow(card, 'Amount', money(invoice.totalAmount), { width: 328, strong: true });
        keyValueRow(card, 'Method', 'Bank transfer · Afriland', { width: 328 });
        keyValueRow(card, 'Reference', invoice.reference, { width: 328 });
    }
    function invoiceTransactionsCard(parent, invoice) {
        const client = clientRef(invoice.clientId);
        const sample = client ? clientTransactions(client.id).filter((tx) => tx.type === 'WITHDRAW').slice(0, 2) : [];
        const card = vstack('Invoice transactions card', {
            width: 368,
            height: 243,
            padding: 20,
            gap: 8,
            fill: colors.surface,
            stroke: colors.border,
            radius: radii.md
        });
        parent.appendChild(card);
        const header = hstack('Included transactions header', { width: 328, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        card.appendChild(header);
        text(header, 'Included transactions', {
            token: 'bodyStrong',
            weight: 'semibold',
            color: colors.ink,
            fill: false,
            hug: true
        });
        tag(header, `${invoice.transactionCount} total`, 'brand', { size: 'sm' });
        text(card, `${invoice.employeeCount} employees · ${dateLabel(invoice.periodFrom)}–${dateLabel(invoice.periodTo)}`, {
            token: 'caption',
            color: colors.muted,
            width: 328,
            fill: false
        });
        sample.forEach((tx) => {
            const row = hstack('Invoice transaction sample', {
                width: 328,
                height: 34,
                gap: 8,
                fill: null,
                align: 'CENTER'
            });
            card.appendChild(row);
            iconTile(row, 'arrowUpRight', { tone: 'brand', size: 26, iconSize: 12 });
            const copy = vstack('Invoice transaction copy', { gap: 0, fill: null, width: 204 });
            row.appendChild(copy);
            text(copy, tx.actorName, {
                token: 'caption',
                weight: 'medium',
                color: colors.ink,
                fill: false
            });
            text(copy, `${shortDate(tx.date)} · ${tx.operator} ${tx.destinationMasked}`, {
                token: 'caption',
                color: colors.muted,
                fill: false
            });
            text(row, money(tx.amount), {
                token: 'caption',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
        });
        button(card, `Review all ${invoice.transactionCount}`, {
            width: 328,
            height: 34,
            variant: 'secondary',
            trailingIcon: 'arrowRight'
        });
        text(card, 'Samples shown. The invoice total is derived from the full period.', {
            token: 'caption',
            color: colors.mutedLight,
            width: 328,
            fill: false
        });
    }
    function E03InvoiceDetail() {
        var _a;
        const invoice = selectedInvoice;
        const client = clientRef(invoice.clientId);
        return appScreen({
            nav: 'invoices',
            breadcrumbs: ['Invoices', invoice.number],
            title: invoice.number,
            titleAddon: (row) => statusPill(row, invoice.status, { size: 'sm' }),
            subtitle: `${(_a = client === null || client === void 0 ? void 0 : client.name) !== null && _a !== void 0 ? _a : 'Client'} · ${dateLabel(invoice.periodFrom)} – ${dateLabel(invoice.periodTo)} · Due ${dateLabel(invoice.dueDate)}`,
            actions: (row) => {
                button(row, 'Download PDF', { variant: 'secondary', icon: 'download' });
                button(row, 'More actions', { variant: 'ghost', trailingIcon: 'chevronDown' });
            },
            tabs: invoiceTabs('summary')
        }, (body) => {
            var _a, _b, _c, _d, _e;
            const layout = hstack('Invoice detail layout', {
                width: screen.contentWidth,
                height: 689,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(layout);
            const document = vstack('Invoice document', {
                width: 744,
                height: 689,
                padding: 28,
                gap: 14,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            layout.appendChild(document);
            const header = hstack('Invoice header', { width: 688, height: 34, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
            document.appendChild(header);
            logoLockup(header, { width: 160, size: 26, markSize: 22, color: colors.ink });
            const headerMeta = vstack('Invoice header meta', { gap: 1, fill: null, align: 'MAX' });
            header.appendChild(headerMeta);
            text(headerMeta, 'INVOICE', {
                token: 'eyebrow',
                color: colors.mutedLight,
                align: 'RIGHT',
                width: 160,
                fill: false
            });
            text(headerMeta, invoice.number, {
                token: 'label',
                weight: 'semibold',
                color: colors.ink,
                align: 'RIGHT',
                width: 160,
                fill: false
            });
            const titleBlock = vstack('Invoice title block', { width: 688, gap: 3, fill: null });
            document.appendChild(titleBlock);
            text(titleBlock, 'Earned Wage Access Reimbursement Invoice', {
                token: 'h2',
                color: colors.ink,
                width: 688,
                fill: false
            });
            text(titleBlock, `Issued ${dateLabel(invoice.issuedDate)} · Payment terms ${dateLabel(invoice.dueDate)}`, {
                token: 'caption',
                color: colors.muted,
                width: 688,
                fill: false
            });
            horizontalRule(document, 688);
            const parties = hstack('Invoice parties', { width: 688, height: 82, gap: 40, fill: null, align: 'MIN' });
            document.appendChild(parties);
            const to = vstack('Invoice to', { width: 324, gap: 3, fill: null });
            parties.appendChild(to);
            text(to, 'TO', {
                token: 'eyebrow',
                color: colors.mutedLight,
                width: 324,
                fill: false
            });
            text(to, (_a = client === null || client === void 0 ? void 0 : client.name) !== null && _a !== void 0 ? _a : 'Client', {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 324,
                fill: false
            });
            text(to, `${(_b = client === null || client === void 0 ? void 0 : client.street) !== null && _b !== void 0 ? _b : ''}\n${(_c = client === null || client === void 0 ? void 0 : client.city) !== null && _c !== void 0 ? _c : ''}, ${(_d = client === null || client === void 0 ? void 0 : client.region) !== null && _d !== void 0 ? _d : ''}\nTax ID ${(_e = client === null || client === void 0 ? void 0 : client.taxId) !== null && _e !== void 0 ? _e : '—'}`, {
                token: 'caption',
                color: colors.muted,
                width: 324,
                fill: false
            });
            const from = vstack('Invoice from', { width: 324, gap: 3, fill: null });
            parties.appendChild(from);
            text(from, 'FROM', {
                token: 'eyebrow',
                color: colors.mutedLight,
                width: 324,
                fill: false
            });
            text(from, 'Techarcgram Company Limited', {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                width: 324,
                fill: false
            });
            text(from, 'Bakweri town, Buea\nSouthwest, Cameroon\nfinance@airlipay.cm', {
                token: 'caption',
                color: colors.muted,
                width: 324,
                fill: false
            });
            const summaryHeader = hstack('Summary header', { width: 688, height: 22, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
            document.appendChild(summaryHeader);
            text(summaryHeader, 'SUMMARY OF SERVICES', {
                token: 'eyebrow',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            text(summaryHeader, `${invoice.employeeCount} employees covered`, {
                token: 'caption',
                color: colors.muted,
                fill: false,
                hug: true
            });
            const box = vstack('Invoice line items', {
                width: 688,
                gap: 0,
                paddingX: 16,
                paddingTop: 10,
                paddingBottom: 10,
                fill: colors.surfaceSunken,
                radius: radii.sm
            });
            document.appendChild(box);
            invoiceLineRow(box, 'Description', 'Amount', { header: true, width: 656 });
            invoice.lineItems.forEach((item) => {
                invoiceLineRow(box, item.description, money(item.amount), { width: 656 });
            });
            invoiceLineRow(box, 'Total amount due', money(invoice.totalAmount), { strong: true, width: 656 });
            const totals = hstack('Invoice totals', { width: 688, height: 44, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
            document.appendChild(totals);
            const totalCopy = vstack('Invoice total copy', { gap: 1, fill: null });
            totals.appendChild(totalCopy);
            text(totalCopy, 'PAYMENT DUE', {
                token: 'eyebrow',
                color: colors.mutedLight,
                fill: false
            });
            text(totalCopy, dateLabel(invoice.dueDate), {
                token: 'bodySmall',
                weight: 'semibold',
                color: colors.ink,
                fill: false
            });
            text(totals, money(invoice.totalAmount), {
                size: 24,
                lineHeight: 30,
                weight: 'bold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            const terms = hstack('Invoice terms', { width: 688, height: 90, gap: 24, fill: null, align: 'MIN' });
            document.appendChild(terms);
            const payment = vstack('Payment details', { width: 324, gap: 3, fill: null });
            terms.appendChild(payment);
            text(payment, 'PAYMENT DETAILS', {
                token: 'eyebrow',
                color: colors.mutedLight,
                width: 324,
                fill: false
            });
            text(payment, 'Afriland First Bank · Douala\nAccount •••• 4821 · AirliPay SARL\nReference: ' + invoice.reference, {
                token: 'caption',
                color: colors.muted,
                width: 324,
                fill: false
            });
            const note = vstack('Invoice note', { width: 324, gap: 3, fill: null });
            terms.appendChild(note);
            text(note, 'NOTE', {
                token: 'eyebrow',
                color: colors.mutedLight,
                width: 324,
                fill: false
            });
            text(note, 'This invoice reflects early wage access advanced on behalf of the employer. Amounts include service fees and VAT. Quote the reference on payment.', {
                token: 'caption',
                color: colors.muted,
                width: 324,
                fill: false
            });
            const footer = hstack('Invoice footer', { width: 688, height: 28, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
            document.appendChild(footer);
            text(footer, 'Techarcgram Company Limited · RCCM/NIU registered', {
                token: 'caption',
                color: colors.mutedLight,
                fill: false,
                hug: true
            });
            text(footer, 'Thank you.', {
                token: 'caption',
                weight: 'semibold',
                color: colors.muted,
                fill: false,
                hug: true
            });
            const rail = vstack('Invoice rail', {
                width: 368,
                height: 689,
                gap: 16,
                fill: null
            });
            layout.appendChild(rail);
            invoiceStatusCard(rail, invoice);
            invoicePaymentCard(rail, invoice);
            invoiceTransactionsCard(rail, invoice);
        });
    }
    function featuredRunCard(parent) {
        const run = payRuns[0];
        const card = hstack('Featured payout run', {
            width: screen.contentWidth,
            height: 168,
            padding: 20,
            gap: 28,
            fill: colors.brandSurface,
            radius: radii.lg,
            align: 'CENTER'
        });
        parent.appendChild(card);
        const left = vstack('Featured run details', { width: 350, gap: 3, fill: null });
        card.appendChild(left);
        const eyebrow = hstack('Featured run eyebrow', { width: 350, height: 18, gap: 7, fill: null, align: 'CENTER' });
        left.appendChild(eyebrow);
        icon(eyebrow, 'calendar', colors.onBrandFaint, 14);
        text(eyebrow, 'NEXT PAYOUT RUN', {
            token: 'eyebrow',
            color: colors.mint,
            fill: false,
            hug: true
        });
        statusPill(eyebrow, run.status, { size: 'sm' });
        text(left, '28 October 2026 · 09:00', {
            token: 'bodySmall',
            color: colors.onBrandMuted,
            width: 350,
            fill: false
        });
        text(left, compactMoney(run.amount), {
            size: 32,
            lineHeight: 38,
            weight: 'bold',
            color: colors.onBrand,
            letterSpacing: -0.6,
            width: 350,
            fill: false
        });
        text(left, `${formatNumber(run.employeeCount)} employees · ${run.clientCount} clients`, {
            token: 'caption',
            color: colors.onBrandFaint,
            width: 350,
            fill: false
        });
        const middle = vstack('Featured run progress', { width: 380, gap: 8, fill: null });
        card.appendChild(middle);
        const progressLabel = hstack('Run funding label', { width: 380, height: 18, fill: null, align: 'CENTER' });
        middle.appendChild(progressLabel);
        text(progressLabel, 'Funding progress', {
            token: 'caption',
            color: colors.onBrandMuted,
            fill: false,
            hug: true
        });
        spacer(progressLabel, 1, true);
        text(progressLabel, `${run.fundedPct}%`, {
            token: 'caption',
            weight: 'semibold',
            color: colors.onBrand,
            fill: false,
            hug: true
        });
        progressBar(middle, run.fundedPct, {
            width: 380,
            height: 8,
            color: colors.mint,
            track: mix(colors.brandSurface, colors.onBrand, 0.14)
        });
        text(middle, run.note, {
            token: 'caption',
            color: colors.onBrandFaint,
            width: 380,
            fill: false
        });
        const steps = hstack('Run stage chips', { width: 380, height: 22, gap: 6, fill: null, align: 'CENTER' });
        middle.appendChild(steps);
        tag(steps, 'Funding', 'mint', { size: 'sm' });
        icon(steps, 'chevronRight', colors.onBrandFaint, 12);
        tag(steps, 'Validation', 'neutral', { size: 'sm' });
        icon(steps, 'chevronRight', colors.onBrandFaint, 12);
        tag(steps, 'Settlement', 'neutral', { size: 'sm' });
        const right = vstack('Featured run actions', { width: 274, gap: 8, fill: null });
        card.appendChild(right);
        button(right, 'Review payout run', {
            width: 274,
            variant: 'primary',
            trailingIcon: 'arrowRight'
        });
        button(right, 'View run workspace', {
            width: 274,
            variant: 'inverse',
            icon: 'database'
        });
        text(right, 'Proposed orchestration surface', {
            token: 'caption',
            color: colors.onBrandFaint,
            width: 274,
            fill: false
        });
    }
    function E04PayoutRuns() {
        return appScreen({
            nav: 'payments',
            breadcrumbs: ['AirliPay', 'Operations', 'Payments'],
            title: 'Payout runs',
            titleAddon: (row) => tag(row, 'PROPOSED', 'warning', { icon: 'sparkle', size: 'sm' }),
            subtitle: 'Orchestrate employer funding, validation and employee settlement in one run.',
            actions: (row) => {
                button(row, 'Export', { variant: 'secondary', icon: 'download' });
                button(row, 'New payout run', { variant: 'primary', icon: 'plus' });
            }
        }, (body) => {
            featuredRunCard(body);
            const lower = hstack('Payout runs lower', {
                width: screen.contentWidth,
                height: 556,
                gap: 16,
                fill: null,
                align: 'MIN'
            });
            body.appendChild(lower);
            const tableCard = vstack('Run history card', {
                width: 776,
                height: 556,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md,
                clip: true
            });
            lower.appendChild(tableCard);
            cardTitleBar(tableCard, {
                width: 776,
                title: 'Run history',
                subtitle: 'Last 5 runs',
                icon: 'send',
                action: 'View all',
                actionIcon: 'chevronRight'
            });
            const columns = [
                { key: 'run', label: 'RUN', width: 200 },
                { key: 'date', label: 'DATE', width: 110 },
                { key: 'employees', label: 'EMPLOYEES', width: 90, type: 'money', align: 'RIGHT' },
                { key: 'amount', label: 'AMOUNT', width: 140, type: 'money', align: 'RIGHT' },
                { key: 'status', label: 'STATUS', width: 120, type: 'status', align: 'RIGHT' },
                { key: 'more', label: '', width: 76, type: 'action', align: 'RIGHT' }
            ];
            const rows = payRuns.map((run) => ({
                run: { text: run.reference, sub: run.note, strong: true },
                date: { text: dateLabel(run.date) },
                employees: { text: formatNumber(run.employeeCount) },
                amount: { text: money(run.amount) },
                status: { text: run.status === 'NEEDS_ATTENTION' ? 'Attention' : statusLabel(run.status), status: run.status },
                more: { text: '' }
            }));
            dataTable(tableCard, { width: 776, columns, rows, rowHeight: 64 });
            const note = hstack('Run history note', {
                width: 776,
                height: 56,
                paddingX: 20,
                gap: 8,
                fill: colors.surfaceSunken,
                align: 'CENTER'
            });
            tableCard.appendChild(note);
            icon(note, 'alert', colors.warning, 15);
            text(note, '6 transfers failed in the 07 Oct run. Retry requires a new payout-run object.', {
                token: 'caption',
                color: colors.muted,
                fill: false,
                hug: true
            });
            spacer(note, 1, true);
            button(note, 'Open failure report', { variant: 'ghost', compact: true, trailingIcon: 'external' });
            tableFooter(tableCard, {
                width: 776,
                shown: '5 runs',
                current: 1,
                pages: 1
            });
            const checklist = vstack('Run checklist', {
                width: 336,
                height: 556,
                padding: 20,
                gap: 10,
                fill: colors.surface,
                stroke: colors.border,
                radius: radii.md
            });
            lower.appendChild(checklist);
            const title = hstack('Checklist title', { width: 296, height: 24, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
            checklist.appendChild(title);
            text(title, 'Run checklist', {
                token: 'bodyStrong',
                weight: 'semibold',
                color: colors.ink,
                fill: false,
                hug: true
            });
            tag(title, '28 Oct', 'brand', { size: 'sm' });
            const funding = vstack('Checklist funding', {
                width: 296,
                gap: 6,
                padding: 12,
                fill: colors.mintSoft,
                radius: radii.sm
            });
            checklist.appendChild(funding);
            const fundingRow = hstack('Funding label', { width: 272, height: 18, fill: null, align: 'CENTER' });
            funding.appendChild(fundingRow);
            text(fundingRow, 'Funded', {
                token: 'caption',
                color: colors.muted,
                fill: false,
                hug: true
            });
            spacer(fundingRow, 1, true);
            text(fundingRow, '78%', {
                token: 'caption',
                weight: 'semibold',
                color: colors.onMintSoft,
                fill: false,
                hug: true
            });
            progressBar(funding, 78, { width: 272, height: 6, color: colors.onMintSoft, track: mix(colors.mintSoft, colors.onMintSoft, 0.14) });
            text(funding, 'XAF 2.8M still required from 2 employers', {
                token: 'caption',
                color: colors.muted,
                width: 272,
                fill: false
            });
            [
                { label: 'Funding complete', detail: 'Due 27 Oct · 16:00' },
                { label: 'Validate destinations', detail: '14 accounts missing' },
                { label: 'Super-admin approval', detail: 'Nadège Mballa' },
                { label: 'Settlement', detail: '28 Oct · 09:00' }
            ].forEach((step) => {
                const row = hstack('Checklist step', { width: 296, height: 34, gap: 8, fill: null, align: 'CENTER' });
                checklist.appendChild(row);
                iconTile(row, 'clock', { tone: 'neutral', size: 24, iconSize: 12 });
                const copy = vstack('Checklist copy', { gap: 0, fill: null, width: 250 });
                row.appendChild(copy);
                text(copy, step.label, {
                    token: 'caption',
                    weight: 'medium',
                    color: colors.ink,
                    width: 250,
                    fill: false
                });
                text(copy, step.detail, {
                    token: 'caption',
                    color: colors.muted,
                    width: 250,
                    fill: false
                });
            });
            horizontalRule(checklist, 296);
            infoBanner(checklist, {
                title: 'New API required',
                body: 'The current payments page is a duplicate invoice list.',
                tone: 'warning',
                width: 296
            });
            spacer(checklist, 1, true);
            button(checklist, 'Open run workspace', { width: 296, variant: 'secondary', icon: 'database' });
            text(checklist, 'Static review only · no run can be created from this design.', {
                token: 'caption',
                color: colors.mutedLight,
                width: 296,
                fill: false
            });
        });
    }

    const FOUNDATIONS_PLATE_HEIGHT = 1900;
    const FOUNDATIONS_COLUMN_HEIGHT = 1620;
    function boardText$1(parent, value, opts = {}) {
        var _a, _b;
        return text(parent, value, {
            token: (_a = opts.token) !== null && _a !== void 0 ? _a : 'bodySmall',
            size: opts.size,
            lineHeight: opts.lineHeight,
            weight: opts.weight,
            color: (_b = opts.color) !== null && _b !== void 0 ? _b : boardColors.text,
            width: opts.width,
            hug: opts.hug,
            align: opts.align,
            letterSpacing: opts.letterSpacing,
            fill: false
        });
    }
    function boardTag$1(parent, label, color = boardColors.mint) {
        const node = hstack('Board tag', {
            height: 22,
            paddingX: 8,
            gap: 5,
            fill: boardColors.panelAlt,
            stroke: boardColors.border,
            radius: 999,
            align: 'CENTER'
        });
        parent.appendChild(node);
        const dotMark = frame('Tag dot', { width: 5, height: 5, fill: color, radius: 999 });
        node.appendChild(dotMark);
        boardText$1(node, label, { size: 10, lineHeight: 12, weight: 'semibold', color: boardColors.muted, hug: true });
        return node;
    }
    function foundationCard(name, width, height, heading, description) {
        const card = vstack(name, {
            width,
            height,
            padding: 24,
            gap: 14,
            fill: boardColors.panelAlt,
            stroke: boardColors.border,
            radius: 18
        });
        const header = hstack('Foundations card header', {
            width: width - 48,
            height: 24,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        card.appendChild(header);
        boardText$1(header, heading, {
            size: 18,
            lineHeight: 24,
            weight: 'semibold',
            color: boardColors.text,
            hug: true
        });
        boardText$1(header, description, {
            size: 11,
            lineHeight: 14,
            weight: 'medium',
            color: boardColors.faint,
            hug: true
        });
        return { card, content: card };
    }
    function foundationHeader(plate, label) {
        const header = hstack('Foundations header', {
            width: 4528,
            height: 120,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        plate.appendChild(header);
        const copy = vstack('Foundations title block', { width: 1200, gap: 4, fill: null });
        header.appendChild(copy);
        const eyebrow = hstack('Foundations eyebrow', { gap: 8, fill: null, align: 'CENTER' });
        copy.appendChild(eyebrow);
        boardTag$1(eyebrow, label, boardColors.mint);
        boardTag$1(eyebrow, 'DESKTOP SCALE', boardColors.cobalt);
        boardText$1(copy, 'The same language, at desk scale.', {
            size: 32,
            lineHeight: 40,
            weight: 'bold',
            color: boardColors.text,
            width: 1200,
            letterSpacing: -0.7
        });
        boardText$1(copy, 'AirliPay mobile colour roles, Inter typography and controls extended for dense operations work. Nothing here introduces a second visual language.', {
            size: 13,
            lineHeight: 20,
            color: boardColors.muted,
            width: 1000
        });
        const meta = vstack('Foundations meta', { gap: 4, fill: null, align: 'MAX' });
        header.appendChild(meta);
        boardText$1(meta, '27 screens · 5 domains · 1440 × 960', {
            size: 11,
            lineHeight: 16,
            weight: 'semibold',
            color: boardColors.faint,
            align: 'RIGHT',
            width: 420
        });
        boardText$1(meta, 'Source: AiliPayApp/src/theme/tokens.js', {
            size: 11,
            lineHeight: 16,
            color: boardColors.faint,
            align: 'RIGHT',
            width: 420
        });
    }
    function colourCard() {
        const { card } = foundationCard('Colour roles', 1250, 640, 'Colour roles', 'Semantic, not decorative');
        card.name = 'Foundations · colour';
        const body = vstack('Colour swatches', { width: 1202, gap: 8, fill: null });
        card.appendChild(body);
        const roles = [
            { name: 'Canvas', value: colors.canvas },
            { name: 'Surface', value: colors.surface },
            { name: 'Ink', value: colors.ink },
            { name: 'Muted', value: colors.muted },
            { name: 'Border', value: colors.border },
            { name: 'Sidebar', value: colors.sidebarBg },
            { name: 'Mint action', value: colors.mint },
            { name: 'Cobalt link', value: colors.cobalt },
            { name: 'Success', value: colors.success },
            { name: 'Warning', value: colors.warning },
            { name: 'Error', value: colors.error },
            { name: 'Info', value: colors.info }
        ];
        for (let index = 0; index < roles.length; index += 2) {
            const row = hstack('Swatch row', { width: 1202, height: 40, gap: 16, fill: null, align: 'CENTER' });
            body.appendChild(row);
            roles.slice(index, index + 2).forEach((role) => {
                const item = hstack('Swatch', { width: 593, height: 40, gap: 10, fill: null, align: 'CENTER' });
                row.appendChild(item);
                const chip = frame(`Swatch · ${role.name}`, {
                    width: 26,
                    height: 26,
                    fill: role.value,
                    stroke: boardColors.borderStrong,
                    radius: 7
                });
                item.appendChild(chip);
                boardText$1(item, role.name, { size: 12, lineHeight: 16, weight: 'medium', color: boardColors.text, hug: true });
                spacer(item, 1, true);
                boardText$1(item, role.value.toUpperCase(), {
                    size: 10,
                    lineHeight: 12,
                    weight: 'medium',
                    color: boardColors.faint,
                    hug: true
                });
            });
        }
        const rule = frame('Panel rule', { width: 1202, height: 1, fill: boardColors.border });
        card.appendChild(rule);
        const notes = vstack('Foundations colour notes', { width: 1202, gap: 6, fill: null });
        card.appendChild(notes);
        boardText$1(notes, 'DESKTOP-SPECIFIC ROLES', {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.mint,
            width: 1202
        });
        const support = hstack('Support roles', { width: 1202, gap: 8, fill: null, align: 'CENTER' });
        notes.appendChild(support);
        [
            { label: 'Nav active', value: colors.navActiveBg },
            { label: 'Table head', value: colors.tableHead },
            { label: 'Row selected', value: colors.rowSelected },
            { label: 'Focus ring', value: colors.focusRing }
        ].forEach((role) => {
            const item = hstack('Support role', { gap: 6, fill: null, align: 'CENTER' });
            support.appendChild(item);
            const chip = frame('Support swatch', {
                width: 14,
                height: 14,
                fill: role.value,
                stroke: boardColors.borderStrong,
                radius: 4
            });
            item.appendChild(chip);
            boardText$1(item, `${role.label}  ${role.value}`, {
                size: 10,
                lineHeight: 12,
                color: boardColors.muted,
                hug: true
            });
        });
        return card;
    }
    function typeCard() {
        const { card } = foundationCard('Type & rhythm', 1250, 956, 'Type & rhythm', 'Inter · mobile ramp extended');
        const rows = [
            { token: 'display', label: 'Display', sample: 'Payroll, clearly.' },
            { token: 'metric', label: 'Metric', sample: 'XAF 248.65M' },
            { token: 'pageTitle', label: 'Page title', sample: 'Operations overview' },
            { token: 'h2', label: 'Heading 2', sample: 'Next payout run' },
            { token: 'h3', label: 'Heading 3', sample: 'Cash movement' },
            { token: 'body', label: 'Body', sample: 'One calm place to move money.' },
            { token: 'bodySmall', label: 'Body small', sample: 'Employee roster and payout context.' },
            { token: 'label', label: 'Label', sample: 'Payout destination' },
            { token: 'table', label: 'Table', sample: 'EMP-10482 · Awa Fongang' },
            { token: 'eyebrow', label: 'Eyebrow', sample: 'EMPLOYMENT & CONTACT' },
            { token: 'caption', label: 'Caption', sample: 'Updated 2m ago · all times WAT' }
        ];
        const body = vstack('Type rows', { width: 1202, gap: 0, fill: null });
        card.appendChild(body);
        rows.forEach((row, index) => {
            const style = typeScale[row.token];
            const line = hstack('Type row', { width: 1202, height: 68, gap: 12, fill: null, align: 'CENTER' });
            body.appendChild(line);
            boardText$1(line, row.label.toUpperCase(), {
                size: 10,
                lineHeight: 12,
                weight: 'semibold',
                color: boardColors.faint,
                width: 150
            });
            const sample = text(line, row.sample, {
                token: row.token,
                color: boardColors.text,
                width: 820,
                fill: false
            });
            sample.name = `Sample · ${row.label}`;
            spacer(line, 1, true);
            boardText$1(line, `${style.size}/${style.lineHeight} · ${style.weight}`, {
                size: 10,
                lineHeight: 12,
                weight: 'medium',
                color: boardColors.faint,
                align: 'RIGHT',
                width: 180
            });
            if (index < rows.length - 1) {
                const rule = frame('Type rule', { width: 1202, height: 1, fill: boardColors.border });
                body.appendChild(rule);
            }
        });
        return card;
    }
    function spacingCard() {
        const { card } = foundationCard('Space & radii', 1250, 380, 'Space & radii', '4–48 spacing · 4–pill radii');
        const body = vstack('Spacing body', { width: 1202, gap: 14, fill: null });
        card.appendChild(body);
        const spacingRow = hstack('Spacing scale', { width: 1202, height: 88, gap: 12, fill: null, align: 'MAX' });
        body.appendChild(spacingRow);
        const steps = [
            { label: '4', value: 4 },
            { label: '8', value: 8 },
            { label: '12', value: 12 },
            { label: '16', value: 16 },
            { label: '24', value: 24 },
            { label: '32', value: 32 },
            { label: '40', value: 40 },
            { label: '48', value: 48 }
        ];
        steps.forEach((step) => {
            const item = vstack('Spacing step', { width: 64, gap: 5, fill: null, align: 'MIN' });
            spacingRow.appendChild(item);
            const bar = frame('Spacing bar', {
                width: Math.max(8, step.value),
                height: 8,
                fill: colors.mint,
                radius: 2
            });
            item.appendChild(bar);
            boardText$1(item, step.label, { size: 10, lineHeight: 12, color: boardColors.muted, hug: true });
        });
        spacer(spacingRow, 1, true);
        const rule = frame('Spacing rule', { width: 1202, height: 1, fill: boardColors.border });
        body.appendChild(rule);
        const radiusRow = hstack('Radius scale', { width: 1202, height: 92, gap: 18, fill: null, align: 'CENTER' });
        body.appendChild(radiusRow);
        [
            { label: '4', value: 4 },
            { label: '8', value: 8 },
            { label: '12', value: 12 },
            { label: '16', value: 16 },
            { label: '24', value: 24 },
            { label: 'Pill', value: 999 }
        ].forEach((radius) => {
            const item = vstack('Radius item', { gap: 4, fill: null, align: 'CENTER' });
            radiusRow.appendChild(item);
            const box = frame('Radius sample', {
                width: 54,
                height: 54,
                fill: boardColors.panel,
                stroke: boardColors.borderStrong,
                radius: radius.value
            });
            item.appendChild(box);
            boardText$1(item, `${radius.label}px`, { size: 10, lineHeight: 12, color: boardColors.faint, hug: true });
        });
        boardText$1(body, 'Cards use 12–16px; dialogs 20px; avatars and status chips are fully rounded. Type and spacing follow the mobile scale so the same rhythm carries across surfaces.', {
            size: 10,
            lineHeight: 15,
            color: boardColors.faint,
            width: 1202
        });
        return card;
    }
    function anatomyCard() {
        const { card } = foundationCard('Shell anatomy', 1250, 1216, 'Shell anatomy', 'Rail, command bar, canvas, inspector');
        const anatomy = frame('Desktop shell diagram', {
            width: 1202,
            height: 660,
            fill: colors.canvas,
            stroke: boardColors.borderStrong,
            radius: 12,
            clip: true
        });
        card.appendChild(anatomy);
        const sidebar = frame('Rail', {
            width: 200,
            height: 660,
            fill: colors.sidebarBg
        });
        anatomy.appendChild(sidebar);
        brandMark(sidebar, 20).x = 16;
        sidebar.children[sidebar.children.length - 1].y = 16;
        boardText$1(sidebar, 'AirliPay', {
            size: 13,
            lineHeight: 16,
            weight: 'bold',
            color: colors.sidebarText,
            width: 120,
            hug: true
        }).x = 44;
        sidebar.children[sidebar.children.length - 1].y = 17;
        for (let index = 0; index < 7; index += 1) {
            const item = frame('Rail item', {
                width: 168,
                height: 22,
                fill: index === 0 ? colors.navActiveBg : undefined,
                radius: 6
            });
            sidebar.appendChild(item);
            item.x = 16;
            item.y = 90 + index * 32;
            if (index === 0) {
                const dotMark = frame('Rail dot', { width: 5, height: 5, fill: colors.navActiveText, radius: 999 });
                item.appendChild(dotMark);
                dotMark.x = 10;
                dotMark.y = 8;
            }
        }
        boardText$1(anatomy, '248 px rail', {
            size: 9,
            lineHeight: 11,
            weight: 'semibold',
            color: boardColors.faint,
            width: 190,
            align: 'CENTER'
        }).x = 5;
        anatomy.children[anatomy.children.length - 1].y = 632;
        const topbar = frame('Command bar', {
            width: 1002,
            height: 64,
            fill: colors.topbarBg,
            stroke: colors.border,
            radius: 0
        });
        anatomy.appendChild(topbar);
        topbar.x = 200;
        topbar.y = 0;
        const search = frame('Command search', {
            width: 280,
            height: 28,
            fill: colors.fieldBg,
            stroke: colors.border,
            radius: 6
        });
        topbar.appendChild(search);
        search.x = 24;
        search.y = 13;
        boardText$1(search, 'Search operations…', {
            size: 9,
            lineHeight: 11,
            color: colors.mutedLight,
            hug: true
        }).x = 10;
        search.children[search.children.length - 1].y = 9;
        boardText$1(topbar, '64 px command bar', {
            size: 9,
            lineHeight: 11,
            weight: 'semibold',
            color: boardColors.faint,
            width: 180,
            align: 'RIGHT'
        }).x = 798;
        topbar.children[topbar.children.length - 1].y = 22;
        const content = frame('Canvas', {
            width: 752,
            height: 596,
            fill: colors.canvas
        });
        anatomy.appendChild(content);
        content.x = 200;
        content.y = 64;
        const pageTitle = boardText$1(content, 'Operations overview', {
            size: 18,
            lineHeight: 22,
            weight: 'bold',
            color: colors.ink,
            width: 400
        });
        pageTitle.x = 24;
        pageTitle.y = 18;
        const pageMeta = boardText$1(content, 'Thursday, 23 October 2026 · all times WAT', {
            size: 9,
            lineHeight: 12,
            color: colors.muted,
            width: 400
        });
        pageMeta.x = 24;
        pageMeta.y = 44;
        const cardOne = frame('Content card', {
            width: 220,
            height: 110,
            fill: colors.surface,
            stroke: colors.border,
            radius: 8
        });
        content.appendChild(cardOne);
        cardOne.x = 24;
        cardOne.y = 82;
        const cardTwo = frame('Content card', {
            width: 220,
            height: 110,
            fill: colors.surface,
            stroke: colors.border,
            radius: 8
        });
        content.appendChild(cardTwo);
        cardTwo.x = 260;
        cardTwo.y = 82;
        const cardThree = frame('Content card', {
            width: 468,
            height: 330,
            fill: colors.surface,
            stroke: colors.border,
            radius: 8
        });
        content.appendChild(cardThree);
        cardThree.x = 24;
        cardThree.y = 208;
        const chartLine = frame('Chart hint', {
            width: 428,
            height: 4,
            fill: colors.chartDeposit,
            radius: 2
        });
        cardThree.appendChild(chartLine);
        chartLine.x = 20;
        chartLine.y = 180;
        const inspector = frame('Inspector', {
            width: 250,
            height: 596,
            fill: colors.surface,
            stroke: colors.border,
            radius: 0
        });
        anatomy.appendChild(inspector);
        inspector.x = 952;
        inspector.y = 64;
        const inspectorTitle = boardText$1(inspector, 'Employee snapshot', {
            size: 11,
            lineHeight: 14,
            weight: 'semibold',
            color: colors.ink,
            width: 210
        });
        inspectorTitle.x = 20;
        inspectorTitle.y = 20;
        for (let index = 0; index < 5; index += 1) {
            const line = frame('Inspector line', {
                width: 190 - index * 10,
                height: 4,
                fill: colors.border,
                radius: 2
            });
            inspector.appendChild(line);
            line.x = 20;
            line.y = 58 + index * 24;
        }
        const balanceTile = frame('Inspector balance', {
            width: 210,
            height: 70,
            fill: colors.mintSoft,
            radius: 8
        });
        inspector.appendChild(balanceTile);
        balanceTile.x = 20;
        balanceTile.y = 190;
        const dimRow = hstack('Dimension labels', { width: 1202, height: 54, gap: 10, fill: null, align: 'CENTER' });
        card.appendChild(dimRow);
        [
            { label: 'RAIL', value: '248 px' },
            { label: 'COMMAND BAR', value: '64 px' },
            { label: 'CONTENT', value: '1128 px' },
            { label: 'INSPECTOR', value: '336 px' },
            { label: 'GUTTER', value: '32 px' }
        ].forEach((item) => {
            const box = hstack('Dimension', {
                height: 44,
                paddingX: 10,
                gap: 6,
                fill: boardColors.panel,
                stroke: boardColors.border,
                radius: 8,
                align: 'CENTER'
            });
            dimRow.appendChild(box);
            boardText$1(box, item.label, {
                size: 9,
                lineHeight: 11,
                weight: 'semibold',
                color: boardColors.faint,
                hug: true
            });
            boardText$1(box, item.value, {
                size: 11,
                lineHeight: 13,
                weight: 'semibold',
                color: boardColors.mint,
                hug: true
            });
        });
        const navStrip = vstack('Rail specimen', {
            width: 1202,
            height: 300,
            padding: 20,
            gap: 10,
            fill: colors.sidebarBg,
            radius: 12,
            clip: true
        });
        card.appendChild(navStrip);
        const navTitle = hstack('Nav specimen header', { width: 1162, height: 24, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        navStrip.appendChild(navTitle);
        boardText$1(navTitle, 'Navigation specimen', {
            size: 12,
            lineHeight: 16,
            weight: 'semibold',
            color: colors.sidebarText,
            hug: true
        });
        boardText$1(navTitle, 'One active destination at a time', {
            size: 10,
            lineHeight: 12,
            color: colors.sidebarFaint,
            hug: true
        });
        const navCols = hstack('Nav columns', { width: 1162, height: 210, gap: 18, fill: null, align: 'MIN' });
        navStrip.appendChild(navCols);
        ['Workspace', 'Money', 'Account'].forEach((group, groupIndex) => {
            const col = vstack('Nav group', { width: 375, gap: 6, fill: null });
            navCols.appendChild(col);
            boardText$1(col, group.toUpperCase(), {
                size: 9,
                lineHeight: 11,
                weight: 'semibold',
                color: colors.sidebarFaint,
                width: 375
            });
            const items = [
                ['overview', 'Overview'],
                ['users', 'Employees'],
                ['clients', 'Clients'],
                ['team', 'Team & access'],
                ['transactions', 'Transactions'],
                ['invoices', 'Invoices'],
                ['payments', 'Payments'],
                ['profile', 'My profile']
            ];
            const selected = [
                [items[0], items[1], items[3]],
                [items[4], items[5], items[6]],
                [items[7]]
            ][groupIndex];
            selected.forEach((item, index) => {
                const active = groupIndex === 0 && index === 0;
                const row = hstack('Nav specimen item', {
                    width: 375,
                    height: 30,
                    gap: 8,
                    paddingX: 9,
                    fill: active ? colors.navActiveBg : null,
                    radius: 6,
                    align: 'CENTER'
                });
                col.appendChild(row);
                icon(row, item[0], active ? colors.navActiveText : colors.sidebarMuted, 14);
                boardText$1(row, item[1], {
                    size: 11,
                    lineHeight: 14,
                    weight: active ? 'semibold' : 'medium',
                    color: active ? colors.sidebarText : colors.sidebarMuted,
                    hug: true
                });
            });
        });
        return card;
    }
    function actionsSpecimen(parent, width) {
        const label = boardText$1(parent, 'Actions', {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.faint,
            width
        });
        const strip = hstack('Actions specimen', {
            width,
            height: 76,
            padding: 16,
            gap: 10,
            fill: colors.surface,
            stroke: colors.border,
            radius: 12,
            align: 'CENTER'
        });
        parent.appendChild(strip);
        button(strip, 'New pay run', { variant: 'primary', icon: 'plus' });
        button(strip, 'Export', { variant: 'secondary', icon: 'download' });
        button(strip, 'Cancel', { variant: 'ghost' });
        button(strip, 'Deactivate', { variant: 'danger', icon: 'pause' });
        spacer(strip, 1, true);
        iconButton(strip, 'bell', { size: 36, stroke: colors.border, background: colors.surface });
        iconButton(strip, 'more', { size: 36, background: colors.surfaceSunken });
        return label;
    }
    function inputsSpecimen(parent, width) {
        const label = boardText$1(parent, 'Inputs & controls', {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.faint,
            width
        });
        const strip = hstack('Inputs specimen', {
            width,
            height: 152,
            padding: 16,
            gap: 18,
            fill: colors.surface,
            stroke: colors.border,
            radius: 12,
            align: 'MIN'
        });
        parent.appendChild(strip);
        field(strip, {
            label: 'Search',
            placeholder: 'Search employees…',
            width: 320,
            icon: 'search'
        });
        field(strip, {
            label: 'Employer',
            value: 'Penda Logistics',
            variant: 'select',
            width: 280
        });
        field(strip, {
            label: 'Base salary',
            value: 'XAF 240,000',
            width: 260,
            required: true
        });
        const controls = vstack('Controls', { width: 260, gap: 10, fill: null });
        strip.appendChild(controls);
        checkbox(controls, 'Remember this device');
        const toggleRow = hstack('Toggle sample', { gap: 8, height: 26, fill: null, align: 'CENTER' });
        controls.appendChild(toggleRow);
        toggle(toggleRow);
        boardText$1(toggleRow, 'Notifications', {
            size: 11,
            lineHeight: 14,
            color: colors.inkSoft,
            hug: true
        });
        return label;
    }
    function statusSpecimen(parent, width) {
        const label = boardText$1(parent, 'Status language', {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.faint,
            width
        });
        const strip = hstack('Status specimen', {
            width,
            height: 82,
            padding: 16,
            gap: 8,
            fill: colors.surface,
            stroke: colors.border,
            radius: 12,
            align: 'CENTER'
        });
        parent.appendChild(strip);
        statusPill(strip, 'ACTIVE');
        statusPill(strip, 'PENDING');
        statusPill(strip, 'SUCCESS');
        statusPill(strip, 'FAILED');
        statusPill(strip, 'PENDING_CONFIRMATION');
        statusPill(strip, 'TREATED');
        spacer(strip, 1, true);
        tag(strip, 'MERGED', 'brand');
        tag(strip, 'FIXTURE', 'warning');
        tag(strip, 'PROPOSED', 'neutral');
        return label;
    }
    function tableSpecimen(parent, width) {
        const label = boardText$1(parent, 'Table anatomy', {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.faint,
            width
        });
        const strip = vstack('Table specimen', {
            width,
            height: 238,
            padding: 16,
            gap: 8,
            fill: colors.surface,
            stroke: colors.border,
            radius: 12
        });
        parent.appendChild(strip);
        const columns = [
            { key: 'employee', label: 'EMPLOYEE', width: 580, type: 'identity' },
            { key: 'employer', label: 'EMPLOYER', width: 540 },
            { key: 'amount', label: 'WALLET', width: 360, type: 'money', align: 'RIGHT' },
            { key: 'status', label: 'STATUS', width: 320, type: 'status', align: 'RIGHT' }
        ];
        const rows = [
            {
                employee: { text: 'Awa Fongang', sub: 'EMP-10482 · awa.fongang@penda.cm', initials: 'AF' },
                employer: { text: 'Penda Logistics' },
                amount: { text: 'XAF 184,500' },
                status: { text: 'Active', status: 'ACTIVE' }
            },
            {
                employee: { text: 'Brice Tchoumi', sub: 'EMP-09117 · brice.tchoumi@kribimarine.cm', initials: 'BT' },
                employer: { text: 'Kribi Marine' },
                amount: { text: 'XAF 96,000' },
                status: { text: 'Active', status: 'ACTIVE' }
            }
        ];
        dataTable(strip, { width: width - 32, columns, rows, rowHeight: 52, selectedIndex: 0 });
        return label;
    }
    function identitySpecimen(parent, width) {
        const label = boardText$1(parent, 'Identity & cards', {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.faint,
            width
        });
        const strip = hstack('Identity specimen', {
            width,
            height: 164,
            padding: 16,
            gap: 18,
            fill: colors.surface,
            stroke: colors.border,
            radius: 12,
            align: 'CENTER'
        });
        parent.appendChild(strip);
        const avatars = vstack('Avatar samples', { gap: 6, fill: null });
        strip.appendChild(avatars);
        const row = hstack('Avatar row', { gap: 8, fill: null, align: 'CENTER' });
        avatars.appendChild(row);
        avatar(row, 'NM', { size: 44, bg: colors.cobaltSoft, color: colors.cobaltText });
        avatar(row, 'AF', { size: 36, bg: colors.mintSoft, color: colors.onMintSoft });
        avatar(row, 'PL', { size: 30, bg: colors.cobaltSoft, color: colors.cobaltText });
        const metrics = hstack('Metric sample', { gap: 12, fill: null, align: 'CENTER' });
        strip.appendChild(metrics);
        metricCard(metrics, {
            label: 'Payroll volume',
            value: 'XAF 248.7M',
            change: '+12.4%',
            icon: 'trendUp',
            width: 300,
            series: [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103]
        });
        const detail = vstack('Detail header sample', {
            width: 440,
            gap: 4,
            padding: 14,
            fill: colors.surfaceSunken,
            radius: 10
        });
        strip.appendChild(detail);
        boardText$1(detail, 'Employee snapshot', {
            size: 13,
            lineHeight: 16,
            weight: 'semibold',
            color: colors.ink,
            width: 412
        });
        boardText$1(detail, 'Awa Fongang · EMP-10482 · Penda Logistics', {
            size: 10,
            lineHeight: 13,
            color: colors.muted,
            width: 412
        });
        const detailRow = hstack('Detail row', { width: 412, height: 26, fill: null, align: 'CENTER' });
        detail.appendChild(detailRow);
        statusPill(detailRow, 'ACTIVE', { size: 'sm' });
        spacer(detailRow, 1, true);
        progressBar(detailRow, 78, { width: 200, height: 5, color: colors.mint });
        return label;
    }
    function componentsCard() {
        const { card } = foundationCard('Components', 1960, 1010, 'Components', 'Built from the same primitives');
        const body = vstack('Components body', { width: 1912, gap: 10, fill: null });
        card.appendChild(body);
        actionsSpecimen(body, 1912);
        inputsSpecimen(body, 1912);
        statusSpecimen(body, 1912);
        tableSpecimen(body, 1912);
        identitySpecimen(body, 1912);
        return card;
    }
    function chartsCard() {
        const { card } = foundationCard('Data display', 1960, 586, 'Data display', 'Quiet charts, legible numbers');
        const body = hstack('Charts body', { width: 1912, height: 480, gap: 20, fill: null, align: 'MIN' });
        card.appendChild(body);
        const chartSurface = vstack('Chart specimen', {
            width: 1330,
            height: 480,
            padding: 20,
            gap: 8,
            fill: colors.surface,
            stroke: colors.border,
            radius: 12
        });
        body.appendChild(chartSurface);
        const chartHeader = hstack('Chart header', { width: 1290, height: 30, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        chartSurface.appendChild(chartHeader);
        boardText$1(chartHeader, 'Cash movement', {
            size: 15,
            lineHeight: 19,
            weight: 'semibold',
            color: colors.ink,
            hug: true
        });
        segmented(chartHeader, ['7D', '30D', '90D'], 1);
        const legend = hstack('Chart legend', { width: 1290, height: 18, gap: 16, fill: null, align: 'CENTER' });
        chartSurface.appendChild(legend);
        legendItem(legend, 'Employer funding', colors.chartDeposit);
        legendItem(legend, 'Employee payouts', colors.chartPayout);
        spacer(legend, 1, true);
        boardText$1(legend, 'Updated 2m ago', {
            size: 10,
            lineHeight: 12,
            color: colors.mutedLight,
            hug: true
        });
        areaChart(chartSurface, {
            width: 1290,
            height: 370,
            seriesA: [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103],
            seriesB: [30, 36, 33, 42, 51, 47, 61, 58, 66, 63, 74, 71]
        });
        const tiles = vstack('Chart side tiles', { width: 562, gap: 16, fill: null });
        body.appendChild(tiles);
        metricCard(tiles, {
            label: 'Payout volume',
            value: 'XAF 248.65M',
            change: '+12.4%',
            icon: 'trendUp',
            width: 562,
            series: [42, 48, 45, 61, 58, 74, 69, 82, 78, 91, 88, 103],
            seriesColor: colors.chartDeposit
        });
        const side = vstack('Sparkline card', {
            width: 562,
            height: 250,
            padding: 18,
            gap: 8,
            fill: colors.surface,
            stroke: colors.border,
            radius: 12
        });
        tiles.appendChild(side);
        boardText$1(side, 'SPARKLINES', {
            size: 9,
            lineHeight: 11,
            weight: 'semibold',
            color: colors.mutedLight,
            width: 526
        });
        const sparkRow = hstack('Sparkline row', { width: 526, height: 48, gap: 16, fill: null, align: 'CENTER' });
        side.appendChild(sparkRow);
        sparkline(sparkRow, [12, 18, 15, 22, 20, 28, 25, 32], { width: 120, height: 40 });
        sparkline(sparkRow, [30, 26, 31, 28, 35, 32, 38, 36], { width: 120, height: 40, color: colors.chartPayout });
        sparkline(sparkRow, [18, 20, 19, 22, 21, 25, 24, 28], { width: 120, height: 40, color: colors.warning });
        const factRow = hstack('Fact row', { width: 526, height: 26, fill: null, align: 'CENTER' });
        side.appendChild(factRow);
        keyValueRow(factRow, 'Payout success', '99.2%', { width: 526 });
        button(side, 'Open insights', { width: 526, variant: 'secondary', trailingIcon: 'arrowRight' });
        return card;
    }
    function buildFoundationsPlate(themeLabel) {
        const plate = vstack(`Foundations · ${themeLabel}`, {
            width: 4656,
            height: FOUNDATIONS_PLATE_HEIGHT,
            padding: 64,
            gap: 32,
            fill: boardColors.panel,
            stroke: boardColors.border,
            radius: 24
        });
        foundationHeader(plate, `${themeLabel} FOUNDATIONS`);
        const columns = hstack('Foundations columns', {
            width: 4528,
            height: FOUNDATIONS_COLUMN_HEIGHT,
            gap: 32,
            fill: null,
            align: 'MIN'
        });
        plate.appendChild(columns);
        const col1 = vstack('Foundations column · tokens', {
            width: 1250,
            height: FOUNDATIONS_COLUMN_HEIGHT,
            gap: 24,
            fill: null
        });
        columns.appendChild(col1);
        col1.appendChild(colourCard());
        col1.appendChild(typeCard());
        const col2 = vstack('Foundations column · rhythm', {
            width: 1250,
            height: FOUNDATIONS_COLUMN_HEIGHT,
            gap: 24,
            fill: null
        });
        columns.appendChild(col2);
        col2.appendChild(spacingCard());
        col2.appendChild(anatomyCard());
        const col3 = vstack('Foundations column · components', {
            width: 1960,
            height: FOUNDATIONS_COLUMN_HEIGHT,
            gap: 24,
            fill: null
        });
        columns.appendChild(col3);
        col3.appendChild(componentsCard());
        col3.appendChild(chartsCard());
        return plate;
    }

    const BUILDERS = {
        A01SignIn,
        A02Overview,
        A03Profile,
        B01Employees,
        B02NewEmployee,
        B03EmployeeProfile,
        B04MomoAccounts,
        B05Activity,
        B06BankAccounts,
        B07DebitCards,
        B08EditEmployee,
        C01Clients,
        C02NewClient,
        C03ClientProfile,
        C04ClientRoster,
        C05ClientFunding,
        C06PaymentHistory,
        C07ClientPayouts,
        C08EditClient,
        D01Team,
        D02InviteAdmin,
        D03AdminProfile,
        D04EditAdmin,
        E01Transactions,
        E02Invoices,
        E03InvoiceDetail,
        E04PayoutRuns
    };

    /** The canonical route map for the current dashboard, including the root redirect. */
    const ROUTES = [
        {
            group: 'Root',
            path: '/',
            screenId: null,
            representation: 'excluded',
            dataStatus: 'live',
            note: 'Redirects to /login; no standalone screen.'
        },
        {
            group: 'Access',
            path: '/login',
            screenId: 'A01',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Username + password, matching the current API.'
        },
        {
            group: 'Access',
            path: '/dashboard',
            screenId: 'A02',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Metric blocks become an operations command centre.'
        },
        {
            group: 'Access',
            path: '/dashboard/profile',
            screenId: 'A03',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Read-only account profile; moved into primary navigation.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users',
            screenId: 'B01',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Working search, filters and row inspector.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/addUser',
            screenId: 'B02',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Grouped form; CSV import preserved as a secondary path.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/[id]',
            screenId: 'B03',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Employee snapshot and ledger.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/[id]/transactions',
            screenId: 'B03',
            representation: 'default-tab',
            dataStatus: 'live',
            note: 'Consolidated into the default Transactions tab.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/[id]/momo-accounts',
            screenId: 'B04',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Uses user_mobile_money_accounts; missing-data guard required.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/[id]/activity-feed',
            screenId: 'B05',
            representation: 'direct',
            dataStatus: 'fixture',
            note: 'Current page is generated fixture data; needs a real audit feed.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/[id]/bank-accounts',
            screenId: 'B06',
            representation: 'direct',
            dataStatus: 'fixture',
            note: 'Current page is fixture data; list-banks endpoint exists.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/[id]/debit-cards',
            screenId: 'B07',
            representation: 'direct',
            dataStatus: 'concept',
            note: 'No current card product or backend. Concept only.'
        },
        {
            group: 'Employees',
            path: '/dashboard/users/[id]/edit',
            screenId: 'B08',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Same grouped form as create, prefilled.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients',
            screenId: 'C01',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Employer list with payout context.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/addClient',
            screenId: 'C02',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Invitation replaces the current raw password fields.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/payment',
            screenId: 'C07',
            representation: 'direct',
            dataStatus: 'fixture',
            note: 'Legacy static table; retained as a payment-schedule view.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/[id]',
            screenId: 'C03',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Client snapshot, funding and ledger.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/[id]/transactions',
            screenId: 'C03',
            representation: 'default-tab',
            dataStatus: 'live',
            note: 'Consolidated into the default Transactions tab.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/[id]/user-roster',
            screenId: 'C04',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Roster gets bulk actions and per-employee drill-down.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/[id]/bank-accounts',
            screenId: 'C05',
            representation: 'direct',
            dataStatus: 'fixture',
            note: 'Current page uses random fixture accounts; needs a client-bank API.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/[id]/payment-history',
            screenId: 'C06',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Invoice status must write to the invoice resource, not the client.'
        },
        {
            group: 'Clients',
            path: '/dashboard/clients/[id]/edit',
            screenId: 'C08',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Invitation and identity sections; no password fields.'
        },
        {
            group: 'Team',
            path: '/dashboard/admins',
            screenId: 'D01',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Team list; granular role model is a proposed extension.'
        },
        {
            group: 'Team',
            path: '/dashboard/admins/addAdmin',
            screenId: 'D02',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Invite flow replaces creating an admin with a raw password.'
        },
        {
            group: 'Team',
            path: '/dashboard/admins/[id]',
            screenId: 'D03',
            representation: 'direct',
            dataStatus: 'ui-gap',
            note: 'The current page body is blank although GET /admin/:id exists.'
        },
        {
            group: 'Team',
            path: '/dashboard/admins/[id]/edit',
            screenId: 'D04',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Edit access and contact; reset access via email.'
        },
        {
            group: 'Finance',
            path: '/dashboard/transactions',
            screenId: 'E01',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Dense ledger with real filters and row-level detail.'
        },
        {
            group: 'Finance',
            path: '/dashboard/invoices',
            screenId: 'E02',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Invoice list; metrics are not invoice statuses.'
        },
        {
            group: 'Finance',
            path: '/dashboard/invoices/[id]',
            screenId: 'E03',
            representation: 'direct',
            dataStatus: 'live',
            note: 'Document, transaction summary and status timeline in one review screen.'
        },
        {
            group: 'Finance',
            path: '/dashboard/payments',
            screenId: 'E04',
            representation: 'direct',
            dataStatus: 'proposed',
            note: 'Current duplicate invoice table becomes payout-run orchestration. New API required.'
        }
    ];
    function routesForScreen(screenId) {
        return ROUTES.filter((route) => route.screenId === screenId);
    }

    const SCREEN_GROUPS = [
        {
            key: 'access',
            label: 'Access',
            title: 'Access and command centre',
            description: 'Sign in, the operations overview and the signed-in account.'
        },
        {
            key: 'employees',
            label: 'Employees',
            title: 'Employees',
            description: 'Roster, creation, profile, payout accounts and audit history.'
        },
        {
            key: 'clients',
            label: 'Clients',
            title: 'Clients',
            description: 'Employer portfolio, onboarding, funding and payroll billing.'
        },
        {
            key: 'team',
            label: 'Team',
            title: 'Team and access',
            description: 'Admins, invitations and the proposed granular access model.'
        },
        {
            key: 'finance',
            label: 'Finance',
            title: 'Money movement',
            description: 'Ledger, invoices and the proposed payout-run orchestrator.'
        }
    ];
    const SCREENS = [
        {
            id: 'A01',
            title: 'Sign in',
            group: 'access',
            builder: 'A01SignIn',
            dataStatus: 'live',
            tags: [],
            caption: 'Username + password · matches POST /auth/login'
        },
        {
            id: 'A02',
            title: 'Operations overview',
            group: 'access',
            builder: 'A02Overview',
            dataStatus: 'live',
            tags: [],
            caption: 'Metrics, cash movement, next payout run and recent activity'
        },
        {
            id: 'A03',
            title: 'My profile',
            group: 'access',
            builder: 'A03Profile',
            dataStatus: 'live',
            tags: [],
            caption: 'Signed-in admin identity, access and recent security events'
        },
        {
            id: 'B01',
            title: 'Employees',
            group: 'employees',
            builder: 'B01Employees',
            dataStatus: 'live',
            tags: [],
            caption: 'Searchable roster with wallet, employer and status context'
        },
        {
            id: 'B02',
            title: 'New employee',
            group: 'employees',
            builder: 'B02NewEmployee',
            dataStatus: 'live',
            tags: [],
            caption: 'Grouped create form; CSV import remains a secondary route'
        },
        {
            id: 'B03',
            title: 'Employee profile',
            group: 'employees',
            builder: 'B03EmployeeProfile',
            dataStatus: 'live',
            tags: ['merged'],
            caption: 'Transactions default tab · also represents /users/[id]/transactions'
        },
        {
            id: 'B04',
            title: 'Mobile money accounts',
            group: 'employees',
            builder: 'B04MomoAccounts',
            dataStatus: 'live',
            tags: [],
            caption: 'Payout destinations from user_mobile_money_accounts'
        },
        {
            id: 'B05',
            title: 'Activity feed',
            group: 'employees',
            builder: 'B05Activity',
            dataStatus: 'fixture',
            tags: ['fixture'],
            caption: 'FIXTURE · real audit feed required'
        },
        {
            id: 'B06',
            title: 'Bank accounts',
            group: 'employees',
            builder: 'B06BankAccounts',
            dataStatus: 'fixture',
            tags: ['fixture'],
            caption: 'FIXTURE UI · list-banks endpoint exists'
        },
        {
            id: 'B07',
            title: 'Debit cards',
            group: 'employees',
            builder: 'B07DebitCards',
            dataStatus: 'concept',
            tags: ['concept'],
            caption: 'CONCEPT · no current card product or backend'
        },
        {
            id: 'B08',
            title: 'Edit employee',
            group: 'employees',
            builder: 'B08EditEmployee',
            dataStatus: 'live',
            tags: [],
            caption: 'Prefilled form with destructive actions separated'
        },
        {
            id: 'C01',
            title: 'Clients',
            group: 'clients',
            builder: 'C01Clients',
            dataStatus: 'live',
            tags: [],
            caption: 'Employer portfolio with funding and payout context'
        },
        {
            id: 'C02',
            title: 'New client',
            group: 'clients',
            builder: 'C02NewClient',
            dataStatus: 'live',
            tags: [],
            caption: 'Invitation replaces raw password creation'
        },
        {
            id: 'C03',
            title: 'Client profile',
            group: 'clients',
            builder: 'C03ClientProfile',
            dataStatus: 'live',
            tags: ['merged'],
            caption: 'Transactions default tab · also represents /clients/[id]/transactions'
        },
        {
            id: 'C04',
            title: 'Workforce roster',
            group: 'clients',
            builder: 'C04ClientRoster',
            dataStatus: 'live',
            tags: [],
            caption: 'Employer roster with status, payout account and ledger drill-down'
        },
        {
            id: 'C05',
            title: 'Funding accounts',
            group: 'clients',
            builder: 'C05ClientFunding',
            dataStatus: 'fixture',
            tags: ['fixture'],
            caption: 'FIXTURE · client bank-account API required'
        },
        {
            id: 'C06',
            title: 'Payment history',
            group: 'clients',
            builder: 'C06PaymentHistory',
            dataStatus: 'live',
            tags: [],
            caption: 'Invoice-backed history; status writes stay on the invoice resource'
        },
        {
            id: 'C07',
            title: 'Client payouts',
            group: 'clients',
            builder: 'C07ClientPayouts',
            dataStatus: 'fixture',
            tags: ['fixture'],
            caption: 'LEGACY FIXTURE · retained as a payment-schedule view'
        },
        {
            id: 'C08',
            title: 'Edit client',
            group: 'clients',
            builder: 'C08EditClient',
            dataStatus: 'live',
            tags: [],
            caption: 'Company, contact, funding and access in one form'
        },
        {
            id: 'D01',
            title: 'Team & access',
            group: 'team',
            builder: 'D01Team',
            dataStatus: 'live',
            tags: [],
            caption: 'Admins with invitation state; granular roles are proposed'
        },
        {
            id: 'D02',
            title: 'Invite admin',
            group: 'team',
            builder: 'D02InviteAdmin',
            dataStatus: 'live',
            tags: [],
            caption: 'Invitation-based onboarding; no raw password field'
        },
        {
            id: 'D03',
            title: 'Admin profile',
            group: 'team',
            builder: 'D03AdminProfile',
            dataStatus: 'ui-gap',
            tags: ['ui-gap'],
            caption: 'UI GAP · current page body is blank; API supports the view'
        },
        {
            id: 'D04',
            title: 'Edit admin',
            group: 'team',
            builder: 'D04EditAdmin',
            dataStatus: 'live',
            tags: [],
            caption: 'Access and contact editing with email-based reset'
        },
        {
            id: 'E01',
            title: 'Transactions ledger',
            group: 'finance',
            builder: 'E01Transactions',
            dataStatus: 'live',
            tags: [],
            caption: 'Dense ledger, filters and export'
        },
        {
            id: 'E02',
            title: 'Invoices',
            group: 'finance',
            builder: 'E02Invoices',
            dataStatus: 'live',
            tags: [],
            caption: 'Treated / not treated are invoice states, not overview paid / unpaid metrics'
        },
        {
            id: 'E03',
            title: 'Invoice detail',
            group: 'finance',
            builder: 'E03InvoiceDetail',
            dataStatus: 'live',
            tags: [],
            caption: 'Document, included transactions and status timeline'
        },
        {
            id: 'E04',
            title: 'Payout runs',
            group: 'finance',
            builder: 'E04PayoutRuns',
            dataStatus: 'proposed',
            tags: ['proposed'],
            caption: 'PROPOSED · replaces the duplicate payments table; new API required'
        }
    ];
    function groupFor(key) {
        const group = SCREEN_GROUPS.find((item) => item.key === key);
        if (!group) {
            throw new Error(`Unknown screen group: ${key}`);
        }
        return group;
    }
    function primaryRouteFor(screen) {
        var _a, _b, _c;
        const routes = routesForScreen(screen.id);
        const direct = routes.find((route) => route.representation === 'direct');
        return (_c = (_a = direct === null || direct === void 0 ? void 0 : direct.path) !== null && _a !== void 0 ? _a : (_b = routes[0]) === null || _b === void 0 ? void 0 : _b.path) !== null && _c !== void 0 ? _c : '—';
    }
    function tagLabel(tag) {
        const labels = {
            merged: 'MERGED',
            fixture: 'FIXTURE',
            concept: 'CONCEPT',
            'ui-gap': 'UI GAP',
            proposed: 'PROPOSED'
        };
        return labels[tag];
    }

    const BOARD_PAGE_NAME = 'AirliPay · Back Office Redesign (v1)';
    const WORKING_PAGE_NAME = 'AirliPay · Back Office Redesign (working)';
    const MARKERS = {
        board: 'airlipayBackofficeBoard',
        section: 'airlipayBackofficeSection',
        sectionKind: 'airlipayBackofficeSectionKind',
        theme: 'airlipayBackofficeTheme',
        screen: 'airlipayBackofficeScreen',
        plate: 'airlipayBackofficePlate',
        route: 'airlipayBackofficeRoute',
        run: 'airlipayBackofficeRun'
    };
    const EXPECTED_ROUTE_ROWS = ROUTES.length;
    const EXPECTED_SCREENS_PER_THEME = SCREENS.length;
    const THEME_SECTION_HEIGHT = 10100;
    const COVER_HEIGHT = 1100;
    const FOUNDATIONS_GAP = 160;
    const COVERAGE_HEIGHT = 1800;
    const dataStatusColor = {
        live: boardColors.mint,
        fixture: boardColors.warning,
        concept: boardColors.faint,
        'ui-gap': boardColors.danger,
        proposed: boardColors.cobalt
    };
    const representationLabel = {
        direct: 'Direct',
        'default-tab': 'Default tab',
        excluded: 'Excluded'
    };
    const dataStatusLabel = {
        live: 'Live',
        fixture: 'Fixture',
        concept: 'Concept',
        'ui-gap': 'UI gap',
        proposed: 'Proposed'
    };
    function boardText(parent, value, opts = {}) {
        var _a;
        return text(parent, value, {
            token: 'bodySmall',
            size: opts.size,
            lineHeight: opts.lineHeight,
            weight: opts.weight,
            color: (_a = opts.color) !== null && _a !== void 0 ? _a : boardColors.text,
            width: opts.width,
            hug: opts.hug,
            align: opts.align,
            letterSpacing: opts.letterSpacing,
            fill: false
        });
    }
    function boardTag(parent, label, color = boardColors.mint) {
        const node = hstack('Board tag', {
            height: 24,
            paddingX: 9,
            gap: 6,
            fill: boardColors.panelAlt,
            stroke: boardColors.border,
            radius: 999,
            align: 'CENTER'
        });
        parent.appendChild(node);
        const dotMark = frame('Tag dot', { width: 5, height: 5, fill: color, radius: 999 });
        node.appendChild(dotMark);
        boardText(node, label, {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.muted,
            hug: true
        });
        return node;
    }
    function dataBadge(parent, status) {
        const node = hstack('Data status', { gap: 5, height: 18, fill: null, align: 'CENTER' });
        parent.appendChild(node);
        const dotMark = frame('Status dot', {
            width: 5,
            height: 5,
            fill: dataStatusColor[status],
            radius: 999
        });
        node.appendChild(dotMark);
        boardText(node, dataStatusLabel[status], {
            size: 10,
            lineHeight: 12,
            weight: 'medium',
            color: dataStatusColor[status],
            hug: true
        });
        return node;
    }
    function sectionFrame(name, height, kind, runToken, theme) {
        const node = frame(name, {
            width: board.width,
            height,
            fill: boardColors.bg,
            stroke: boardColors.border,
            radius: 28,
            clip: true
        });
        node.setPluginData(MARKERS.section, 'true');
        node.setPluginData(MARKERS.sectionKind, kind);
        node.setPluginData(MARKERS.run, runToken);
        if (theme) {
            node.setPluginData(MARKERS.theme, theme);
        }
        return node;
    }
    function buildCover() {
        const section = sectionFrame('01 · Cover and reading guide', COVER_HEIGHT, 'cover', 'cover');
        const art = svg(section, routeArtSvg(1500, 520, boardColors.mint), 'Cover route artwork');
        art.x = 300;
        art.y = 540;
        art.opacity = 0.42;
        const left = vstack('Cover copy', {
            width: 2600,
            height: 924,
            gap: 22,
            fill: null
        });
        section.appendChild(left);
        left.x = 96;
        left.y = 88;
        logoLockup(left, {
            width: 220,
            size: 30,
            markSize: 27,
            color: boardColors.text
        });
        const tags = hstack('Cover tags', { width: 2600, height: 26, gap: 8, fill: null, align: 'CENTER' });
        left.appendChild(tags);
        boardTag(tags, 'EAS-INSPIRED OPERATIONS SHELL', boardColors.cobalt);
        boardTag(tags, 'MOBILE LIGHT + DARK THEMES', boardColors.mint);
        boardTag(tags, 'FULL ROUTE MAP', boardColors.warning);
        boardText(left, 'A back office that moves\nas fast as payroll.', {
            size: 66,
            lineHeight: 72,
            weight: 'extrabold',
            color: boardColors.text,
            width: 2300,
            letterSpacing: -1.8
        });
        boardText(left, 'A dense, accountable operations workspace built for AirliPay staff. The shell borrows Expo EAS clarity; the colour, type and money states come directly from the mobile app.', {
            size: 17,
            lineHeight: 27,
            color: boardColors.muted,
            width: 1800
        });
        const metrics = hstack('Cover metrics', { width: 2600, height: 112, gap: 18, fill: null, align: 'CENTER' });
        left.appendChild(metrics);
        [
            { value: '27', label: 'screens per theme', meta: '5 operations domains' },
            { value: '54', label: 'desktop app frames', meta: '1440 × 960 each' },
            { value: '29', label: 'live routes mapped', meta: '1 root redirect excluded' }
        ].forEach((metric) => {
            const tile = vstack('Cover metric', {
                width: 854,
                height: 112,
                gap: 2,
                padding: 16,
                fill: boardColors.panelAlt,
                stroke: boardColors.border,
                radius: 14,
                justify: 'CENTER'
            });
            metrics.appendChild(tile);
            boardText(tile, metric.value, {
                size: 34,
                lineHeight: 38,
                weight: 'bold',
                color: boardColors.mint,
                width: 822
            });
            boardText(tile, metric.label, {
                size: 12,
                lineHeight: 16,
                weight: 'semibold',
                color: boardColors.text,
                width: 822
            });
            boardText(tile, metric.meta, {
                size: 10,
                lineHeight: 13,
                color: boardColors.faint,
                width: 822
            });
        });
        const domains = hstack('Cover domains', {
            width: 2600,
            height: 28,
            gap: 8,
            fill: null,
            align: 'CENTER'
        });
        left.appendChild(domains);
        ['Access 3', 'Employees 8', 'Clients 8', 'Team 4', 'Finance 4'].forEach((label) => {
            boardTag(domains, label, boardColors.faint);
        });
        const flex = frame('Cover spacer', { width: 1, height: 1, fill: null });
        left.appendChild(flex);
        setGrow(flex);
        const footer = hstack('Cover footer', { width: 2600, height: 24, fill: null, align: 'CENTER' });
        left.appendChild(footer);
        icon(footer, 'shieldCheck', boardColors.faint, 15);
        boardText(footer, 'Static review artifact · No prototype links · October 2026', {
            size: 10,
            lineHeight: 13,
            color: boardColors.faint,
            hug: true
        });
        spacer(footer, 1, true);
        boardText(footer, 'Built from the AirlipayDashboard route map', {
            size: 10,
            lineHeight: 13,
            color: boardColors.faint,
            hug: true
        });
        const guide = vstack('Cover guide', {
            width: 1760,
            height: 924,
            padding: 32,
            gap: 18,
            fill: boardColors.panelAlt,
            stroke: boardColors.border,
            radius: 24
        });
        section.appendChild(guide);
        guide.x = 2796;
        guide.y = 88;
        boardText(guide, 'READING GUIDE', {
            size: 10,
            lineHeight: 13,
            weight: 'semibold',
            color: boardColors.mint,
            width: 1696
        });
        boardText(guide, 'One route map. Two complete themes.', {
            size: 28,
            lineHeight: 34,
            weight: 'bold',
            color: boardColors.text,
            width: 1696
        });
        boardText(guide, 'Every live dashboard route is represented. Foundations come first; the same 27 screens follow in light and dark; coverage and implementation notes close the review.', {
            size: 12,
            lineHeight: 19,
            color: boardColors.muted,
            width: 1500
        });
        const sectionsList = vstack('Guide sections', { width: 1696, gap: 0, fill: null });
        guide.appendChild(sectionsList);
        [
            { number: '01', title: 'Cover and reading guide', meta: 'What this artifact covers' },
            { number: '02', title: 'Foundations', meta: 'Tokens, shell, controls, data display' },
            { number: '03', title: 'Light theme', meta: '27 screens · 3-column gallery' },
            { number: '04', title: 'Dark theme', meta: 'The same 27 screens' },
            { number: '05', title: 'Route coverage and handoff', meta: '29 live routes · 1 excluded redirect' }
        ].forEach((row, index) => {
            const item = hstack('Guide row', {
                width: 1696,
                height: 44,
                gap: 12,
                paddingX: 2,
                fill: null,
                align: 'CENTER'
            });
            sectionsList.appendChild(item);
            boardText(item, row.number, {
                size: 11,
                lineHeight: 14,
                weight: 'semibold',
                color: boardColors.cobalt,
                width: 34,
                hug: true
            });
            boardText(item, row.title, {
                size: 13,
                lineHeight: 17,
                weight: 'medium',
                color: boardColors.text,
                width: 700,
                hug: true
            });
            spacer(item, 1, true);
            boardText(item, row.meta, {
                size: 10,
                lineHeight: 13,
                color: boardColors.faint,
                align: 'RIGHT',
                width: 680
            });
            if (index < 4) {
                const rule = frame('Guide rule', { width: 1696, height: 1, fill: boardColors.border });
                sectionsList.appendChild(rule);
            }
        });
        const themeTitle = hstack('Theme title', { width: 1696, height: 20, fill: null, justify: 'SPACE_BETWEEN', align: 'CENTER' });
        guide.appendChild(themeTitle);
        boardText(themeTitle, 'BOTH THEMES ARE COMPLETE', {
            size: 10,
            lineHeight: 13,
            weight: 'semibold',
            color: boardColors.faint,
            hug: true
        });
        boardText(themeTitle, 'Mobile token source of truth', {
            size: 10,
            lineHeight: 13,
            color: boardColors.faint,
            hug: true
        });
        const themeRow = hstack('Theme previews', { width: 1696, height: 216, gap: 18, fill: null, align: 'MIN' });
        guide.appendChild(themeRow);
        buildThemePreview(themeRow, 'light', 830, 216);
        buildThemePreview(themeRow, 'dark', 848, 216);
        const guideNote = hstack('Guide note', {
            width: 1696,
            height: 40,
            paddingX: 12,
            gap: 8,
            fill: boardColors.panel,
            stroke: boardColors.border,
            radius: 10,
            align: 'CENTER'
        });
        guide.appendChild(guideNote);
        icon(guideNote, 'info', boardColors.faint, 14);
        boardText(guideNote, 'Fixture and concept surfaces are labelled in captions and in the coverage matrix. The design does not pretend they are shipped.', {
            size: 10,
            lineHeight: 14,
            color: boardColors.muted,
            width: 1600
        });
        return section;
    }
    function buildThemePreview(parent, theme, width, height) {
        const palette = theme === 'light' ? lightColors : darkColors;
        const preview = vstack('Theme preview', { width, height, gap: 8, fill: null });
        parent.appendChild(preview);
        const canvas = frame('Preview canvas', {
            width,
            height: height - 36,
            fill: palette.canvas,
            stroke: boardColors.borderStrong,
            radius: 12,
            clip: true
        });
        preview.appendChild(canvas);
        const rail = frame('Preview rail', {
            width: 54,
            height: height - 36,
            fill: palette.sidebarBg
        });
        canvas.appendChild(rail);
        brandMark(rail, 18).x = 10;
        rail.children[rail.children.length - 1].y = 12;
        const card = frame('Preview card', {
            width: width - 142,
            height: 82,
            fill: palette.surface,
            stroke: palette.border,
            radius: 8
        });
        canvas.appendChild(card);
        card.x = 72;
        card.y = 20;
        const accent = frame('Preview accent', {
            width: 128,
            height: 7,
            fill: palette.mint,
            radius: 4
        });
        card.appendChild(accent);
        accent.x = 14;
        accent.y = 18;
        boardText(card, theme === 'light' ? 'Awa Fongang' : 'Awa Fongang', {
            size: 14,
            lineHeight: 18,
            weight: 'semibold',
            color: palette.ink,
            width: width - 174
        }).x = 14;
        card.children[card.children.length - 1].y = 34;
        boardText(card, 'XAF 184,500', {
            size: 20,
            lineHeight: 24,
            weight: 'bold',
            color: palette.ink,
            width: width - 174
        }).x = 14;
        card.children[card.children.length - 1].y = 52;
        const topbar = frame('Preview topbar', {
            width: width - 54,
            height: 22,
            fill: palette.topbarBg,
            stroke: palette.border
        });
        canvas.appendChild(topbar);
        topbar.x = 54;
        topbar.y = 0;
        const search = frame('Preview search', {
            width: 190,
            height: 12,
            fill: palette.surfaceSunken,
            stroke: palette.border,
            radius: 4
        });
        topbar.appendChild(search);
        search.x = (width - 54) - 220;
        search.y = 5;
        const chip = hstack('Preview chip', {
            height: 20,
            paddingX: 8,
            fill: palette.mintSoft,
            radius: 999,
            align: 'CENTER'
        });
        canvas.appendChild(chip);
        chip.x = 72;
        chip.y = 118;
        boardText(chip, 'Payout ready', {
            size: 9,
            lineHeight: 11,
            weight: 'semibold',
            color: palette.onMintSoft,
            hug: true
        });
        const swatches = hstack('Preview swatches', { width: width - 54 - 36, height: 24, gap: 6, fill: null, align: 'CENTER' });
        canvas.appendChild(swatches);
        swatches.x = 72;
        swatches.y = height - 36 - 32;
        [palette.navy, palette.cobalt, palette.mint, palette.surface, palette.border].forEach((color) => {
            const swatch = frame('Swatch', {
                width: 18,
                height: 18,
                fill: color,
                stroke: boardColors.borderStrong,
                radius: 999
            });
            swatches.appendChild(swatch);
        });
        spacer(swatches, 1, true);
        boardText(swatches, theme === 'light' ? 'LIGHT' : 'DARK', {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: theme === 'light' ? '#5B6B7F' : '#A9BACB',
            hug: true
        });
        const label = hstack('Theme label', { width, height: 28, gap: 8, fill: null, align: 'CENTER' });
        preview.appendChild(label);
        const dotMark = frame('Theme dot', {
            width: 7,
            height: 7,
            fill: theme === 'light' ? boardColors.mint : boardColors.cobalt,
            radius: 999
        });
        label.appendChild(dotMark);
        boardText(label, theme === 'light' ? 'Light theme · canvas #F5F7FA' : 'Dark theme · canvas #061322', {
            size: 10,
            lineHeight: 13,
            weight: 'medium',
            color: boardColors.muted,
            hug: true
        });
    }
    function buildSectionHeader(section, theme, title, subtitle) {
        const header = hstack('Band header', {
            width: 4464,
            height: 124,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        section.appendChild(header);
        header.x = 96;
        header.y = 32;
        const copy = vstack('Band title block', { width: 1900, gap: 3, fill: null });
        header.appendChild(copy);
        const eyebrow = hstack('Band eyebrow', { gap: 8, fill: null, align: 'CENTER' });
        copy.appendChild(eyebrow);
        boardTag(eyebrow, `${theme.toUpperCase()} THEME`, theme === 'light' ? boardColors.mint : boardColors.cobalt);
        boardTag(eyebrow, '27 SCREENS · 5 DOMAINS', boardColors.faint);
        boardText(copy, title, {
            size: 32,
            lineHeight: 38,
            weight: 'bold',
            color: boardColors.text,
            width: 1900,
            letterSpacing: -0.8
        });
        boardText(copy, subtitle, {
            size: 12,
            lineHeight: 18,
            color: boardColors.muted,
            width: 1700
        });
        const meta = vstack('Band meta', { gap: 8, fill: null, align: 'MAX' });
        header.appendChild(meta);
        boardText(meta, 'STATIC REVIEW ARTIFACT · 1440 × 960 FRAMES', {
            size: 10,
            lineHeight: 13,
            weight: 'semibold',
            color: boardColors.faint,
            align: 'RIGHT',
            width: 900
        });
        const groups = hstack('Group legend', { gap: 6, fill: null, align: 'CENTER' });
        meta.appendChild(groups);
        SCREEN_GROUPS.forEach((group) => {
            const count = SCREENS.filter((screen) => screen.group === group.key).length;
            boardTag(groups, `${group.label} ${count}`, group.key === 'access' ? boardColors.mint : boardColors.faint);
        });
    }
    function buildCaption(parent, opts) {
        const caption = frame('Frame caption', {
            width: 1440,
            height: 44,
            fill: null
        });
        parent.appendChild(caption);
        caption.x = opts.x;
        caption.y = opts.y;
        const idBadge = hstack('Screen id', {
            height: 20,
            paddingX: 7,
            fill: boardColors.panelAlt,
            stroke: boardColors.border,
            radius: 5,
            align: 'CENTER'
        });
        caption.appendChild(idBadge);
        boardText(idBadge, opts.spec.id, {
            size: 10,
            lineHeight: 12,
            weight: 'semibold',
            color: boardColors.mint,
            hug: true
        });
        const meta = hstack('Caption meta', { gap: 9, fill: null, align: 'CENTER' });
        caption.appendChild(meta);
        meta.x = 46;
        meta.y = 0;
        boardText(meta, opts.spec.title, {
            size: 14,
            lineHeight: 17,
            weight: 'semibold',
            color: boardColors.text,
            hug: true
        });
        const group = groupFor(opts.spec.group);
        boardText(meta, `${group.label} · ${primaryRouteFor(opts.spec)}`, {
            size: 10,
            lineHeight: 13,
            color: boardColors.faint,
            hug: true
        });
        const tags = hstack('Caption tags', { gap: 5, fill: null, align: 'CENTER' });
        caption.appendChild(tags);
        let right = 1440;
        tags.x = 1440 - 20;
        tags.y = 5;
        opts.spec.tags.forEach((tagValue) => {
            const color = tagValue === 'fixture'
                ? boardColors.warning
                : tagValue === 'concept'
                    ? boardColors.faint
                    : tagValue === 'ui-gap'
                        ? boardColors.danger
                        : tagValue === 'proposed'
                            ? boardColors.cobalt
                            : boardColors.mint;
            const badge = boardTag(tags, tagLabel(tagValue), color);
            right -= badge.width;
        });
        tags.x = right;
        boardText(caption, opts.spec.caption, {
            size: 9,
            lineHeight: 12,
            color: boardColors.faint,
            width: 1440,
            hug: false
        }).y = 25;
    }
    function buildFoundationsSection(themes, y, runToken) {
        const plateCount = themes.length;
        const height = 220 + plateCount * FOUNDATIONS_PLATE_HEIGHT + (plateCount - 1) * 40 + 80;
        const section = sectionFrame('02 · Foundations', height, 'foundations', runToken);
        section.y = y;
        const header = hstack('Foundations title', {
            width: 4464,
            height: 124,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        section.appendChild(header);
        header.x = 96;
        header.y = 32;
        const copy = vstack('Foundations copy', { width: 1900, gap: 3, fill: null });
        header.appendChild(copy);
        const eyebrow = hstack('Foundations eyebrow', { gap: 8, fill: null, align: 'CENTER' });
        copy.appendChild(eyebrow);
        boardTag(eyebrow, 'FOUNDATIONS', boardColors.mint);
        boardTag(eyebrow, 'MOBILE TOKENS → DESKTOP', boardColors.cobalt);
        boardText(copy, 'The system behind the screens', {
            size: 32,
            lineHeight: 38,
            weight: 'bold',
            color: boardColors.text,
            width: 1900,
            letterSpacing: -0.8
        });
        boardText(copy, 'One light-and-dark token set, a single Inter ramp, and a repeatable set of shell, table, form and feedback patterns.', {
            size: 12,
            lineHeight: 18,
            color: boardColors.muted,
            width: 1700
        });
        const meta = vstack('Foundations meta', { gap: 4, fill: null, align: 'MAX' });
        header.appendChild(meta);
        boardText(meta, `${plateCount} FULL-WIDTH PLATES`, {
            size: 10,
            lineHeight: 13,
            weight: 'semibold',
            color: boardColors.faint,
            align: 'RIGHT',
            width: 900
        });
        boardText(meta, '4656 px board · 2 themes · 1 language', {
            size: 10,
            lineHeight: 13,
            color: boardColors.faint,
            align: 'RIGHT',
            width: 900
        });
        themes.forEach((theme, index) => {
            setTheme(theme);
            const plate = buildFoundationsPlate(theme.toUpperCase());
            plate.setPluginData(MARKERS.plate, theme);
            plate.setPluginData(MARKERS.run, runToken);
            section.appendChild(plate);
            plate.x = 0;
            plate.y = 220 + index * (FOUNDATIONS_PLATE_HEIGHT + 40);
        });
        return { section, plateCount };
    }
    function buildCoverageRow(parent, route) {
        var _a;
        const row = hstack('Coverage row', {
            width: 4416,
            height: 31,
            paddingX: 16,
            gap: 0,
            fill: null,
            align: 'CENTER'
        });
        parent.appendChild(row);
        row.setPluginData(MARKERS.route, route.path);
        const widths = [110, 390, 320, 160, 150, 100, 0];
        const cells = [
            route.group,
            route.path,
            (_a = route.screenId) !== null && _a !== void 0 ? _a : '—',
            representationLabel[route.representation],
            dataStatusLabel[route.dataStatus],
            route.representation === 'excluded' ? '—' : 'Both'
        ];
        cells.forEach((value, index) => {
            const cell = hstack('Coverage cell', {
                width: widths[index],
                height: 31,
                fill: null,
                align: 'CENTER'
            });
            row.appendChild(cell);
            if (index === 4) {
                dataBadge(cell, route.dataStatus);
            }
            else {
                boardText(cell, value, {
                    size: 11,
                    lineHeight: 14,
                    weight: index === 1 || index === 2 ? 'medium' : 'regular',
                    color: index === 1
                        ? boardColors.text
                        : index === 2
                            ? boardColors.cobalt
                            : index === 3 && route.representation !== 'direct'
                                ? boardColors.warning
                                : boardColors.muted,
                    width: widths[index],
                    hug: index === 3
                });
            }
        });
        const note = hstack('Coverage note', { width: 3154, height: 31, fill: null, align: 'CENTER' });
        row.appendChild(note);
        boardText(note, route.note, {
            size: 11,
            lineHeight: 14,
            color: boardColors.faint,
            width: 3140,
            hug: false
        });
        return row;
    }
    function buildCoverageSection(y, runToken) {
        const section = sectionFrame('05 · Route coverage and handoff', COVERAGE_HEIGHT, 'coverage', runToken);
        section.y = y;
        const header = hstack('Coverage header', {
            width: 4464,
            height: 124,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        section.appendChild(header);
        header.x = 96;
        header.y = 32;
        const copy = vstack('Coverage copy', { width: 1900, gap: 3, fill: null });
        header.appendChild(copy);
        const eyebrow = hstack('Coverage eyebrow', { gap: 8, fill: null, align: 'CENTER' });
        copy.appendChild(eyebrow);
        boardTag(eyebrow, 'ROUTE COVERAGE', boardColors.mint);
        boardTag(eyebrow, 'HANDOFF', boardColors.cobalt);
        boardText(copy, 'Every current route, accounted for.', {
            size: 32,
            lineHeight: 38,
            weight: 'bold',
            color: boardColors.text,
            width: 1900,
            letterSpacing: -0.8
        });
        boardText(copy, 'The matrix is generated from the same catalog the screens use. Live, fixture, concept and proposed surfaces stay honest.', {
            size: 12,
            lineHeight: 18,
            color: boardColors.muted,
            width: 1700
        });
        const meta = vstack('Coverage meta', { gap: 4, fill: null, align: 'MAX' });
        header.appendChild(meta);
        boardText(meta, '29 LIVE ROUTES + 1 ROOT REDIRECT', {
            size: 10,
            lineHeight: 13,
            weight: 'semibold',
            color: boardColors.faint,
            align: 'RIGHT',
            width: 900
        });
        boardText(meta, '27 screens · 2 default-tab merges · 0 unmapped', {
            size: 10,
            lineHeight: 13,
            color: boardColors.faint,
            align: 'RIGHT',
            width: 900
        });
        const card = vstack('Coverage matrix', {
            width: 4464,
            height: 1100,
            padding: 24,
            gap: 0,
            fill: boardColors.panelAlt,
            stroke: boardColors.border,
            radius: 18
        });
        section.appendChild(card);
        card.x = 96;
        card.y = 220;
        const title = hstack('Matrix title', {
            width: 4416,
            height: 52,
            fill: null,
            justify: 'SPACE_BETWEEN',
            align: 'CENTER'
        });
        card.appendChild(title);
        const titleCopy = hstack('Matrix title copy', { gap: 10, fill: null, align: 'CENTER' });
        title.appendChild(titleCopy);
        boardText(titleCopy, 'Route matrix', {
            size: 16,
            lineHeight: 20,
            weight: 'semibold',
            color: boardColors.text,
            hug: true
        });
        boardTag(titleCopy, '30 ROWS', boardColors.mint);
        spacer(title, 1, true);
        boardText(title, 'Theme coverage: both', {
            size: 10,
            lineHeight: 13,
            color: boardColors.faint,
            hug: true
        });
        const headerRow = hstack('Matrix header', {
            width: 4416,
            height: 34,
            paddingX: 16,
            fill: boardColors.panel,
            align: 'CENTER'
        });
        card.appendChild(headerRow);
        ['GROUP', 'ROUTE', 'SCREEN', 'REPRESENTATION', 'DATA', 'THEME', 'HANDOFF NOTE'].forEach((label, index) => {
            const widths = [110, 390, 320, 160, 150, 100];
            const cell = hstack('Matrix header cell', {
                width: index === 6 ? 3154 : widths[index],
                height: 34,
                fill: null,
                align: 'CENTER'
            });
            headerRow.appendChild(cell);
            boardText(cell, label, {
                size: 9,
                lineHeight: 11,
                weight: 'semibold',
                color: boardColors.faint,
                width: index === 6 ? 3140 : undefined,
                hug: true
            });
        });
        ROUTES.forEach((route, index) => {
            const row = buildCoverageRow(card, route);
            if (index % 2 === 1) {
                row.fills = [paint(boardColors.panel)];
            }
            const rule = frame('Matrix rule', { width: 4416, height: 1, fill: boardColors.border });
            card.appendChild(rule);
        });
        const decisionsRow = hstack('Handoff cards', {
            width: 4464,
            height: 360,
            gap: 24,
            fill: null,
            align: 'MIN'
        });
        section.appendChild(decisionsRow);
        decisionsRow.x = 96;
        decisionsRow.y = 1360;
        buildDecisionCard(decisionsRow, 'What the redesign changes', [
            'A dark rail and a command bar replace the scattered navbar and sidebar behaviour; page context and tabs are URL-driven.',
            'Search and filters become working controls. Detail screens use a right inspector instead of duplicating a full table underneath.',
            'Invoice status writes stay on the invoice; roster status writes stay on the employee. The current pages send the wrong resource.',
            'Team roles, two-factor state and payout-run orchestration are clearly marked proposals, not shipped capability.'
        ]);
        buildDecisionCard(decisionsRow, 'Data truth rules', [
            'Account statuses: ACTIVE, PENDING, DEACTIVATED, BLOCKED, BANNED.',
            'Transactions: SUCCESS, PENDING, FAILED; operators come from the Prisma enum.',
            'Invoices: TREATED, NOT_TREATED, PENDING_CONFIRMATION. Overview paid/unpaid are metrics, never invoice states.',
            'Amounts are XAF; dates read 23 Oct 2026. Every mock invoice line total is validated against its totalAmount.'
        ]);
        buildDecisionCard(decisionsRow, 'Before implementation', [
            'Add route-level role guards and fix the shared list/detail Redux race.',
            'Add client-bank, audit-feed, payout-run and 2FA APIs. Replace admin-created passwords with invitations.',
            'Decide the debit-card product and the granular admin role model; both are concepts here.',
            'Review in Figma first, then port to Next.js. This plugin never edits the dashboard source.'
        ]);
        return { section, routeRowCount: ROUTES.length };
    }
    function buildDecisionCard(parent, title, items) {
        const card = vstack(`Handoff · ${title}`, {
            width: 1472,
            height: 360,
            padding: 24,
            gap: 12,
            fill: boardColors.panelAlt,
            stroke: boardColors.border,
            radius: 18
        });
        parent.appendChild(card);
        const header = hstack('Decision header', { width: 1424, height: 26, gap: 8, fill: null, align: 'CENTER' });
        card.appendChild(header);
        const dotMark = frame('Section dot', { width: 7, height: 7, fill: boardColors.mint, radius: 999 });
        header.appendChild(dotMark);
        boardText(header, title, {
            size: 18,
            lineHeight: 22,
            weight: 'semibold',
            color: boardColors.text,
            hug: true
        });
        items.forEach((item, index) => {
            const row = hstack('Decision item', { width: 1424, gap: 10, fill: null, align: 'MIN' });
            card.appendChild(row);
            boardText(row, String(index + 1).padStart(2, '0'), {
                size: 10,
                lineHeight: 17,
                weight: 'semibold',
                color: boardColors.cobalt,
                width: 26
            });
            boardText(row, item, {
                size: 12,
                lineHeight: 19,
                color: boardColors.muted,
                width: 1388
            });
        });
        return card;
    }
    async function buildBoard(page, options) {
        const themes = options.themes.length ? options.themes : ['light', 'dark'];
        const sections = [];
        let screenCount = 0;
        let plateCount = 0;
        let routeRowCount = 0;
        let cover = null;
        let y = 0;
        const totalScreens = themes.length * SCREENS.length;
        let builtScreens = 0;
        const guard = async (message, pct, log = false) => {
            if (options.isCancelled()) {
                throw new Error('cancelled');
            }
            options.report(message, pct, log);
            await new Promise((resolve) => setTimeout(resolve, 0));
            if (options.isCancelled()) {
                throw new Error('cancelled');
            }
        };
        page.setPluginData(MARKERS.board, 'v1');
        await guard('Building cover', 2, true);
        cover = buildCover();
        page.appendChild(cover);
        cover.x = 0;
        cover.y = 0;
        sections.push(cover);
        y = COVER_HEIGHT + FOUNDATIONS_GAP;
        await guard('Building foundations', 5, true);
        const foundations = buildFoundationsSection(themes, y, options.runToken);
        page.appendChild(foundations.section);
        sections.push(foundations.section);
        plateCount = foundations.plateCount;
        y += foundations.section.height + FOUNDATIONS_GAP;
        for (let themeIndex = 0; themeIndex < themes.length; themeIndex += 1) {
            const theme = themes[themeIndex];
            setTheme(theme);
            const number = themes.length === 1 ? '03' : themeIndex === 0 ? '03' : '04';
            const title = theme === 'light'
                ? 'Operations workspace, in daylight'
                : 'Operations workspace, after hours';
            const subtitle = theme === 'light'
                ? 'Navy rail, cool canvas and white work surfaces. The mobile light theme carried into a desktop shell.'
                : 'Deep navy canvas, raised cards and quiet light type. The same system, tuned for long operations shifts.';
            const section = sectionFrame(`${number} · ${theme === 'light' ? 'Light' : 'Dark'} theme — ${SCREENS.length} screens`, THEME_SECTION_HEIGHT, theme, options.runToken, theme);
            page.appendChild(section);
            section.x = 0;
            section.y = y;
            sections.push(section);
            buildSectionHeader(section, theme, title, subtitle);
            const firstTop = 256;
            for (let index = 0; index < SCREENS.length; index += 1) {
                const spec = SCREENS[index];
                builtScreens += 1;
                await guard(`Building ${theme.toUpperCase()} · ${spec.id} · ${spec.title}`, 8 + Math.round((builtScreens / totalScreens) * 82), index === 0);
                const builder = BUILDERS[spec.builder];
                if (!builder) {
                    throw new Error(`Missing builder: ${spec.builder} (${spec.id})`);
                }
                const row = Math.floor(index / 3);
                const column = index % 3;
                const x = board.columns[column];
                const screenY = firstTop + row * board.rowPitch;
                setTheme(theme);
                const screen = builder();
                if (screen.width !== board.screenWidth || screen.height !== board.screenHeight) {
                    throw new Error(`${spec.id} has the wrong frame size: ${screen.width}×${screen.height} (expected ${board.screenWidth}×${board.screenHeight})`);
                }
                screen.name = `${spec.id} · ${spec.title}`;
                screen.setPluginData(MARKERS.screen, spec.id);
                screen.setPluginData(MARKERS.theme, theme);
                screen.setPluginData(MARKERS.run, options.runToken);
                screen.strokes = [paint(boardColors.borderStrong)];
                screen.strokeWeight = 1;
                screen.strokeAlign = 'INSIDE';
                section.appendChild(screen);
                screen.x = x;
                screen.y = screenY;
                buildCaption(section, { x, y: screenY - 56, spec});
                screenCount += 1;
            }
            y += THEME_SECTION_HEIGHT + FOUNDATIONS_GAP;
        }
        await guard('Building route coverage', 93, true);
        const coverage = buildCoverageSection(y, options.runToken);
        page.appendChild(coverage.section);
        sections.push(coverage.section);
        routeRowCount = coverage.routeRowCount;
        y += coverage.section.height;
        if (!screenCount) {
            throw new Error('No screens were generated');
        }
        return {
            sections,
            screenCount,
            plateCount,
            routeRowCount,
            cover,
            summary: `${screenCount} screens · ${plateCount} foundation plates · ${routeRowCount} route rows · ${themes.length === 2 ? 'light + dark' : themes[0]} theme${themes.length === 1 ? '' : 's'}`
        };
    }
    // Kept for consumers that need to enumerate the expected marker values.
    SCREENS.map((screen) => screen.id);

    let generating = false;
    let cancelled = false;
    function post(message) {
        figma.ui.postMessage(message);
    }
    function progress(message, pct, log = false) {
        post({ type: 'progress', message, pct, log });
    }
    function uniquePageName(base, pages) {
        const names = new Set(pages.map((page) => page.name));
        if (!names.has(base)) {
            return base;
        }
        let suffix = 2;
        while (names.has(`${base} · ${suffix}`)) {
            suffix += 1;
        }
        return `${base} · ${suffix}`;
    }
    function errorDetail(error) {
        if (error instanceof Error) {
            return error.stack || error.message;
        }
        return String(error);
    }
    function themesFor(scope) {
        if (scope === 'light') {
            return ['light'];
        }
        if (scope === 'dark') {
            return ['dark'];
        }
        return ['light', 'dark'];
    }
    function collectMarked(page, key) {
        const matches = [];
        const visit = (node) => {
            node.children.forEach((child) => {
                if (child.getPluginData(key)) {
                    matches.push(child);
                }
                if ('children' in child) {
                    visit(child);
                }
            });
        };
        visit(page);
        return matches;
    }
    function runToken() {
        return `run-${Date.now().toString(36)}`;
    }
    function expectedSummary(themes) {
        return {
            sections: 3 + themes.length,
            screens: EXPECTED_SCREENS_PER_THEME * themes.length,
            plates: themes.length,
            routes: EXPECTED_ROUTE_ROWS
        };
    }
    function assertBoardStructure(page, themes) {
        const expected = expectedSummary(themes);
        const sections = page.children.filter((child) => child.getPluginData(MARKERS.section) === 'true');
        const screens = collectMarked(page, MARKERS.screen);
        const plates = collectMarked(page, MARKERS.plate);
        const routeRows = collectMarked(page, MARKERS.route);
        const lightScreens = screens.filter((screen) => screen.getPluginData(MARKERS.theme) === 'light');
        const darkScreens = screens.filter((screen) => screen.getPluginData(MARKERS.theme) === 'dark');
        if (sections.length !== expected.sections) {
            throw new Error(`Expected ${expected.sections} sections, found ${sections.length}.`);
        }
        if (screens.length !== expected.screens) {
            throw new Error(`Expected ${expected.screens} screens, found ${screens.length}.`);
        }
        if (plates.length !== expected.plates) {
            throw new Error(`Expected ${expected.plates} foundation plates, found ${plates.length}.`);
        }
        if (routeRows.length !== expected.routes) {
            throw new Error(`Expected ${expected.routes} route rows, found ${routeRows.length}.`);
        }
        if (themes.includes('light') && lightScreens.length !== EXPECTED_SCREENS_PER_THEME) {
            throw new Error(`Expected ${EXPECTED_SCREENS_PER_THEME} light screens, found ${lightScreens.length}.`);
        }
        if (themes.includes('dark') && darkScreens.length !== EXPECTED_SCREENS_PER_THEME) {
            throw new Error(`Expected ${EXPECTED_SCREENS_PER_THEME} dark screens, found ${darkScreens.length}.`);
        }
        screens.forEach((screen) => {
            if (screen.width !== 1440 || screen.height !== 960) {
                throw new Error(`Screen ${screen.name} is ${screen.width}×${screen.height}, expected 1440×960.`);
            }
        });
    }
    async function generate(scope, replace) {
        if (generating) {
            post({ type: 'error', message: 'Generation is already running.' });
            return;
        }
        generating = true;
        cancelled = false;
        const themes = themesFor(scope);
        const previousPage = figma.currentPage;
        let staging = null;
        let finalPage = null;
        let movedSections = [];
        try {
            progress('Checking Inter fonts…', 2);
            const fontResult = await preloadFonts();
            fontResult.warnings.forEach((warning) => progress(warning, 3, true));
            await figma.loadAllPagesAsync();
            const pages = figma.root.children;
            const existingGenerated = pages.find((page) => page.getPluginData(MARKERS.board) === 'v1');
            if (existingGenerated && !replace) {
                post({
                    type: 'error',
                    message: 'An AirliPay back-office board already exists.',
                    detail: 'Enable “Replace previous generated board” to update it safely, or delete the marked board page first.'
                });
                return;
            }
            const finalName = existingGenerated
                ? existingGenerated.name
                : uniquePageName(BOARD_PAGE_NAME, pages);
            const stagingName = uniquePageName(WORKING_PAGE_NAME, pages);
            staging = figma.createPage();
            staging.name = stagingName;
            staging.setPluginData(MARKERS.run, runToken());
            await figma.setCurrentPageAsync(staging);
            const token = runToken();
            const result = await buildBoard(staging, {
                themes,
                runToken: token,
                report: (message, pct, log) => progress(message, Math.round(5 + pct * 0.9), log),
                isCancelled: () => cancelled
            });
            if (cancelled) {
                throw new Error('cancelled');
            }
            progress('Checking generated structure…', 97);
            assertBoardStructure(staging, themes);
            if (existingGenerated) {
                const oldSections = existingGenerated.children.filter((child) => child.getPluginData(MARKERS.section) === 'true');
                const newSections = staging.children.filter((child) => child.getPluginData(MARKERS.section) === 'true');
                try {
                    newSections.forEach((section) => {
                        existingGenerated.appendChild(section);
                        movedSections.push(section);
                    });
                }
                catch (error) {
                    movedSections.forEach((section) => section.remove());
                    movedSections = [];
                    throw error;
                }
                oldSections.forEach((section) => section.remove());
                existingGenerated.setPluginData(MARKERS.board, 'v1');
                await figma.setCurrentPageAsync(existingGenerated);
                staging.remove();
                staging = null;
                finalPage = existingGenerated;
            }
            else {
                staging.name = finalName;
                staging.setPluginData(MARKERS.board, 'v1');
                await figma.setCurrentPageAsync(staging);
                finalPage = staging;
                staging = null;
            }
            progress('Board committed.', 100);
            if (result.cover) {
                figma.viewport.scrollAndZoomIntoView([result.cover]);
            }
            else {
                const firstSection = finalPage.children.find((child) => child.getPluginData(MARKERS.section) === 'true');
                if (firstSection) {
                    figma.viewport.scrollAndZoomIntoView([firstSection]);
                }
            }
            figma.notify('AirliPay back-office board generated');
            post({
                type: 'done',
                message: 'Back-office design board generated.',
                summary: `${result.summary} · ${existingGenerated ? 'replaced generated sections on the existing board' : 'new board page created'}.`
            });
        }
        catch (error) {
            if (staging) {
                try {
                    staging.remove();
                }
                catch (_a) {
                    // The staging page may already be committed or removed by Figma.
                }
            }
            movedSections.forEach((section) => {
                try {
                    section.remove();
                }
                catch (_a) {
                    // The section may already be gone.
                }
            });
            try {
                await figma.setCurrentPageAsync(previousPage);
            }
            catch (_b) {
                // The previous page may have been deleted during generation.
            }
            if (error instanceof Error && error.message === 'cancelled') {
                post({ type: 'cancelled', message: 'Generation cancelled. The existing board is unchanged.' });
                return;
            }
            const summary = error instanceof Error ? error.message : 'Unknown error';
            console.error(error);
            figma.notify(`Back-office generation failed: ${summary}`, { error: true, timeout: 10000 });
            post({
                type: 'error',
                message: 'Generation failed. See the log for details.',
                detail: errorDetail(error)
            });
        }
        finally {
            generating = false;
        }
    }
    figma.showUI(__html__, {
        width: 404,
        height: 652,
        themeColors: true
    });
    figma.ui.onmessage = (message) => {
        if (!message || typeof message.type !== 'string') {
            return;
        }
        if (message.type === 'generate') {
            const scope = message.scope === 'light' || message.scope === 'dark' ? message.scope : 'both';
            void generate(scope, Boolean(message.replace));
            return;
        }
        if (message.type === 'cancel') {
            if (generating) {
                cancelled = true;
                progress('Cancelling after the current screen…', 0);
            }
            return;
        }
        if (message.type === 'close') {
            figma.closePlugin();
        }
    };

})();
