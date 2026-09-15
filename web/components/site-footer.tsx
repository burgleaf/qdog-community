"use client";

import Link from "next/link";

import { useLocale } from "@/components/locale-provider";
import { SiteLogo } from "@/components/site-logo";
import { localeConfig, localePath } from "@/lib/i18n";

const copy = {
  en: { desc: "Hatch a persistent AI companion, then bring the same life into Codex and other digital spaces.", life: "Cyber Life", starter: "Starter egg", daily: "Daily eggs", vault: "My life vault", forms: "Codex forms", community: "Community & open source", make: "Make a Codex pet", requests: "Community requests", legal: "Cyber Life identities stay private to their owners · Community code is MIT" },
  zh: { desc: "孵化拥有永久基因身份的 AI 赛博生命，并让它进入 Codex 等数字空间。", life: "赛博生命", starter: "领取新手蛋", daily: "每日生命蛋", vault: "我的生命库", forms: "Codex 化身库", community: "社区与开源", make: "制作 Codex 宠物", requests: "社区制作申请", legal: "赛博生命身份由账户私有保存 · 社区代码遵循 MIT" },
  ko: { desc: "영구적인 유전자 정체성을 가진 AI 사이버 생명을 부화시키고 Codex와 다른 디지털 공간으로 데려가세요.", life: "사이버 라이프", starter: "스타터 에그", daily: "데일리 에그", vault: "내 라이프 보관함", forms: "Codex 형태", community: "커뮤니티와 오픈 소스", make: "Codex 펫 만들기", requests: "커뮤니티 요청", legal: "사이버 라이프 정체성은 소유자 계정에 비공개로 보관됩니다 · 커뮤니티 코드는 MIT" },
  ja: { desc: "永続する遺伝子アイデンティティを持つ AI サイバー生命を孵化し、Codex などのデジタル空間へ連れていきましょう。", life: "サイバー生命", starter: "スターターエッグ", daily: "デイリーエッグ", vault: "マイ生命庫", forms: "Codex 形態", community: "コミュニティとオープンソース", make: "Codex ペットを作る", requests: "コミュニティ制作依頼", legal: "サイバー生命の個性は所有者のアカウントに非公開で保存されます · コミュニティコードは MIT" },
  es: { desc: "Incuba un compañero de IA con identidad genética permanente y lleva esa misma vida a Codex y otros espacios digitales.", life: "Vida cibernética", starter: "Huevo inicial", daily: "Huevos diarios", vault: "Mi bóveda de vida", forms: "Formas Codex", community: "Comunidad y código abierto", make: "Crear una mascota Codex", requests: "Peticiones de la comunidad", legal: "Las identidades permanecen privadas para sus dueños · El código de la comunidad usa MIT" },
};

export function SiteFooter() {
  const { locale, t } = useLocale();
  const text = copy[locale];
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer px-6">
      <div className="site-footer__inner py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2">
            <div className="mb-3 flex items-center gap-2.5">
              <SiteLogo size={30} />
              <span className="text-base font-extrabold tracking-tight text-text">
                <span className="text-accent">Q</span>Dog
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {text.desc}
            </p>
          </div>

          <FooterLinks
            title={text.life}
            links={[
              [localePath(locale, "/"), text.starter],
              [localePath(locale, "/eggs"), text.daily],
              [localePath(locale, "/account"), text.vault],
              [localePath(locale, "/codex-pets"), text.forms],
            ]}
          />

          <div>
            <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-text">
              {text.community}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a className="text-muted transition-colors hover:text-accent" href="https://github.com/burgleaf/qdog-community" target="_blank" rel="noreferrer">
                  {t("github")}
                </a>
              </li>
              <li><Link className="text-muted transition-colors hover:text-accent" href="/guide">{text.make}</Link></li>
              <li><Link className="text-muted transition-colors hover:text-accent" href={localePath(locale, "/request")}>{text.requests}</Link></li>
              <li>
                <Link className="text-muted transition-colors hover:text-accent" href={localePath(locale, "/")} hrefLang={localeConfig[locale].htmlLang}>
                  {localeConfig[locale].label} · QDog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted">© {year} QDog</p>
          <p className="text-xs text-muted">{text.legal}</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-text">{title}</h3>
      <ul className="space-y-2.5 text-sm">
        {links.map(([href, label]) => (
          <li key={`${href}-${label}`}>
            <Link className="text-muted transition-colors hover:text-accent" href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
