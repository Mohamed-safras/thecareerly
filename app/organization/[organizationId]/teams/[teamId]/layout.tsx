// import React from "react";
// import ProtectedClientShell from "@/features/auth/components/protected-client-shell";
// import { Roles } from "@/lib/role";

// type Props = {
//   children: React.ReactNode;
//   params: { organizationId: string; teamId: string };
// };

// export default async function TeamLayout({ children }: Props) {
//   return (
//     <ProtectedClientShell
//       allowedRoles={[Roles.ORGANIZATION_ADMIN]}
//       requireTeamId={false}
//     >
//       {children}
//     </ProtectedClientShell>
//   );
// }
