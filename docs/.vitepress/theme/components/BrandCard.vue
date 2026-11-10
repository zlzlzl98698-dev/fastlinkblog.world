<template>
  <div class="brand-item-card" :class="{ 'is-featured': brand.isRecommended }">
    <div class="card-header">
      <div class="brand-identity">
        <span v-if="brand.rank <= 10" class="rank-badge" :class="'rank-' + brand.rank">
          TOP {{ brand.rank }}
        </span>
        <h3 class="brand-name">{{ brand.name }}</h3>
      </div>
      <div class="price-pill">
        <span class="price-from">起步</span>
        <strong class="price-value">{{ brand.startPrice }}</strong>
      </div>
    </div>

    <div class="card-tags">
      <span class="tag-line">{{ brand.lineType }}</span>
      <span v-for="p in brand.protocols" :key="p" class="tag-proto">{{ p }}</span>
      <span v-if="brand.hasSpeedtestImage" class="tag-verified">📊 具备实测图</span>
    </div>

    <p class="card-desc">{{ brand.description }}</p>

    <div class="test-snippet" v-if="brand.testedSpeed">
      <span class="snippet-icon">⚡</span>
      <span class="snippet-text"><strong>实测数据：</strong>{{ brand.testedSpeed }}</span>
    </div>

    <div class="coupon-box" v-if="brand.coupon && brand.coupon !== '无' && brand.coupon !== '待核实'">
      <span class="coupon-label">专属优惠码</span>
      <code class="coupon-code">{{ brand.coupon }}</code>
    </div>

    <div class="card-actions">
      <a :href="'/reviews/' + brand.slug" class="btn-review">
        查看万字深度评测 📖
      </a>
      <a
        :href="brand.affLink"
        target="_blank"
        rel="nofollow sponsored noopener"
        class="btn-visit"
      >
        进入官网注册 🚀
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  brand: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.brand-item-card {
  background: #FFFFFF;
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.25s ease;
  position: relative;
  box-shadow: 0 2px 8px rgba(62, 39, 35, 0.04);
}

.brand-item-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(77, 182, 172, 0.15);
  border-color: var(--vp-c-brand-1);
}

.brand-item-card.is-featured {
  border: 2px solid var(--vp-c-brand-1);
  background: linear-gradient(180deg, #FFFFFF 0%, #F9FAF9 100%);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand-identity {
  display: flex;
  align-items: center;
  gap: 8px;
}

.rank-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  background: #EDE7F6;
  color: #5E35B1;
}

.rank-badge.rank-1 {
  background: #FF6F00;
  color: #FFFFFF;
}

.rank-badge.rank-2, .rank-badge.rank-3 {
  background: var(--vp-c-brand-1);
  color: #FFFFFF;
}

.brand-name {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.price-pill {
  text-align: right;
}

.price-from {
  font-size: 11px;
  color: var(--vp-c-text-3);
  margin-right: 4px;
}

.price-value {
  font-size: 1.25rem;
  color: #D84315;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-line, .tag-proto, .tag-verified {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 4px;
}

.tag-line {
  background: #E0F2F1;
  color: #00695C;
  font-weight: 600;
}

.tag-proto {
  background: #ECEFF1;
  color: #455A64;
}

.tag-verified {
  background: #E8F5E9;
  color: #2E7D32;
  font-weight: 600;
}

.card-desc {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.test-snippet {
  background: #FAF8F5;
  border-left: 3px solid var(--vp-c-brand-1);
  padding: 6px 10px;
  border-radius: 0 4px 4px 0;
  font-size: 0.85rem;
  color: var(--vp-c-text-1);
}

.coupon-box {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  background: #FFF8E1;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px dashed #FFE082;
}

.coupon-label {
  color: #F57F17;
  font-weight: 600;
}

.coupon-code {
  background: #FFFFFF;
  color: #E65100;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
}

.card-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
  padding-top: 8px;
}

.btn-review, .btn-visit {
  text-align: center;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none !important;
  transition: all 0.2s ease;
}

.btn-review {
  background: #F4F1EA;
  color: var(--vp-c-text-1);
}

.btn-review:hover {
  background: #E8E3D7;
}

.btn-visit {
  background: var(--vp-c-brand-1);
  color: #FFFFFF !important;
}

.btn-visit:hover {
  background: var(--vp-c-brand-3);
  box-shadow: 0 2px 8px rgba(77, 182, 172, 0.4);
}
</style>
