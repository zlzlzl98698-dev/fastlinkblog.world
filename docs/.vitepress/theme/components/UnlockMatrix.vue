<template>
  <div class="unlock-matrix">
    <div class="matrix-header">
      <div class="matrix-title">
        <span class="icon">⚡</span>
        <span>{{ title || 'AI 生产力大模型与海外流媒体解锁矩阵' }}</span>
      </div>
      <div class="matrix-tested">
        <span>核验工具: RegionRestrictionCheck / 2026实测</span>
      </div>
    </div>

    <div class="matrix-grid">
      <div v-for="(item, idx) in items" :key="idx" class="matrix-card" :class="item.status">
        <div class="card-top">
          <span class="service-name">{{ item.service }}</span>
          <span class="status-badge" :class="item.status">
            {{ getStatusText(item.status) }}
          </span>
        </div>
        <div class="card-detail">{{ item.detail }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UnlockItem {
  service: string;
  status: 'supported' | 'partial' | 'unsupported';
  detail: string;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    items?: UnlockItem[];
  }>(),
  {
    items: () => [
      { service: 'ChatGPT (OpenAI)', status: 'supported', detail: '原生住宅/机房IP支持，无降级与Access Denied' },
      { service: 'Claude 3.5 Sonnet', status: 'supported', detail: '支持香港/日本/新加坡/美西全节点正常对话' },
      { service: 'Gemini Advanced', status: 'partial', detail: '需搭配台湾、新加坡或美西原生落地节点' },
      { service: 'Netflix (网飞)', status: 'supported', detail: '全区原生版权库解锁，支持非自制剧播放' },
      { service: 'Disney+', status: 'supported', detail: '全球多区 4K HDR 极速缓冲，无代理拦截报错' },
      { service: 'YouTube Premium', status: 'supported', detail: '支持 4K 60FPS 极速播放，测速吞吐充足' },
      { service: 'HBO Max', status: 'supported', detail: '美区/欧区全库解锁，流媒体低缓冲时延' },
      { service: 'Spotify & TikTok', status: 'supported', detail: '支持创作者后台直播与全球曲库访问' }
    ]
  }
);

function getStatusText(status: string): string {
  if (status === 'supported') return '✅ 原生支持';
  if (status === 'partial') return '⚠️ 视节点而定';
  return '❌ 暂不支持';
}
</script>

<style scoped>
.unlock-matrix {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 18px 22px;
  margin: 20px 0;
  font-family: var(--vp-font-family-mono);
}

.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.matrix-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #f1f5f9;
  font-size: 15px;
}

.matrix-tested {
  font-size: 11px;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.matrix-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 12px;
}

.matrix-card {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 6px;
  padding: 12px 14px;
  transition: border-color 0.2s ease;
}

.matrix-card:hover {
  border-color: rgba(96, 165, 250, 0.3);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.service-name {
  font-weight: 600;
  color: #e2e8f0;
  font-size: 13px;
}

.status-badge {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 4px;
}

.status-badge.supported {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.status-badge.partial {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.status-badge.unsupported {
  background: rgba(239, 68, 68, 0.15);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.card-detail {
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.5;
}
</style>
