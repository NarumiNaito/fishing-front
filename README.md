## fishing-front

fishing のフロントリポジトリです。

## 環境

- フレームワーク：Next.js 14.2.1
- ライブラリ：React 18.3.1
- 言語：TypeScript 5.7.3
- 非同期ライブラリ：axios 1.7.7
- Form ライブラリ：React Hook Form 7.54.2
- バリデーションライブラリ：zod 3.24.1
- フェッチライブラリ：SWR 2.3.0
- 状態管理ライブラリ：Redux(ReduxToolkit) 5.0.1
- UI ライブラリ：shadcn-ui 0.8.0
- UI ライブラリ：tailwindcss 3.4.1
- アニメーションライブラリ：framer-motion 12.0.5

## 環境構築

下記の流れに従って、環境構築を行なってください。

#### clone

```
git clone git@github.com:NarumiNaito/fishing-front.git
```

#### build

```
docker compose build
```

#### コンテナ作成

```
docker compose up -d
```

#### コンテナへの接続

```
docker compose exec app /bin/sh
```
