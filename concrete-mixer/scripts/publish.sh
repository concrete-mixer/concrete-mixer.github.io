# This is thoroughly amateurish
cd ~/Documents/concrete-mixer.github.io
git checkout source
cd ~/Documents/concrete-mixer.github.io/concrete-mixer

bundle exec jekyll build
mv _site /tmp


cd ..
git checkout master
rm -rf *
 
git checkout cistern-chapel

cp -ra /tmp/_site/* .
rm -rf concrete-mixer
rm -rf scripts
 
git add *
git commit
rm -rf /tmp/_site

git checkout source
