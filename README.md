<div id="top"></div>

# Zenn 投稿管理コンテナ

<p style="display: inline">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Docker-000000.svg?logo=docker&style=for-the-badge">
</p>

## 目次

1. [リポジトリについて](#リポジトリについて)
2. [セットアップ](#セットアップ)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [使用方法](#使用方法)
5. [コントリビュート](#コントリビュート)

## リポジトリについて

このリポジトリは、[Zenn](https://zenn.dev/) 上の記事を管理・プレビューするための開発コンテナを提供します。

<p align="right">(<a href="#top">トップへ</a>)</p>

## セットアップ

### 必要要件

- [Docker](https://docs.docker.jp/get-started/overview.html) および [Docker Compose](https://docs.docker.jp/compose/toc.html)
- [Visual Studio Code](https://code.visualstudio.com/) および [Dev Containers拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### 構築手順

1. このテンプレートからリポジトリを作成します。

   画面右上の `Use this template` からリポジトリを作成してください。

2. 作成したリポジトリをローカル環境へクローンします。

3. リポジトリフォルダを VSCode で開き、コンテナで再度開きます。

   VSCode のコマンドパレットから **Remote-Containers: Reopen in Container** を選択してください。

4. [Zenn Editor](http://localhost:8080/) にアクセスできることを確認します。

   コンテナ起動時に `npx zenn preview` コマンドが自動的に実行されます。

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

```bash
.
├─ .devcontainer/    # 開発コンテナ設定ファイル
├─ .github/          # GitHub 設定ファイル
├─ articles/         # Zenn 記事ファイル
├─ books/            # Zenn 本ファイル
├─ images/           # 画像ファイル
│ ├─ articles/      # 記事用画像ファイル
│ └─ books/         # 本用画像ファイル
├─ scripts/          # スクリプトファイル
└─ setting/          # 設定ファイル
```

<p align="right">(<a href="#top">トップへ</a>)</p>

## 使用方法

### 新しい記事を作成する

- `npm script` を使用して新しい**記事**を作成します。

   ```bash
   npm run new-article
   ```

### 新しい本を作成する

- `npm script` を使用して新しい**本**を作成します。

   ```bash
   npm run new-book
   ```

### 記事に画像を貼り付ける

1. クリップボードに画像・スクリーンショットをコピーします。

2. Markdown ファイルを開き、画像を貼り付けたい箇所にカーソルを置きます。

3. コンテナ内で画像をペーストすると、以下の動作が行われます:

   - 画像が自動的に保存されます。

     - 記事の場合 :

       `images/articles/{Markdownファイル名}` フォルダに連番で保存されます（例: image-1.png）。

     - 本の場合 :

       `images/books/{本のディレクトリ名}/{Markdownファイル名}` フォルダに連番で保存されます（例: image-2.png）。

   - Markdown ファイルに画像の参照が自動的に挿入されます:

      ```md
      <!-- 記事の場合 -->
      ![alt text](../../images/articles/{Markdownファイル名}/{画像ファイル名})
      <!-- 本の場合 -->
      ![alt text](../../images/books/{本のディレクトリ名}/{Markdownファイル名}/{画像ファイル名})
      ```

   - Zenn でローカルの画像を読み込むには `/images/` から始まるパスを指定する必要がありますが、**ファイル保存時に自動で整形**します。

4. 必要に応じて `alt text` を編集し、画像の説明を追加してください。

<p align="right">(<a href="#top">トップへ</a>)</p>

## コントリビュート

変更する場合は、以下の手順を推奨します。

1. タスク用の Issue を作成します。

   Issue テンプレートを用意しています。

2. Issue ID と説明を用いてブランチを作成します。

   (例:環境改善の場合 `feature/#123-add-readme`)  
   (例:記事編集の場合 `article/#123-add-article`)

3. 変更を加え、コミット後にプルリクエストを作成します。

<p align="right">(<a href="#top">トップへ</a>)</p>
