<template>
  <div class="brand-library">
    <!-- Filter Controls -->
    <div class="filter-bar">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="搜索 42 家机场品牌、协议或特征 (如 光速云, IEPL, VLESS, 5.6元)..." 
          class="search-input"
        />
      </div>

      <div class="filter-tags">
        <div class="filter-group">
          <span class="filter-label">推荐梯队:</span>
          <button 
            v-for="t in tierOptions" 
            :key="t.val" 
            :class="['filter-btn', { active: selectedTier === t.val }]"
            @click="selectedTier = t.val"
          >
            {{ t.label }}
          </button>
        </div>

        <div class="filter-group">
          <span class="filter-label">数据状态:</span>
          <button 
            v-for="s in statusOptions" 
            :key="s.val" 
            :class="['filter-btn', { active: selectedStatus === s.val }]"
            @click="selectedStatus = s.val"
          >
            {{ s.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Stats Bar -->
    <div class="results-meta">
      <span>已筛选匹配出 <strong class="highlight-count">{{ filteredBrands.length }}</strong> 家机场服务商</span>
      <span class="data-standard-note">数据严谨性标准：有实测图标为 [已实测]；无实测图标为 [厂商声明] 或 [待核实]</span>
    </div>

    <!-- Brands Grid -->
    <div class="brands-grid">
      <div 
        v-for="b in filteredBrands" 
        :key="b.slug" 
        class="brand-card"
        :class="{ 't0-card': b.tier === 'T0', 't1-card': b.tier === 'T1' }"
      >
        <div class="card-header">
          <div class="header-left">
            <span class="tier-badge" :class="'tier-' + b.tier.toLowerCase()">
              {{ b.tier === 'T0' ? '🏆 T0 主推' : b.tier }}
            </span>
            <h3 class="brand-name">{{ b.name }}</h3>
          </div>
          <div class="header-right">
            <span class="status-pill" :class="'status-' + b.testStatus">
              {{ getStatusLabel(b.testStatus) }}
            </span>
          </div>
        </div>

        <div class="price-row">
          <span class="price-tag">{{ b.price }}</span>
          <span v-if="b.coupon && b.coupon !== '暂无' && b.coupon !== '待核实'" class="coupon-tag">
            券: <code>{{ b.coupon }}</code>
          </span>
        </div>

        <div class="protocols-row">
          <span class="proto-label">协议架构:</span>
          <span class="proto-val">{{ b.protocols }}</span>
        </div>

        <p class="brand-desc">{{ b.description }}</p>

        <div class="features-list">
          <span v-for="(f, i) in b.features.slice(0, 4)" :key="i" class="feature-chip">
            {{ f }}
          </span>
        </div>

        <div class="card-footer">
          <a 
            v-if="b.hasReview" 
            :href="'/reviews/' + b.slug" 
            class="btn-review"
          >
            查看深度评测 →
          </a>
          <span v-else class="btn-review disabled">评测待更新</span>

          <a 
            :href="'/go/' + b.slug" 
            target="_blank" 
            rel="nofollow sponsored noopener" 
            class="btn-portal"
          >
            官网注册
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { BRANDS_DATA, type BrandInfo } from '../../../data/brands';

const searchQuery = ref('');
const selectedTier = ref('ALL');
const selectedStatus = ref('ALL');

const tierOptions = [
  { label: '全部', val: 'ALL' },
  { label: 'T0 主推', val: 'T0' },
  { label: 'T1 核心推荐', val: 'T1' },
  { label: 'T2 实用专线', val: 'T2' },
  { label: 'T3 备用观察', val: 'T3' }
];

const statusOptions = [
  { label: '全部', val: 'ALL' },
  { label: '已实测 (有测速图)', val: 'measured' },
  { label: '厂商声明', val: 'vendor' },
  { label: '待核实', val: 'unverified' }
];

function getStatusLabel(status: string): string {
  if (status === 'measured') return '已实测数据';
  if (status === 'vendor') return '厂商声明';
  return '数据待核实';
}

const filteredBrands = computed(() => {
  return BRANDS_DATA.filter(b => {
    // Tier filter
    if (selectedTier.value !== 'ALL' && b.tier !== selectedTier.value) {
      return false;
    }
    // Status filter
    if (selectedStatus.value !== 'ALL' && b.testStatus !== selectedStatus.value) {
      return false;
    }
    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim();
      const matchName = b.name.toLowerCase().includes(q);
      const matchProto = b.protocols.toLowerCase().includes(q);
      const matchDesc = b.description.toLowerCase().includes(q);
      const matchPrice = b.price.toLowerCase().includes(q);
      const matchFeatures = b.features.some(f => f.toLowerCase().includes(q));
      return matchName || matchProto || matchDesc || matchPrice || matchFeatures;
    }
    return true;
  });
});
</script>

<style scoped>
.brand-library {
  font-family: var(--vp-font-family-mono);
  margin: 20px 0;
}

.filter-bar {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 16px 20px;
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px 14px;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #f8fafc;
  font-size: 13px;
  margin-bottom: 14px;
  outline: none;
  font-family: inherit;
}

.search-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.filter-tags {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.filter-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.filter-label {
  font-size: 12px;
  color: #94a3b8;
  min-width: 65px;
}

.filter-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #f8fafc;
}

.filter-btn.active {
  background: #2563eb;
  border-color: #3b82f6;
  color: #ffffff;
  font-weight: 600;
}

.results-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;
}

