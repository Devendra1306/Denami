import connectToDatabase from '@/lib/db/mongodb';
import { User, IUser } from '@/models/User';
import { format } from 'date-fns';
import { Shield, ShieldAlert, User as UserIcon } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  let users: Array<IUser & { _id: string }> = [];
  let dbError = false;

  try {
    await connectToDatabase();
    users = await User.find({}).sort({ createdAt: -1 }).lean() as unknown as Array<IUser & { _id: string }>;
  } catch (e) {
    dbError = true;
    console.error("Failed to fetch users", e);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center bg-card/40 border border-border p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-purple-500/10 opacity-50 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            User Security & Access
          </h1>
          <p className="text-muted-foreground text-lg">Monitor, audit, and manage all authenticated identities.</p>
        </div>
        <div className="relative z-10 bg-red-500/10 border border-red-500/20 text-red-500 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg flex items-center gap-2">
          <UserIcon className="w-5 h-5" />
          {users.length} Identities
        </div>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-6 rounded-2xl flex items-start gap-4">
          <ShieldAlert className="w-6 h-6 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Database Connection Unavailable</h3>
            <p className="opacity-80">We could not retrieve live users right now due to a network or database configuration error.</p>
          </div>
        </div>
      )}

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted-foreground border-b border-white/10 uppercase tracking-widest text-xs">
              <tr>
                <th className="px-8 py-5 font-bold">Identity</th>
                <th className="px-8 py-5 font-bold">Clearance Level</th>
                <th className="px-8 py-5 font-bold">System UID</th>
                <th className="px-8 py-5 font-bold">First Seen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center text-muted-foreground">
                    <div className="flex justify-center mb-4 opacity-50">
                      <Shield className="w-12 h-12" />
                    </div>
                    No users found in database registry.
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u._id.toString()} className="hover:bg-white/5 transition-all duration-300">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img 
                          src={u.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${u.displayName || u.email}&backgroundColor=ef4444`} 
                          alt="Avatar" 
                          className="w-12 h-12 rounded-xl border border-white/10 shadow-lg"
                        />
                        <div>
                          <div className="font-bold text-foreground text-base tracking-tight">{u.displayName || 'No Name Provided'}</div>
                          <div className="text-muted-foreground text-sm opacity-70">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-xl text-xs font-bold tracking-wider ${
                        u.role === 'admin' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                          : 'bg-white/5 text-muted-foreground border border-white/10'
                      }`}>
                        {u.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-5 font-mono text-xs text-muted-foreground opacity-70">
                      {u.firebaseUid}
                    </td>
                    <td className="px-8 py-5 text-muted-foreground font-medium">
                      {format(new Date(u.createdAt), 'MMM dd, yyyy')}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
