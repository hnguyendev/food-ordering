import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/auth/useUser";
import useProfile from "@/hooks/profiles/useProfile";
import useUpdateProfile from "@/hooks/profiles/useUpdateProfile";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, data } = useUser();
  const userId = data?.id as string;

  const { data: profile } = useProfile(userId);

  const { mutate: updateProfile } = useUpdateProfile();

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!phone && !address) return;

    updateProfile({ id: userId, phone, address });
    setPhone("");
    setAddress("");
  };

  if (!data) return null;

  return (
    <div>
      Users
      <div className="flex flex-col gap-y-4">
        <p>Phone: {profile?.phone}</p>
        <p>Address: {profile?.address}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-6 w-full max-w-xl mx-auto"
      >
        <Input
          id="phone"
          type="text"
          label="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Input
          id="address"
          type="text"
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <Button type="submit">Sumbit</Button>
      </form>
    </div>
  );
};

export default Users;
