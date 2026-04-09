export interface Guest {
  id: string;
  name: string;
  nameEn?: string;
  title: string;
  titleEn?: string;
  organization: string;
  organizationEn?: string;
  avatar: string;
  bio: string;
  bioEn?: string;
}

export interface Division {
  id: string;
  name: string;
  nameEn: string;
  minSubmissions: number;
  maxDuration: string;
  maxDurationEn?: string;
  requirements: string[];
  requirementsEn?: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  titleEn?: string;
  date: string;
  summary: string;
  summaryEn?: string;
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
