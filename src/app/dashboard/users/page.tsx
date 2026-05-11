import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const { userId } = await auth();

  // Security: Only allow the Master Users
  const MASTER_USER_IDS = [
    "user_3BTsg6kSbYZtxfN2v95I3mUEnyj",
    "user_3DZ2kNO4aJttcHWOCvEVLGetvDg",
    "user_3DZ2dDCPdOnudmhX2MyuM8uPAnC",
    "user_3DZ2TDJjPROri8pIXILJByTdONg",
    "user_3DZ274PkqLpOkYZPkEOdI9xumPX",
  ];

  const { sessionClaims } = await auth();
  const isAdmin = (sessionClaims as any)?.metadata?.role === "admin";

  if (!userId || (!MASTER_USER_IDS.includes(userId) && !isAdmin)) {
    redirect("/dashboard");
  }

  // Fetch all users from Clerk
  const client = await clerkClient();
  const response = await client.users.getUserList();
  const allUsers = response.data;

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto bg-background min-h-screen">
      <header className="space-y-2 border-b border-border pb-8">
        <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-bold">
          System Administration
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-foreground italic">
          Client{" "}
          <span className="not-italic font-black text-primary">Directory</span>
        </h1>
      </header>

      <div className="border border-border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50 border-b border-border">
              <th className="p-4 text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
                Full Name
              </th>
              <th className="p-4 text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
                Email Address
              </th>
              <th className="p-4 text-[10px] uppercase font-bold text-zinc-500 tracking-widest text-center">
                User ID
              </th>
              <th className="p-4 text-[10px] uppercase font-bold text-zinc-500 tracking-widest">
                Joined
              </th>
              <th className="p-4 text-[10px] uppercase font-bold text-zinc-500 tracking-widest text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {allUsers.map((u) => {
              const email = u.emailAddresses[0]?.emailAddress;
              return (
                <tr
                  key={u.id}
                  className="border-b border-border hover:bg-zinc-50 transition-colors group"
                >
                  <td className="p-4 font-bold text-zinc-900">
                    {u.firstName} {u.lastName || ""}
                  </td>
                  <td className="p-4 text-xs font-medium text-zinc-600">
                    {email}
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-[9px] font-mono text-zinc-400 bg-zinc-100 px-2 py-1 rounded">
                      {u.id}
                    </span>
                  </td>
                  <td className="p-4 text-[10px] text-zinc-500 font-medium uppercase">
                    {new Date(u.createdAt).toLocaleDateString("en-GB")}
                  </td>
                  <td className="p-4 text-right">
                    <a
                      href={`/dashboard/records?email=${email}`}
                      className="text-[10px] font-bold text-primary uppercase border border-primary/20 px-3 py-2 hover:bg-primary hover:text-white transition-all inline-block"
                    >
                      View Assets
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
