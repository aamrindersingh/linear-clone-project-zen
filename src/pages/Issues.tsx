import { Circle, MoreHorizontal, Clock, AlertCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useState } from "react";
import { CreateIssueDialog } from "@/components/CreateIssueDialog";

const Issues = () => {
  const [filter, setFilter] = useState<'assigned' | 'created'>('assigned');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const { data: currentUser } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => api.getCurrentUser(),
  });

  const { data: issues, isLoading } = useQuery({
    queryKey: ['issues', filter, currentUser?.id],
    queryFn: () => {
      if (!currentUser) return [];
      if (filter === 'assigned') {
        return api.getIssues({ assigneeId: currentUser.id });
      }
      return api.getIssues();
    },
    enabled: !!currentUser,
  });

  const groupedIssues = issues?.reduce((acc, issue) => {
    if (!acc[issue.status]) {
      acc[issue.status] = [];
    }
    acc[issue.status].push(issue);
    return acc;
  }, {} as Record<string, typeof issues>);

  const statusConfig = {
    backlog: { label: 'Backlog', icon: Circle, color: 'text-muted-foreground' },
    todo: { label: 'Todo', icon: Circle, color: 'text-muted-foreground' },
    'in-progress': { label: 'In Progress', icon: Circle, color: 'text-warning' },
    'in-review': { label: 'In Review', icon: Circle, color: 'text-success' },
    done: { label: 'Done', icon: Circle, color: 'text-success' },
    canceled: { label: 'Canceled', icon: Circle, color: 'text-muted-foreground' },
  };

  const priorityIcons = {
    urgent: <AlertCircle className="h-3 w-3 text-destructive" />,
    high: <AlertCircle className="h-3 w-3 text-warning" />,
    medium: <AlertCircle className="h-3 w-3 text-blue-500" />,
    low: <AlertCircle className="h-3 w-3 text-muted-foreground" />,
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading issues...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border">
        <div className="flex items-center gap-4 px-6 py-3">
          <h1 className="text-xl font-semibold">My issues</h1>
          <div className="flex gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className={filter === 'assigned' ? 'text-sm' : 'text-sm text-muted-foreground'}
              onClick={() => setFilter('assigned')}
            >
              Assigned
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className={filter === 'created' ? 'text-sm' : 'text-sm text-muted-foreground'}
              onClick={() => setFilter('created')}
            >
              Created
            </Button>
          </div>
          <Button 
            variant="default" 
            size="sm" 
            className="ml-auto"
            onClick={() => setShowCreateDialog(true)}
          >
            <Plus className="mr-1 h-3 w-3" />
            New Issue
          </Button>
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
          {Object.entries(statusConfig).map(([status, config]) => {
            const statusIssues = groupedIssues?.[status] || [];
            if (statusIssues.length === 0) return null;

            return (
              <div key={status} className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <config.icon className={`h-4 w-4 ${config.color}`} />
                  <h2 className="text-sm font-medium text-muted-foreground">{config.label}</h2>
                  <span className="text-xs text-muted-foreground">{statusIssues.length}</span>
                </div>
                
                <div className="space-y-1">
                  {statusIssues.map((issue) => (
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
                          <span className="text-xs text-muted-foreground">{issue.identifier}</span>
                          {issue.priority !== 'no-priority' && priorityIcons[issue.priority as keyof typeof priorityIcons]}
                          <span className="text-sm">{issue.title}</span>
                          {issue.labels && issue.labels.length > 0 && (
                            <div className="flex gap-1">
                              {issue.labels.map((label) => (
                                <span 
                                  key={label.id}
                                  className="text-xs px-1.5 py-0.5 rounded"
                                  style={{ backgroundColor: `${label.color}20`, color: label.color }}
                                >
                                  {label.name}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {issue.assignee && (
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium text-white"
                            style={{ backgroundColor: issue.assignee.avatarColor }}
                          >
                            {issue.assignee.avatar}
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {new Date(issue.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CreateIssueDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
};

export default Issues;
