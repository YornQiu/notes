# 高级操作

## 配置服务

我们可以Linux系统下安装和配置各种服务，也就是说我们可以把Linux系统打造成数据库服务器、Web服务器、缓存服务器、文件服务器、消息队列服务器等等。Linux下的大多数服务都被设置为守护进程（驻留在系统后台运行，但不会因为服务还在运行而导致Linux无法停止运行），所以我们安装的服务通常名字后面都有一个字母`d`，它是英文单词`daemon`的缩写，例如：防火墙服务叫firewalld，我们之前安装的MySQL服务叫mysqld，Apache服务器叫httpd等。在安装好服务之后，可以使用`systemctl`命令或`service`命令来完成对服务的启动、停止等操作，具体操作如下所示。

1. 启动防火墙服务。
   ```Shell
   [root ~]# systemctl start firewalld
   ```
2. 终止防火墙服务。
   ```Shell
   [root ~]# systemctl stop firewalld
   ```
3. 重启防火墙服务。
   ```Shell
   [root ~]# systemctl restart firewalld
   ```
4. 查看防火墙服务状态。
   ```Shell
   [root ~]# systemctl status firewalld
   ```
5. 设置/禁用防火墙服务开机自启。
   ```Shell
   [root ~]# systemctl enable firewalld
   [root ~]# systemctl disable firewalld
   ```

## 计划任务

1. 在指定的时间执行命令。
   - **at** - 将任务排队，在指定的时间执行。
   - **atq** - 查看待执行的任务队列。
   - **atrm** - 从队列中删除待执行的任务。
     指定3天以后下午5点要执行的任务。
   ```Shell
   [root ~]# at 5pm+3days
   at> rm -f /root/*.html
   at> <EOT>
   job 9 at Wed Jun  5 17:00:00 2019
   ```
   查看待执行的任务队列。
   ```Shell
   [root ~]# atq
   9       Wed Jun  5 17:00:00 2019 a root
   ```
   从队列中删除指定的任务。
   ```Shell
   [root ~]$ atrm 9
   ```
2. 计划任务表 - **crontab**。
   ```Shell
   [root ~]# crontab -e
   * * * * * echo "hello, world!" >> /root/hello.txt
   59 23 * * * rm -f /root/*.log
   ```
   > 说明：输入`crontab -e`命令会打开vim来编辑Cron表达式并指定触发的任务，上面我们定制了两个计划任务，一个是每分钟向/root目录下的hello.txt中追加输出`hello, world!`；另一个是每天23时59分执行删除/root目录下以log为后缀名的文件。如果不知道Cron表达式如何书写，可以参照/etc/crontab文件中的提示（下面会讲到）或者用搜索引擎找一下“Cron表达式在线生成器”来生成Cron表达式。
   > 和crontab相关的文件在`/etc`目录下，通过修改`/etc`目录下的crontab文件也能够定制计划任务。
   ```Shell
   [root ~]# cd /etc
   [root etc]# ls -l | grep cron
   [root etc]# vim crontab
   ```

## 磁盘管理

1. 列出文件系统的磁盘使用状况
   **df**

   ```Shell
   [root ~]# df -h
   ```

2. 磁盘分区表操作
   **fdisk**

   ```Shell
   [root ~]# fdisk -l
   ```

3. 磁盘分区工具
   **parted**

4. 格式化文件系统
   **mkfs**

   ```Shell
   [root ~]# mkfs -t ext4 -v /dev/sdb
   ```

   - `-t` - 指定文件系统的类型。
   - `-c` - 创建文件系统时检查磁盘损坏情况。
   - `-v` - 显示详细信息。

5. 文件系统检查
   **fsck**

6. 转换或拷贝文件
   **dd**

7. 挂载/卸载
   **mount** / **umount**

8. 创建/激活/关闭交换分区
   **mkswap** / **swapon** / **swapoff**

## 网络访问和管理

1. 安全远程连接
   **ssh**

   ```Shell
   [root ~]$ ssh root@172.17.100.100
   ```

2. 通过网络获取资源
   **wget**
   - -b 后台下载模式
   - -O 下载到指定的目录
   - -r 递归下载

3. 发送和接收邮件
   **mail**

4. 网络配置工具（旧）
   **ifconfig**

   ```Shell
   [root ~]# ifconfig eth0
   ```

5. 网络配置工具（新）
   **ip**

   ```Shell
   [root ~]# ip address
   ```

6. 网络可达性检查
   **ping**

   ```Shell
   [root ~]# ping www.baidu.com -c 3
   ```

7. 显示或管理路由表
   **route**

8. 查看网络服务和端口
   **netstat** / **ss**

   ```Shell
   [root ~]# netstat -nap | grep nginx
   ```

9. 网络监听抓包
   **tcpdump**

10. 安全文件拷贝
    **scp**

```Shell
[root ~]# scp root@172.17.100.100:/root/example.txt ./example.txt
```

