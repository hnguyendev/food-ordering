// import useGeolocation from "@/store/useGeolocation";
import Hint from "./Hint";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LocateFixed } from "lucide-react";

import { Dispatch, FC, SetStateAction } from "react";

interface AddressInputProps {
  address?: string;
  setAddress: Dispatch<SetStateAction<string>>;
}

const AddressInput: FC<AddressInputProps> = ({ address, setAddress }) => {
  // const { getAddress } = useGeolocation();
  return (
    <div className="space-y-2 my-4">
      <p className="text-sm lg:text-base">Confirm your address</p>
      <div className="flex gap-x-1">
        <Input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
        />
        <Hint label="Get location" side="bottom" asChild>
          <Button onClick={() => {}} type="submit" size="sm" variant="ghost">
            <LocateFixed className="h-5 w-5 text-muted-foreground" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default AddressInput;
