import FormInput from "@/components/FormInput";
import useUser from "@/hooks/auth/useUser";
import useProfile from "@/hooks/profiles/useProfile";

const UpdateUserData = () => {
  const { data } = useUser();
  const userFullName = data?.user_metadata.fullName as string;
  const email = data?.email as string;
  const { profile } = useProfile();
  const phone = profile?.phone as string;
  const address = profile?.address as string;

  return (
    <form className="flex flex-col gap-y-6 px-6 py-4 pb-10 max-w-3xl w-full bg-background border border-gray-500 rounded-lg">
      <h3 className="font-medium text-sm lg:text-lg">Update user data</h3>
      <FormInput id="email" value={email} label="Email" disabled />
      <FormInput id="fullName" value={userFullName} label="Full name" />
      <FormInput id="phone" value={phone} label="Phone number" />
      <FormInput id="address" value={address} label="Address" />
    </form>
  );
};

export default UpdateUserData;
