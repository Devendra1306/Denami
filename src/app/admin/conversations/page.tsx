import connectToDatabase from '@/lib/db/mongodb';
import { Conversation, IConversation } from '@/models/Conversation';
import { format } from 'date-fns';
import { MessageSquare, PhoneCall, Clock, Info, ShieldAlert } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function ConversationsPage() {
  let conversations: Array<IConversation & { _id: string }> = [];
  let dbError = false;

  try {
    await connectToDatabase();
    conversations = await Conversation.find({}).sort({ createdAt: -1 }).lean() as unknown as Array<IConversation & { _id: string }>;
  } catch (e) {
    dbError = true;
    console.error("Failed to fetch conversations", e);
  }

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}m ${s}s`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center bg-card/40 border border-border p-8 rounded-3xl backdrop-blur-md shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-50 mix-blend-overlay"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
            AI Voice Transmissions
          </h1>
          <p className="text-muted-foreground text-lg">Real-time analysis and logs of all Omnidimension AI calls.</p>
        </div>
        <div className="relative z-10 bg-blue-500/10 border border-blue-500/20 text-blue-500 px-6 py-3 rounded-2xl font-bold text-lg shadow-lg flex items-center gap-2">
          <PhoneCall className="w-5 h-5" />
          {conversations.length} Logs
        </div>
      </div>

      {dbError && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-500 p-6 rounded-2xl flex items-start gap-4 shadow-lg">
          <ShieldAlert className="w-6 h-6 shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">Database Connection Unavailable</h3>
            <p className="opacity-80">We could not retrieve live conversations due to a network or database configuration error.</p>
          </div>
        </div>
      )}

      <div className="bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 p-6 rounded-2xl flex items-start gap-4 shadow-lg backdrop-blur-sm">
        <Info className="shrink-0 mt-1" size={24} />
        <div>
          <h4 className="font-bold text-lg tracking-tight mb-1">Webhook Telemetry Required</h4>
          <p className="opacity-80 leading-relaxed">
            To stream live AI call data into this registry, configure your Omnidimension or ElevenLabs webhook to execute a POST request to <code className="bg-black/40 px-2 py-0.5 rounded text-indigo-200">https://yourdomain.com/api/conversations</code> immediately after an agent disconnects.
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-muted-foreground border-b border-white/10 uppercase tracking-widest text-xs">
              <tr>
                <th className="px-8 py-5 font-bold">Caller Entity</th>
                <th className="px-8 py-5 font-bold">AI Agent</th>
                <th className="px-8 py-5 font-bold">Duration</th>
                <th className="px-8 py-5 font-bold">Link Status</th>
                <th className="px-8 py-5 font-bold">Timestamp</th>
                <th className="px-8 py-5 font-bold text-right">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {conversations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center text-muted-foreground">
                    <div className="flex justify-center mb-4 opacity-30">
                      <MessageSquare className="w-12 h-12" />
                    </div>
                    No incoming transmissions recorded. Standing by for webhooks...
                  </td>
                </tr>
              ) : (
                conversations.map((conv) => (
                  <tr key={conv._id.toString()} className="hover:bg-white/5 transition-all duration-300">
                    <td className="px-8 py-5 font-medium flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <PhoneCall size={16} className="text-blue-500" />
                      </div>
                      <span className="font-mono text-base">{conv.callerId}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold tracking-wide bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <MessageSquare size={14} />
                        {conv.agentName}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-muted-foreground">
                      <span className="flex items-center gap-2 font-medium">
                        <Clock size={16} className="opacity-70" />
                        {formatDuration(conv.durationSeconds)}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold tracking-wider border ${
                        conv.status === 'Completed' 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                      }`}>
                        {conv.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-muted-foreground font-medium">
                      {format(new Date(conv.createdAt), 'MMM dd, yyyy HH:mm')}
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button className="text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg font-bold text-xs transition-colors">Decrypt Transcript</button>
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
