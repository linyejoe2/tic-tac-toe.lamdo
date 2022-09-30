#!/usr/bin/env sh

set -e # 顯示錯誤資訊

npm run build # 生成靜態檔案

cd ./dist # 進入生成的資料夾

# 設定 ssh-key 相關資訊
mkdir -p ~/.ssh/
echo "${GITHUB_TOKEN}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

# 設定 git 相關資訊
msg='來自 GitHub Actions 的自動部署。'
githubUrl=git@github.com:linyejoe2/tic-tac-toe.lamdo.git
git config --global user.name "linyejoe2"
git config --global user.email "linyejoe2@gmail.com"

# 建立一個臨時的 branch
git init
git add -A
git commit -m "${msg}"

# 推送到github
git push -f $githubUrl master:release

# 把 ./dist 的內容刪乾淨
cd -
rm -rf ./dist
