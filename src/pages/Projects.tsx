import { FolderKanban, Plus, MoreHorizontal, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    id: "sdc",
    name: "sdc",
    health: "at-risk",
    priority: "---",
    lead: null,
    targetDate: null,
    status: "0%",
  },
];

const Projects = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border">
        <div className="flex items-center gap-4 px-6 py-3">
          <h1 className="text-xl font-semibold">Projects</h1>
          <div className="ml-auto flex gap-2">
            <Button variant="ghost" size="sm">
              All projects
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              New view
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-3 px-6 py-2">
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Filter
          </Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">
            Display
          </Button>
          <Button variant="ghost" size="sm" className="ml-auto h-8 gap-1">
            <Plus className="h-3 w-3" />
            Add project
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 border-b border-border bg-background">
            <tr className="text-left text-xs text-muted-foreground">
              <th className="px-6 py-2 font-medium">Name</th>
              <th className="px-3 py-2 font-medium">Health</th>
              <th className="px-3 py-2 font-medium">Priority</th>
              <th className="px-3 py-2 font-medium">Lead</th>
              <th className="px-3 py-2 font-medium">Target date</th>
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="group border-b border-border hover:bg-card/50">
                <td className="px-6 py-3">
                  <div className="flex items-center gap-2">
                    <FolderKanban className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{project.name}</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="h-3 w-3 text-warning" />
                    <span className="text-xs">At risk</span>
                    <span className="text-xs text-muted-foreground">· 1h</span>
                  </div>
                </td>
                <td className="px-3 py-3">
                  <span className="text-sm text-muted-foreground">{project.priority}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="h-5 w-5 rounded-full bg-muted" />
                </td>
                <td className="px-3 py-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-12 rounded-full bg-muted">
                      <div className="h-full w-0 rounded-full bg-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{project.status}</span>
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

export default Projects;