11. 文件同步工具
    **rsync**

    > 说明：使用`rsync`可以实现文件的自动同步，这个对于文件服务器来说相当重要。关于这个命令的用法，我们在后面讲项目部署的时候为大家详细说明。

12. 安全文件传输
    **sftp**

    ```Shell
    [root ~]# sftp root@172.17.100.100
    ```

    - `help`：显示帮助信息。
    - `ls`/`lls`：显示远端/本地目录列表。
    - `cd`/`lcd`：切换远端/本地路径。
    - `mkdir`/`lmkdir`：创建远端/本地目录。
    - `pwd`/`lpwd`：显示远端/本地当前工作目录。
    - `get`：下载文件。
    - `put`：上传文件。
    - `rm`：删除远端文件。
    - `bye`/`exit`/`quit`：退出sftp。

## 进程管理

1.  查看进程
    **ps**

    ```Shell
    [root ~]# ps -ef
    ...
    [root ~]# ps -ef | grep mysqld
    ```

2.  显示进程状态树
    **pstree**

    ```Shell
    [root ~]# pstree
    ```

3.  查找与指定条件匹配的进程
    **pgrep**

    ```Shell
    [root ~]$ pgrep mysqld
    ```

4.  通过进程号终止进程
    **kill**

    ```Shell
    [root ~]$ kill -l
    [root ~]# kill 1001
    [root ~]# kill -9 1001
    ```

    例子：用一条命令强制终止正在运行的 mysqld 进程。

    ```Shell
    ps -ef | grep mysqld | grep -v grep | awk '{print $2}' | xargs kill
    ```

5.  通过进程名终止进程
    **killall** / **pkill**

    结束名为mysqld的进程。

    ```Shell
    [root ~]# pkill mysqld
    ```

    结束ubuntu用户的所有进程。

    ```Shell
    [root ~]# pkill -u ubuntu
    ```

    > 说明：这样的操作会让ubuntu用户和服务器断开连接。

6.  将进程置于后台运行
    - `Ctrl+Z` - 快捷键，用于停止进程并置于后台。
    - `&` - 将进程置于后台运行。

    ```Shell
    [root ~]# mongod &
    [root ~]# redis-server
    ...
    ^Z
    [4]+  Stopped                 redis-server
    ```

7.  查询后台进程
    **jobs**

    ```Shell
    [root ~]# jobs
    ```

8.  让进程在后台继续运行
    **bg**

    ```Shell
    [root ~]# bg %4
    [root ~]# jobs
    ```

9.  将后台进程置于前台
    **fg**

    ```Shell
    [root ~]# fg %4
    ```

    > 说明：置于前台的进程可以使用`Ctrl+C`来终止它。

10. 调整程序/进程运行时优先级
    **nice** / **renice**

11. 用户登出后进程继续工作
    **nohup**

        ```Shell
        [root ~]# nohup ping www.baidu.com > result.txt &
        ```

12. 跟踪进程系统调用情况
    **strace**

        ```Shell
        [root ~]# pgrep mysqld
        [root ~]# strace -c -p 8086
        ```

13. 查看当前运行级别
    **runlevel**

        ```Shell
        [root ~]# runlevel
        N 3
        ```

14. 实时监控进程占用资源状况
    **top**

        ```Shell
        [root ~]# top
        ```

    > 说明：
    - `-c` - 显示进程的整个路径。
    - `-d` - 指定两次刷屏之间的间隔时间（秒为单位）。
    - `-i` - 不显示闲置进程或僵尸进程。
    - `-p` - 显示指定进程的信息。

## 系统诊断

1. 系统启动异常诊断
   **dmesg**

2. 查看系统活动信息
   **sar**

   ```Shell
   [root ~]# sar -u -r 5 10
   ```

   > 说明：
   - `-A` - 显示所有设备（CPU、内存、磁盘）的运行状况。
   - `-u` - 显示所有CPU的负载情况。
   - `-d` - 显示所有磁盘的使用情况。
   - `-r` - 显示内存的使用情况。
   - `-n` - 显示网络运行状态。

3. 查看内存使用情况
   **free**

   ```Shell
   [root ~]# free
   ```

4. 虚拟内存统计
   **vmstat**

   ```Shell
   [root ~]# vmstat
   ```

5. CPU信息统计
   **mpstat**

   ```Shell
   [root ~]# mpstat
   ```

6. 查看进程使用内存状况
   **pmap**

   ```Shell
   [root ~]# ps
   [root ~]# pmap 1011
   ...
   ```

7. 报告设备CPU和I/O统计信息
   **iostat**

   ```Shell
   [root ~]# iostat
   ```

8. 显示所有PCI设备
   **lspci**

   ```Shell
   [root ~]# lspci
   ```

9. 显示进程间通信设施的状态
   **ipcs**

   ```Shell
   [root ~]# ipcs
   ```