.highlight-count {
  color: #38bdf8;
  font-size: 14px;
}

.data-standard-note {
  font-size: 11px;
  color: #64748b;
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}

.brand-card {
  background: #111827;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.brand-card:hover {
  border-color: rgba(96, 165, 250, 0.4);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.brand-card.t0-card {
  border-color: rgba(59, 130, 246, 0.5);
  background: linear-gradient(180deg, #131d36 0%, #111827 100%);
}

.brand-card.t1-card {
  border-color: rgba(147, 51, 234, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tier-badge {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 3px;
}

.tier-t0 {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.4);
}

.tier-t1 {
  background: rgba(168, 85, 247, 0.2);
  color: #c084fc;
  border: 1px solid rgba(168, 85, 247, 0.4);
}

.tier-t2 {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.tier-t3 {
  background: rgba(148, 163, 184, 0.15);
  color: #94a3b8;
  border: 1px solid rgba(148, 163, 184, 0.3);
}

.brand-name {
  margin: 0 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  color: #f8fafc !important;
}

.status-pill {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
}

.status-measured {
  background: rgba(59, 130, 246, 0.15);
  color: #60a5fa;
}

.status-vendor {
  background: rgba(139, 92, 246, 0.15);
  color: #c084fc;
}

.status-unverified {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
}

.price-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.price-tag {
  font-size: 12px;
  color: #38bdf8;
  font-weight: 600;
}

.coupon-tag {
  font-size: 11px;
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  padding: 1px 4px;
  border-radius: 3px;
}

.coupon-tag code {
  color: #fef08a;
  background: transparent;
}

.protocols-row {
  font-size: 11px;
  color: #94a3b8;
  margin-bottom: 8px;
}

.proto-label {
  color: #64748b;
  margin-right: 4px;
}

.brand-desc {
  font-size: 12px;
  color: #cbd5e1;
  line-height: 1.5;
  margin-bottom: 12px;
}

.features-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 14px;
}

.feature-chip {
  font-size: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  padding: 2px 6px;
  border-radius: 4px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.btn-review {
  font-size: 12px;
  color: #60a5fa !important;
  text-decoration: none !important;
  font-weight: 500;
}

.btn-review:hover {
  text-decoration: underline !important;
}

.btn-review.disabled {
  color: #475569 !important;
}

.btn-portal {
  background: #2563eb;
  color: #ffffff !important;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 12px;
  border-radius: 4px;
  text-decoration: none !important;
  transition: background 0.2s;
}

.btn-portal:hover {
  background: #1d4ed8;
}
</style>
