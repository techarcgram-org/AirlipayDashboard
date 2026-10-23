import { colors, radii, screen } from '../tokens';
import {
  avatar,
  frame,
  hstack,
  icon,
  setFillWidth,
  spacer,
  text,
  vstack
} from '../primitives';
import {
  button,
  dataTable,
  field,
  horizontalRule,
  iconButton,
  iconTile,
  infoBanner,
  keyValueRow,
  progressBar,
  searchField,
  sectionHeader,
  segmented,
  statusPill,
  tableFooter,
  tag,
  type FieldOptions,
  type TableColumn,
  type TableRow
} from '../patterns';
import { appScreen, type PageOptions } from '../patterns/shell';
import {
  admins,
  currentUser,
  dateLabel,
  dateTimeLabel,
  formatNumber,
  money,
  statusLabel,
  type Admin
} from '../data';
import {
  adminTitlePrefix,
  cardTitleBar,
  filterBar,
  filterButton,
  miniStat
} from './shared';
import { fieldRow, formSectionTitle } from './employees';

const selectedAdmin = admins[1]!;

function adminPageOptions(admin: Admin): PageOptions {
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

function roleCard(
  parent: FrameNode,
  opts: { name: string; description: string; count: string; tone: 'brand' | 'success' | 'warning' | 'neutral' }
): FrameNode {
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

function adminFormBody(body: FrameNode, admin?: Admin): void {
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
  fieldRow(
    form,
    {
      label: 'Full name',
      value: admin?.name,
      placeholder: 'e.g. Jude Ekema',
      icon: 'profile',
      required: true
    },
    {
      label: 'Work email',
      value: admin?.email,
      placeholder: 'name@airlipay.cm',
      icon: 'mail',
      required: true
    }
  );
  fieldRow(
    form,
    {
      label: 'Role',
      value: admin?.role,
      placeholder: 'Select role',
      variant: 'select',
      required: true
    },
    {
      label: 'Workspace focus',
      value: admin?.focus,
      placeholder: 'Select focus',
      variant: 'select',
      required: true
    }
  );

  formSectionTitle(form, 'Contact & address', 'Used for recovery and audit records', 696);
  fieldRow(
    form,
    {
      label: 'Primary phone',
      value: admin?.phone,
      placeholder: '+237 6 00 00 00 00',
      icon: 'phone',
      required: true
    },
    {
      label: 'Secondary phone',
      placeholder: '+237 6 00 00 00 00',
      icon: 'phone'
    }
  );
  fieldRow(
    form,
    {
      label: 'Street',
      value: admin?.street,
      placeholder: 'Street address',
      icon: 'mapPin'
    },
    {
      label: 'City',
      value: admin?.city,
      placeholder: 'City'
    }
  );
  fieldRow(
    form,
    {
      label: 'Region',
      value: admin?.region,
      placeholder: 'Select region',
      variant: 'select'
    },
    null
  );

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
  text(
    inviteCopy,
    admin
      ? 'The current password is never exposed. A reset link expires after 30 minutes.'
      : 'No password is created by the administrator. The link expires after 48 hours and requires 2FA setup.',
    {
      token: 'caption',
      color: colors.muted,
      width: 598,
      fill: false
    }
  );
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
  } else {
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
    ['Two-factor authentication is required.', 'Sessions expire after 30 minutes of inactivity.', 'Every action is written to the audit log.'].forEach(
      (line) => {
        const row = hstack('Security line', { width: 320, height: 28, gap: 7, fill: null, align: 'CENTER' });
        helper.appendChild(row);
        icon(row, 'checkCircle', colors.success, 13);
        text(row, line, {
          token: 'caption',
          color: colors.muted,
          width: 294,
          fill: false
        });
      }
    );
    horizontalRule(helper, 320);
    sectionHeader(helper, 'Onboarding check', { width: 320, icon: 'key' });
    keyValueRow(helper, 'Invitation channel', 'Email', { width: 320 });
    keyValueRow(helper, 'Expires', '48 hours', { width: 320 });
    keyValueRow(helper, 'First action', 'Enable 2FA', { width: 320 });
    spacer(helper, 1, true);
    tag(helper, 'No raw password field', 'success', { icon: 'shieldCheck', size: 'sm' });
  }
}

export function D01Team(): FrameNode {
  return appScreen(
    {
      nav: 'team',
      breadcrumbs: ['AirliPay', 'Operations', 'Team & access'],
      title: 'Team & access',
      subtitle: '4 administrators · 3 with two-factor enabled · 1 pending invitation.',
      actions: (row) => {
        button(row, 'Audit log', { variant: 'secondary', icon: 'activity' });
        button(row, 'Invite admin', { variant: 'primary', icon: 'plus' });
      }
    },
    (body) => {
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
      const columns: TableColumn[] = [
        { key: 'member', label: 'MEMBER', width: 300, type: 'identity' },
        { key: 'role', label: 'ACCESS', width: 140 },
        { key: 'active', label: 'LAST ACTIVE', width: 160 },
        { key: 'status', label: 'STATUS', width: 136, type: 'status', align: 'RIGHT' }
      ];
      const rows: TableRow[] = admins.map((admin) => ({
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
    }
  );
}

export function D02InviteAdmin(): FrameNode {
  return appScreen(
    {
      nav: 'team',
      breadcrumbs: ['Team & access', 'Invite admin'],
      title: 'Invite admin',
      subtitle: 'Invite a staff member to the AirliPay operations console. No password is created here.',
      actions: (row) => {
        button(row, 'Cancel', { variant: 'ghost' });
        button(row, 'Send invitation', { variant: 'primary', icon: 'send' });
      }
    },
    (body) => {
      const layout = hstack('Admin form layout', {
        width: screen.contentWidth,
        height: 740,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(layout);
      adminFormBody(layout);
    }
  );
}

function adminEvents(admin: Admin): Array<{ title: string; detail: string; date: string; tone: 'success' | 'info' | 'neutral' }> {
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

export function D03AdminProfile(): FrameNode {
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
        const item = detailsData[rowIndex * 3 + colIndex]!;
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

export function D04EditAdmin(): FrameNode {
  return appScreen(
    {
      nav: 'team',
      breadcrumbs: ['Team & access', selectedAdmin.name, 'Edit'],
      title: 'Edit admin',
      subtitle: `Update ${selectedAdmin.name}'s identity, access and contact details.`,
      actions: (row) => {
        button(row, 'Cancel', { variant: 'ghost' });
        button(row, 'Save changes', { variant: 'primary', icon: 'check' });
      }
    },
    (body) => {
      const layout = hstack('Edit admin layout', {
        width: screen.contentWidth,
        height: 740,
        gap: 16,
        fill: null,
        align: 'MIN'
      });
      body.appendChild(layout);
      adminFormBody(layout, selectedAdmin);
    }
  );
}
