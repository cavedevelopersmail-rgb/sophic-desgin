import { Edit3, Eye } from "lucide-react";

// Preview Component
export default function RichTextEditorPreview({ content, onEdit }) {
  const cleanContent = content || '';
  
  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-sm">
      <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Eye size={20} />
          Preview
        </h3>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
        >
          <Edit3 size={16} />
          Edit
        </button>
      </div>
      <div className="p-4 min-h-96">
        {cleanContent ? (
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: cleanContent }}
            style={{
              lineHeight: '1.6',
              color: '#374151'
            }}
          />
        ) : (
          <p className="text-gray-500 italic">No content to preview</p>
        )}
      </div>
    </div>
  );
}
