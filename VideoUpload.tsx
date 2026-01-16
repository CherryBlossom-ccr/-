import { Upload, X, FileVideo } from 'lucide-react'

interface VideoUploadProps {
  onVideoUpload: (file: File) => void
  videoFile: File | null
}

export default function VideoUpload({ onVideoUpload, videoFile }: VideoUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onVideoUpload(file)
    }
  }

  const handleRemove = () => {
    onVideoUpload(null as any)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  return (
    <div className="glass-card p-6 rounded-xl border border-white/10 hover:shadow-xl transition-all duration-300">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-gradient">
        <Upload className="w-6 h-6 mr-2 green-accent" />
        上传训练视频
      </h2>
      
      {!videoFile ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center hover:border-green-500/70 hover:bg-green-500/5 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
        >
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="video-upload"
          />
          <label
            htmlFor="video-upload"
            className="cursor-pointer"
          >
            <div className="p-4 bg-green-500/20 rounded-full inline-block mb-4 transition-all duration-300 hover:bg-green-500/30 hover:scale-110">
              <FileVideo className="w-12 h-12 mx-auto text-green-400" />
            </div>
            <p className="text-lg font-medium text-gray-300 mb-2 transition-colors">
              点击或拖拽视频文件到此处
            </p>
            <p className="text-sm text-gray-500">
              支持 MP4, AVI, MOV 等常见视频格式
            </p>
          </label>
        </div>
      ) : (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-5 transition-all duration-300 hover:bg-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/30 rounded-lg">
                <FileVideo className="w-8 h-8 text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-300 line-clamp-1">{videoFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemove}
              className="p-3 rounded-full bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition-all duration-300 transform hover:scale-110"
              title="移除视频"
            >
              <X className="w-5 h-5 text-red-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
