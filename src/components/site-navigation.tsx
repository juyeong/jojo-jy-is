import Image from "next/image";
import Link from "next/link";
export function SiteNavigation({ active }: { active: "cost" | "geo" }) {
  const id = `site-nav-toggle-${active}`;
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light site-nav"
      aria-label="주 메뉴"
    >
      <Link className="navbar-brand navbar-img" href="/">
        <Image src="/images/apple-icon.png" alt="" width={30} height={30} />
        <span className="navbar-img-text">탕수육</span>
      </Link>
      <input className="site-nav-toggle" id={id} type="checkbox" />
      <label
        className="navbar-toggler"
        htmlFor={id}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </label>
      <div className="navbar-collapse">
        <ul className="navbar-nav">
          <li className={`nav-item${active === "cost" ? " active" : ""}`}>
            {active === "cost" ? (
              <a className="nav-link" data-item="Cost" href="#">
                코스트 계산기 <span className="sr-only">(current)</span>
              </a>
            ) : (
              <Link className="nav-link" data-item="Cost" href="/cost">
                코스트 계산기
              </Link>
            )}
          </li>
          <li className={`nav-item${active === "geo" ? " active" : ""}`}>
            {active === "geo" ? (
              <a className="nav-link" data-item="Geo" href="#">
                지형상성표 <span className="sr-only">(current)</span>
              </a>
            ) : (
              <Link className="nav-link" data-item="Geo" href="/geo">
                지형상성표
              </Link>
            )}
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-item="Bot"
              target="_blank"
              href="https://bit.ly/bot_caocao4"
              rel="noopener"
            >
              탕수육봇
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
