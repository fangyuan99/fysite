import os
import requests
import re
def getDirectoryFolder():
    #获取当前路径下所有的文件夹，并返回一个列表，除了隐藏的文件夹
    return [x for x in os.listdir('.') if os.path.isdir(x) and not x.startswith('.')]

def getUrlList():
    folderList = getDirectoryFolder()
    urlList = []
    for folder in folderList:
        baseUrl='https://ikun99.cf/'
        url = baseUrl+folder
        title = ''
        # 获取url的标题
        try:
            resp = requests.get(url)
            title = re.findall('<title>(.*?)</title>',resp.text)[0]
        except:
            title = '网页标题获取失败'
        urlList.append({'url':url,'title':title})
        print({'url':url,'title':title})
    return urlList

if __name__ == '__main__':
    # print(getUrlList())
    urlList=getUrlList()
    # 写入文件,编码为utf-8
    with open('urlList.txt','w',encoding='utf-8') as f:
        f.write(str(urlList))

    