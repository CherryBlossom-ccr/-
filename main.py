from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import numpy as np
from typing import Dict, List
import tempfile
import os

app = FastAPI(title="足球教练助手 API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoAnalyzer:
    def analyze_video(self, video_path: str) -> Dict:
        return self.generate_mock_analysis()
    
    def generate_mock_analysis(self) -> Dict:
        accuracy = round(np.random.uniform(65, 90), 1)
        
        issues = []
        improvements = []
        
        if accuracy < 75:
            issues.extend([
                "动作不够标准，需要加强基础训练",
                "身体协调性有待提高",
                "核心力量需要加强"
            ])
            improvements.extend([
                "每天进行30分钟基础动作练习",
                "增加核心稳定性训练（平板支撑、侧桥）",
                "练习单腿平衡和敏捷梯训练"
            ])
        elif accuracy < 85:
            issues.extend([
                "部分动作细节需要完善",
                "动作连贯性可以进一步提升"
            ])
            improvements.extend([
                "专注于动作细节的打磨",
                "增加组合动作训练",
                "提高动作转换的流畅性"
            ])
        else:
            improvements.extend([
                "继续保持良好的动作标准",
                "可以尝试更高难度的训练",
                "注意动作的稳定性和一致性"
            ])
        
        return {
            'poseAnalysis': {
                'accuracy': accuracy,
                'issues': issues,
                'improvements': improvements
            },
            'movementAnalysis': {
                'speed': round(np.random.uniform(60, 95), 0),
                'balance': round(np.random.uniform(60, 95), 0),
                'coordination': round(np.random.uniform(60, 95), 0)
            },
            'recommendations': [
                "每周至少进行3次训练，每次45-60分钟",
                "训练前进行10-15分钟热身，避免运动损伤",
                "注意动作质量，不要追求速度而忽视标准",
                "训练后进行拉伸放松，促进恢复",
                "保持规律作息，充足睡眠有助于肌肉恢复",
                "根据自身情况调整训练强度",
                "记录训练日志，追踪进步情况"
            ]
        }

analyzer = VideoAnalyzer()

@app.get("/")
async def root():
    return {"message": "足球教练助手 API", "version": "1.0.0"}

@app.post("/api/analyze")
async def analyze_video(file: UploadFile = File(...)):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_file_path = temp_file.name
        
        analysis_result = analyzer.analyze_video(temp_file_path)
        
        os.unlink(temp_file_path)
        
        return JSONResponse(content=analysis_result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
