/**
 * 优先级展示组件
 *
 * 唯一真源见 @x-cartographer/shared 的 PRIORITY_CONFIG / TASK_PRIORITY_CONFIG /
 * PRIORITY_COLOR_VARIANTS——本组件只负责把配置渲染成三种既有形态（纯文字/徽章/左色条），
 * 不在这里定义任何颜色或标签。
 */

import {
  Priority,
  TaskPriority,
  getPriorityConfig,
  getTaskPriorityConfig,
  PRIORITY_COLOR_VARIANTS,
} from '@/types';
import { cn } from '@/lib/utils';

/**
 * 故事/旅程的 priority 字段在部分类型定义里是裸字符串联合（'high'|'medium'|'low'），
 * 并非 Priority 枚举本身——两者运行时值相同，这里统一接受两种形态，不强迫调用方转换。
 */
type PriorityValue = Priority | TaskPriority | 'high' | 'medium' | 'low';

function resolveConfig(value: PriorityValue, isTask: boolean) {
  return isTask
    ? getTaskPriorityConfig(value as TaskPriority)
    : getPriorityConfig(value as Priority);
}

interface PriorityProps {
  value: PriorityValue;
  /** 是否为任务优先级（P0-P3），否则为故事/旅程优先级（高/中/低） */
  isTask?: boolean;
  className?: string;
}

/** 纯文字标签（如卡片左上角、筛选下拉） */
export function PriorityText({ value, isTask = false, className }: PriorityProps) {
  const config = resolveConfig(value, isTask);
  if (!config) return null;
  return (
    <span className={cn('text-xs font-semibold', PRIORITY_COLOR_VARIANTS[config.color].text, className)}>
      {config.label}
    </span>
  );
}

/** 带边框的徽章（如详情面板的"基本信息"区） */
export function PriorityBadge({ value, isTask = false, className }: PriorityProps) {
  const config = resolveConfig(value, isTask);
  if (!config) return null;
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium',
        PRIORITY_COLOR_VARIANTS[config.color].badge,
        className
      )}
    >
      {config.label}
    </span>
  );
}

/** 卡片左侧色条的 className（配合 Card 的 border-l-4 使用） */
export function priorityLeftBorderCls(value: PriorityValue, isTask = false): string {
  const config = resolveConfig(value, isTask);
  return config ? PRIORITY_COLOR_VARIANTS[config.color].leftBorder : 'border-l-transparent';
}
