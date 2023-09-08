export type User = {
  name: string;
  _id: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: "user" | "admin";
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
};
