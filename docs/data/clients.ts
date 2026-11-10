export interface ClientApp {
  name: string;
  platform: 'Windows' | 'Android' | 'iOS' | 'macOS' | 'Linux' | 'OpenWrt';
  kernel: string;
  features: string;
  sourceUrl: string;
  recommended: boolean;
}

export const CLIENTS_DATA: ClientApp[] = [
  // Windows
  {
    name: 'Clash Verge Rev',
    platform: 'Windows',
    kernel: 'Mihomo (Clash.Meta)',
    features: 'Mihomo 内核、订阅管理、规则分流、TUN 模式，兼容 Windows 10/11，新手及进阶首选',
    sourceUrl: 'https://github.com/clash-verge-rev/clash-verge-rev',
    recommended: true
  },
  {
    name: 'v2rayN',
    platform: 'Windows',
    kernel: 'Xray / sing-box',
    features: '经典 Xray、sing-box 多核心支持，节点批量测速与多协议管理，老牌强大',
    sourceUrl: 'https://github.com/2dust/v2rayN',
    recommended: true
  },
  {
    name: 'FlClash',
    platform: 'Windows',
    kernel: 'Mihomo',
    features: '基于 Flutter 的跨平台图形客户端，现代极简界面，内存占用低',
    sourceUrl: 'https://github.com/chen08209/FlClash',
    recommended: false
  },
  {
    name: 'Hiddify',
    platform: 'Windows',
    kernel: 'sing-box',
    features: '多协议全能支持、自动最优节点选择、傻瓜式导入体验',
    sourceUrl: 'https://github.com/hiddify/hiddify-next',
    recommended: false
  },
  // Android
  {
    name: 'v2rayNG',
    platform: 'Android',
    kernel: 'Xray',
    features: '安卓端最为通用的 Xray 系客户端，支持节点二维码、剪贴板导入与完整分流',
    sourceUrl: 'https://github.com/2dust/v2rayNG',
    recommended: true
  },
  {
    name: 'FlClash (Android)',
    platform: 'Android',
    kernel: 'Mihomo',
    features: '安卓端高颜值 Mihomo 客户端，UI 清爽，支持规则分流与策略组切换',
    sourceUrl: 'https://github.com/chen08209/FlClash',
    recommended: true
  },
  {
    name: 'Karing',
    platform: 'Android',
    kernel: 'sing-box',
    features: '面向新手的轻量跨平台客户端，支持订阅自动更新与简易路由规则',
    sourceUrl: 'https://github.com/KaringX/karing',
    recommended: false
  },
  // iOS
  {
    name: 'Shadowrocket (小火箭)',
    platform: 'iOS',
    kernel: '自研多协议引擎',
    features: 'iOS 出海装机标配，支持订阅导入、节点测速、分流规则定制与深度去广告',
    sourceUrl: 'https://apps.apple.com/app/shadowrocket/id932747118',
    recommended: true
  },
  {
    name: 'Stash',
    platform: 'iOS',
    kernel: 'Clash 规则引擎',
    features: 'iOS 端完整 Clash 规则兼容客户端，支持按需连接与策略组覆盖，界面细腻',
    sourceUrl: 'https://apps.apple.com/app/stash/id1596063718',
    recommended: true
  },
  {
    name: 'Quantumult X (圈 X)',
    platform: 'iOS',
    kernel: '自研网络框架',
    features: '深度网络调试利器，支持 JavaScript 脚本重写、精细分流与 DNS 自定义',
    sourceUrl: 'https://apps.apple.com/app/quantumult-x/id1453926514',
    recommended: false
  },
  // macOS
  {
    name: 'Clash Verge Rev (Mac)',
    platform: 'macOS',
    kernel: 'Mihomo',
    features: '完美适配 Apple Silicon (M1/M2/M3/M4) 及 Intel 架构，支持增强模式与开机自启',
    sourceUrl: 'https://github.com/clash-verge-rev/clash-verge-rev',
    recommended: true
  },
  {
    name: 'Surge Mac',
    platform: 'macOS',
    kernel: '自研高性能核心',
    features: '专业开发者旗舰网络调试工具，极致性能、规则链诊断与网关模式接管',
    sourceUrl: 'https://nssurge.com/',
    recommended: false
  },
  // Linux & OpenWrt
  {
    name: 'OpenClash',
    platform: 'OpenWrt',
    kernel: 'Mihomo / Clash Core',
    features: '软路由/硬路由透明网关代理利器，全屋设备免客户端自动出海分流',
    sourceUrl: 'https://github.com/vernesong/OpenClash',
    recommended: true
  },
  {
    name: 'v2rayA',
    platform: 'Linux',
    kernel: 'Xray',
    features: '基于 Web GUI 的 Linux 透明代理客户端，适合 NAS、小型 Linux 主机及服务器',
    sourceUrl: 'https://github.com/v2rayA/v2rayA',
    recommended: true
  }
];
