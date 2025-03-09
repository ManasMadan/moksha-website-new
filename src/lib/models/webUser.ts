import mongoose, { Schema, models } from 'mongoose';

const webUserSchema = new Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
  },
  mobile: {
    type: String,   
    validate: {
      validator: function(v: string) {
        return /^\d{10}$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid mobile number!`
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v: string) {
        return /^[\w.-]+@[\w.-]+\.\w+$/.test(v);
      },
      message: (props: { value: string }) => `${props.value} is not a valid email!`
    }
  },
  collegeName: {
    type: String,    
  },
  dob: {
    type: Date,    
  },
  password: {
    type: String,
    required: function(this: any) {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    sparse: true,
  },
  isProfileComplete: {
    type: Boolean,
    default: function(this: any) {
      return Boolean(this.fullName && this.mobile && this.email && this.collegeName && this.dob);
    }
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const webUser = models.webUser || mongoose.model('webUser', webUserSchema);
export default webUser;