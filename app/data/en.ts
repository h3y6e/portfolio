import type { PortfolioContent } from './types'
import { links } from './links'

export const en: PortfolioContent = {
  hero: {
    name: 'heyhoe',
    desc: 'へいほぅ',
    bio: 'Software developer. Into input interfaces and whisky.',
  },
  products: [
    {
      title: 'AR Tatekan',
      content: 'A protest sign that cannot be removed.',
      link: 'https://www.google.com/search?q=AR%E3%82%BF%E3%83%86%E3%82%AB%E3%83%B3',
      code: null,
    },
    {
      title: 'AR Orita Sensei',
      content: 'A campus statue that cannot be removed.',
      link: 'https://twitter.com/h3y6e/status/1099505242566094848?s=20',
      code: 'https://github.com/h3y6e/AROritaSensei',
    },
    {
      title: 'Ameyadar',
      content: 'Appends rain-forecast emoji to SNS display names.',
      link: 'https://twitter.com/h3y6e',
      code: 'https://github.com/h3y6e/Ameyadar',
    },
    {
      title: 'Course Pass Rate Bot',
      content: 'Replies with Kyoto University course pass rates.',
      link: 'https://twitter.com/h3y6e',
      code: null,
    },
    {
      title: 'AR Business Card',
      content: 'A card whose QR code is both a URL and an AR marker.',
      link: 'https://arcard.h3y6e.com',
      code: 'https://github.com/h3y6e/ARCard',
      defunct: true,
    },
    {
      title: 'h3y6e.com',
      content: 'This site.',
      link: 'https://h3y6e.com',
      code: 'https://github.com/h3y6e/portfolio',
    },
    {
      title: '#a5ebec',
      content: 'Blog. A playground for web standards.',
      link: 'https://blog.h3y6e.com',
      code: 'https://github.com/h3y6e/blog',
    },
  ],
  experiences: [
    {
      date: 'April 2016 – September 2020',
      title: 'Kyoto University',
      content: 'Undergraduate School of Electrical and Electronic Engineering',
      link: 'https://www.s-ee.t.kyoto-u.ac.jp/',
    },
    {
      date: 'March 2019 – December 2019',
      title: 'CO-CONV, Corp. (part-time)',
      content:
        'Windows kernel-mode device driver development\nWindows GUI application development',
      link: 'https://www.co-conv.jp/',
    },
    {
      date: 'April 2019 – September 2020',
      title: 'Computer Vision Laboratory',
      content:
        'Kyoto University, Undergraduate School of Electrical and Electronic Engineering',
      link: 'https://vision.ist.i.kyoto-u.ac.jp',
    },
    {
      date: 'December 2019 – December 2021',
      title: 'AIFUL CORPORATION (contract)',
      content: 'Web frontend\nDevOps\nEngineering management',
      link: 'https://www.aiful.co.jp/',
    },
    {
      date: 'August 2020',
      title: 'Cookpad Inc. (internship)',
      content: 'Web application development',
      link: 'https://info.cookpad.com/',
    },
    {
      date: 'September 2020',
      title: 'VOYAGE GROUP, Inc. (internship)',
      content: 'フルサイクルデベロッパー',
      link: 'https://voyagegroup.com/',
    },
    {
      date: 'October 2020 – September 2022',
      title: 'Interactive Media Design Laboratory',
      content:
        'Nara Institute of Science and Technology (NAIST)\nGraduate School of Science and Technology, Division of Information Science',
      link: 'https://imdl.naist.jp/',
    },
    {
      date: 'August 2021',
      title: 'Cybozu, Inc. (internship)',
      content: '開発本部 生産性向上チーム\nインフラ',
      link: 'https://cybozu.co.jp/',
    },
    {
      date: 'August 2021',
      title: 'Hatena Co., Ltd. (internship)',
      content: 'サービス・システム開発本部 システムプラットフォーム部\nSRE',
      link: 'https://hatenacorp.jp/',
    },
    {
      date: 'September 2021',
      title: 'mixi, Inc. (internship)',
      content:
        'ライブエクスペリエンス事業本部 システム部 Fansta開発G\nWebフロントエンド開発\nバックエンド開発',
      link: 'https://www.mixi.co.jp',
    },
    {
      date: 'October 2021 – November 2021',
      title: 'BizReach, Inc. (internship)',
      content:
        'ビズリーチ事業部 プロダクト開発部 システム横断G\nバックエンド開発',
      link: 'https://www.bizreach.co.jp',
    },
    {
      date: 'March 2022',
      title: 'mixi, Inc. (internship)',
      content: '開発本部 CTO室 たんぽぽグループ\nインフラ',
      link: 'https://www.mixi.co.jp',
    },
    {
      date: 'April 2023 –',
      title: 'MIXI, Inc.',
      content:
        '開発本部 たんぽぽ室 たんぽぽグループ\n脳波基礎研究\n音声通信基盤開発\nゲームリレーサーバー開発\nWebアプリケーション開発\nモバイルアプリ開発',
      link: 'https://mixi.co.jp',
    },
  ],
  activities: [
    {
      date: 'September 2016',
      title: 'KUEE Electronics Summer Camp — TA Award',
      content:
        'Summer camp by Kyoto University Undergraduate School of Electrical and Electronic Engineering\nRobot building with LEGO Mindstorms',
      link: 'https://www.s-ee.t.kyoto-u.ac.jp/ja/summercamp',
    },
    {
      date: 'September 2018',
      title: 'KUEE Electronics Summer Camp — 1st Place',
      content:
        'Summer camp by Kyoto University Undergraduate School of Electrical and Electronic Engineering\nInverted pendulum control contest',
      link: 'https://www.s-ee.t.kyoto-u.ac.jp/ja/summercamp/inv-pendulum/2018-kuee-sc3/report',
    },
    {
      date: 'August 2019',
      title: 'National Security Camp 2019',
      content: 'IPA Security Camp (national program)',
      link: 'https://www.ipa.go.jp/jinzai/camp/2019/zenkoku2019_index.html',
    },
    {
      date: 'January 2020 – December 2022',
      title: 'CAMPHOR- core member',
      content: 'Running CAMPHOR-, a student IT community in Kyoto',
      link: 'https://camph.net/',
    },
  ],
  notes: [
    {
      date: '2021-03-01',
      title:
        'TSUNDERE Interaction: Behavior Modification by the Integrated Interaction of Cold and Kind Actions',
      content: 'ACM/IEEE HRI 2021 Companion (co-author)',
      link: 'https://doi.org/10.1145/3434074.3447149',
    },
    {
      date: '2021-03-01',
      title: 'Double-faced USB Type-C',
      content: 'CAMPHOR- DAY 2021',
      link: 'https://speakerdeck.com/5ebec/double-faced-usb-type-c',
    },
    {
      date: '2022-10-01',
      title: '日常利用の拡張現実感環境におけるタッチタイピング可能な文字入力システム',
      content: '複合現実感研究会 MR2022-10',
      link: 'https://sigmr.vrsj.org/events/2022Oct.html',
    },
    {
      date: '2023-03-01',
      title: 'An Encouragement of Translating Nostr Clients',
      content: 'Nostr meetup #1',
      link: 'https://speakerdeck.com/h3y6e/an-encouragement-of-translating-nostr-clients',
    },
    {
      date: '2023-07-01',
      title: 'Software Design, July 2023',
      content: '「新時代の分散型SNS Nostr」【1】次世代SNSを概観する',
      link: 'https://gihyo.jp/magazine/SD/archive/2023/202307',
    },
    {
      date: '2025-04-01',
      title: 'Flutter training (MIXI 2025 new graduate program)',
      content: 'MIXI 2025 new graduate technical training',
      link: 'https://speakerdeck.com/mixi_engineers/2025_new_grad_training_flutter',
    },
    {
      date: '2025-08-01',
      title: 'State management with two frontends',
      content: 'MIXI MEETUP！ TECH & DESIGN DAY',
      link: 'https://speakerdeck.com/mixi_engineers/state-management-with-two-frontends-flutter-nextjs',
    },
    {
      date: '2025-09-01',
      title: 'Software Design, September 2025',
      content: '「技術選定の舞台裏」【1】mixi2（共著）',
      link: 'https://gihyo.jp/magazine/SD/archive/2025/202509',
    },
    {
      date: '2026-07-01',
      title: 'Flutter training (MIXI 2026 new graduate program)',
      content: 'MIXI 2026 new graduate technical training',
      link: 'https://speakerdeck.com/mixi_engineers/2026_new_grad_training_flutter',
    },
  ],
  links,
  sectionNav: [
    { id: 'top', label: 'Top' },
    { id: 'links', label: 'Links' },
    { id: 'experience', label: 'Experience' },
    { id: 'activities', label: 'Activities' },
    { id: 'works', label: 'Works' },
    { id: 'notes', label: 'Notes' },
    { id: 'languages', label: 'Languages' },
  ],
  ui: {
    sections: {
      links: 'Links',
      experience: 'Experience',
      activities: 'Activities',
      works: 'Works',
      notes: 'Notes',
      languages: 'Languages',
    },
    themeToLight: 'Switch to light mode',
    themeToDark: 'Switch to dark mode',
    localeToJa: '日本語に切替',
    localeToEn: 'Switch to English',
    source: 'source',
    notesPrev: 'Newer years',
    notesNext: 'Older years',
  },
}
