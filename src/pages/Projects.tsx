import { FolderKanban, Plus, MoreHorizontal, AlertTriangle, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { CreateProjectDialog } from "@/components/CreateProjectDialog";

const Projects = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => api.getProjects(),
  });

  const healthIcons = {
    'on-track': <CheckCircle2 className="h-3 w-3 text-success" />,
    'at-risk': <AlertTriangle className="h-3 w-3 text-warning" />,
    'off-track': <TrendingUp className="h-3 w-3 text-destructive" />,
  };

  const healthLabels = {
    'on-track': 'On track',
    'at-risk': 'At risk',
    'off-track': 'Off track',
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

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
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto h-8 gap-1"
            onClick={() => setShowCreateDialog(true)}
          >
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
              <th className="px-3 py-2 font-medium">Progress</th>
            </tr>
          </thead>
          <tbody>
            {projects && projects.length > 0 ? (
              projects.map((project) => (
                <tr key={project.id} className="group border-b border-border hover:bg-card/50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <FolderKanban className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{project.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3">
                    {project.health ? (
                      <div className="flex items-center gap-1.5">
                        {healthIcons[project.health]}
                        <span className="text-xs">{healthLabels[project.health]}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span className="text-sm text-muted-foreground">
                      {project.priority ? project.priority : '---'}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {project.lead ? (
                      <div
                        className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium text-white"
                        style={{ backgroundColor: project.lead.avatarColor }}
                      >
                        {project.lead.avatar}
                      </div>
                    ) : (
                      <div className="h-5 w-5 rounded-full bg-muted" />
                    )}
                  </td>
                  <td className="px-3 py-3">
                    {project.targetDate ? (
                      <span className="text-xs">
                        {new Date(project.targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-12 rounded-full bg-muted">
                        <div 
                          className="h-full rounded-full bg-primary" 
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-8 text-center text-muted-foreground">
                  No projects yet. Create one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CreateProjectDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};

export default Projects;
