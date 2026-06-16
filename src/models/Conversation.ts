import mongoose, { Schema, Document } from 'mongoose';

export interface IConversation extends Document {
  callerId: string;
  agentName: string;
  durationSeconds: number;
  status: 'Completed' | 'Abandoned' | 'Failed';
  transcript: string;
  recordingUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ConversationSchema = new Schema<IConversation>(
  {
    callerId: { type: String, required: true },
    agentName: { type: String, required: true },
    durationSeconds: { type: Number, required: true },
    status: { type: String, enum: ['Completed', 'Abandoned', 'Failed'], required: true },
    transcript: { type: String, default: '' },
    recordingUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>('Conversation', ConversationSchema);
