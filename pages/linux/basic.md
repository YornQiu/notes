# 基础命令

## 基础操作

1. 获取登录信息
   **w** / **who** / **last**/ **lastb**

2. 查看自己使用的Shell
   **ps**

3. 查看命令的说明和位置
   **whatis** / **which** / **whereis**

4. 清除屏幕上显示的内容
   **clear**

5. 查看帮助文档
   **man** / **info** / **--help** / **apropos**

6. 查看系统和主机名
   **uname** / **hostname**

7. 时间和日期
   **date** / **cal**

8. 重启和关机
   **reboot** / **shutdown**

   > 说明：在执行`shutdown`命令时会向登录系统的用户发出警告，可以在命令后面跟上警告消息来替换默认的警告消息，也可以在`-h`参数后通过`now`来表示立刻关机。

9. 退出登录
   **exit** / **logout**

10. 查看历史命令
    **history** > 说明：查看到历史命令之后，可以用`!历史命令编号`来重新执行该命令；通过`history -c`可以清除历史命令。

11. 查看端口占用
    **lsof** / **netstat**

    ```Shell
    [root ~]# lsof -i:80
    [root ~]# netstat -tunlp | grep 80
    ```

## 用户管理

1. 创建和删除用户
   **useradd** / **userdel**

   ```Shell
   [root ~]# useradd ubuntu
   [root ~]# userdel ubuntu
   ```

   - `-d` - 创建用户时为用户指定用户主目录
   - `-g` - 创建用户时指定用户所属的用户组

2. 创建和删除用户组
   **groupadd** / **groupdel**

   > 说明：用户组主要是为了方便对一个组里面所有用户的管理。

3. 修改密码
   **passwd**

   ```Shell
   [root ~]# passwd ubuntu
   ```

   > 说明：输入密码和确认密码没有回显且必须一气呵成的输入完成（不能使用退格键），密码和确认密码需要一致。如果使用`passwd`命令时没有指定命令作用的对象，则表示要修改当前用户的密码。如果想批量修改用户密码，可以使用`chpasswd`命令。
   - `-l` / `-u` - 锁定/解锁用户。
   - `-d` - 清除用户密码。
   - `-e` - 设置密码立即过期，用户登录时会强制要求修改密码。
   - `-i` - 设置密码过期多少天以后禁用该用户。

4. 查看和修改密码有效期
   **chage**

   设置ubuntu用户100天后必须修改密码，过期前15天通知该用户，过期后15天禁用该用户。

   ```Shell
   [root ~]# chage -M 100 -W 15 -I 7 ubuntu
   ```

5. 切换用户
   **su**

   ```Shell
   [root ~]# su ubuntu
   [ubuntu root]$
   ```

6. 以管理员身份执行命令
   **sudo**

   ```Shell
   [ubuntu ~]$ sudo ls /root
   ```

   > **说明**：如果希望用户能够以管理员身份执行命令，用户必须要出现在sudoers名单中，sudoers文件在 `/etc`目录下，如果希望直接编辑该文件也可以使用下面的命令。

7. 编辑sudoers文件
   **visudo**

8. 显示用户与用户组的信息
   **id**

9. 给其他用户发消息
   **write** / **wall**

   ```Shell
   [root ~]# write ubuntu
   ```

10. 查看/设置是否接收其他用户发送的消息
    **mesg**

    ```Shell
    [ubuntu ~]$ mesg
    [ubuntu ~]$ mesg n
    [ubuntu ~]$ mesg
    is n
    ```

## 文件权限管理

### 改变文件权限 **chmod**

#### 1. 符号模式

```Shell
[root ~]# chmod [ugoa...][[+-=][rwxX]...] filename
```

其中：

- u 表示该文件的拥有者，g 表示与该文件的拥有者属于同一个群体(group)者，o 表示其他以外的人，a 表示这三者皆是。

  | Who | 用户类型 | 说明                 |
  | --- | -------- | -------------------- |
  | u   | user     | 文件所有者           |
  | g   | group    | 文件所有者所在组     |
  | o   | others   | 所有其他用户         |
  | a   | all      | 所有用户, 相当于 ugo |

- \+ 表示增加权限、- 表示取消权限、= 表示唯一设定权限。

  | Operator | 说明                                                   |
  | -------- | ------------------------------------------------------ |
  | +        | 为指定的用户类型增加权限                               |
  | -        | 去除指定用户类型的权限                                 |
  | =        | 设置指定用户权限的设置，即将用户类型的所有权限重新设置 |

