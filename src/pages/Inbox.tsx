import { Bell } from "lucide-react";

const Inbox = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="rounded-2xl border-2 border-border p-6">
          <Bell className="h-12 w-12 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h2 className="text-lg font-medium text-muted-foreground">No notifications</h2>
      </div>
    </div>
  );
};

export default Inbox;
