import { useState } from 'react';
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react';
import api from '../services/api';

interface ImageUploadProps {
    onUploadSuccess: (url: string) => void;
    currentImage: string | null;
}

const ImageUpload = ({ onUploadSuccess, currentImage }: ImageUploadProps) => {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState<string | null>(currentImage);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Type validation
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setError('Please upload a valid image (JPG, PNG, WEBP)');
            return;
        }

        // Size validation (5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('File is too large. Max 5MB allowed.');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            setUploading(true);
            setError(null);

            const { data } = await api.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Backend returns path like /uploads/image-name.jpg
            // The uploads folder is served at http://localhost:5000/uploads
            // So we need to remove /api prefix if present and use the correct base URL
            const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
            const imageUrl = data.data.startsWith('http') 
                ? data.data 
                : `${backendUrl}${data.data}`;
            setPreview(imageUrl);
            onUploadSuccess(imageUrl);
            setUploading(false);
        } catch (err: any) {
            setError(err.response?.data?.error || err.message || 'Failed to upload image');
            setUploading(false);
        }
    };

    const removeImage = () => {
        setPreview(null);
        onUploadSuccess('');
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-slate-400 mb-2">Product Image</label>

            <div className="relative group">
                {preview ? (
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                            onClick={removeImage}
                            className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all active:scale-95"
                        >
                            <X size={20} />
                        </button>
                    </div>
                ) : (
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-800 rounded-3xl cursor-pointer bg-slate-900/50 hover:bg-slate-900 hover:border-emerald-500/50 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            {uploading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                                    <p className="text-sm text-slate-400">Uploading to server...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="p-4 bg-slate-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                                        <Upload className="text-emerald-500" size={24} />
                                    </div>
                                    <p className="mb-2 text-sm text-slate-300 font-semibold">Click to upload product image</p>
                                    <p className="text-xs text-slate-500 uppercase tracking-widest">JPG, PNG or WEBP (MAX. 5MB)</p>
                                </>
                            )}
                        </div>
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                            accept="image/*"
                        />
                    </label>
                )}
            </div>

            {error && (
                <p className="text-sm text-red-400 flex items-center gap-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                    {error}
                </p>
            )}
        </div>
    );
};

export default ImageUpload;
