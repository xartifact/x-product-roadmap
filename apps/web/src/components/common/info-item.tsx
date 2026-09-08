/**
 * 详情面板信息项（图标 + 标签 + 内容）
 *
 * 原分别定义于 TaskDetailSheet 与 StoryDetailPanel，两处实现逐字节相同，收敛为一份。
 */

import type { ReactNode } from 'react';

export function InfoItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        {icon}
        <span>{label}</span>
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
