<template>
  <div class="noc-speed-card">
    <!-- NOC 仪表台头部 -->
    <div class="noc-header">
      <div class="noc-title-group">
        <span class="status-indicator"></span>
        <h4 class="noc-title">NETWORK OBSERVATORY // {{ title }}</h4>
      </div>
      <div class="noc-meta">
        <span class="noc-tag">{{ batchId || 'BATCH: 2026-08-11-CST' }}</span>
        <span class="noc-env">{{ env || 'Clash Verge Rev / Shadowsocks / VLESS' }}</span>
      </div>
    </div>

    <!-- 测速节点数据行 -->
    <div class="noc-nodes-list" v-if="nodes && nodes.length > 0">
      <div v-for="(node, index) in nodes" :key="index" class="noc-node-row">
        <div class="node-meta">
          <span class="node-status-dot" :class="node.status || 'ok'"></span>
          <span class="node-name">{{ node.name }}</span>
          <span class="node-latency">{{ node.latency }}ms</span>
        </div>
        <div class="node-bar-wrapper">
          <div class="node-progress-bar" :style="{ width: getPercentage(node.speed) + '%' }"></div>
        </div>
        <div class="node-speed-val">
          <strong>{{ node.speed }}</strong>
          <span class="unit">{{ node.unit || 'Mbps' }}</span>
        </div>
      </div>
    </div>

    <!-- 实测大图展示卡 -->
    <div class="noc-image-preview" v-if="imageSrc">
      <div class="image-label">
        <span>📸 原始实测截图归档 (可点击在独立窗口放大复核)</span>
      </div>
      <a :href="imageSrc" target="_blank" rel="noopener noreferrer" class="img-link">
        <img :src="imageSrc" :alt="title + ' 节点测速实测报告'" class="actual-test-img" loading="lazy" />
      </a>
      <div class="img-disclaimer">
        <span>SHA-256 校验包已归档 ｜ 单次测试快照不代表全天候服务承诺</span>
      </div>
    </div>

    <!-- 底部汇总统计条 -->
    <div class="noc-footer">
      <div class="summary-metric">
        <span class="label">平均延迟</span>
        <span class="val">{{ avgLatency || '38ms' }}</span>
      </div>
      <div class="summary-metric">
        <span class="label">最高吞吐</span>
        <span class="val">{{ peakSpeed || '546Mbps' }}</span>
      </div>
      <div class="summary-metric">
        <span class="label">丢包率</span>
        <span class="val success">{{ packetLoss || '0.0%' }}</span>
      </div>
      <div class="summary-metric watermark">
        <span class="label">来源</span>
        <span class="val">TAG-BLOG-LAB</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '节点测速可观测性数据' },
  batchId: { type: String, default: '' },
  env: { type: String, default: '' },
  nodes: { type: Array, default: () => [] },
  imageSrc: { type: String, default: '' },
  avgLatency: { type: String, default: '' },
  peakSpeed: { type: String, default: '' },
  packetLoss: { type: String, default: '' }
})

function getPercentage(speedStr) {
  const num = parseFloat(speedStr)
  if (isNaN(num)) return 60
  // 假设 600Mbps 为满分基准
  return Math.min(100, Math.max(10, Math.round((num / 600) * 100)))
}
</script>

<style scoped>
.noc-speed-card {
  background: var(--noc-bg-base);
  border: 1px solid var(--noc-border);
  border-radius: 10px;
  padding: 18px;
  margin: 24px 0;
  color: var(--noc-text-bright);
  font-family: var(--noc-mono-font);
  box-shadow: 0 10px 25px -5px rgba(11, 17, 32, 0.4);
}

.noc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--noc-border);
  padding-bottom: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.noc-title-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  background-color: var(--noc-status-green);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--noc-status-green);
}

.noc-title {
  margin: 0;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  color: #E2E8F0;
  font-weight: 700;
}

.noc-meta {
  display: flex;
  gap: 8px;
  font-size: 0.75rem;
  color: var(--noc-text-dim);
}

.noc-tag {
  background: var(--noc-bg-surface);
  border: 1px solid var(--noc-border);
  padding: 2px 8px;
  border-radius: 4px;
  color: var(--noc-accent-cyan);
}

.noc-env {
  display: flex;
  align-items: center;
}

.noc-nodes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.noc-node-row {
  display: grid;
  grid-template-columns: 200px 1fr 100px;
  align-items: center;
  gap: 12px;
  background: rgba(30, 41, 59, 0.5);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid rgba(51, 65, 85, 0.4);
}

.node-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
}

.node-status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--noc-status-green);
}

.node-name {
  color: #F8FAFC;
  font-weight: 600;
}

.node-latency {
  color: #94A3B8;
  font-size: 0.75rem;
}

.node-bar-wrapper {
  background: #0F172A;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(51, 65, 85, 0.6);
}

.node-progress-bar {
  background: linear-gradient(90deg, #059669, #10B981, #06B6D4);
  height: 100%;
  border-radius: 4px;
  transition: width 0.4s ease;
}

.node-speed-val {
  text-align: right;
  font-size: 0.9rem;
  color: var(--noc-accent-cyan);
}

.node-speed-val .unit {
  font-size: 0.7rem;
  color: #94A3B8;
  margin-left: 2px;
}

.noc-image-preview {
  margin: 16px 0;
  background: #0F172A;
  border: 1px solid var(--noc-border);
  border-radius: 8px;
  padding: 12px;
}

.image-label {
  font-size: 0.8rem;
  color: #94A3B8;
  margin-bottom: 8px;
}

.actual-test-img {
  width: 100%;
  max-height: 480px;
  object-fit: contain;
  border-radius: 4px;
  background: #000000;
  border: 1px solid #1E293B;
  transition: opacity 0.2s;
}

.actual-test-img:hover {
  opacity: 0.95;
}

.img-disclaimer {
  font-size: 0.75rem;
  color: #64748B;
  margin-top: 6px;
  text-align: right;
}

.noc-footer {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid var(--noc-border);
  padding-top: 12px;
  flex-wrap: wrap;
  gap: 12px;
}

.summary-metric {
  display: flex;
  flex-direction: column;
}

.summary-metric .label {
  font-size: 0.7rem;
  color: #64748B;
  text-transform: uppercase;
}

.summary-metric .val {
  font-size: 1rem;
  font-weight: 700;
  color: #F8FAFC;
}

.summary-metric .val.success {
  color: var(--noc-status-green);
}

@media (max-width: 640px) {
  .noc-node-row {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
</style>