- r 表示可读取，w 表示可写入，x 表示可执行，X 表示只有当该文件是个子目录或者该文件已经被设定过为可执行。

  | 模式 | 名字         | 说明                                                                           |
  | ---- | ------------ | ------------------------------------------------------------------------------ |
  | r    | 读           | 设置为可读权限                                                                 |
  | w    | 写           | 设置为可写权限                                                                 |
  | x    | 执行         | 设置为可执行权限                                                               |
  | X    | 特殊执行权限 | 只有当文件为目录文件，或者其他类型的用户有可执行权限时，才将文件权限设置可执行 |
  | s    | setuid/gid   | 当文件被执行时，根据who参数指定的用户类型设置文件的setuid或者setgid权限        |
  | t    | 粘贴位       | 设置粘贴位，只有超级用户可以设置该位，只有文件所有者u可以使用该位              |

#### 2. 八进制模式

组合方式:

- 所有者权限(第一位)
- 组权限(第二位)
- 其他用户权限(第三位)

| #   | 权限           | rwx | 二进制 |
| --- | -------------- | --- | ------ |
| 7   | 读 + 写 + 执行 | rwx | 111    |
| 6   | 读 + 写        | rw- | 110    |
| 5   | 读 + 执行      | r-x | 101    |
| 4   | 只读           | r-- | 100    |
| 3   | 写 + 执行      | -wx | 011    |
| 2   | 只写           | -w- | 010    |
| 1   | 只执行         | --x | 001    |
| 0   | 无             | --- | 000    |

常用组合:

- 755: rwxr-xr-x 所有者可读写执行，同组和其他人可读和执行
- 644: rw-r--r-- 所有者可读写，同组和其他人仅可读
- 700: rwx------ 所有人皆可读写执行

#### 3. 示例

```Shell
chmod ugo+r file1.txt  # 将文件 file1.txt 设为所有人皆可读取
chmod a+r file1.txt  # 将文件 file1.txt 设为所有人皆可读取
chmod ug+w,o-w file1.txt file2.txt  # 将文件 file1.txt 与 file2.txt 设为该文件拥有者，与其所属同一个群体者可写入，但其他以外的人则不可写入
chmod u+x ex1.py # 为 ex1.py 文件拥有者增加可执行权限
chmod -R a+r *  # 将目前目录下的所有文件与子目录皆设为任何人可读取
chmod +x script.sh  #给脚本增加执行权限
chmod 755 file.txt #设置文件所有者为 7，同组为 5，其他人为 5
chmod -R 755 folder/ #递归修改整个文件夹及其内部文件的权限
```

### 改变文件所有者 **chown**

1. 只更改所有者

```Shell
chown username filename
chown -R username *  # 递归修改目前目录下的所有文件与子目录的所有者
```

2. 同时更改所有者和组

```Shell
chown username:groupname filename
```

3. 只更改组（所有者前留空）

```Shell
chown :groupname filename
```

4. 使用数字ID

```Shell
chown 1000:1000 filename    # 用户ID 1000，组ID 1000
chown 1001 filename         # 只更改用户ID
```

### 改变用户组 **chgrp**

1. 更改单个文件的所属组:

```Shell
chgrp developers file.txt  # 将 file.txt 的所属组设置为 developers
```

2. 更改多个文件的所属组:

```Shell
chgrp users file1.txt file2.txt file3.txt # 一次性修改多个文件的所属群组
```

3. 递归更改目录及其内容的所属组:

```Shell
chgrp -R www-data /var/www/html # -R 参数会遍历整个目录树
```

4. 使用参考文件的组:

```Shell
chgrp --reference=source_file.txt target_file.txt # 将 target_file.txt 的组设置为与 source_file.txt 相同
```

5. 显示详细操作信息:

```Shell
chgrp -v staff document.pdf # -v 参数会报告每个文件的修改状态
```

## 文件和文件夹操作

1. 创建/删除空目录
   **mkdir** / **rmdir**

2. 创建/删除文件
   **touch** / **rm**
   - `touch`命令用于创建空白文件或修改文件时间。在Linux系统中一个文件有三种时间：
     - 更改内容的时间 - mtime。
     - 更改权限的时间 - ctime。
     - 最后访问时间 - atime。

   - `rm`的几个重要参数：
     - `-i`：交互式删除，每个删除项都会进行询问。
     - `-r`：删除目录并递归的删除目录中的文件和目录。
     - `-f`：强制删除，忽略不存在的文件，没有任何提示。

3. 切换和查看当前工作目录
   **cd** / **pwd**

