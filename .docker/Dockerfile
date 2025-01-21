# ベースイメージとして軽量な Node.js を使用
FROM node:20-alpine

# 作業ディレクトリを設定
WORKDIR /usr/app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクト全体をコンテナ内にコピー
COPY . .

# ビルドを実行
RUN npm run build

# ポートを公開
EXPOSE 3000

# アプリケーションを起動
CMD ["npm", "start"]