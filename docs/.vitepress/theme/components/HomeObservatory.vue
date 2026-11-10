<template>
  <div class="home-observatory-section">
    <!-- Top Performance Picks Section -->
    <div class="picks-panel">
      <div class="panel-header">
        <div class="header-left">
          <span class="live-pulse"></span>
          <span class="title">2026 年度编辑精选推荐梯队 (Top Performance Picks)</span>
        </div>
        <div class="header-right">
          <span>核验基准：IEPL 专线可用率 / 晚高峰抗抖动 / AI 与流媒体解锁</span>
        </div>
      </div>

      <div class="picks-grid">
        <!-- T0 光速云 -->
        <div class="pick-card card-t0">
          <div class="card-badge-row">
            <span class="tier-tag t0">T0 综合主推</span>
            <span class="status-tag">已实测 (2026)</span>
          </div>
          <h4 class="brand-title">光速云 (Guangsu Cloud)</h4>
          <p class="brand-desc">2020老牌运营，IEPL+企业内网双专线架构，VLESS协议低延迟，斯诺克147永久套餐/年付99元起。</p>
          <div class="brand-meta">
            <span>优惠码: <code>AMM</code></span>
            <span>单节点最高 2.5Gbps</span>
          </div>
          <div class="card-actions">
            <a href="/reviews/guangsu" class="btn-review">万字深度评测 →</a>
            <a href="/go/guangsu" target="_blank" rel="nofollow sponsored noopener" class="btn-portal">官网直达</a>
          </div>
        </div>

        <!-- T1 暮光加速 -->
        <div class="pick-card card-t1">
          <div class="card-badge-row">
            <span class="tier-tag t1">T1 核心推荐</span>
            <span class="status-tag">已实测 (2026)</span>
          </div>
          <h4 class="brand-title">暮光加速 (Muguang)</h4>
          <p class="brand-desc">BGP智能多线调度，专线级出口，多设备同时在线无门槛，配备7×24小时真人客服支持。</p>
          <div class="brand-meta">
            <span>优惠码: <code>muguang5555</code></span>
            <span>20元/月 120GB起</span>
          </div>
          <div class="card-actions">
            <a href="/reviews/muguang" class="btn-review">深度实测 →</a>
            <a href="/go/muguang" target="_blank" rel="nofollow sponsored noopener" class="btn-portal">官网直达</a>
          </div>
        </div>

        <!-- T1 飞猫云 -->
        <div class="pick-card card-t1">
          <div class="card-badge-row">
            <span class="tier-tag t1">T1 核心推荐</span>
            <span class="status-tag">已实测 (2026)</span>
          </div>
          <h4 class="brand-title">飞猫云 (Flycat)</h4>
          <p class="brand-desc">专属客户端下载登录即用，免繁琐订阅导入，年付低至7元/月，新手与轻度流媒体首选。</p>
          <div class="brand-meta">
            <span>优惠码: <code>flycat888</code></span>
            <span>年付享 8 折</span>
          </div>
          <div class="card-actions">
            <a href="/reviews/feimao" class="btn-review">深度实测 →</a>
            <a href="/go/feimao" target="_blank" rel="nofollow sponsored noopener" class="btn-portal">官网直达</a>
          </div>
        </div>

        <!-- T1 星岛梦 -->
        <div class="pick-card card-t1">
          <div class="card-badge-row">
            <span class="tier-tag t1">T1 核心推荐</span>
            <span class="status-tag">已实测 (2026)</span>
          </div>
          <h4 class="brand-title">星岛梦 (Xingdaomeng)</h4>
          <p class="brand-desc">2020年老牌稳定运营，提供一次性买断不过期的不限时流量包，适合低频备用与出海查资料。</p>
          <div class="brand-meta">
            <span>优惠码: <code>nmw888</code></span>
            <span>不限时流量包</span>
          </div>
          <div class="card-actions">
            <a href="/reviews/xingdaomeng" class="btn-review">深度实测 →</a>
            <a href="/go/xingdaomeng" target="_blank" rel="nofollow sponsored noopener" class="btn-portal">官网直达</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Network Topology Section -->
    <TopologyPath title="飞鸟博客网络观测：企业级跨境专线典型链路架构" />
  </div>
</template>

<script setup lang="ts">
import TopologyPath from './TopologyPath.vue';
</script>

<style scoped>
.home-observatory-section {
  max-width: 1152px;
  margin: 40px auto;
  padding: 0 24px;
  font-family: var(--vp-font-family-mono);
}

.picks-panel {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 32px;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 14px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 10px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.live-pulse {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 10px #10b981;
  flex-shrink: 0;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: #f8fafc;
}

.header-right {
  font-size: 12px;
  color: #94a3b8;
}

.picks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

.pick-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.pick-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.card-t0 {
  background: linear-gradient(180deg, #16223e 0%, #111827 100%);
  border-color: rgba(59, 130, 246, 0.4);
}

.card-t0:hover {
  border-color: rgba(59, 130, 246, 0.8);
}

.card-t1:hover {
  border-color: rgba(168, 85, 247, 0.5);
}

.card-badge-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.tier-tag {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
}

.tier-tag.t0 {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.4);
}

.tier-tag.t1 {
  background: rgba(168, 85, 247, 0.2);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.4);
}

.status-tag {
  font-size: 11px;
  color: #34d399;
}

.brand-title {
  margin: 0 0 8px 0;
  font-size: 17px;
  color: #f8fafc;
  font-weight: 700;
}

.brand-desc {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 12px;
  line-height: 1.5;
  flex-grow: 1;
}

.brand-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #38bdf8;
  margin-bottom: 14px;
}

.brand-meta code {
  color: #fef08a;
  background: transparent;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 12px;
}

.btn-review {
  font-size: 12px;
  color: #60a5fa;
  text-decoration: none;
  font-weight: 600;
}

.btn-review:hover {
  text-decoration: underline;
}

.btn-portal {
  background: #2563eb;
  color: #ffffff !important;
  font-size: 11px;
  padding: 5px 12px;
  border-radius: 4px;
  text-decoration: none !important;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-portal:hover {
  background: #1d4ed8;
}
</style>