4. 查看目录内容
   **ls**
   - `-l`：以长格式查看文件和目录。
   - `-a`：显示以点开头的文件和目录（隐藏文件）。
   - `-R`：遇到目录要进行递归展开（继续列出目录下面的文件和目录）。
   - `-d`：只列出目录，不列出其他内容。
   - `-S` / `-t`：按大小/时间排序。

5. 查看文件内容
   **cat** / **tac** / **head** / **tail** / **more** / **less** / **rev** / **od**

   ```Shell
   [root ~]# wget http://www.baidu.com/ -O baidu.html
   [root ~]# cat baidu.html
   [root ~]# head -10 baidu.html
   [root ~]# tail -2 baidu.html
   [root ~]# less baidu.html
   [root ~]# cat -n baidu.html | more
   ```

   > **说明**：`wget`是一个网络下载器程序，可以从指定的URL下载资源。

6. 拷贝/移动文件
   **cp** / **mv**

   ```Shell
   [root ~]# mkdir example
   [root ~]# cp baidu.html example/
   [root ~]# cd example
   [root example]# ls
   [root example]# mv baidu.html baidu_index.html
   [root example]# ls
   ```

7. 文件重命名
   **rename**

   ```Shell
   [root ~]# rename example.txt example1.txt
   ```

8. 查找文件和查找内容
   **find** / **grep**

   ```Shell
   [root ~]# find / -name "*.html"
   [root ~]# find . -atime 7 -type f -print
   [root ~]# find . -type f -size +2k
   [root ~]# find . -type f -name "*.js" -delete
   [root ~]# grep "<script>" baidu.html -n
   [root ~]# grep -E \<\/?script.*\> baidu.html -n
   ...
   ```

   > **说明**：`grep`在搜索字符串时可以使用正则表达式，如果需要使用正则表达式可以用`grep -E`或者直接使用`egrep`。

9. 创建链接和查看链接
   **ln** / **readlink**

   ```Shell
   [root ~]# ls -l baidu.html
   [root ~]# ln /root/baidu.html /root/backup/baidu_backup
   [root ~]# ls -l baidu.html
   [root ~]# ln /root/baidu_index.html /root/backup/baidu_backup2
   [root ~]# ls -l baidu_index.html
   [root ~]# ln -s /etc/centos-release sysinfo
   [root ~]# ls -l sysinfo
   [root ~]# cat sysinfo
   [root ~]# cat /etc/centos-release
   ```

   > **说明**：链接可以分为硬链接和软链接（符号链接）。硬链接可以认为是一个指向文件数据的指针，就像Python中对象的引用计数，每添加一个硬链接，文件的对应链接数就增加1，只有当文件的链接数为0时，文件所对应的存储空间才有可能被其他文件覆盖。我们平常删除文件时其实并没有删除硬盘上的数据，我们删除的只是一个指针，或者说是数据的一条使用记录，所以类似于“文件粉碎机”之类的软件在“粉碎”文件时除了删除文件指针，还会在文件对应的存储区域填入数据来保证文件无法再恢复。软链接类似于Windows系统下的快捷方式，当软链接链接的文件被删除时，软链接也就失效了。

10. 压缩/解压缩和归档/解归档
    **gzip** / **gunzip** / **xz**

    ```Shell
    [root ~]# gunzip example.tar.gz
    [root ~]# ls example.tar
    ```

11. 归档和解归档
    **tar**

    ```Shell
    [root ~]# tar -xvf example.tar
    ```

    > 说明：归档（也称为创建归档）和解归档都使用`tar`命令，通常创建归档需要`-cvf`三个参数，其中`c`表示创建（create），`v`表示显示创建归档详情（verbose），`f`表示指定归档的文件（file）；解归档需要加上`-xvf`参数，其中`x`表示抽取（extract），其他两个参数跟创建归档相同。

12. 将标准输入转成命令行参数
    **xargs**

    下面的命令会将查找当前路径下的html文件，然后通过`xargs`将这些文件作为参数传给`rm`命令，实现查找并删除文件的操作。

    ```Shell
    [root ~]# find . -type f -name "*.html" | xargs rm -f
    ```

    下面的命令将a.txt文件中的多行内容变成一行输出到b.txt文件中，其中`<`表示从a.txt中读取输入，`>`表示将命令的执行结果输出到b.txt中。

    ```Shell
    [root ~]# xargs < a.txt > b.txt
    ```

    > **说明**：这个命令就像上面演示的那样常在管道（实现进程间通信的一种方式）和重定向（重新指定输入输出的位置）操作中用到，后面的内容中会讲到管道操作和输入输出重定向操作。

13. 显示文件或目录
    **basename** / **dirname**

