import { Circle, AlertCircle, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const columns = [
  {
    id: "in-progress",
    title: "In Progress",
    count: 3,
    icon: Circle,
    color: "text-warning",
    issues: [
      {
        id: "WEF-5",
        title: "ewd",
        priority: "urgent",
        labels: ["bug"],
      },
      {
        id: "WEF-4",
        title: "Import your data (4)",
        priority: "high",
        subtasks: "0/4",
      },
      {
        id: "WEF-3",
        title: "Connect your tools (3)",
        priority: "high",
        subtasks: "0/3",
      },
    ],
  },
];

const Board = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border">
        <div className="flex items-center gap-4 px-6 py-3">
          <Button variant="ghost" size="sm">
            All issues
          </Button>
          <Button variant="ghost" size="sm" className="bg-card">
            Active
          </Button>
          <Button variant="ghost" size="sm">
            Backlog
          </Button>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-3 px-6 py-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Filter
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Display
          </Button>
          <div className="ml-auto">
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              Hidden columns
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-4">
          {columns.map((column) => (
            <div key={column.id} className="w-80 flex-shrink-0">
              <div className="mb-3 flex items-center gap-2">
                <column.icon className={`h-4 w-4 ${column.color}`} />
                <h2 className="text-sm font-medium">{column.title}</h2>
                <span className="text-xs text-muted-foreground">{column.count}</span>
                <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <div className="space-y-2">
                {column.issues.map((issue) => (
                  <div
                    key={issue.id}
                    className="group rounded-lg border border-border bg-card p-3 hover:border-border/60"
                  >
                    <div className="mb-2 flex items-start gap-2">
                      <Circle className="mt-0.5 h-3 w-3 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-1.5">
                          <span className="text-xs text-muted-foreground">{issue.id}</span>
                          {issue.priority === "urgent" && (
                            <div className="rounded bg-destructive/10 px-1.5 py-0.5">
                              <AlertCircle className="h-3 w-3 text-destructive" />
                            </div>
                          )}
                        </div>
                        <p className="text-sm">{issue.title}</p>
                        {issue.subtasks && (
                          <p className="mt-1 text-xs text-muted-foreground">{issue.subtasks}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MoreHorizontal className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="w-80 flex-shrink-0">
            <div className="mb-3 flex items-center gap-2">
              <Circle className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-medium text-muted-foreground">Todo</h2>
              <span className="text-xs text-muted-foreground">0</span>
            </div>
          </div>

          <div className="w-80 flex-shrink-0">
            <div className="mb-3 flex items-center gap-2">
              <Circle className="h-4 w-4 text-success" />
              <h2 className="text-sm font-medium text-muted-foreground">In Review</h2>
              <span className="text-xs text-muted-foreground">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
