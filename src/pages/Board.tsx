import { Circle, AlertCircle, Plus, MoreHorizontal, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { api, IssueStatus } from "@/lib/api";
import { useState } from "react";
import { CreateIssueDialog } from "@/components/CreateIssueDialog";

const Board = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [viewFilter, setViewFilter] = useState<'all' | 'active' | 'backlog'>('active');

  const { data: issues, isLoading } = useQuery({
    queryKey: ['issues'],
    queryFn: () => api.getIssues(),
  });

  const statusColumns: { id: IssueStatus; title: string; color: string }[] = [
    { id: 'todo', title: 'Todo', color: 'text-muted-foreground' },
    { id: 'in-progress', title: 'In Progress', color: 'text-warning' },
    { id: 'in-review', title: 'In Review', color: 'text-blue-500' },
    { id: 'done', title: 'Done', color: 'text-success' },
  ];

  if (viewFilter === 'backlog') {
    statusColumns.unshift({ id: 'backlog', title: 'Backlog', color: 'text-muted-foreground' });
  }

  const groupedIssues = issues?.reduce((acc, issue) => {
    if (!acc[issue.status]) {
      acc[issue.status] = [];
    }
    acc[issue.status].push(issue);
    return acc;
  }, {} as Record<IssueStatus, typeof issues>);

  const priorityIndicators = {
    urgent: <div className="rounded bg-destructive/10 px-1.5 py-0.5"><AlertCircle className="h-3 w-3 text-destructive" /></div>,
    high: <div className="rounded bg-warning/10 px-1.5 py-0.5"><AlertCircle className="h-3 w-3 text-warning" /></div>,
    medium: <div className="rounded bg-blue-500/10 px-1.5 py-0.5"><AlertCircle className="h-3 w-3 text-blue-500" /></div>,
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Loading board...</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border">
        <div className="flex items-center gap-4 px-6 py-3">
          <Button 
            variant="ghost" 
            size="sm"
            className={viewFilter === 'all' ? '' : 'text-muted-foreground'}
            onClick={() => setViewFilter('all')}
          >
            All issues
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={viewFilter === 'active' ? 'bg-card' : 'text-muted-foreground'}
            onClick={() => setViewFilter('active')}
          >
            Active
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className={viewFilter === 'backlog' ? '' : 'text-muted-foreground'}
            onClick={() => setViewFilter('backlog')}
          >
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
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => setShowCreateDialog(true)}
            >
              <Plus className="mr-1 h-3 w-3" />
              New Issue
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="flex gap-4">
          {statusColumns.map((column) => {
            const columnIssues = groupedIssues?.[column.id] || [];
            
            return (
              <div key={column.id} className="w-80 flex-shrink-0">
                <div className="mb-3 flex items-center gap-2">
                  {column.id === 'done' ? (
                    <CheckCircle className={`h-4 w-4 ${column.color}`} />
                  ) : (
                    <Circle className={`h-4 w-4 ${column.color}`} />
                  )}
                  <h2 className="text-sm font-medium">{column.title}</h2>
                  <span className="text-xs text-muted-foreground">{columnIssues.length}</span>
                  <Button variant="ghost" size="icon" className="ml-auto h-6 w-6">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {columnIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="group rounded-lg border border-border bg-card p-3 hover:border-border/60 cursor-pointer"
                    >
                      <div className="mb-2 flex items-start gap-2">
                        {column.id === 'done' ? (
                          <CheckCircle className="mt-0.5 h-3 w-3 text-success" />
                        ) : (
                          <Circle className="mt-0.5 h-3 w-3 text-muted-foreground" />
                        )}
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-1.5">
                            <span className="text-xs text-muted-foreground">{issue.identifier}</span>
                            {issue.priority !== 'no-priority' && issue.priority !== 'low' && 
                              priorityIndicators[issue.priority as keyof typeof priorityIndicators]}
                          </div>
                          <p className="text-sm">{issue.title}</p>
                          {issue.labels && issue.labels.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1">
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
                      <div className="flex items-center gap-1.5">
                        {issue.assignee && (
                          <div
                            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium text-white"
                            style={{ backgroundColor: issue.assignee.avatarColor }}
                          >
                            {issue.assignee.avatar}
                          </div>
                        )}
                        <MoreHorizontal className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 ml-auto" />
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

export default Board;
