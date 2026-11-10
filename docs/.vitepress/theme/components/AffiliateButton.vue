<template>
  <div class="affiliate-cta-box">
    <div class="cta-inner">
      <div class="cta-info">
        <div class="brand-title">
          <span class="brand-highlight">{{ brandName }}</span>
          <span v-if="coupon" class="coupon-badge">
            优惠码: <code>{{ coupon }}</code>
          </span>
        </div>
        <div class="pricing-summary">{{ priceSummary || '官网直达通道 · 独家优惠接入' }}</div>
      </div>
      <div class="cta-action">
        <a 
          :href="targetUrl" 
          target="_blank" 
          rel="nofollow sponsored noopener" 
          class="btn-visit"
        >
          <span>立即前往官网注册</span>
          <span class="arrow">→</span>
        </a>
      </div>
    </div>
    <div class="disclosure-text">
      * 标注：含官方授权推广链接，通过链接注册可能为飞鸟博客带来服务器维护赞助佣金，不影响您的最终支付价格。
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  brandName: string;
  slug: string;
  coupon?: string;
  priceSummary?: string;
  rawUrl?: string;
}>();

const targetUrl = computed(() => {
  // If slug provided, route through /go/:slug for Apache 302 jump, or fallback to rawUrl
  if (props.slug) {
    return `/go/${props.slug}`;
  }
  return props.rawUrl || '#';
});
</script>

<style scoped>
.affiliate-cta-box {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%);
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 8px;
  padding: 16px 20px;
  margin: 24px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  font-family: var(--vp-font-family-mono);
}

.cta-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.brand-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;
}

.brand-highlight {
  font-size: 17px;
  font-weight: 700;
  color: #f8fafc;
}

.coupon-badge {
  font-size: 11px;
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
  padding: 2px 6px;
  border-radius: 4px;
}

.coupon-badge code {
  color: #fef08a;
  font-weight: 700;
  background: transparent;
  padding: 0 2px;
}

.pricing-summary {
  font-size: 12px;
  color: #94a3b8;
}

.btn-visit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #2563eb;
  color: #ffffff !important;
  font-weight: 600;
  font-size: 13px;
  padding: 9px 18px;
  border-radius: 6px;
  text-decoration: none !important;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(37, 99, 235, 0.4);
}

.btn-visit:hover {
  background: #1d4ed8;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.6);
}

.btn-visit .arrow {
  transition: transform 0.2s ease;
}

.btn-visit:hover .arrow {
  transform: translateX(3px);
}

.disclosure-text {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  font-size: 10px;
  color: #64748b;
  line-height: 1.4;
}
</style>
