## Get Started

ビルド

```zsh
docker-compose build
```

Docker の起動

```zsh
docker-compose up
```

seed(〜期) を入れる

```zsh
docker-compose exec fastapi python seed.py
```

`.env`は他の開発者からもらってください。

## 作業手順

**作業中は Docker を起動しておく**

### DB

1. `/models` に定義
1. マイグレーションファイルを自動生成 `docker-compose exec fastapi alembic revision --autogenerate -m "適切なメッセージ"`
1. 正しい内容に編集(upgrade と downgrade の内容が逆になっていることなどがあるため、修正)
1. `docker-compose exec fastapi alembic upgrade head`
1. pgAdmin の postgres_db のスキーマ > テーブルで作成されているか確認

#### alembic の自動生成を指定する方法

`migration/env.py`を以下のように変更

```python
from logging.config import fileConfig
from alembic import context
from app.db import Base, engine
from app.models import answer

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
target_metadata = [answer.Answer.metadata]

# ↑のメタデータに登録したいテーブルのメタデータを入れる
```

#### Migrate を下げる方法

```zsh
docker-compose exec fastapi alembic downgrade -1
```

[alembic コマンド](https://muoilog.xyz/web-development/alembic-command-matome/#toc5)

-1 を-2 とかにすればふたつ下げれる

### API

1. [schema](https://zenn.dev/sh0nk/books/537bb028709ab9/viewer/2c02d7) にレスポンス、リクエストのクラスを定義
1. [controller](https://zenn.dev/sh0nk/books/537bb028709ab9/viewer/86648d)の作成
1. main.py にルーターを追加

## ディレクトリ構造

```zsh
app
├── __init__.py: モジュール化
├── alembic.ini: alembicの設定ファイル
├── controller : ルーティング後に処理を行う、ほぼ関数呼び出しのみ
├── db.py      : dbの初期設定
├── helper     : FatController対策のヘルパー、実際の処理
├── main.py    : FastAPIのメインファイル
├── migration  : マイグレーションファイルが入る(versions内にある)
├── models     : DBの元になるモデルを入れる
└── schema     : リクエスト、レスポンスの型を入れる
```

## Other

### FastAPI

- localhost:8000
- Docs
  - localhost:8000/docs

Docs でエンドポイントや返ってくる値がみれる
Volume のマウントを行っているので、ソースコードの変更は即時反映

### pgAdmin

- DB の状況をブラウザから見れるやつ
- localhost:8080
- mail: pgadmin4@test.com
- pass: pgadmin4

#### PgAdmin の繋ぎ方

1. file > preferences > Miscellaneous > User Language から日本語に設定
1. サーバー選択後、右クリック
1. 名前は自由に入れる
1. 接続タブのホスト名/アドレス, ユーザー名、パスワードに`postgres`を入れる

### JWT 認証のテスト

1. FastAPI の Docs から試し撃ち(ログインか新規登録)
1. pgAdmin のユーザーの`refresh_token`をメモ
1. `curl -X GET "http://localhost:8000/users/refresh_token" -H  "accept: application/json" -H  "Authorization: Bearer refresh_tokenの値"`で出てくるアクセストークンをメモして使う

#### refresh_token からアクセストークンを取得

```zsh
curl -X 'GET' \
  'http://localhost:8000/users/refresh_token' \
  -H 'accept: application/json' \
  -H  "Authorization: Bearer refresh_tokenの値"
```

#### ユーザーの情報を取得

```zsh
curl -X GET "http://localhost:8000/users/me" -H  "accept: application/json" -H  "Authorization: Bearer access_tokenの値"
```

#### update_user の検証

```zsh
curl -X 'PATCH' \
  'http://localhost:8000/users/update' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "id": 1,
  "name": "string",
  "email": "sample@gmail.com",
  "motto": "座右の銘",
  "password": "sample"
}' \
-H  "Authorization: Bearer access_tokenの値"
```

#### 診断の検証

```zsh
curl -X 'POST' \
  'http://localhost:8000/diagnosis/submit' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "is_forming": true,
  "is_storming": true,
  "is_norming": false,
  "is_performing": false,
  "is_adjourning": false
}' \
-H "Authorization: Bearer access_tokenの値"
```

#### ユーザーの診断結果を全て取得

```zsh
curl -X 'GET' \
  'http://localhost:8000/diagnosis' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer access_tokenの値"
```

#### ログアウト

```zsh
curl -X 'DELETE' \
  'http://localhost:8000/logout' \
  -H 'accept: application/json' \
  -H "Authorization: Bearer access_tokenの値"
```

### migration ツール

[alembic](https://qiita.com/penpenta/items/c993243c4ceee3840f30)

## 参考

- [Docker, FastAPI, PostgreSQL](https://python-to.hateblo.jp/entry/2021/09/08/000000)
