import { signOut } from "@/actions/signOut";
import { Button } from "@/components/ui/button";
import React from "react";

const SignOutButton = () => {
  return (
    <form>
      <Button
        formAction={signOut}
        variant="link"
        className="cursor-pointer hover:no-underline"
      >
        <span className="text-white font-bold text-sm">Sign Out</span>
      </Button>
    </form>
  );
};

export default SignOutButton;
