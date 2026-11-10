<template>
  <div class="noc-unlock-matrix">
    <div class="matrix-header">
      <span class="matrix-tag">SERVICE AVAILABILITY MATRIX</span>
      <span class="matrix-meta">测试工具: RegionRestrictionCheck / 原生IP验证</span>
    </div>

    <div class="matrix-grid">
      <!-- AI 分区 -->
      <div class="matrix-section">
        <h5 class="section-title">🤖 AI 生产力大模型访问测试</h5>
        <div class="service-cards">
          <div class="service-item" :class="getStatusClass(unlockData.chatgpt)">
            <span class="service-icon">ChatGPT</span>
            <span class="status-badge">{{ unlockData.chatgpt || '支持' }}</span>
          </div>
          <div class="service-item" :class="getStatusClass(unlockData.claude)">
            <span class="service-icon">Claude</span>
            <span class="status-badge">{{ unlockData.claude || '支持' }}</span>
          </div>
          <div class="service-item" :class="getStatusClass(unlockData.gemini)">
            <span class="service-icon">Gemini</span>
            <span class="status-badge">{{ unlockData.gemini || '部分支持' }}</span>
          </div>
        </div>
      </div>

      <!-- 流媒体分区 -->
      <div class="matrix-section">
        <h5 class="section-title">🎬 全球流媒体 4K 播放测试</h5>
        <div class="service-cards">
          <div class="service-item" :class="getStatusClass(unlockData.netflix)">
            <span class="service-icon">Netflix</span>
            <span class="status-badge">{{ unlockData.netflix || '原创全解' }}</span>
          </div>
          <div class="service-item" :class="getStatusClass(unlockData.disney)">
            <span class="service-icon">Disney+</span>
            <span class="status-badge">{{ unlockData.disney || '支持' }}</span>
          </div>
          <div class="service-item" :class="getStatusClass(unlockData.youtube)">
            <span class="service-icon">YouTube Premium</span>
            <span class="status-badge">{{ unlockData.youtube || '4K流畅' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  unlockData: {
    type: Object,
    default: () => ({
      chatgpt: '支持',
      claude: '支持',
      gemini: '部分支持',
      netflix: '支持',
      disney: '支持',
      youtube: '支持 4K'
    })
  }
})

function getStatusClass(status) {
  if (!status) return 'ok'
  if (status.includes('支持') || status.includes('全解') || status.includes('流畅')) return 'ok'
  if (status.includes('部分') || status.includes('视节点')) return 'partial'
  return 'warn'
}
</script>

<style scoped>
.noc-unlock-matrix {
  background: var(--noc-bg-base);
  border: 1px solid var(--noc-border);
  border-radius: 10px;
  padding: 18px;
  margin: 20px 0;
  font-family: var(--noc-mono-font);
  color: #F8FAFC;
}

.matrix-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--noc-border);
  padding-bottom: 8px;
  margin-bottom: 14px;
  font-size: 0.8rem;
}

.matrix-tag {
  color: var(--noc-accent-cyan);
  font-weight: 700;
}

.matrix-meta {
  color: #64748B;
}

.matrix-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.section-title {
  margin: 0 0 10px 0;
  font-size: 0.85rem;
  color: #CBD5E1;
  font-weight: 600;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.service-item {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(51, 65, 85, 0.6);
  padding: 10px 8px;
  border-radius: 6px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.service-icon {
  font-size: 0.8rem;
  font-weight: 600;
  color: #E2E8F0;
}

.status-badge {
  font-size: 0.7rem;
  padding: 2px 4px;
  border-radius: 4px;
}

.service-item.ok .status-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #34D399;
  border: 1px solid rgba(16, 185, 129, 0.4);
}

.service-item.partial .status-badge {
  background: rgba(245, 158, 11, 0.2);
  color: #FBBF24;
  border: 1px solid rgba(245, 158, 11, 0.4);
}

.service-item.warn .status-badge {
  background: rgba(239, 68, 68, 0.2);
  color: #F87171;
  border: 1px solid rgba(239, 68, 68, 0.4);
}

@media (max-width: 640px) {
  .matrix-grid {
    grid-template-columns: 1fr;
  }
}
</style>
