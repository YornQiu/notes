# 镜像源

## Debian 12 (bookworm) 换源

Debian 12（bookworm）换 apt 源通常有两种方式：

1. 修改传统文件：/etc/apt/sources.list
2. 修改 Debian 12 新默认的 deb822 格式文件：/etc/apt/sources.list.d/debian.sources

- 传统格式

```shell
cp /etc/apt/sources.list /etc/apt/sources.list.bak

cat > /etc/apt/sources.list << 'EOF'
deb http://mirrors.aliyun.com/debian bookworm main contrib non-free non-free-firmware
deb http://mirrors.aliyun.com/debian bookworm-updates main contrib non-free non-free-firmware
deb http://mirrors.aliyun.com/debian-security bookworm-security main contrib non-free non-free-firmware
EOF
```

- Debian 12 新格式

```shell
cp /etc/apt/sources.list.d/debian.sources /etc/apt/sources.list.d/debian.sources.bak

cat > /etc/apt/sources.list.d/debian.sources << 'EOF'
Types: deb
URIs: http://mirrors.aliyun.com/debian
Suites: bookworm bookworm-updates
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg

Types: deb
URIs: http://mirrors.aliyun.com/debian-security
Suites: bookworm-security
Components: main contrib non-free non-free-firmware
Signed-By: /usr/share/keyrings/debian-archive-keyring.gpg
EOF
```
