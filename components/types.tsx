export type Tweeb = {
  title: string;
  content: string;
  uploads?: string[];
  likes?: string[];
  author_avatar?: string;
  topic: string;
  id: string;
  created_at: string;
  user_id: string;
};
export type User = {
  id: string;
  username: string | null;
  updated_at: string | null;
  full_name: string;
  avatar_url: string;
};
