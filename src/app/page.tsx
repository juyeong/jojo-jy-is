import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <div className="container">
        <main>
          <div className="list-group">
            <Link
              className="list-group-item list-group-item-action"
              href="/cost"
            >
              <Image
                src="/images/icon-cost.png"
                width={100}
                height={100}
                alt="코스트 계산기"
              />
              <span className="text-dark btn-link">코스트 계산기</span>
            </Link>
            <Link
              className="list-group-item list-group-item-action"
              href="/geo"
            >
              <Image
                src="/images/icon-geo.png"
                width={100}
                height={100}
                alt="지형상성"
              />
              <span className="text-dark btn-link">지형상성</span>
            </Link>
            <a
              className="list-group-item list-group-item-action"
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
              <span className="text-dark btn-link">탕수육봇</span>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
