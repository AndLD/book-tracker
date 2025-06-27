sudo apt update
sudo apt upgrade
# if you see "Temporary failure resolving 'archive.ubuntu.com'" try to change DNS server:
# echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf > /dev/null

sudo apt install git -y
sudo apt install curl -y

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
source ~/.bashrc
nvm install 20.14.0
npm install -g typescript 
npm install -g pm2

sudo update-rc.d apache2 disable
sudo update-rc.d -f apache2 remove
sudo systemctl disable apache2
sudo systemctl stop apache2
sudo apt-get purge apache2 apache2-utils apache2.2-bin apache2-common
sudo rm -rf /etc/apache2
sudo apt remove apache2*

git clone your-repo-url.git
cd your-repo-name

# probably it is required to copy api/public/images folder

# copy corresponding .env.production files to api, client and ssr folders

sudo apt install nginx -y
sudo apt install certbot python3-certbot-nginx -y

# replace "domain.com" with actual domain
sudo certbot --nginx -d domain1.com
sudo certbot --nginx -d domain2.com

sudo cp ./nginx.conf /etc/nginx/sites-enabled/default

sudo nginx -t && sudo systemctl start nginx

# sudo nginx -t && sudo systemctl reload nginx

cd lib
npm ci
cd ../api
npm ci
npm run build
cd ../client
npm ci
npm run build
cd ../ssr
npm ci
npm run build

cd ..

pm2 start ecosystem.config.json
# pm2 status ecosystem.config.json
pm2 save