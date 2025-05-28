# Pre-Requisites

## Docker 설치
```bash
# 패키지 업데이트
sudo apt update

# 필수 패키지 설치
sudo apt install ca-certificates curl gnupg

# Docker 공식 GPG 키 추가
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Docker 저장소 추가
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 저장소 다시 업데이트
sudo apt update

# Docker 설치
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Docker 설치 확인
docker --version

# (선택) sudo 없이 docker 명령어 사용하려면
sudo usermod -aG docker $USER
# 그 후에 터미널 재접속하거나 reboot

```