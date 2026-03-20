export interface Guest {
  id: string;
  name: string;
  nameEn?: string;
  title: string;
  organization: string;
  avatar: string;
  bio: string;
}

export interface Division {
  id: string;
  name: string;
  nameEn: string;
  minSubmissions: number;
  maxDuration: string;
  requirements: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  content?: string;
  image?: string;
  tag: 'announcement' | 'behind-scenes' | 'update';
}

export interface Film {
  id: string;
  title: string;
  titleEn?: string;
  division: string;
  team: string;
  duration: string;
  synopsis: string;
  poster?: string;
  videoUrl?: string;
  awards?: string[];
}
