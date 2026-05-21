import React, { useState, useEffect } from 'react';
import { Save, Eye, Edit3, Bold, Italic, Underline, List, ListOrdered, Quote, Undo, Redo, Type, AlignLeft, AlignCenter, AlignRight, Shield } from 'lucide-react';
import  RichTextEditor  from '../RichTextEditor';
// import PrivacyPreview from '../PrivacyPreview';
import RichTextEditorPreview from '../RichTextEditorPreview';
import { useAuth } from '../../../context/AuthContext';

// Statistics Component
function EditorStats({ content }) {
  const getStats = () => {
    if (!content) return { words: 0, characters: 0, paragraphs: 0 };
    
    const textContent = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const words = textContent ? textContent.split(' ').length : 0;
    const characters = textContent.length;
    const paragraphs = (content.match(/<p[^>]*>/g) || []).length || (content.trim() ? 1 : 0);
    
    return { words, characters, paragraphs };
  };

  const stats = getStats();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-3">Document Statistics</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.words}</div>
          <div className="text-sm text-gray-600">Words</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.characters}</div>
          <div className="text-sm text-gray-600">Characters</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{stats.paragraphs}</div>
          <div className="text-sm text-gray-600">Paragraphs</div>
        </div>
      </div>
    </div>
  );
}

// Main Privacy Management Component
export default function PrivacyManagement() {
  const {getPrivacy, updatePrivacy} = useAuth();
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(true);
  const [savedContent, setSavedContent] = useState('');
  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
      // Api call to fetch the existing privacy policy
      const fetchPrivacyPolicy = async() => {
        const response = await getPrivacy()
        setContent(response.data.privacy[0].content);
        setSavedContent(response.data.privacy[0].content);
        setLastSaved(new Date(response.data.privacy[0].lastUpdated));
      }

      fetchPrivacyPolicy();
  }, []);

  const handleContentChange = (htmlContent) => {
    setContent(htmlContent);
  };

  const handleSave = async () => {
    try {
      // Api call to save/update the privacy policy
      await updatePrivacy({
        content: content,
        lastUpdate: new Date(),
      })

      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSavedContent(content);
      setLastSaved(new Date());
      setIsEditing(false);
      
      console.log('Privacy policy saved to MongoDB:', {
        content: content,
        timestamp: new Date(),
        wordCount: content.replace(/<[^>]*>/g, ' ').trim().split(' ').length
      });
      
    } catch (error) {
      console.error('Error saving privacy policy:', error);
      alert('Error saving privacy policy. Please try again.');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy Management</h1>
        <p className="text-gray-600">Create and manage your application's privacy policy with our rich text editor</p>
        {lastSaved && (
          <p className="text-sm text-gray-500 mt-2">
            Last saved: {lastSaved.toLocaleString()}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Edit3 size={20} className="text-blue-600" />
              <h2 className="text-xl font-semibold">Editor</h2>
              {content !== savedContent && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Unsaved changes
                </span>
              )}
            </div>
            {isEditing ? (
              <RichTextEditor
                initialContent={savedContent}
                onContentChange={handleContentChange}
                onSave={handleSave}
              />
            ) : (
              <div className="border border-gray-300 rounded-lg bg-gray-50 p-8 text-center">
                <p className="text-gray-600 mb-4">Currently in preview mode</p>
                <button
                  onClick={handleEdit}
                  className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  <Edit3 size={16} />
                  Edit Privacy Policy
                </button>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Eye size={20} className="text-green-600" />
              <h2 className="text-xl font-semibold">Preview</h2>
            </div>
            <RichTextEditorPreview 
              content={content || savedContent} 
              onEdit={handleEdit}
            />
          </div>
        </div>

        <div className="space-y-8 pt-14">
          <EditorStats content={content || savedContent} />
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <h3 className="text-lg font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={handleEdit}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 rounded"
              >
                <Edit3 size={16} className="text-blue-600" />
                Edit Privacy Policy
              </button>
              <button
                onClick={() => {
                  const printWindow = window.open('', '_blank');
                  printWindow.document.write(`
                    <html>
                      <head><title>Privacy Policy</title></head>
                      <body style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px;">
                        ${content || savedContent}
                      </body>
                    </html>
                  `);
                  printWindow.document.close();
                  printWindow.print();
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 rounded"
              >
                <Type size={16} className="text-green-600" />
                Print Privacy Policy
              </button>
            </div>
          </div>

          {savedContent && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <p className="text-green-800 font-medium">
                  Privacy policy successfully saved
                </p>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Your privacy policy is now live in the database
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}