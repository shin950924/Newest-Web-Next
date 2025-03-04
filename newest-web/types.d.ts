  export interface Feeds {
    type:             string;
    title:            string;
    post_id?:         number;
    user_id?:         string;
    description:     string;
    created_at:       string;
    latitude?:        null;
    longitude?:       null;
    media_urls?:      any[];
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