import React, { useState } from 'react';
import styles from '../styles/MarkdownEditor.module.css';

interface MarkdownEditorProps {
  initialValue?: string;
  onChange: (value: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ initialValue = '', onChange }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div className={styles.editorContainer}>
      <textarea
        className={styles.editor}
        value={value}
        onChange={handleChange}
        placeholder="マークダウンを入力してください..."
      />
    </div>
  );
};

export default MarkdownEditor;
