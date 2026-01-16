#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
创建足球教练助手的单文件HTML应用
"""

import os

def create_single_file_html():
    """创建包含所有CSS和JavaScript的单文件HTML"""
    
    # 文件路径
    css_file = os.path.join('frontend', 'dist', 'assets', 'index-Ct1h5ams.css')
    js_file = os.path.join('frontend', 'dist', 'assets', 'index-D2sJkQB5.js')
    output_file = 'all-in-one.html'
    
    # 读取CSS内容
    with open(css_file, 'r', encoding='utf-8') as f:
        css_content = f.read()
    
    # 读取JavaScript内容
    with open(js_file, 'r', encoding='utf-8') as f:
        js_content = f.read()
    
    # 构建HTML内容
    html_content = f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>足球教练助手 - AI训练分析</title>
    <style>
{css_content}
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module">
{js_content}
    </script>
  </body>
</html>"""
    
    # 写入到输出文件
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"单文件HTML已创建：{output_file}")
    print(f"文件大小：{os.path.getsize(output_file) / 1024:.2f} KB")

if __name__ == "__main__":
    create_single_file_html()
