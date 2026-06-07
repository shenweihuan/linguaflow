export interface LevelConfig {
  level: number;
  code: string;
  name: string;
  description: string;
  color: string;
}

export const LANGUAGE_LEVELS: LevelConfig[] = [
  {
    level: 1,
    code: 'A1',
    name: '入门级',
    description: '能够理解并使用熟悉的日常表达法、基本词汇以满足具体的需求',
    color: '#4CAF50'
  },
  {
    level: 2,
    code: 'A2',
    name: '初级',
    description: '能够理解涉及贴近生活的常见事物和场景的句子和表达',
    color: '#8BC34A'
  },
  {
    level: 3,
    code: 'B1',
    name: '中级',
    description: '能清楚、标准地谈论熟悉的话题，在旅行时能应对大部分情况',
    color: '#FFC107'
  },
  {
    level: 4,
    code: 'B2',
    name: '中高级',
    description: '能理解复杂文章的主旨，就广泛话题进行流畅交流',
    color: '#FF9800'
  },
  {
    level: 5,
    code: 'C1',
    name: '高级',
    description: '能理解各种有难度的长篇文章，并能流利自如地表达',
    color: '#F44336'
  },
  {
    level: 6,
    code: 'C2',
    name: '精通级',
    description: '能毫不费力地理解几乎所有听到或读到的内容',
    color: '#9C27B0'
  }
];

export const getLevelByCode = (code: string): LevelConfig | undefined => {
  return LANGUAGE_LEVELS.find(level => level.code === code);
};

export const getLevelByNumber = (level: number): LevelConfig | undefined => {
  return LANGUAGE_LEVELS.find(l => l.level === level);
};

export const getLevelName = (level: number): string => {
  return getLevelByNumber(level)?.name || `Level ${level}`;
};

export const getLevelColor = (level: number): string => {
  return getLevelByNumber(level)?.color || '#9E9E9E';
};
