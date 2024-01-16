import useUser from "@/hooks/auth/useUser";

const Users = () => {
  const { data } = useUser();

  return <div>Users: {data?.user_metadata?.fullName}</div>;
};

export default Users;
