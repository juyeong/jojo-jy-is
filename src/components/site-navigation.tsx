import Image from "next/image";
import Link from "next/link";
export function SiteNavigation({ active }: { active: "cost" | "geo" }) {
  const id = `site-nav-toggle-${active}`;
  return (
    <nav
      className="relative flex flex-wrap items-center justify-between bg-[#f8f9fa] px-4 py-2"
      aria-label="주 메뉴"
    >
      <Link
        className="mr-4 inline-block h-[30px] w-[30px] p-0 text-xl leading-[30px] text-[rgba(0,0,0,0.9)] no-underline"
        href="/"
      >
        <Image src="/images/apple-icon.png" alt="" width={30} height={30} />
        <span className="sr-only">탕수육</span>
      </Link>
      <input
        className="peer absolute h-px w-px opacity-0"
        id={id}
        type="checkbox"
      />
      <label
        className="inline-block cursor-pointer rounded border border-[rgba(0,0,0,0.1)] bg-transparent px-3 py-1 text-xl leading-none text-[rgba(0,0,0,0.5)] sm:hidden"
        htmlFor={id}
        aria-label="Toggle navigation"
      >
        <svg
          className="inline-block h-[1.5em] w-[1.5em] align-middle"
          viewBox="0 0 30 30"
          aria-hidden="true"
        >
          <path
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeMiterlimit="10"
            d="M4 7h22M4 15h22M4 23h22"
          />
        </svg>
      </label>
      <div className="hidden basis-full grow items-center peer-checked:block sm:flex sm:basis-auto">
        <ul className="m-0 flex list-none flex-col p-0 sm:flex-row">
          <li>
            {active === "cost" ? (
              <a
                className="block px-4 py-2 text-[rgba(0,0,0,0.9)] no-underline hover:text-[rgba(0,0,0,0.7)] focus:text-[rgba(0,0,0,0.7)] sm:px-2"
                data-item="Cost"
                href="#"
              >
                코스트 계산기 <span className="sr-only">(current)</span>
              </a>
            ) : (
              <Link
                className="block px-4 py-2 text-[rgba(0,0,0,0.5)] no-underline hover:text-[rgba(0,0,0,0.7)] focus:text-[rgba(0,0,0,0.7)] sm:px-2"
                data-item="Cost"
                href="/cost"
              >
                코스트 계산기
              </Link>
            )}
          </li>
          <li>
            {active === "geo" ? (
              <a
                className="block px-4 py-2 text-[rgba(0,0,0,0.9)] no-underline hover:text-[rgba(0,0,0,0.7)] focus:text-[rgba(0,0,0,0.7)] sm:px-2"
                data-item="Geo"
                href="#"
              >
                지형상성표 <span className="sr-only">(current)</span>
              </a>
            ) : (
              <Link
                className="block px-4 py-2 text-[rgba(0,0,0,0.5)] no-underline hover:text-[rgba(0,0,0,0.7)] focus:text-[rgba(0,0,0,0.7)] sm:px-2"
                data-item="Geo"
                href="/geo"
              >
                지형상성표
              </Link>
            )}
          </li>
          <li>
            <a
              className="block px-4 py-2 text-[rgba(0,0,0,0.5)] no-underline hover:text-[rgba(0,0,0,0.7)] focus:text-[rgba(0,0,0,0.7)] sm:px-2"
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
