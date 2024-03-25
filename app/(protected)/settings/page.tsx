import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <div>Settings</div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit" className="text-white bg-blue-700 rounded-lg px-5 py-2.5">Sign Out</button>
      </form>
    </div>
  );
};

export default SettingsPage;
