<template>
  <div class="speedtest-panel">
    <div class="panel-header">
      <div class="panel-title">
        <span class="status-indicator"></span>
        <span>{{ title || '节点带宽吞吐与延迟实测报告' }}</span>
      </div>
      <div class="panel-meta">
        <span class="meta-tag">{{ testDate || '2026-10-19 测速批次' }}</span>
        <span class="meta-tag">{{ environment || '1000M 联通宽带 / Clash Verge Rev' }}</span>
      </div>
    </div>

    <div class="node-list">
      <div v-for="(node, idx) in nodes" :key="idx" class="node-item">
        <div class="node-info">
          <span class="node-name">{{ node.name }}</span>
          <span class="node-latency">{{ node.latency }}</span>
        </div>
        <div class="progress-bar-bg">
          <div 
            class="progress-bar-fill" 
            :style="{ width: calculateWidth(node.speed), backgroundColor: getSpeedColor(node.speed) }"
          ></div>
        </div>
        <div class="node-speed">
          <span class="speed-val">{{ node.speed }}</span>
        </div>
      </div>
    </div>

    <div v-if="summary" class="panel-footer">
      <span class="footer-label">实测汇总：</span>
      <span class="footer-content">{{ summary }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NodeStat {
  name: string;
  latency: string;
  speed: string; // e.g. "529Mbps" or "86.5MB/s"
}

const props = defineProps<{
  title?: string;
  testDate?: string;
  environment?: string;
  nodes: NodeStat[];
  summary?: string;
}>();

function calculateWidth(speedStr: string): string {
  const match = speedStr.match(/([\d.]+)/);
  if (!match) return '50%';
  const val = parseFloat(match[1]);
  if (speedStr.includes('Mbps')) {
    // scale out of 600Mbps
    return Math.min(100, Math.max(15, (val / 600) * 100)) + '%';
  } else if (speedStr.includes('MB/s')) {
    // scale out of 100MB/s
    return Math.min(100, Math.max(15, (val / 100) * 100)) + '%';
  }
  return '50%';
}

function getSpeedColor(speedStr: string): string {
  const match = speedStr.match(/([\d.]+)/);
  if (!match) return '#3b82f6';
  const val = parseFloat(match[1]);
  if (speedStr.includes('Mbps')) {
    if (val >= 300) return '#10b981';
    if (val >= 100) return '#3b82f6';
    return '#f59e0b';
  }
  return '#10b981';
}
</script>

<style scoped>
.speedtest-panel {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 18px 22px;
  margin: 20px 0;
  font-family: var(--vp-font-family-mono);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #f1f5f9;
  font-size: 15px;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}

.panel-meta {
  display: flex;
  gap: 8px;
}

.meta-tag {
  font-size: 11px;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.node-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.node-item {
  display: grid;
  grid-template-columns: 140px 1fr 100px;
  align-items: center;
  gap: 16px;
}

@media (max-width: 640px) {
  .node-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}

.node-info {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.node-name {
  color: #e2e8f0;
  font-weight: 500;
}

.node-latency {
  color: #38bdf8;
  font-size: 12px;
}

.progress-bar-bg {
  height: 8px;
  background: #1e293b;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.6s ease;
}

.node-speed {
  text-align: right;
  font-weight: 600;
  color: #f8fafc;
  font-size: 13px;
}

.panel-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 12px;
  color: #94a3b8;
}

.footer-label {
  color: #64748b;
  font-weight: 600;
}
</style>
