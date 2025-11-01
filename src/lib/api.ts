const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Types matching backend
export type IssueStatus = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done' | 'canceled';
export type IssuePriority = 'no-priority' | 'urgent' | 'high' | 'medium' | 'low';
export type ProjectStatus = 'planned' | 'started' | 'paused' | 'completed' | 'canceled';
export type ProjectHealth = 'on-track' | 'at-risk' | 'off-track';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  avatarColor: string;
  active: boolean;
  admin: boolean;
}

export interface Team {
  id: string;
  name: string;
  key: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  description?: string;
  teamId: string;
}

export interface Issue {
  id: string;
  identifier: string;
  title: string;
  description?: string;
  status: IssueStatus;
  priority: IssuePriority;
  teamId: string;
  projectId?: string;
  assigneeId?: string;
  creatorId: string;
  labelIds: string[];
  assignee?: User | null;
  creator?: User | null;
  team?: Team | null;
  project?: Project | null;
  labels?: Label[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  health?: ProjectHealth;
  priority?: IssuePriority;
  icon?: string;
  color?: string;
  teamId: string;
  leadId?: string;
  startDate?: string;
  targetDate?: string;
  progress: number;
  team?: Team | null;
  lead?: User | null;
  issueCount?: number;
  completedIssueCount?: number;
}

export interface Comment {
  id: string;
  body: string;
  issueId: string;
  userId: string;
  user?: User | null;
  createdAt: string;
  updatedAt: string;
}

// API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      if (response.status === 204) {
        return null as T;
      }

      return response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Teams
  async getTeams() {
    return this.request<Team[]>('/teams');
  }

  async getTeam(id: string) {
    return this.request<Team>(`/teams/${id}`);
  }

  // Users
  async getUsers() {
    return this.request<User[]>('/users');
  }

  async getUser(id: string) {
    return this.request<User>(`/users/${id}`);
  }

  async getCurrentUser() {
    return this.request<User>('/users/me');
  }

  // Issues
  async getIssues(params?: {
    teamId?: string;
    projectId?: string;
    assigneeId?: string;
    status?: IssueStatus;
    priority?: IssuePriority;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<Issue[]>(`/issues${query ? `?${query}` : ''}`);
  }

  async getIssue(id: string) {
    return this.request<Issue>(`/issues/${id}`);
  }

  async createIssue(data: {
    title: string;
    description?: string;
    status?: IssueStatus;
    priority?: IssuePriority;
    teamId: string;
    projectId?: string;
    assigneeId?: string;
    labelIds?: string[];
  }) {
    return this.request<Issue>('/issues', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateIssue(id: string, data: Partial<Issue>) {
    return this.request<Issue>(`/issues/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteIssue(id: string) {
    return this.request<void>(`/issues/${id}`, {
      method: 'DELETE',
    });
  }

  // Projects
  async getProjects(params?: { teamId?: string; status?: ProjectStatus }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<Project[]>(`/projects${query ? `?${query}` : ''}`);
  }

  async getProject(id: string) {
    return this.request<Project>(`/projects/${id}`);
  }

  async createProject(data: {
    name: string;
    description?: string;
    status?: ProjectStatus;
    health?: ProjectHealth;
    priority?: IssuePriority;
    teamId: string;
    leadId?: string;
    startDate?: string;
    targetDate?: string;
  }) {
    return this.request<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: Partial<Project>) {
    return this.request<Project>(`/projects/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request<void>(`/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Labels
  async getLabels(teamId?: string) {
    const query = teamId ? `?teamId=${teamId}` : '';
    return this.request<Label[]>(`/labels${query}`);
  }

  async createLabel(data: {
    name: string;
    color: string;
    description?: string;
    teamId: string;
  }) {
    return this.request<Label>('/labels', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Comments
  async getComments(issueId: string) {
    return this.request<Comment[]>(`/comments?issueId=${issueId}`);
  }

  async createComment(data: { body: string; issueId: string }) {
    return this.request<Comment>('/comments', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const api = new ApiClient(API_BASE_URL);

