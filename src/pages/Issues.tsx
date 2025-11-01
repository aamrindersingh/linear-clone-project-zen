import { Circle, MoreHorizontal, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const issues = [
  {
    id: "WEF-6",
    title: "sdad",
    status: "backlog",
    priority: null,
    date: "Nov 1",
    assignee: { name: "Amrinder Singh", avatar: "AS", color: "bg-green-500" },
  },
];

const Issues = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border">
        <div className="flex items-center gap-4 px-6 py-3">
          <h1 className="text-xl font-semibold">My issues</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-sm">
              Assigned
            </Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              Created
            </Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              Subscribed
            </Button>
            <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
              Activity
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            <Clock className="mr-1 h-3 w-3" />
            Filter
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Display
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="px-6 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Circle className="h-4 w-4 text-muted-foreground" />
            <h2 className="text-sm font-medium text-muted-foreground">Backlog</h2>
            <span className="text-xs text-muted-foreground">1</span>
          </div>
          
          <div className="space-y-1">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className="group flex items-center gap-3 rounded-md border border-transparent p-2 hover:border-border hover:bg-card"
              >
                <div className="flex items-center gap-2">
                  <MoreHorizontal className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                  <Circle className="h-3 w-3 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{issue.id}</span>
                    <AlertCircle className="h-3 w-3 text-warning" />
                    <span className="text-sm">{issue.title}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium text-white ${issue.assignee.color}`}
                  >
                    {issue.assignee.avatar}
                  </div>
                  <span className="text-xs text-muted-foreground">{issue.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issues;
