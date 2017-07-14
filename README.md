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

## 改善点

現在は、ユーザが入ると、ユーザーの地域に沿っていちいちrequestを投げるが、

そもそも、地域単位で検索するので、サーバのdbに全てのイベントを前もってcacheすることもありかも。

毎日の夜12時にDBを更新して実現する。

そうすることで、速度が遅いイシューを改善できるだろう。