14. 其他相关工具
    - **sort** - 对内容排序
    - **uniq** - 去掉相邻重复内容
    - **tr** - 替换指定内容为新内容
    - **cut** / **paste** - 剪切/黏贴内容
    - **split** - 拆分文件
    - **file** - 判断文件类型
    - **wc** - 统计文件行数、单词数、字节数
    - **iconv** - 编码转换

    ```Shell
    [root ~]# cat foo.txt
    [root ~]# cat bar.txt
    [root ~]# paste foo.txt bar.txt
    [root ~]# paste foo.txt bar.txt > hello.txt
    [root ~]# cut -b 4-8 hello.txt
    [root ~]# cat hello.txt | tr '\t' ','
    [root ~]# split -l 100 baidu.html hello
    [root ~]# file img.png
    [root ~]# wc baidu.html
    [root ~]# wc -l baidu.html
    [root ~]# iconv -f gb2312 -t utf-8 baidu.html
    ```

## 管道和重定向

1. 管道的使用
   **\|**

   例子：查找当前目录下文件个数。

   ```Shell
   [root ~]# find ./ | wc -l
   6152
   ```

   例子：列出当前路径下的文件和文件夹，给每一项加一个编号。

   ```Shell
   [root ~]# ls | cat -n
   ```

   例子：查找record.log中包含AAA，但不包含BBB的记录的总数

   ```Shell
   [root ~]# cat record.log | grep AAA | grep -v BBB | wc -l
   ```

2. 输出重定向和错误重定向
   **\>** / **>>** / **2\>**

   ```Shell
   [root ~]# cat readme.txt
   [root ~]# cat readme.txt | sort | uniq > result.txt
   [root ~]# cat result.txt
   ```

3. 输入重定向
   **\<**

   ```Shell
   [root ~]# echo 'hello, world!' > hello.txt
   [root ~]# wall < hello.txt
   [root ~]#
   [root ~]# echo 'I will show you some code.' >> hello.txt
   [root ~]# wall < hello.txt
   [root ~]#
   ```

4. 多重定向
   **tee**

   下面的命令除了在终端显示命令`ls`的结果之外，还会追加输出到`ls.txt`文件中。

   ```Shell
   [root ~]# ls | tee -a ls.txt
   ```

## 别名

1. **alias**

   ```Shell
   [root ~]# alias ll='ls -l'
   [root ~]# alias frm='rm -rf'
   [root ~]# ll
   [root ~]# frm abc
   ```

2. **unalias**

   ```Shell
   [root ~]# unalias frm
   [root ~]# frm sohu.html
   -bash: frm: command not found
   ```

## 文本处理

1. 字符流编辑器
   **sed**

   sed是操作、过滤和转换文本内容的工具。

   ```Shell
   [root ~]# cat -n file1.txt
   ```

   接下来，我们在第2行后面添加一个pitaya。

   ```Shell
   [root ~]# sed '2a pitaya' file1.txt
   ```

   > 注意：刚才的命令和之前我们讲过的很多命令一样并没有改变file1.txt文件，而是将添加了新行的内容输出到终端中，如果想保存到file1.txt中，可以使用输出重定向操作。
   > 在第2行前面插入一个waxberry。

   ```Shell
   [root ~]# sed '2i waxberry' file1.txt
   ```

   删除第3行。

   ```Shell
   [root ~]# sed '3d' file1.txt
   ```

   删除第2行到第4行。

   ```Shell
   [root ~]# sed '2,4d' file1.txt
   ```

   将文本中的字符a替换为@。

   ```Shell
   [root ~]# sed 's#a#@#' file1.txt
   ```

   将文本中的字符a替换为@，使用全局模式。

   ```Shell
   [root ~]# sed 's#a#@#g' file1.txt
   ```

2. 模式匹配和处理语言
   **awk**

   awk是一种编程语言，也是Linux系统中处理文本最为强大的工具。
   通过该命令可以从文本中提取出指定的列、用正则表达式从文本中取出我们想要的内容、显示指定的行以及进行统计和运算，总之它非常强大。

   ```Shell
   [root ~]# cat file1.txt
   ```

   显示文件的第3行。

   ```Shell
   [root ~]# awk 'NR==3' file1.txt
   ```

   显示文件的第2列。

   ```Shell
   [root ~]# awk '{print $2}' file1.txt
   ```

   显示文件的最后一列。

   ```Shell
   [root ~]# awk '{print $NF}' file1.txt
   ```

   输出末尾数字大于等于300的行。

   ```Shell
   [root ~]# awk '{if($3 >= 300) {print $0}}' file1.txt
   ```
