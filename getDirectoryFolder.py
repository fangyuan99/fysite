import os
import requests
import re
from bs4 import BeautifulSoup
def getDirectoryFolder():
    #获取当前路径下所有的文件夹，并返回一个列表，除了隐藏的文件夹
    return [x for x in os.listdir('.') if os.path.isdir(x) and not x.startswith('.')]

def getUrlList():
    folderList = getDirectoryFolder()
    urlList = []
    for folder in folderList:
        baseUrl='http://ikun99.cf/'
        url = baseUrl+folder
        title = ''
        # 获取url的标题
        try:
            resp = requests.get(url)
            soup = BeautifulSoup(resp.text,'html.parser')
            title = soup.title.string
            icon = soup.find('link',rel='icon')['href']
        except:
            icon = url+'/favicon.ico'
        # 如果icon中没有/,则拼接url
        if icon.find('/') == -1 or icon.find('./') != -1 or icon == 'favicon.ico':
            icon = url+'/'+icon

        urlList.append({
            'icon':icon,
            'link':url,
            'name':title,
            'description':''
            })
        print({
            'icon':icon,
            'link':url,
            'name':title,
            'description':''
            })
    return urlList

if __name__ == '__main__':
    # print(getUrlList())
    urlList=getUrlList()
    # 写入文件,编码为utf-8
    with open('urlList.txt','w',encoding='utf-8') as f:
        f.write(str(urlList))

    