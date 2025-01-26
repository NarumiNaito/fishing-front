## fishing-front

fishing のフロントリポジトリです。

## 環境

- Next.js 14.2.1
- React 18.3.1
- TypeScript 5.7.3

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

#### Go コンテナへの接続

```
docker compose exec -it fishing-node bin/bash
```
