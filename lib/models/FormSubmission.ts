import mongoose, { Document, Schema } from 'mongoose';

export interface IFormSubmission extends Document {
  name: string;
  email: string;
  network?: string;
  phone?: string;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

const FormSubmissionSchema = new Schema<IFormSubmission>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    maxlength: 150
  },
  network: {
    type: String,
    trim: true,
    maxlength: 100
  },
  phone: {
    type: String,
    trim: true,
    maxlength: 20
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: {
    type: String,
    trim: true
  },
  userAgent: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  collection: 'form_submissions'
});

// Create index for faster queries
FormSubmissionSchema.index({ email: 1 });
FormSubmissionSchema.index({ submittedAt: -1 });

// Check if model already exists to prevent OverwriteModelError
export default mongoose.models.FormSubmission || mongoose.model<IFormSubmission>('FormSubmission', FormSubmissionSchema);
