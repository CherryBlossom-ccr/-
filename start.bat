@echo off
echo ========================================
echo 足球教练助手 - 启动脚本
echo ========================================
echo.

echo [1/2] 启动后端服务...
cd backend
start "后端服务" cmd /k "python main.py"
echo 后端服务已启动在 http://localhost:8000
echo.

timeout /t 2 /nobreak >nul

echo [2/2] 启动前端服务...
cd ..\frontend
start "前端服务" cmd /k "npm run dev"
echo 前端服务已启动在 http://localhost:3000
echo.

echo ========================================
echo 所有服务已启动！
echo 请在浏览器中访问: http://localhost:3000
echo ========================================
echo.
echo 按任意键关闭此窗口...
pause >nul
