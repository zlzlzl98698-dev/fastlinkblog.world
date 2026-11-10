<template>
  <div class="aff-notice-card">
    <div class="notice-icon">🍃</div>
    <div class="notice-content">
      <strong class="notice-title">客观性与透明化说明（Affiliate Disclosure）：</strong>
      <span class="notice-body">
        本站部分推荐链接含有推广代码（Affiliate Link）。若您通过本站链接注册并购买，服务商可能会支付少量维护佣金，但这<strong>绝不会增加您的实际支付价格</strong>，也不会左右本站基于真实网络观测数据的客观评测结论。感谢您的支持！
      </span>
    </div>
  </div>
</template>

<style scoped>
.aff-notice-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: #FFFDF8;
  border: 1px dashed #B2DFDB;
  border-left: 4px solid var(--vp-c-brand-1);
  padding: 14px 18px;
  border-radius: 8px;
  margin: 1.5rem 0;
  font-size: 0.88rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.notice-icon {
  font-size: 1.25rem;
  line-height: 1;
}

.notice-title {
  color: var(--vp-c-brand-3);
  margin-right: 4px;
}
</style>
