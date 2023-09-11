interface ResetPasswordPageProps {
  params: {
    resetToken: string;
  };
}
const ResetPasswordPage = ({
  params: { resetToken },
}: ResetPasswordPageProps) => {
  return <div>reset token : {resetToken}</div>;
};

export default ResetPasswordPage;
