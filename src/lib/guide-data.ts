export type GuideSection = {
  title: string;
  route: string;
  pageRange: string;
  summary: string;
};

export const guideSections: GuideSection[] = [
  {
    title: "To Apply Member",
    route: "/apply-member",
    pageRange: "Pages 2-6",
    summary:
      "Member registration steps, payment link flow, MPU payment confirmation, and email verification.",
  },
  {
    title: "Forgot Password",
    route: "/forgot-password",
    pageRange: "Pages 7-10",
    summary:
      "Forgot-password process with verification code, reset form, and completion message.",
  },
  {
    title: "Login",
    route: "/login",
    pageRange: "Pages 11-12",
    summary: "Login entry point for registered members and sub-members.",
  },
  {
    title: "Member Dashboard",
    route: "/dashboard",
    pageRange: "Pages 12-13",
    summary:
      "Operational dashboard with Make Payment, Message from MOC, In Progress, and Completed queues.",
  },
  {
    title: "Search HS Code",
    route: "/search-hs",
    pageRange: "Pages 13-14",
    summary:
      "Search HS items by License/Permit type, section, and HS code type for licensing decisions.",
  },
  {
    title: "View Profile and Edit",
    route: "/profile",
    pageRange: "Pages 14-15",
    summary:
      "Member profile overview, edit workflow, and save changes process.",
  },
  {
    title: "Member Extension",
    route: "/member-extension",
    pageRange: "Pages 16-17",
    summary:
      "Apply extension confirmation and MPU online payment for extension.",
  },
  {
    title: "Change Password",
    route: "/change-password",
    pageRange: "Page 17",
    summary:
      "Change password flow using current password and new credentials.",
  },
  {
    title: "Recommendations",
    route: "/recommendations",
    pageRange: "Pages 17-18",
    summary:
      "Recommendation listing from relevant government agencies.",
  },
  {
    title: "Create Sub-member",
    route: "/sub-member/create",
    pageRange: "Pages 18-20",
    summary:
      "Create sub-member from listing and submission form.",
  },
  {
    title: "Deactivate Sub-member",
    route: "/sub-member/deactivate",
    pageRange: "Pages 20-22",
    summary:
      "Deactivate sub-member with confirmation and success feedback.",
  },
  {
    title: "Activate Sub-member",
    route: "/sub-member/activate",
    pageRange: "Pages 22-24",
    summary:
      "Activate sub-member with confirmation and status change back to active.",
  },
  {
    title: "Payment History",
    route: "/payment-history",
    pageRange: "Dashboard Menu",
    summary:
      "Historical payment transactions for member-level tracking and audit.",
  },
];

export const dashboardLists = [
  {
    name: "Make Payment List",
    colorClass: "bg-card-red",
    description: "Applications that require payment.",
  },
  {
    name: "Message from MOC List",
    colorClass: "bg-card-cyan",
    description: "Applications with messages from MOC officers.",
  },
  {
    name: "In Progress List",
    colorClass: "bg-card-amber",
    description: "Applications submitted to MOC section.",
  },
  {
    name: "Completed List",
    colorClass: "bg-card-green",
    description: "Applications ready for trader printing.",
  },
] as const;
