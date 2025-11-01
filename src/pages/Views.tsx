import { Layers, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const views = [
  {
    id: "all-issues",
    name: "All issues",
    description: "awdawd",
    icon: Layers,
    owner: { name: "Amrinder Singh", avatar: "AS", color: "bg-green-500" },
  },
];

const Views = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border">
        <div className="flex items-center gap-4 px-6 py-3">
          <h1 className="text-xl font-semibold">Views</h1>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="sm">
              <Plus className="mr-1 h-3 w-3" />
              New view
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 border-b border-border bg-background">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-6 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Owner</th>
            </tr>
          </thead>
          <tbody>
            {views.map((view) => (
              <tr key={view.id} className="group border-b border-border hover:bg-card/50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-3">
                    <view.icon className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">{view.name}</div>
                      <div className="text-xs text-muted-foreground">{view.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium text-white ${view.owner.color}`}
                    >
                      {view.owner.avatar}
                    </div>
                    <span className="text-sm">{view.owner.name}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Views;
