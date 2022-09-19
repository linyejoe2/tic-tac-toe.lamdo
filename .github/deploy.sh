#!/usr/bin/env sh

set -e

npm run build # 生成靜態檔案

cd ./dist # 進入生成的資料夾

# deploy to github
msg='來自 github action 的自動部署。'

githubUrl=https://linyejoe2:${GITHUB_TOKEN}@github.com/linyejoe2/tic-tac-toe.lamdo.git

git config --global user.name "linyejoe2"

git config --global user.email "linyejoe2@gmail.com"

git init

git add -A

git commit -m "${msg}"

# 推送到github
git push -f $githubUrl master:release

cd -

rm -rf ./dist