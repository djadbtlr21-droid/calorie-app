import { useState, useRef } from 'react';
import { Camera, Image, Loader2 } from 'lucide-react';
import { analyzeFoodImage } from '../../services/gemini';
import { useLang } from '../../contexts/LanguageContext';
import Trainer from '../characters/Trainer';

export default function PhotoCapture({ apiKey, onResult }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [debugInfo, setDebugInfo] = useState('');
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);
  const { t } = useLang();

  const handleFile = (file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setImageFile(file);
    setError('');
  };

  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();

      img.onload = () => {
        const MAX_SIZE = 800;
        let { width, height } = img;

        if (width > height && width > MAX_SIZE) {
          height = Math.round(height * MAX_SIZE / width);
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = Math.round(width * MAX_SIZE / height);
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const base64 = canvas.toDataURL('image/jpeg', 0.75).split(',')[1];
        resolve(base64);
      };

      img.onerror = reject;

      const reader = new FileReader();
      reader.onload = (e) => { img.src = e.target.result; };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;
    if (!apiKey) { setError(t.noApiKey); return; }
    setError('');
    setLoading(true);
    try {
      const base64 = await compressImage(imageFile);
      setDebugInfo(`이미지 크기: ${Math.round(base64.length * 0.75 / 1024)}KB | type: image/jpeg`);
      const result = await analyzeFoodImage(base64, apiKey, description, 'image/jpeg');
      onResult(result);
      setDescription('');
      setPreview(null);
      setImageFile(null);
      setDebugInfo('');
    } catch (err) {
      setError(`[DEBUG] ${err.message} | ${err.stack?.split('\n')[0] || ''}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {!apiKey && <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-3 text-sm text-yellow-700 dark:text-yellow-300">{t.noApiKey}</div>}
      <div className="flex gap-3">
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
        <button onClick={() => cameraRef.current?.click()} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-xl font-medium text-sm disabled:opacity-50">
          <Camera size={18} />{t.takePhoto}
        </button>
        <button onClick={() => galleryRef.current?.click()} disabled={loading} className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-medium text-sm disabled:opacity-50">
          <Image size={18} />{t.chooseGallery}
        </button>
      </div>

      {preview && (
        <>
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
            <img src={preview} alt={t.foodPhoto} className="w-full h-48 object-cover" />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">
              📝 음식 설명 추가 (선택사항)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="예: 닭가슴살 볶음밥, 드레싱 없는 샐러드, 소스 추가된 파스타..."
              className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary text-slate-700 dark:text-slate-200"
            />
            <p className="text-[10px] text-slate-400 mt-1">AI 인식이 어려운 경우 힌트를 입력하면 더 정확해져요!</p>
          {debugInfo && <p className="text-xs text-blue-500 mt-1">{debugInfo}</p>}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={16} className="animate-spin" /> 🔍 AI 분석 중...</> : '🔍 음식 분석하기'}
          </button>
        </>
      )}

      {loading && !preview && (
        <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
          <Loader2 size={20} className="animate-spin text-primary" />
          <div><p className="text-sm font-medium text-slate-700 dark:text-slate-200">{t.analyzingFood}</p><p className="text-xs text-slate-400">{t.pleaseWait}</p></div>
        </div>
      )}

      {error && <div className="flex items-center gap-3"><Trainer expression="disappointed" size={40} /><p className="text-sm text-red-500">{error}</p></div>}
    </div>
  );
}
