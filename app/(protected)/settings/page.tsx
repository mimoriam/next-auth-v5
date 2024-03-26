"use client";

import { logoutAction } from "@/actions/logout-action";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  return (
    <div>
      {JSON.stringify(user)}
      <button
        type="submit"
        className="text-white bg-blue-700 rounded-lg px-5 py-2.5"
        onClick={() => {
          logoutAction().then();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default SettingsPage;
