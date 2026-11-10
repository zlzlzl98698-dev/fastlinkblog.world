<template>
  <div class="brand-filter-wrapper">
    <!-- 顶部过滤控制台 -->
    <div class="filter-controls">
      <div class="search-box">
        <span class="search-icon">🔍</span>
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索 42 家机场名称、优惠码或协议（如 光速云、VLESS、IPLC）..."
          class="search-input"
        />
        <button v-if="searchKeyword" @click="searchKeyword = ''" class="clear-btn">✕</button>
      </div>

      <div class="filter-tabs">
        <button
          v-for="tab in filterTabs"
          :key="tab.key"
          :class="{ active: currentTab === tab.key }"
          @click="currentTab = tab.key"
          class="tab-btn"
        >
          {{ tab.label }}
          <span class="tab-count">{{ getTabCount(tab.key) }}</span>
        </button>
      </div>
    </div>

    <!-- 结果统计与合规声明 -->
    <div class="results-meta">
      <span class="meta-count">共检索到 <strong>{{ filteredBrands.length }}</strong> 家机场服务商</span>
      <span class="meta-tip">数据核实日期：2026-11-10 ｜ 测速批次已校验</span>
    </div>

    <!-- 品牌卡片网格 -->
    <div class="brands-grid" v-if="filteredBrands.length > 0">
      <BrandCard
        v-for="brand in filteredBrands"
        :key="brand.id"
        :brand="brand"
      />
    </div>

    <!-- 空状态提示 -->
    <div v-else class="empty-state">
      <div class="empty-icon">🍃</div>
      <h4>未找到匹配的机场品牌</h4>
      <p>可以尝试更换关键词或清除筛选条件</p>
      <button @click="resetFilters" class="btn-reset">重置筛选条件</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import brandsData from '../../../data/brands.json'
import BrandCard from './BrandCard.vue'

const searchKeyword = ref('')
const currentTab = ref('all')

const filterTabs = [
  { key: 'all', label: '全部 42 品牌' },
  { key: 'recommended', label: '⭐ 前十重点主推' },
  { key: 'hasImage', label: '📊 包含实测大图' },
  { key: 'cheap', label: '💰 10元内轻量入门' },
  { key: 'vless', label: '🛡️ VLESS 协议' },
  { key: 'iepl', label: '⚡ IPLC/IEPL 专线' }
]

function getTabCount(key) {
  if (key === 'all') return brandsData.length
  if (key === 'recommended') return brandsData.filter(b => b.isRecommended).length
  if (key === 'hasImage') return brandsData.filter(b => b.hasSpeedtestImage).length
  if (key === 'cheap') return brandsData.filter(b => b.startPrice.includes('5.6') || b.startPrice.includes('6') || b.startPrice.includes('7') || b.startPrice.includes('8')).length
  if (key === 'vless') return brandsData.filter(b => b.protocols.includes('VLESS')).length
  if (key === 'iepl') return brandsData.filter(b => b.lineType.includes('IEPL') || b.lineType.includes('IPLC')).length
  return 0
}

const filteredBrands = computed(() => {
  return brandsData.filter(brand => {
    // 标签过滤
    let matchTab = true
    if (currentTab.value === 'recommended') matchTab = brand.isRecommended
    else if (currentTab.value === 'hasImage') matchTab = brand.hasSpeedtestImage
    else if (currentTab.value === 'cheap') matchTab = brand.startPrice.includes('5.6') || brand.startPrice.includes('6') || brand.startPrice.includes('7') || brand.startPrice.includes('8')
    else if (currentTab.value === 'vless') matchTab = brand.protocols.includes('VLESS')
    else if (currentTab.value === 'iepl') matchTab = brand.lineType.includes('IEPL') || brand.lineType.includes('IPLC')

    if (!matchTab) return false

    // 搜索词过滤
    if (!searchKeyword.value.trim()) return true
    const kw = searchKeyword.value.toLowerCase().trim()
    return (
      brand.name.toLowerCase().includes(kw) ||
      brand.slug.toLowerCase().includes(kw) ||
      brand.lineType.toLowerCase().includes(kw) ||
      brand.protocols.some(p => p.toLowerCase().includes(kw)) ||
      (brand.coupon && brand.coupon.toLowerCase().includes(kw))
    )
  })
})

function resetFilters() {
  searchKeyword.value = ''
  currentTab.value = 'all'
}
</script>

<style scoped>
.brand-filter-wrapper {
  margin: 2rem 0;
}

.filter-controls {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #FFFFFF;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
  box-shadow: 0 2px 10px rgba(62, 39, 35, 0.04);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  font-size: 1rem;
}

.search-input {
  width: 100%;
  padding: 10px 36px 10px 38px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  font-size: 0.95rem;
  background: #FFFDF8;
  color: var(--vp-c-text-1);
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
  background: #FFFFFF;
}

.clear-btn {
  position: absolute;
  right: 12px;
  border: none;
  background: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  font-size: 1rem;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tab-btn {
  border: 1px solid var(--vp-c-border);
  background: #FDFBF7;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.tab-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tab-btn.active {
  background: var(--vp-c-brand-1);
  color: #FFFFFF;
  border-color: var(--vp-c-brand-1);
}

.tab-count {
  font-size: 11px;
  background: rgba(0, 0, 0, 0.08);
  padding: 1px 6px;
  border-radius: 10px;
}

.tab-btn.active .tab-count {
  background: rgba(255, 255, 255, 0.25);
  color: #FFFFFF;
}

.results-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 14px 4px 18px 4px;
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.brands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px dashed var(--vp-c-border);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
}

.btn-reset {
  margin-top: 14px;
  background: var(--vp-c-brand-1);
  color: #FFFFFF;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
