# Near me

[サイト](https://hidden-mesa-14684.herokuapp.com/)

## 概要

自分の位置情報を確認し、近くにあるITイベントを自動的にGOOGLE MAP上に表現してくれるシステム。

## 利用可能ブラウザー

- Chrome
- IE Edge
- IE 11
- Safari(OS上のシステム設定で、場所検索許可すべき)

## 使用技術

**Client**

- React

**Server**

- Nodejs 7.10.1

**API**

- HTML5 geolocation API
- Google Map API
- Yahoo 場所情報 API
- Connpass(IT ワークショップ検索webアプリ) API
- Doorkeeper(IT ワークショップ検索webアプリ) API

## Local使用方法

1. `env.dev.sh`と`env.production.sh`を作って、その中に`PORT`と`DOORKEEPER_TOKEN`を指定する必要があります。PORTは開発時は3003、配布する時は3000を使います。DOORKEEPER_TOKENはDoorkeeperウェブサイトから発行します。
2. サーバの方で `yarn`または、`npm install`実行します。
3. 同じくクライアントの方でも`yarn`または、`npm install`を実行します。
4. サーバは`yarn dev` or `npm run dev`、クライアントは`yarn start` or `npm start`を実行します。(すでに、proxyの設定が入ってます)

## 改善点

### 1. performance問題

現在は、ユーザが入ると、ユーザーの地域に沿っていちいちrequestを投げるが、

そもそも、地域単位で検索するので、サーバのdbに全ての地域のイベントを前もってcacheすることもありかも。

毎日の夜12時にDBを更新して実現する。

そうすることで、速度が遅いイシューを改善できるだろう。

### 2. 検索しきれてない問題

prefectureを指定できるqueryがないので、一部のeventは表示されてない可能性がある。

なるべく、多くの種類のqueryを投げる必要がある。