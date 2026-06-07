import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/common/Card';

interface HeatmapDay {
  date: string;
  minutes: number;
  level: number; // 0-4 颜色深度
}

// 生成最近12周的模拟热力图数据
function generateHeatmapData(): HeatmapDay[] {
  const data: HeatmapDay[] = [];
  const today = new Date();

  for (let i = 84; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // 模拟：随机生成学习数据，近期更活跃
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const recencyFactor = Math.max(0.2, i / 84); // 越近概率越高
    const hasActivity = Math.random() < (isWeekend ? 0.5 * recencyFactor : 0.75 * recencyFactor);

    let minutes = 0;
    let level = 0;

    if (hasActivity) {
      minutes = Math.floor(Math.random() * 90) + 5;
      if (minutes < 15) level = 1;
      else if (minutes < 30) level = 2;
      else if (minutes < 60) level = 3;
      else level = 4;
    }

    data.push({
      date: date.toISOString().split('T')[0],
      minutes,
      level,
    });
  }

  return data;
}

const LEVEL_COLORS: Record<number, string> = {
  0: 'rgba(255,255,255,0.06)',
  1: 'rgba(0,217,192,0.25)',
  2: 'rgba(0,217,192,0.45)',
  3: 'rgba(0,217,192,0.65)',
  4: 'rgba(0,217,192,0.9)',
};

const MONTH_LABELS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
const DAY_LABELS = ['一', '三', '五', '日'];

const StudyHeatmap: React.FC = () => {
  const [tooltipData, setTooltipData] = useState<HeatmapDay | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const heatmapData = useMemo(() => generateHeatmapData(), []);

  // 将数据按周分组（每行7天）
  const weeks: HeatmapDay[][] = [];
  for (let i = 0; i < heatmapData.length; i += 7) {
    weeks.push(heatmapData.slice(i, i + 7));
  }

  // 获取月份标签位置
  const monthLabels = useMemo(() => {
    const labels: { label: string; index: number }[] = [];
    let lastMonth = '';
    weeks.forEach((week, idx) => {
      if (week.length > 0) {
        const month = new Date(week[0].date).getMonth();
        if (MONTH_LABELS[month] !== lastMonth) {
          lastMonth = MONTH_LABELS[month];
          labels.push({ label: lastMonth, index: idx });
        }
      }
    });
    return labels;
  }, [weeks]);

  const handleMouseEnter = (day: HeatmapDay, e: React.MouseEvent<HTMLDivElement>) => {
    setTooltipData(day);
    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card glass>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">学习日历</h3>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>少</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: LEVEL_COLORS[level] }}
              />
            ))}
            <span>多</span>
          </div>
        </div>

        <div className="overflow-x-auto pb-2">
          {/* 月份标签行 */}
          <div className="flex gap-[3px] mb-1 min-w-max pl-8">
            {weeks.map((_, weekIdx) => {
              const monthLabel = monthLabels.find((m) => m.index === weekIdx);
              return (
                <div key={`ml-${weekIdx}`} className="w-[14px] text-[10px] text-gray-500">
                  {monthLabel?.label || ''}
                </div>
              );
            })}
          </div>

          {/* 热力图网格 */}
          <div className="flex gap-[3px] min-w-max">
            {/* 星期标签列 */}
            <div className="flex flex-col gap-[3px] mr-1">
              {DAY_LABELS.map((day, i) => (
                <div key={day} className="w-6 h-[14px] flex items-center justify-center text-[10px] text-gray-500">
                  {i % 2 === 1 ? day : ''}
                </div>
              ))}
            </div>

            {/* 周网格 */}
            {weeks.map((week, weekIdx) => (
              <div key={weekIdx} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const day = week[dayIdx];
                  if (!day) {
                    return <div key={`${weekIdx}-${dayIdx}`} className="w-[14px] h-[14px]" />;
                  }
                  return (
                    <div
                      key={day.date}
                      className="w-[14px] h-[14px] rounded-sm cursor-pointer transition-transform hover:scale-125 hover:ring-1 hover:ring-white/30"
                      style={{ backgroundColor: LEVEL_COLORS[day.level] }}
                      onMouseEnter={(e) => handleMouseEnter(day, e)}
                      onMouseLeave={handleMouseLeave}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Tooltip */}
        {tooltipData && (
          <div
            className="fixed z-50 px-3 py-2 rounded-lg bg-[#1A2744] border border-white/10 shadow-xl text-sm pointer-events-none"
            style={{
              left: tooltipPos.x + 10,
              top: tooltipPos.y - 40,
            }}
          >
            <p className="text-white font-medium">{tooltipData.date}</p>
            <p className="text-gray-400">
              {tooltipData.minutes > 0 ? `学习了 ${tooltipData.minutes} 分钟` : '无学习记录'}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
};

export default StudyHeatmap;
