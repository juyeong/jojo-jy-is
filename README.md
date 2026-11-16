# wndud.com

Next.js App Router 기반의 단일 웹 프로젝트입니다. 홈(`/`)은 빈 페이지입니다.

## 개발

Node.js 22.12 이상(22 LTS) 또는 Node.js 24 이상과 npm을 사용합니다.

```bash
npm ci
npm run dev
```

## 검사

```bash
npm run check
npm run check-types
npm run build
npm run test:run
```

- `npm run check:fix`: Biome 자동 수정
- `npm run format`: 코드 포맷팅
- `npm run format:check`: 포맷 검사
- `npm test`: Vitest 감시 모드

Vitest는 jsdom, React 변환, `@/*` 경로 별칭을 지원합니다. 테스트 파일은 `*.test.ts` 또는 `*.test.tsx`로 작성합니다. 현재 테스트 파일은 없으므로 테스트 실행 시 `No test files found`로 종료됩니다. React Testing Library는 설치하지 않았습니다.

## 구성

- TypeScript strict 모드, `src/app`, `@/*` 별칭
- Tailwind CSS v4와 공식 PostCSS 플러그인
- 공식 shadcn CLI 초기화(Radix, neutral, Lucide)
- Biome 린트·포맷팅·import 정리
- Vitest 테스트 실행 환경

shadcn 컴포넌트는 다음 명령으로 추가합니다.

```bash
npx shadcn@latest add <component>
```
