# 足球教练助手 - AI训练分析系统

一款基于AI的足球/田径训练分析系统，通过视频分析生成个性化训练计划和教练建议。

## 功能特性

- 📹 **视频上传**：支持上传训练视频进行分析
- 🤖 **AI分析**：智能分析动作姿态和运动表现
- 📊 **可视化报告**：展示详细的训练分析结果
- 📋 **个性化计划**：根据分析结果生成定制化训练计划
- 💡 **教练建议**：提供专业的改进建议和训练指导

## 技术栈

### 前端
- React 18 + TypeScript
- Vite
- Tailwind CSS
- Lucide Icons

### 后端
- Python FastAPI
- NumPy
- Uvicorn

## 项目结构

```
soccer-coach-helper/
├── frontend/              # React前端应用
│   ├── src/
│   │   ├── components/   # 组件
│   │   │   ├── VideoUpload.tsx      # 视频上传组件
│   │   │   ├── AnalysisResult.tsx   # 分析结果组件
│   │   │   └── TrainingPlan.tsx     # 训练计划组件
│   │   ├── App.tsx       # 主应用
│   │   └── main.tsx      # 入口文件
│   ├── package.json
│   └── vite.config.ts
├── backend/              # Python后端API
│   ├── main.py          # FastAPI应用
│   └── requirements.txt
└── README.md
```

## 快速开始

### 前置要求

- Node.js 16+
- Python 3.7+
- npm 或 yarn

### 安装步骤

#### 1. 克隆项目

```bash
git clone <repository-url>
cd soccer-coach-helper
```

#### 2. 安装前端依赖

```bash
cd frontend
npm install
```

#### 3. 安装后端依赖

```bash
cd ../backend
pip install -r requirements.txt --user
```

### 运行项目

#### 启动后端服务

```bash
cd backend
python main.py
```

后端服务将在 `http://localhost:8000` 启动

#### 启动前端服务

打开新的终端窗口：

```bash
cd frontend
npm run dev
```

前端应用将在 `http://localhost:3000` 启动

### 使用说明

1. 打开浏览器访问 `http://localhost:3000`
2. 点击"上传训练视频"区域，选择视频文件
3. 预览上传的视频
4. 点击"开始AI分析"按钮
5. 查看分析结果和个性化训练计划

## API接口

### POST /api/analyze

分析上传的视频文件

**请求**：
- Content-Type: multipart/form-data
- Body: video file

**响应**：
```json
{
  "poseAnalysis": {
    "accuracy": 75.5,
    "issues": ["问题1", "问题2"],
    "improvements": ["建议1", "建议2"]
  },
  "movementAnalysis": {
    "speed": 72,
    "balance": 78,
    "coordination": 75
  },
  "recommendations": ["建议1", "建议2", "建议3"]
}
```

## 开发说明

### 前端开发

```bash
cd frontend
npm run dev      # 开发服务器
npm run build    # 构建生产版本
npm run preview  # 预览生产版本
```

### 后端开发

```bash
cd backend
python main.py    # 启动开发服务器
```

## 注意事项

1. **Python版本**：当前使用Python 3.7，MediaPipe需要Python 3.8+，因此后端使用模拟数据演示功能
2. **视频格式**：支持MP4、AVI、MOV等常见视频格式
3. **视频大小**：建议上传小于100MB的视频文件
4. **分析时间**：分析时间取决于视频长度和复杂度

## 未来改进

- [ ] 集成真实的MediaPipe姿态识别
- [ ] 添加用户认证和登录功能
- [ ] 实现训练历史记录
- [ ] 添加数据可视化图表
- [ ] 支持多语言
- [ ] 移动端适配

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交Issue或Pull Request。
