//Imput interface
export interface InputType {
  valueInput: string;
  onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

//Button Interface
export interface ButtonType {
  text: string;
  bgColor: string;
  color: string;
}

//Image Interface
export interface ImageType {
  src: string | any;
  alt: string;
  className: string;
  width: number | string;
  height: number | string;
  radius?: number;
  type?: string;
}

export interface VideoType {
  src: string;
  className: string;
  width: number | string;
  height: number | string;
  type: string;
}

interface IItem {
  id: string;
  account_url: string;
  title: string;
  ups: number;
  comment_count: number;
  views: number;
  images: any;
  width: number;
  height: number;
}

export interface IImageList {
  item: IItem;
  index: number;
}

//option value
export interface OptionValue {
  value: string;
  label: string;
}
//viral image
export interface ViralImage {
  value: string;
  label: string;
}

// sort
export interface sortId {
  value: string;
  label: string;
}
// id
export interface DetailPageParams {
  id: string;
}
export interface MainInterfaceApi {
  data: ApiInterface[];
}

//Paginations
export interface PaginationProps {
  pages: number[];
  currentPage: number;
  setcurrentPage: (current: number) => void;
}
export interface IInitialState {
  dataApi: MainInterfaceApi[];
  loading: boolean;
  filterValue: string;
  error: string;
}

export interface ISelect {
  selectedOption: string;
  setSelectedOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedOptionViral: string;
  setSelectedOptionViral: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortOption: string;
  handleSortOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

// API Interface
export interface ApiInterface {
  account_id: number;
  account_url: string;
  ad_config: any;
  ad_type: number;
  ad_url: string;
  comment_count: number;
  cover: string;
  cover_height: number;
  cover_width: number;
  datetime: number;
  description: string | null;
  downs: number;
  favorite: boolean;
  favorite_count: number;
  id: string;
  images: ImagesInterface[];
  images_count: 1;
  in_gallery: boolean;
  in_most_viral: boolean;
  include_album_ads: boolean;
  is_ad: boolean;
  is_album: boolean;
  layout: string;
  link: string;
  nsfw: boolean;
  points: number;
  privacy: string;
  score: number;
  section: string;
  tags: any[];
  title: string;
  topic: any;
  topic_id: any;
  ups: number;
  views: number;
  vote: number;
  width: number;
  height: number;
}

interface ImagesInterface {
  account_id: number;
  account_url: string;
  ad_type: number;
  ad_url: string;
  animated: boolean;
  bandwidth: number;
  comment_count: number;
  datetime: number;
  description: string;
  downs: number;
  edited: string;
  favorite: boolean;
  favorite_count: number;
  has_sound: boolean;
  height: number;
  id: string;
  in_gallery: boolean;
  in_most_viral: boolean;
  is_ad: boolean;
  link: string;
  nsfw: boolean;
  points: number;
  score: number;
  section: string;
  size: number;
  tags: any[];
  title: string;
  type: string;
  ups: number;
  views: number;
  vote: number;
  width: number;
}
