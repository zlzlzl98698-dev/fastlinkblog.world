import { defineConfig } from 'vitepress';

export default defineConfig({
  lang: 'zh-CN',
  title: '飞鸟博客',
  titleTemplate: ':title | 飞鸟博客 - 高端机场评测与出海网络可观测中心',
  description: '飞鸟博客 (fastlinkblog.world) 是专业出海网络观测与机场评测技术站，覆盖42家机场品牌实测、IEPL/IPLC专线横评、ChatGPT/流媒体解锁矩阵、全平台代理客户端教程与协议排错工程手册。',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://fastlinkblog.world'
  },
  head: [
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }],
    ['meta', { name: 'keywords', content: '机场推荐, 专线机场, 便宜机场, 光速云, 飞猫云, 暮光加速, ChatGPT机场, Netflix解锁, Clash教程, Shadowrocket配置, IEPL, IPLC, VLESS' }],
    ['meta', { name: 'author', content: '飞鸟博客网络实验室' }],
    ['meta', { property: 'og:site_name', content: '飞鸟博客' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // 搜索引擎站长平台所有权验证 Meta 预留槽位（站长获取验证码后直接填入 content 即可全站生效）
    // ['meta', { name: 'google-site-verification', content: 'YOUR_GOOGLE_VERIFICATION_CODE' }],
    // ['meta', { name: 'msvalidate.01', content: 'YOUR_BING_VERIFICATION_CODE' }],
    // ['meta', { name: 'shenma-site-verification', content: 'YOUR_SHENMA_VERIFICATION_CODE' }],
    // ['meta', { name: 'baidu-site-verification', content: 'YOUR_BAIDU_VERIFICATION_CODE' }],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '飞鸟博客',
        url: 'https://fastlinkblog.world',
        description: '高端出海网络可观测性评测中心与42家机场品牌实测矩阵',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://fastlinkblog.world/?s={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      })
    ],
    [
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: '飞鸟博客网络实验室',
        url: 'https://fastlinkblog.world',
        logo: 'https://fastlinkblog.world/assets/avatar.webp',
        sameAs: [
          'https://fastlinkblog.world/about/'
        ]
      })
    ]
  ],
  transformHead({ pageData }) {
    let cleanPath = pageData.relativePath
      .replace(/index\.md$/, '')
      .replace(/\.md$/, '');
    const canonicalUrl = cleanPath ? `https://fastlinkblog.world/${cleanPath}` : 'https://fastlinkblog.world/';
    const pageTitle = pageData.title ? `${pageData.title} | 飞鸟博客` : '飞鸟博客 - 高端机场评测与出海网络可观测中心';
    const pageDesc = pageData.description || '飞鸟博客 (fastlinkblog.world) 是专业出海网络观测与机场评测技术站，覆盖42家机场品牌实测、IEPL/IPLC专线横评、ChatGPT/流媒体解锁矩阵。';

    const heads: any[] = [
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:url', content: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageTitle }],
      ['meta', { property: 'og:description', content: pageDesc }],
      ['meta', { property: 'og:image', content: 'https://fastlinkblog.world/assets/avatar.webp' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:title', content: pageTitle }],
      ['meta', { name: 'twitter:description', content: pageDesc }],
      ['meta', { name: 'twitter:image', content: 'https://fastlinkblog.world/assets/avatar.webp' }]
    ];

    if (cleanPath) {
      const parts = cleanPath.split('/').filter(Boolean);
      const breadcrumbItems = [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首页',
          item: 'https://fastlinkblog.world/'
        }
      ];

      let accPath = '';
      parts.forEach((part, idx) => {
        accPath += (accPath ? '/' : '') + part;
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: idx + 2,
          name: idx === parts.length - 1 && pageData.title ? pageData.title : part,
          item: `https://fastlinkblog.world/${accPath}`
        });
      });

      heads.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbItems
        })
      ]);
    }

    return heads;
  },
  themeConfig: {
    siteTitle: '飞鸟博客 · 网络实验室 🍃',
    logo: {
      src: '/assets/avatar.webp',
      alt: '飞鸟博客 · 网络实验室'
    },
    nav: [
      { text: '首页', link: '/' },
      {
        text: '42家机场推荐',
        items: [
          { text: '精选推荐全景指南 (万字支柱)', link: '/recommend/' },
          { text: '高性价比平价便宜机场专题', link: '/recommend/budget/' },
          { text: '高端专线与晚高峰稳定专题', link: '/recommend/premium/' }
        ]
      },
      {
        text: '42家深度评测',
        items: [
          { text: '42家实测总览矩阵 (万字支柱)', link: '/reviews/' },
          { text: '16+家带测速大图实测库', link: '/reviews/tested/' },
          { text: '42家品牌完整数据全景库', link: '/brands/' },
          { text: '—— 重点主推测评 ——', link: '#' },
          { text: '【T0 主推】光速云万字全景评测', link: '/reviews/guangsu' },
          { text: '【T1】暮光加速 (BGP专线/7x24客服)', link: '/reviews/muguang' },
          { text: '【T1】飞猫云 (小白免配专属端)', link: '/reviews/feimao' },
          { text: '【T1】星岛梦 (老牌不限时流量包)', link: '/reviews/xingdaomeng' },
          { text: '【T1】微风网络 (年付7元轻量首选)', link: '/reviews/weifeng' },
          { text: '【T1】大佬云 (5.6元平价月付备用)', link: '/reviews/dalaoyun' },
          { text: '【T1】唯兔云 (60+节点三网优化)', link: '/reviews/weitu' },
          { text: '【T1】二猫云 (20元130GB均衡大流量)', link: '/reviews/ermao' }
        ]
      },
      { text: '免费节点', link: '/free-nodes/' },
      { text: '机场FAQ', link: '/faq/' },
      { text: '跑路预警', link: '/risk-warning/' },
      { text: '免费试用', link: '/free-trial/' },
      {
        text: '技术知识库',
        items: [
          { text: '42 家机场品牌库', link: '/brands/' },
          { text: 'ChatGPT / AI 解锁指南', link: '/unlock/ai/' },
          { text: '全球 4K 流媒体解锁', link: '/unlock/streaming/' },
          { text: '全平台客户端下载配置', link: '/clients/' },
          { text: '网络协议与排错诊断', link: '/protocols/' },
          { text: '防坑指南与风险防御', link: '/security/' },
          { text: '关于飞鸟博客实验室', link: '/about/' }
        ]
      }
    ],
    sidebar: {
      '/recommend/': [
        {
          text: '专题一 · 42 家机场推荐',
          items: [
            { text: '2026 稳定机场推荐全景指南 (支柱)', link: '/recommend/' },
            { text: '高性价比与便宜机场选型', link: '/recommend/budget/' },
            { text: '高端专线与晚高峰稳定选型', link: '/recommend/premium/' }
          ]
        },
        {
          text: '重点推荐品牌直达',
          items: [
            { text: '【T0 第一主推】光速云万字评测', link: '/reviews/guangsu' },
            { text: '【T1】暮光加速 (BGP专线/稳定备用)', link: '/reviews/muguang' },
            { text: '【T1】飞猫云 (小白免配专属端)', link: '/reviews/feimao' },
            { text: '【T1】星岛梦 (老牌不过期流量包)', link: '/reviews/xingdaomeng' },
            { text: '【T1】微风网络 (年付7元极致轻量)', link: '/reviews/weifeng' }
          ]
        },
        {
          text: '关联专题导航',
          items: [
            { text: '42 家机场深度评测库', link: '/reviews/' },
            { text: '跑路预警与防坑风控', link: '/risk-warning/' },
            { text: '免费试用与退款黑幕', link: '/free-trial/' }
          ]
        }
      ],
      '/reviews/': [
        {
          text: '专题二 · 42 家深度评测',
          items: [
            { text: '42 家机场深度评测总览 (支柱)', link: '/reviews/' },
            { text: '16+ 家真实测速大图库', link: '/reviews/tested/' },
            { text: '42 家品牌完整数据全景库', link: '/brands/' }
          ]
        },
        {
          text: 'T0 / T1 梯队深度测评',
          items: [
            { text: '【T0 主推】光速云万字测评', link: '/reviews/guangsu' },
            { text: '【T1】暮光加速 (BGP专线/7x24客服)', link: '/reviews/muguang' },
            { text: '【T1】飞猫云 (小白免配专属端)', link: '/reviews/feimao' },
            { text: '【T1】星岛梦 (老牌不过期流量包)', link: '/reviews/xingdaomeng' },
            { text: '【T1】微风网络 (年付7元/轻量首选)', link: '/reviews/weifeng' },
            { text: '【T1】大佬云 (5.6元平价月付备用)', link: '/reviews/dalaoyun' },
            { text: '【T1】二猫云 (20元130GB均衡大流量)', link: '/reviews/ermao' },
            { text: '【T1】无忧链接 (免转换自适应)', link: '/reviews/wuyou' },
            { text: '【T1】唯兔云 (60+节点三网优化)', link: '/reviews/weitu' },
            { text: '【T1】Firefly (纯IPLC物理专线)', link: '/reviews/firefly' }
          ]
        },
        {
          text: 'T2 实用专线实测',
          items: [
            { text: '宇宙云 (IEPL+VLESS专属端)', link: '/reviews/yuzhou' },
            { text: 'U1S1 (20元120GB低丢包)', link: '/reviews/u1s1' },
            { text: '灵猫网络 (19元150GB兼备不限时)', link: '/reviews/lingmao' },
            { text: '极连云 (针对AI大模型特化)', link: '/reviews/jilian' },
            { text: '光年梯 (近端东亚低延迟)', link: '/reviews/guangnian' },
            { text: '一翻云 (20元150GB多端并发)', link: '/reviews/yifan' },
            { text: 'SOGO云 (2026新锐低负载)', link: '/reviews/sogo' },
            { text: '可信云 (数据透明诚信低抖动)', link: '/reviews/kexin' },
            { text: '速界 (AI对话长连接低延迟)', link: '/reviews/sujie' },
            { text: '快狸 (VLESS高吞吐下行)', link: '/reviews/kaili' },
            { text: '全球云 (2026全球热门覆盖)', link: '/reviews/quanqiu' },
            { text: '梯子云 (自研客户端+通用订阅)', link: '/reviews/tiziyun' },
            { text: '隐形人 (纯自研端1小时修复)', link: '/reviews/yinxingren' },
            { text: '闪跃 (24元150GB流媒体全解)', link: '/reviews/shanyue' },
            { text: '闪电鼠 (5.6元平价月付)', link: '/reviews/shandianshu' },
            { text: '云界线 (5.6元灵活月付)', link: '/reviews/yunjiexian' },
            { text: '榴莲云 (5.6元尝鲜出海)', link: '/reviews/liulianyun' },
            { text: '神行加速 (14元中端高性价比)', link: '/reviews/shenxing' },
            { text: '环球梯 (5.6元通用格式支持)', link: '/reviews/huanqiuti' }
          ]
        },
        {
          text: 'T3 历史档案与待核实观察',
          items: [
            { text: 'WgetCloud (历史59节点实测)', link: '/reviews/wgetcloud' },
            { text: '白月光 (历史108节点实测)', link: '/reviews/baiyueguang' },
            { text: 'FlyingBird (存量老牌核查)', link: '/reviews/flyingbird' },
            { text: 'CyberGuard (隐私加密核查)', link: '/reviews/cyberguard' },
            { text: '龙猫云 (常规中转核查)', link: '/reviews/longmaoyun' },
            { text: 'FATCAT (大带宽多线核查)', link: '/reviews/fatcat' },
            { text: 'TNTCloud (多平台兼容核查)', link: '/reviews/tntcloud' },
            { text: '青云梯 (传统中转核查)', link: '/reviews/qingyunti' },
            { text: '山水云 (轻度浏览核查)', link: '/reviews/shanshuiyun' },
            { text: '灵动云 (动态节点核查)', link: '/reviews/lingdongyun' },
            { text: '浪网 (小众出海核查)', link: '/reviews/langwang' },
            { text: 'EdgeNova (边缘计算核查)', link: '/reviews/edgenova' },
            { text: '萤火虫 (存量服务核查)', link: '/reviews/yinghuochong' },
            { text: 'sslar (存量机场核查)', link: '/reviews/sslar' },
            { text: '前往 42 家品牌库总览 →', link: '/brands/' }
          ]
        }
      ],
      '/free-nodes/': [
        {
          text: '专题三 · 免费节点与订阅',
          items: [
            { text: '免费节点真相与安全图谱 (万字支柱)', link: '/free-nodes/' }
          ]
        },
        {
          text: '核心知识章节',
          items: [
            { text: '一、免费节点每日更新获取机制', link: '/free-nodes/#一、免费节点与公开订阅池的“每日更新”机制真相' },
            { text: '二、6 大致命安全隐患与风险拆解', link: '/free-nodes/#二、使用免费节点必须警惕的-6-大致命安全隐患' },
            { text: '三、免费节点的真实可用率现状', link: '/free-nodes/#三、免费节点的真实网络质量与“可用率”实测' },
            { text: '四、为什么不限时套餐是终极归宿', link: '/free-nodes/#四、为什么“不限时按量套餐”才是免费用户的终极归宿？' },
            { text: '五、如何安全过渡到低成本专线', link: '/free-nodes/#五、如何科学安全地过渡到低成本付费专线？' },
            { text: '六、高频 FAQ：免费节点常见疑问', link: '/free-nodes/#六、高频-faq：免费节点与安全防护常见疑问' }
          ]
        },
        {
          text: '低成本替代推荐',
          items: [
            { text: '微风网络 (年付 7 元轻量备用)', link: '/reviews/weifeng' },
            { text: '星岛梦 (不限时按量永久包)', link: '/reviews/xingdaomeng' },
            { text: '大佬云 (5.6 元平价月付方案)', link: '/reviews/dalaoyun' }
          ]
        }
      ],
      '/faq/': [
        {
          text: '专题四 · 机场高频 FAQ',
          items: [
            { text: '机场常见问题与排错手册 (万字支柱)', link: '/faq/' }
          ]
        },
        {
          text: '分类排障指南',
          items: [
            { text: '第一部分：节点连通性与超时排障', link: '/faq/#第一部分：节点连通性与超时故障-connection-timeout' },
            { text: '第二部分：速度与晚高峰拥堵问题', link: '/faq/#第二部分：速度与晚高峰拥堵问题-speed-stability' },
            { text: '第三部分：流媒体与 ChatGPT 解锁故障', link: '/faq/#第三部分：流媒体与-chatgpt-解锁故障-unlock-issue' },
            { text: '第四部分：客户端配置与系统网络自愈', link: '/faq/#第四部分：客户端配置与系统网络异常-client-configuration' },
            { text: '第五部分：付费、安全与风控避坑', link: '/faq/#第五部分：付费周期、安全与风控避坑-billing-security' }
          ]
        },
        {
          text: '相关技术指引',
          items: [
            { text: '全平台代理客户端配置手册', link: '/clients/' },
            { text: '现代代理协议与网络诊断', link: '/protocols/' },
            { text: '光速云万字使用与配置指南', link: '/reviews/guangsu' }
          ]
        }
      ],
      '/risk-warning/': [
        {
          text: '专题五 · 跑路预警与防坑',
          items: [
            { text: '跑路预警与风控手册 (万字支柱)', link: '/risk-warning/' }
          ]
        },
        {
          text: '风控核心章节',
          items: [
            { text: '一、机场跑路前 5 大技术特征', link: '/risk-warning/#一、机场跑路前的-5-大经典技术特征（警报红线）' },
            { text: '二、1 元 1000G 低价超售圈钱套路', link: '/risk-warning/#二、深度拆解：1-元-1000g-低价超售与传销圈钱套路' },
            { text: '三、同源换皮站群的识别方法', link: '/risk-warning/#三、同源换皮站群与“批量跑路”识别法' },
            { text: '四、8 维量化防坑公式', link: '/risk-warning/#四、防坑实操：购买前必看的-8-维量化防坑公式' },
            { text: '五、双机场冷备与月付止损策略', link: '/risk-warning/#五、科学上网防跑路最高黄金法则：双机场冷备与月付止损' },
            { text: '六、高频 FAQ：跑路预警核心疑问', link: '/risk-warning/#六、高频-faq：跑路预警与风控核心疑问' }
          ]
        },
        {
          text: '高信用度稳定服务商',
          items: [
            { text: '光速云 (2020 至今老牌运营)', link: '/reviews/guangsu' },
            { text: '暮光加速 (全内网专线+7x24值守)', link: '/reviews/muguang' },
            { text: '星岛梦 (老牌不限时按量服务)', link: '/reviews/xingdaomeng' }
          ]
        }
      ],
      '/free-trial/': [
        {
          text: '专题六 · 免费试用与退款避坑',
          items: [
            { text: '免费试用与退款避坑指南 (万字支柱)', link: '/free-trial/' }
          ]
        },
        {
          text: '避坑核心章节',
          items: [
            { text: '一、识别 3 大真假试用套路', link: '/free-trial/#一、真试用-vs-假试用：识别-3-大常见体验套路' },
            { text: '二、为什么“全额无理由退款”往往是谎言', link: '/free-trial/#二、为什么绝大多数机场“不支持退款”？揭秘免责黑幕' },
            { text: '三、30 分钟 4 步晚高峰极限压力测试', link: '/free-trial/#三、试用期-4-步极限压力测试法（如何-30-分钟验出真假专线）' },
            { text: '四、3 家提供真实试用/退款兜底的服务商', link: '/free-trial/#四、2026-年度真正提供“真试用-低门槛体验”的机场推荐' },
            { text: '五、高频 FAQ：试用与退款核心疑问', link: '/free-trial/#五、高频-faq：试用与退款核心疑问解答' }
          ]
        },
        {
          text: '优质试用体验推荐',
          items: [
            { text: '光速云 (提供 2.5Gbps 低门槛体验)', link: '/reviews/guangsu' },
            { text: '飞猫云 (免配置一键试用)', link: '/reviews/feimao' },
            { text: '暮光加速 (晚高峰真实测试)', link: '/reviews/muguang' }
          ]
        }
      ],
      '/brands/': [
        {
          text: '42 家机场品牌库',
          items: [
            { text: '42 家机场品牌全景总览', link: '/brands/' },
            { text: '【T0 第一主推】光速云', link: '/reviews/guangsu' },
            { text: '【T1】暮光加速', link: '/reviews/muguang' },
            { text: '【T1】飞猫云', link: '/reviews/feimao' },
            { text: '【T1】星岛梦', link: '/reviews/xingdaomeng' },
            { text: '【T1】微风网络', link: '/reviews/weifeng' },
            { text: '【T1】大佬云', link: '/reviews/dalaoyun' },
            { text: '【T1】唯兔云', link: '/reviews/weitu' },
            { text: '【T1】二猫云', link: '/reviews/ermao' }
          ]
        }
      ],
      '/clients/': [
        {
          text: '全平台代理客户端指南',
          items: [
            { text: '客户端配置与下载总览', link: '/clients/' },
            { text: 'Windows / macOS 桌面端指南', link: '/clients/desktop/' },
            { text: 'iOS / Android / 软路由指南', link: '/clients/mobile-router/' }
          ]
        }
      ],
      '/protocols/': [
        {
          text: '现代代理协议与链路拓扑',
          items: [
            { text: '协议与网络诊断总览', link: '/protocols/' },
            { text: 'VLESS / Hysteria 2 协议深度解析', link: '/protocols/modern/' },
            { text: 'IPLC / IEPL 物理专线拓扑剖析', link: '/protocols/infrastructure/' }
          ]
        }
      ],
      '/unlock/': [
        {
          text: '业务场景与解锁方案',
          items: [
            { text: '解锁方案全景总览', link: '/unlock/' },
            { text: 'ChatGPT / Claude AI 专线网络', link: '/unlock/ai/' },
            { text: '全球 4K/8K 流媒体全区解锁', link: '/unlock/streaming/' }
          ]
        }
      ],
      '/security/': [
        {
          text: '安全与风险防御手册',
          items: [
            { text: '安全防御总览', link: '/security/' },
            { text: '常见网络诈骗与套路', link: '/security/scams/' },
            { text: '防坑实操与防护建议', link: '/security/guide/' }
          ]
        }
      ],
      '/about/': [
        {
          text: '关于我们',
          items: [
            { text: '飞鸟博客实验室初心与基准', link: '/about/' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        locales: {
          zh: {
            translations: {
              button: {
                buttonText: '搜索评测、协议或机场品牌...',
                buttonAriaLabel: '搜索评测、协议或机场品牌'
              },
              modal: {
                noResultsText: '无法找到相关评测结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    outline: {
      level: [2, 3],
      label: '本页内容导航'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    lastUpdated: {
      text: '最后核验更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short'
      }
    },
    footer: {
      message: '免责声明：本站所有测试数据均基于特定宽带环境与测试批次快照，节点表现受网络运营商策略与高峰期拥塞影响。部分链接含推广返利，不影响用户实际支付价格。',
      copyright: 'Copyright © 2026 飞鸟博客 (fastlinkblog.world) · 网络可观测性评测中心'
    }
  },
  markdown: {
    lineNumbers: true
  }
});
