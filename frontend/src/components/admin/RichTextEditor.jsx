import { useState, useRef, useEffect } from 'react';
import { Save, Bold, Italic, Underline, List, ListOrdered, Quote, Undo, Redo, AlignLeft, AlignCenter, AlignRight, Link, Image, Code, Strikethrough } from 'lucide-react';

// Enhanced Rich Text Editor Component
export default function RichTextEditor({ initialContent, onContentChange, onSave }) {
  const editorRef = useRef(null);
  const [isSaving, setIsSaving] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentFormat, setCurrentFormat] = useState({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
  });

  useEffect(() => {
    if (initialContent && editorRef.current) {
      editorRef.current.innerHTML = initialContent;
      handleInput();
    }
  }, [initialContent]);

  // Save current state for undo/redo
  const saveState = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      setUndoStack(prev => [...prev.slice(-19), content]);
      setRedoStack([]);
    }
  };

  // Handle input changes
  const handleInput = () => {
    if (editorRef.current) {
      const content = editorRef.current.innerHTML;
      onContentChange(content);
      updateFormatState();
    }
  };

  // Update format state based on current selection
  const updateFormatState = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0 && editorRef.current) {
      try {
        setCurrentFormat({
          bold: document.queryCommandState('bold'),
          italic: document.queryCommandState('italic'),
          underline: document.queryCommandState('underline'),
          strikethrough: document.queryCommandState('strikeThrough')
        });
      } catch (error) {
        // Fallback: check if current selection has formatting
        const range = selection.getRangeAt(0);
        const parentElement = range.commonAncestorContainer.nodeType === Node.TEXT_NODE 
          ? range.commonAncestorContainer.parentElement 
          : range.commonAncestorContainer;
        
        const computedStyle = window.getComputedStyle(parentElement);
        const isBold = computedStyle.fontWeight === 'bold' || computedStyle.fontWeight >= '600';
        const isItalic = computedStyle.fontStyle === 'italic';
        const hasUnderline = computedStyle.textDecoration.includes('underline');
        const hasStrikethrough = computedStyle.textDecoration.includes('line-through');
        
        setCurrentFormat({
          bold: isBold,
          italic: isItalic,
          underline: hasUnderline,
          strikethrough: hasStrikethrough
        });
      }
    }
  };

  // Enhanced execCommand with better formatting toggle
  const execCommand = (command, value = null) => {
    saveState();
    
    // Focus the editor first
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    try {
      // For text formatting commands, handle toggle behavior manually
      if (['bold', 'italic', 'underline', 'strikeThrough'].includes(command)) {
        const isActive = document.queryCommandState(command);
        
        // If the format is active, we need to remove it
        if (isActive) {
          document.execCommand(command, false, null);
          // Force remove formatting if execCommand doesn't work
          setTimeout(() => {
            const selection = window.getSelection();
            if (selection.rangeCount > 0) {
              const range = selection.getRangeAt(0);
              removeFormatting(range, command);
            }
          }, 0);
        } else {
          // Apply formatting
          document.execCommand(command, false, null);
        }
      } else {
        const success = document.execCommand(command, false, value);
        if (!success) {
          console.warn(`Command ${command} failed, using fallback`);
          handleCommandFallback(command, value);
        }
      }
    } catch (error) {
      console.warn(`Command ${command} error:`, error);
      handleCommandFallback(command, value);
    }
    
    // Small delay to ensure DOM is updated before checking state
    setTimeout(() => {
      handleInput();
      updateFormatState();
    }, 0);
  };

  // Remove specific formatting from selection
  const removeFormatting = (range, format) => {
    const selection = window.getSelection();
    const selectedText = range.toString();
    
    if (selectedText) {
      const span = document.createElement('span');
      span.textContent = selectedText;
      
      // Remove the specific formatting
      switch (format) {
        case 'bold':
          span.style.fontWeight = 'normal';
          break;
        case 'italic':
          span.style.fontStyle = 'normal';
          break;
        case 'underline':
          span.style.textDecoration = 'none';
          break;
        case 'strikeThrough':
          span.style.textDecoration = 'none';
          break;
      }
      
      range.deleteContents();
      range.insertNode(span);
      
      // Restore selection
      const newRange = document.createRange();
      newRange.setStart(span.firstChild, 0);
      newRange.setEnd(span.firstChild, span.textContent.length);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  // Fallback methods for commands that might fail
  const handleCommandFallback = (command, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    switch (command) {
      case 'insertUnorderedList':
        insertCustomList('ul');
        break;
      case 'insertOrderedList':
        insertCustomList('ol');
        break;
      case 'justifyLeft':
        applyAlignment('left');
        break;
      case 'justifyCenter':
        applyAlignment('center');
        break;
      case 'justifyRight':
        applyAlignment('right');
        break;
      case 'formatBlock':
        applyHeading(value);
        break;
      default:
        break;
    }
  };

  // Improved custom list insertion
  const insertCustomList = (listType) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    // Check if we're already in a list item
    let currentElement = range.commonAncestorContainer;
    if (currentElement.nodeType === Node.TEXT_NODE) {
      currentElement = currentElement.parentElement;
    }
    
    const existingListItem = currentElement.closest('li');
    const existingList = currentElement.closest('ul, ol');
    
    if (existingList) {
      // If we're in a list, convert it back to paragraphs
      const listItems = Array.from(existingList.querySelectorAll('li'));
      const fragment = document.createDocumentFragment();
      
      listItems.forEach(li => {
        const p = document.createElement('p');
        p.innerHTML = li.innerHTML || '<br>';
        p.style.marginBottom = '1rem';
        fragment.appendChild(p);
      });
      
      existingList.parentNode.replaceChild(fragment, existingList);
    } else {
      // Create new list
      const list = document.createElement(listType);
      list.style.paddingLeft = '2rem';
      list.style.marginBottom = '1rem';
      list.style.marginTop = '1rem';
      
      // Handle different scenarios
      const selectedText = range.toString().trim();
      
      if (selectedText) {
        // If text is selected, split by lines and create list items
        const lines = selectedText.split('\n').filter(line => line.trim());
        
        if (lines.length > 1) {
          // Multiple lines - create multiple list items
          lines.forEach(line => {
            const li = document.createElement('li');
            li.textContent = line.trim();
            li.style.marginBottom = '0.5rem';
            list.appendChild(li);
          });
        } else {
          // Single line - create one list item
          const li = document.createElement('li');
          li.textContent = selectedText;
          li.style.marginBottom = '0.5rem';
          list.appendChild(li);
        }
        
        range.deleteContents();
      } else {
        // No selection - create empty list item
        const li = document.createElement('li');
        li.innerHTML = 'List item';
        li.style.marginBottom = '0.5rem';
        list.appendChild(li);
      }
      
      range.insertNode(list);
      
      // Position cursor in the first list item
      const firstLi = list.querySelector('li');
      if (firstLi) {
        const newRange = document.createRange();
        newRange.selectNodeContents(firstLi);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  };

  // Apply text alignment
  const applyAlignment = (alignment) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let element = selection.anchorNode;
    if (element.nodeType === Node.TEXT_NODE) {
      element = element.parentElement;
    }

    // Find the block element to align
    while (element && !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'LI'].includes(element.tagName)) {
      element = element.parentElement;
    }

    if (element) {
      element.style.textAlign = alignment;
    } else {
      // Wrap selection in a div with alignment
      const range = selection.getRangeAt(0);
      const div = document.createElement('div');
      div.style.textAlign = alignment;
      
      try {
        range.surroundContents(div);
      } catch (e) {
        div.appendChild(range.extractContents());
        range.insertNode(div);
      }
    }
  };

  // Apply heading styles
  const applyHeading = (level) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    let element = range.commonAncestorContainer;
    
    if (element.nodeType === Node.TEXT_NODE) {
      element = element.parentElement;
    }

    // Find the current block element
    while (element && !['P', 'DIV', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(element.tagName)) {
      element = element.parentElement;
    }

    if (element) {
      const newElement = level ? document.createElement(`h${level}`) : document.createElement('p');
      newElement.innerHTML = element.innerHTML;
      
      // Apply heading styles
      if (level) {
        const sizes = { '1': '2rem', '2': '1.5rem', '3': '1.25rem', '4': '1.125rem' };
        newElement.style.fontSize = sizes[level] || '1rem';
        newElement.style.fontWeight = 'bold';
        newElement.style.marginBottom = '1rem';
        newElement.style.marginTop = '1rem';
      }
      
      element.parentNode.replaceChild(newElement, element);
    }
  };

  // Text formatting functions
  const formatText = (format) => {
    editorRef.current?.focus();
    
    switch (format) {
      case 'bold':
        execCommand('bold');
        break;
      case 'italic':
        execCommand('italic');
        break;
      case 'underline':
        execCommand('underline');
        break;
      case 'strikethrough':
        execCommand('strikeThrough');
        break;
      default:
        break;
    }
  };

  // List functions
  const insertList = (ordered = false) => {
    editorRef.current?.focus();
    const command = ordered ? 'insertOrderedList' : 'insertUnorderedList';
    execCommand(command);
  };

  // Heading function
  const setHeading = (level) => {
    editorRef.current?.focus();
    const value = level ? `h${level}` : 'p';
    execCommand('formatBlock', value);
  };

  // Alignment functions
  const alignText = (alignment) => {
    editorRef.current?.focus();
    const command = `justify${alignment.charAt(0).toUpperCase() + alignment.slice(1)}`;
    execCommand(command);
  };

  // Quote insertion
  const insertQuote = () => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const blockquote = document.createElement('blockquote');
      
      // Style the blockquote
      blockquote.style.borderLeft = '4px solid #3b82f6';
      blockquote.style.paddingLeft = '1rem';
      blockquote.style.fontStyle = 'italic';
      blockquote.style.color = '#6b7280';
      blockquote.style.margin = '1rem 0';
      blockquote.style.backgroundColor = '#f8fafc';
      blockquote.style.padding = '1rem';
      blockquote.style.borderRadius = '0.375rem';
      
      const selectedText = range.toString();
      if (selectedText) {
        blockquote.textContent = selectedText;
        range.deleteContents();
      } else {
        blockquote.textContent = 'Quote text here...';
      }
      
      range.insertNode(blockquote);
      
      // Position cursor inside blockquote
      const newRange = document.createRange();
      newRange.setStart(blockquote, blockquote.childNodes.length);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    handleInput();
  };

  // Link insertion
  const insertLink = () => {
    editorRef.current?.focus();
    const url = prompt('Enter URL:');
    if (url) {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const link = document.createElement('a');
        link.href = url;
        link.style.color = '#3b82f6';
        link.style.textDecoration = 'underline';
        link.target = '_blank';
        
        const selectedText = range.toString();
        link.textContent = selectedText || url;
        
        range.deleteContents();
        range.insertNode(link);
      }
      handleInput();
    }
  };

  // Code block insertion
  const insertCode = () => {
    editorRef.current?.focus();
    const selection = window.getSelection();
    
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const code = document.createElement('code');
      
      code.style.backgroundColor = '#f1f5f9';
      code.style.padding = '0.25rem 0.5rem';
      code.style.borderRadius = '0.25rem';
      code.style.fontFamily = 'Monaco, Consolas, "Courier New", monospace';
      code.style.fontSize = '0.875rem';
      
      const selectedText = range.toString();
      code.textContent = selectedText || 'code';
      
      range.deleteContents();
      range.insertNode(code);
    }
    
    handleInput();
  };

  // Undo function
  const undo = () => {
    if (undoStack.length > 0 && editorRef.current) {
      const currentContent = editorRef.current.innerHTML;
      const previousState = undoStack[undoStack.length - 1];
      
      setRedoStack(prev => [currentContent, ...prev]);
      setUndoStack(prev => prev.slice(0, -1));
      
      editorRef.current.innerHTML = previousState;
      onContentChange(previousState);
    }
  };

  // Redo function
  const redo = () => {
    if (redoStack.length > 0 && editorRef.current) {
      const currentContent = editorRef.current.innerHTML;
      const nextState = redoStack[0];
      
      setUndoStack(prev => [...prev, currentContent]);
      setRedoStack(prev => prev.slice(1));
      
      editorRef.current.innerHTML = nextState;
      onContentChange(nextState);
    }
  };

  // Save function
  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  // Keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          formatText('bold');
          break;
        case 'i':
          e.preventDefault();
          formatText('italic');
          break;
        case 'u':
          e.preventDefault();
          formatText('underline');
          break;
        case 'z':
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
          break;
        case 's':
          e.preventDefault();
          handleSave();
          break;
        case 'k':
          e.preventDefault();
          insertLink();
          break;
        default:
          break;
      }
    }
    
    // Handle Enter key in lists
    if (e.key === 'Enter') {
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let currentNode = range.startContainer;
        
        // Find the list item
        while (currentNode && currentNode.tagName !== 'LI') {
          currentNode = currentNode.parentElement;
        }
        
        if (currentNode && currentNode.tagName === 'LI') {
          e.preventDefault();
          
          // Check if the current list item is empty
          const currentText = currentNode.textContent.trim();
          
          if (currentText === '' || currentText === 'List item') {
            // Empty list item - exit the list
            const list = currentNode.parentElement;
            const newP = document.createElement('p');
            newP.innerHTML = '<br>';
            newP.style.marginBottom = '1rem';
            
            // Insert paragraph after the list
            list.parentNode.insertBefore(newP, list.nextSibling);
            
            // Remove empty list item
            currentNode.remove();
            
            // If list is now empty, remove it
            if (list.children.length === 0) {
              list.remove();
            }
            
            // Move cursor to new paragraph
            const newRange = document.createRange();
            newRange.setStart(newP, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          } else {
            // Create new list item
            const newLi = document.createElement('li');
            newLi.style.marginBottom = '0.5rem';
            newLi.innerHTML = '<br>';
            
            // Insert after current list item
            currentNode.parentNode.insertBefore(newLi, currentNode.nextSibling);
            
            // Move cursor to new list item
            const newRange = document.createRange();
            newRange.setStart(newLi, 0);
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
          
          handleInput();
        }
      }
    }
  };

  // Handle selection changes with debounce
  const handleSelectionChange = () => {
    // Debounce selection changes to avoid excessive updates
    clearTimeout(window.selectionChangeTimeout);
    window.selectionChangeTimeout = setTimeout(() => {
      if (editorRef.current && document.activeElement === editorRef.current) {
        updateFormatState();
      }
    }, 100);
  };

  useEffect(() => {
    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  return (
    <div className="border border-gray-300 rounded-lg bg-white shadow-sm">
      {/* Toolbar */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-200 bg-white rounded-t-lg flex-wrap">
        {/* Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo size={16} />
          </button>
        </div>
        
        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        {/* Headings */}
        <div className="flex items-center gap-1">
          <select
            onChange={(e) => setHeading(e.target.value)}
            className="px-2 py-1 border rounded text-sm min-w-24"
            defaultValue=""
          >
            <option value="">Normal</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
            <option value="4">Heading 4</option>
          </select>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2" />
        
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => formatText('bold')}
            className={`p-2 rounded hover:bg-gray-100 ${currentFormat.bold ? 'bg-blue-100 text-blue-600' : ''}`}
            title="Bold (Ctrl+B)"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => formatText('italic')}
            className={`p-2 rounded hover:bg-gray-100 ${currentFormat.italic ? 'bg-blue-100 text-blue-600' : ''}`}
            title="Italic (Ctrl+I)"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => formatText('underline')}
            className={`p-2 rounded hover:bg-gray-100 ${currentFormat.underline ? 'bg-blue-100 text-blue-600' : ''}`}
            title="Underline (Ctrl+U)"
          >
            <Underline size={16} />
          </button>
          <button
            onClick={() => formatText('strikethrough')}
            className={`p-2 rounded hover:bg-gray-100 ${currentFormat.strikethrough ? 'bg-blue-100 text-blue-600' : ''}`}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => alignText('left')}
            className="p-2 rounded hover:bg-gray-100"
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => alignText('center')}
            className="p-2 rounded hover:bg-gray-100"
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => alignText('right')}
            className="p-2 rounded hover:bg-gray-100"
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2" />

        {/* Lists and Elements */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => insertList(false)}
            className="p-2 rounded hover:bg-gray-100"
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => insertList(true)}
            className="p-2 rounded hover:bg-gray-100"
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={insertQuote}
            className="p-2 rounded hover:bg-gray-100"
            title="Quote"
          >
            <Quote size={16} />
          </button>
          <button
            onClick={insertLink}
            className="p-2 rounded hover:bg-gray-100"
            title="Insert Link (Ctrl+K)"
          >
            <Link size={16} />
          </button>
          <button
            onClick={insertCode}
            className="p-2 rounded hover:bg-gray-100"
            title="Inline Code"
          >
            <Code size={16} />
          </button>
        </div>

        <div className="flex-1" />

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Save size={16} />
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          className="min-h-96 p-4 outline-none resize-none text-gray-900 leading-relaxed focus:ring-2 focus:ring-blue-500 focus:ring-inset"
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onMouseUp={(e) => {
            saveState();
            setTimeout(updateFormatState, 0);
          }}
          onKeyUp={() => {
            setTimeout(updateFormatState, 0);
          }}
          onClick={() => {
            setTimeout(updateFormatState, 0);
          }}
          onPaste={(e) => {
            // Handle paste events
            setTimeout(handleInput, 0);
          }}
          style={{ 
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word'
          }}
          suppressContentEditableWarning={true}
        />
        {(!editorRef.current?.innerHTML || editorRef.current?.innerHTML === '<br>' || editorRef.current?.innerHTML === '') && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none select-none">
            Start typing your content here... Use the toolbar above for formatting.
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-t border-gray-200 rounded-b-lg text-sm text-gray-600">
        <div className="flex items-center gap-4">
          <span>Rich Text Editor</span>
          <span>•</span>
          <span>Use Ctrl+B for bold, Ctrl+I for italic, Ctrl+U for underline</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs">Ready</span>
        </div>
      </div>
    </div>
  );
}