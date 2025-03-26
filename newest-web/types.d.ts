  export interface Article {
    links: string
    images: string
    source_names?: string
    titles: string
  }
  export interface Feeds {
    type:             string;
    title:            string;
    post_id?:         number;
    user_id?:         string;
    description:     string;
    created_at:       string;
    latitude?:        null;
    longitude?:       null;
    media_urls?:      string[];
    profile_picture?: null;
    like_count:       number;
    comment_count:    number;
    entry_id?:        number;
    rss_title?:       string;
    traffic?:         string;
    articles?:        Article[];
    is_liked:         boolean
    author:           string
  }

export interface AppState {
  tabs: ReturnType<typeof tabsReducer>;
}
export interface ContentProps {
  title: string;
}

export interface ContentImageProps {
  uri?: string;
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface FeedItemProps {
  item: Feeds;
  isFold: boolean;
  isFoldable: boolean;
  onToggleFold: () => void;
  sentinelRef: React.RefCallback<HTMLDivElement>;
}

export interface HeaderProps {
  leftArrow: boolean;
}

export interface LoadMoreButtonProps {
  onPress: () => void;
  style?: CSSProperties;
}

export interface MenuItemProps {
  icon: ReactNode;
  count: number | string;
  label: string;
  isCount: boolean;
}

export interface HomePagePresenterProps {
  feedList: Feeds[];
  foldedStateMap: { [key: string]: boolean };
  isLoading: boolean;
  isLoadingMore: boolean;
  sentinelRef: React.RefCallback<HTMLDivElement>;
  onToggleFold: (feedId: string) => void;
}

export interface HomePageContainerType {
  initialFeeds: Feeds[];
}
export interface FeedStateType {
  list: Feeds[];
  isLoading: boolean;
  isLoadingMore: boolean;
}

export interface Tab {
  icon: LucideIcon;
  label: string;
  id: string;
  isCreate?: boolean;
}

export type PostType = "news" | "post";

export interface FormDataSet {
  type: PostType;
  title: string;
  images: string[];
  description: string;
}

export interface PostTypeSelectorProps {
  postType: PostType;
  onTypeChange: (type: PostType) => void;
}

export interface FormFieldsProps {
  formData: FormDataSet;
  postType: PostType;
  onFormChange: (key: keyof FormDataSet, value: string | string[]) => void;
}

export interface SubmitButtonProps {
  form: FormDataSet;
}
export interface ContentType {
  type: "post" | "article";
}

export interface scrollContainerRefType {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

export type AppDispatch = AppStore['dispatch'];
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof combinedReducer>;