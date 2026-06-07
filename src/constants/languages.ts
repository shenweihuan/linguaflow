export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: '英语',
    nativeName: 'English',
    flag: '🇺🇸',
    description: '全球通用语言，商务、学术、旅行必备'
  },
  {
    code: 'ja',
    name: '日语',
    nativeName: '日本語',
    flag: '🇯🇵',
    description: '动漫、游戏、日本文化学习首选'
  },
  {
    code: 'ko',
    name: '韩语',
    nativeName: '한국어',
    flag: '🇰🇷',
    description: 'K-Pop、韩剧、韩国文化爱好者必学'
  }
];

export const getLanguageByCode = (code: string): LanguageConfig | undefined => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code);
};

export const getLanguageName = (code: string): string => {
  return getLanguageByCode(code)?.name || code;
};

export const getLanguageFlag = (code: string): string => {
  return getLanguageByCode(code)?.flag || '🌐';
};
