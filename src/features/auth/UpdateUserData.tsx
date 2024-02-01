import FileInput from "@/components/FileInput";
import FormInput from "@/components/FormInput";
import FullPageSpinner from "@/components/FullPageSpinner";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import useProfile from "@/hooks/profiles/useProfile";

const UpdateUserData = () => {
  const { data } = useUser();
  const userFullName = data?.user_metadata.fullName as string;
  const email = data?.email as string;
  const { profile, isLoading } = useProfile();
  const phone = profile?.phone as string;
  const address = profile?.address as string;
  const avatar = profile?.avatar_url as string;

  // const [email, setEmail] = useState(data?.email as string);
  // const [fullName, setFullName] = useState(userFullName);
  // const [phone, setPhone] = useState(profile?.phone as string);
  // const [address, setAddress] = useState(profile?.address as string);

  if (isLoading) return <FullPageSpinner />;

  return (
    <div className="flex flex-col gap-y-2">
      <form className="flex flex-col gap-y-6 px-6 py-4 max-w-3xl bg-background border border-gray-500 rounded-lg">
        <h3 className="font-medium text-sm lg:text-lg">Update user data</h3>
        <FormInput id="email" value={email} label="Email" disabled />
        <FormInput id="fullName" value={userFullName} label="Full name" />
        <FormInput id="phone" value={phone} label="Phone number" />
        <FormInput id="address" value={address} label="Address" />
        <FileInput id="avatar" value={avatar} label="Avatar" />
        <div className="space-x-4 flex justify-end">
          <Button type="submit">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserData;
