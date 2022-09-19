#!/usr/bin/env sh

set -e

npm run build # 生成靜態檔案

cd ./dist # 進入生成的資料夾

# deploy to github
# if [ -z "$GITHUB_TOKEN" ]; then

mkdir -p ~/.ssh/
echo "${GITHUB_TOKEN}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts

msg='deploy'

githubUrl=git@github.com:linyejoe2/tic-tac-toe.lamdo.git

# else

#   msg='來自 github action 的自動部署。'

#   githubUrl=https://linyejoe2:${GITHUB_TOKEN}@github.com/linyejoe2/tic-tac-toe.lamdo.git

#   git config --global user.name "linyejoe2"

#   git config --global user.email "linyejoe2@gmail.com"

# fi


git init

git add -A

git commit -m "${msg}"

# 推送到github
git push -f $githubUrl master:release

cd -

rm -rf ./dist