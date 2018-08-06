# youthtech-chatbot
これは20180808に行うyouthtechのチャットボットハンズオンで作るbotのサンプルです。

# 作成手順
## 1. Node.jsのインストール

### MacOS
---
nvmを使ってインストールしていきます。
1. gitがインストールされているか確認

```
git -version
```

※ gitコマンドがインストールされてない方は、
こちら→http://www.tettori.net/post/1491/
2. gitを用いてnvmをインストール
```
git clone https://github.com/creationix/nvm.git ~/.nvm
```
3. nvmを有効にする
```
source ~/.nvm/nvm.sh
```

これによってnvmコマンドが使えるようになる

4. 念のためインストールされているか確認
```
nvm --version
```

問題なければ、 `0.33.11` などが表示されます。

5. node.jsをインストール
```
nvm install v8.11.3
```

6. node.jsのバージョン確認
```
nvm ls; node -v
```

参考：http://www.tettori.net/post/1495/

## 2. LINE Developersのアカウント作成(今回はすべて無料枠で作成します。クレカ情報などもいりません。)

以下のサイトでLINE Botのアカウントを作成します。<br>
https://developers.line.me/ja/services/messaging-api/

1. 新規プロバイダーの作成
「新規プロバイダーを作成」ボタンを押し、<br>
画面の指示に従ってプロバイダーの作成を行います。

2. 新規チャネル作成
LINE Botのアカウントを作成します。

アプリアイコン画像、アプリ名、アプリ説明を記入してください。<br>
プラン： 「Developer Trial」にします。<br>
大業種、小業種： 自由にご記入ください。<br>
メールアドレス： 連絡の取れるアドレスを記入します。<br>

「入力内容を確認する」 → 「同意する」 → 「作成」の順に進みます。<br>

BotのLINEアカウントが完成です！！<br>
Bot一覧に移動するので、自分が作成したBotを選択します。<br>

一通りのLINE Botの情報が出てくるので、なんとなく目を通してみてください。<br>

まずは、「QRコード」を自分のスマホで読み取り、LINEで作ったアカウントと<br>
友達になりましょう！<br>
　
## 3. Botのアクセストークン覚える
このままだと、ひたすら同じ応答のみを行うBotになります。<br>

ここからは、設定を少しずつ変えていきます。<br>

先ほどの「チャネル基本設定」で、各種設定を変更します。<br>
> LINE@機能の利用
- 自動応答メッセージ
- 友だち追加時あいさつ<br>
を「編集」ボタンから「利用しない」に変更します。<br>

> メッセージ送受信設定
- アクセストークン<br>
「再発行」ボタンより再発行します。失効期間が質問されますが、気にしなくて大丈夫です。<br>

ここで出てきた、<br>
- アクセストークン
- Channel Secret
は後ほど利用するので、メモしておいてください。<br>

## 4. herokuのアカウント作成
下記サイトより、Herokuアカウントを作成します。<br>
https://jp.heroku.com/

- Herokuとは
PaaSと呼ばれるクラウドサービスで、個人利用でもほとんどの機能が無料で使えるため、<br>
手軽なアプリや個人開発でよく使われています。

1. 右上の「新規登録」ボタンより新規登録を行います。
名前などを入力しましょう。言語が聞かれた場合は、「Node.js」を選択してください。<br>

2. アプリを作成する
アカウントができたら、アプリを作ります。<br>
右上より、「new」 → 「create new app」の順に進みます。<br>

- app name・・・アプリの名前を入れてください。
- region・・・「アメリカ」か「イギリス」です。どちらでも大丈夫です。
- pipe line・・・無視してください。

これでHerokuアプリの土台ができました。<br>

## 5. アクセストークン記入(YOUR_CHANNEL_ACCESS_TOKEN, YOUR_CHANNEL_SECRET)
先ほど、覚えて置いた<br>
- アクセストークン<br>
- Channel Secret<br>
を利用して、herokuアプリとLINE Botの接続ができるようにします。<br>

Herokuの「Settings」タブを押し、「Config Vars」の欄の<br>
「Reveal Config Vars」を押します。<br>
KEYとVALUEが出るので、それぞれ以下のように記入します。<br>

1. KEY：（YOUR_CHANNEL_ACCESS_TOKEN）、VALUE：(あなたのLINE BOTのアクセストークン)<br>
2. KEY：(YOUR_CHANNEL_SECRET)、VALUE：(あなたのLINE BOTのChannel Secret)<br>

では、最後にコードを実際にデプロイしていきます。<br>

## 6. コードのデプロイ
下記サイトから、 コードをcloneしてきます。<br>
※今回はあらかじめ作成したサンプルコードを使います。コードの内容は後ほどご説明します。<br>
ターミナル(コマンドプロンプト)を開き、以下を記載していきます。

```
cd ~
mkdir bot-handson
cd bot-handson
git clone https://github.com/daitasu/youthtech-chatbot.git
```

ローカルPCでコードの確認ができたら、Herokuへのデプロイを行います。<br>
Herokuの「Settings」より、「Info」→「Heroku Git URL」を確認します。<br>
ターミナル(コマンドプロンプト)で以下のように入力します。<br>

```
git push <あなたのHerokuのGit URL>
```

これでコードのデプロイが完了しました。<br>

Herokuの画面右上、「More」 → 「View logs」より `Node app is running -> port: XXXXX` <br>
が出ていればOKです。<br>

最後に、LINE BOTに設定を追加します。<br>

## 7. Webhookの設定
LINEから届いたメッセージをHerokuアプリに飛ばす設定です。<br>
「LINE Developers」(https://developers.line.me/console/channel/)を開き、<br>
先ほどのBotの設定画面に移動します。<br>
<br>
> メッセージ送受信設定
- Webhook送信<br>
「編集」 → 「利用する」にします。

- Webhook URL ※SSLのみ対応 <br>
Herokuの「Settings」 → 「Domains and certificates」にある<br>
https://xxxxxxxxxxxx.herokuapp.com/<br>
をコピーして、貼り付けます。

いま「接続確認」をすると、エラーになりますが気にしなくて大丈夫です。<br>
先ほど同様に「More」→「View logs」をみます。<br>
<br>
```
message: { id: '100002', type: 'sticker', packageId: '1', stickerId: '1' } }
```

のようなlogが出ていれば接続は成功しています。<br>
<br>
これで、Botが完成です！！<br>
<br>
実際に、LINEからBotにメッセージを送ってみてください。<br>
<br>
※このコードですと、テキストメッセージ以外は反応しません

## 時間が余ったら
---
時間の余った方は、
```
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
```

のjson部分をこちらを参考に色々と書き換えてみてください。
テキストの他にも、
- スタンプ
- 画像
- 音声
- 位置情報
- 動画
- イメージマップ
など様々なメッセージを返すことが可能です。
https://developers.line.me/ja/reference/messaging-api/#send-reply-message

## 参考Bot紹介
https://www.youtube.com/watch?v=GtoD5xeQ4ws

LINE Botは年々新しい機能が追加されています。
- LIFF(2018/6/6)
- Flex Message(2018/6/12)
- Clova Extensions Kit(2018/7/12)
- クイックリプライ(2018/7/31)

簡単にサービスが作れ、新しい機能も多いため、誰でも平等に挑戦できるのが<br>
いいところです。ぜひぜひいろんなBotをつくってみてください。
