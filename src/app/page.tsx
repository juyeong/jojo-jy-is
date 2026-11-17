import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center">
      <div className="mx-auto w-full px-[15px] py-[15px] sm:max-w-[540px] md:max-w-[720px] lg:max-w-[960px] xl:max-w-[1140px]">
        <main>
          <div className="flex list-none flex-col rounded p-0 sm:flex-row">
            <Link
              className="relative flex w-full flex-col items-center border-0 bg-white px-5 py-3 text-[#495057] no-underline first:rounded-t last:mb-0 last:rounded-b hover:bg-[#f8f9fa] focus:bg-[#f8f9fa] sm:mb-[-1px]"
              href="/cost"
            >
              <Image
                src="/images/icon-cost.png"
                width={100}
                height={100}
                alt="코스트 계산기"
              />
              <span className="font-normal leading-6 text-[#343a40]">
                코스트 계산기
              </span>
            </Link>
            <Link
              className="relative flex w-full flex-col items-center border-0 bg-white px-5 py-3 text-[#495057] no-underline first:rounded-t last:mb-0 last:rounded-b hover:bg-[#f8f9fa] focus:bg-[#f8f9fa] sm:mb-[-1px]"
              href="/geo"
            >
              <Image
                src="/images/icon-geo.png"
                width={100}
                height={100}
                alt="지형상성"
              />
              <span className="font-normal leading-6 text-[#343a40]">
                지형상성
              </span>
            </Link>
            <a
              className="relative flex w-full flex-col items-center border-0 bg-white px-5 py-3 text-[#495057] no-underline first:rounded-t last:mb-0 last:rounded-b hover:bg-[#f8f9fa] focus:bg-[#f8f9fa] sm:mb-[-1px]"
              href="https://bit.ly/bot_caocao4"
              target="_blank"
              rel="noopener"
            >
              <Image
                src="/images/icon-bot.png"
                width={100}
                height={100}
                alt="탕수육봇"
              />
              <span className="font-normal leading-6 text-[#343a40]">
                탕수육봇
              </span>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
