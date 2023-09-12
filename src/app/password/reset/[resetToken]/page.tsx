import ResetPasswordForm from "@/components/ResetPasswordForm";

interface ResetPasswordPageProps {
  params: {
    resetToken: string;
  };
}
const ResetPasswordPage = ({
  params: { resetToken },
}: ResetPasswordPageProps) => {
  return <ResetPasswordForm resetToken={resetToken} />;
};

export default ResetPasswordPage;
