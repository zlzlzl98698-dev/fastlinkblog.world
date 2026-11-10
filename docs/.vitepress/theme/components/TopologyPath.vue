<template>
  <div class="topology-path">
    <div class="topo-header">
      <div class="topo-title">
        <span class="pulse-dot"></span>
        <span>{{ title || 'IEPL / IPLC 专线网络链路拓扑图' }}</span>
      </div>
      <div class="topo-badge">
        <span>架构安全级别: 企业级内网专线 / 纯内网过境</span>
      </div>
    </div>

    <div class="topo-body">
      <div class="step-card user-step">
        <div class="step-icon">💻</div>
        <div class="step-name">用户终端设备</div>
        <div class="step-desc">PC / 手机 / 软路由</div>
        <div class="protocol-tag">VLESS / SS 加密</div>
      </div>

      <div class="connector-arrow">
        <span class="arrow-line"></span>
        <span class="arrow-text">国内公网加密</span>
      </div>

      <div class="step-card bgp-step">
        <div class="step-icon">🏢</div>
        <div class="step-name">国内入口节点</div>
        <div class="step-desc">上海 / 广州 BGP 入口</div>
        <div class="protocol-tag">抗 QoS / 动态调度</div>
      </div>

      <div class="connector-arrow special">
        <span class="arrow-line special-line"></span>
        <span class="arrow-text special-text">⚡ IEPL 内网专线直连 (不经公网)</span>
      </div>

      <div class="step-card egress-step">
        <div class="step-icon">🌐</div>
        <div class="step-name">海外落地集群</div>
        <div class="step-desc">香港 / 东京 / 新加坡 / 洛杉矶</div>
        <div class="protocol-tag">原生住宅/机房 IP</div>
      </div>

      <div class="connector-arrow">
        <span class="arrow-line"></span>
        <span class="arrow-text">直连出海</span>
      </div>

      <div class="step-card target-step">
        <div class="step-icon">🎯</div>
        <div class="step-name">目标出海业务</div>
        <div class="step-desc">ChatGPT / Claude / Netflix</div>
        <div class="protocol-tag">4K / 低延迟 / 零封锁</div>
      </div>
    </div>

    <div class="topo-footer">
      <span>拓扑特性说明：流量进入国内入口后即刻封装走跨境物理光缆内网传输，彻底绕过公共互联网国际出口拥堵节点，晚高峰丢包率趋近于 0%。</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.topology-path {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  font-family: var(--vp-font-family-mono);
}

.topo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 8px;
}

.topo-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #f1f5f9;
  font-size: 15px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #38bdf8;
  box-shadow: 0 0 8px #38bdf8;
}

.topo-badge {
  font-size: 11px;
  color: #94a3b8;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 4px;
}

.topo-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: auto;
  padding: 10px 0;
  gap: 8px;
}

.step-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 12px 14px;
  min-width: 130px;
  text-align: center;
  flex-shrink: 0;
}

.step-icon {
  font-size: 20px;
  margin-bottom: 4px;
}

.step-name {
  font-size: 12px;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 2px;
}

.step-desc {
  font-size: 10px;
  color: #94a3b8;
  margin-bottom: 6px;
}

.protocol-tag {
  font-size: 9px;
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
  border-radius: 3px;
  padding: 1px 4px;
  display: inline-block;
}

.connector-arrow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 0 6px;
  min-width: 90px;
}

.arrow-line {
  width: 100%;
  height: 2px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  margin-bottom: 4px;
}

.arrow-line::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  width: 0;
  height: 0;
  border-left: 6px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
}

.arrow-text {
  font-size: 10px;
  color: #64748b;
  white-space: nowrap;
}

.connector-arrow.special .arrow-line {
  background: linear-gradient(90deg, #3b82f6, #10b981);
  height: 3px;
}

.connector-arrow.special .arrow-line::after {
  border-left-color: #10b981;
}

.connector-arrow.special .arrow-text {
  color: #34d399;
  font-weight: 600;
}

.topo-footer {
  margin-top: 18px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 11px;
  color: #94a3b8;
  line-height: 1.6;
}
</style>
