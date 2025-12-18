import { useRef, useState } from 'react';
import { MarkdownCMD, ConfigProvider } from 'ds-markdown';
import type { MarkdownCMDRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import en from 'ds-markdown/i18n/en';
const App: React.FC<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}> = ({ theme, setTheme }) => {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [mathOpen, setMathOpen] = useState(true);

  // Simulate AI streaming response
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // Thinking stage
    markdownRef.current?.push('🤔 Analyzing your question...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ Analysis complete, starting to answer', 'thinking');

    // 流式回答
    const chunks = [
      '# React 19 New Features Explained\n\n',
      '## 🚀 React Compiler\n',
      'The biggest highlight of React 19 is the introduction of **React Compiler**:\n\n',
      '- 🎯 **Automatic optimization**: no need for manual memo and useMemo\n',
      '- ⚡ **Performance boost**: compile-time optimization with zero runtime overhead\n',
      '- 🔧 **Backward compatibility**: no changes required for existing code\n\n',
      '## 📝 Actions simplify forms\n',
      'The new Actions API makes form handling much simpler:\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>Submit</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      'Hope this answer is helpful to you! 🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <ConfigProvider locale={en}>
    <div className="chat-container">
      <div className="ds-message-actions">
        <button onClick={simulateAIResponse}>🤖 Ask about React 19 new features</button>

        <button
          className="theme-btn"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </button>
        <button className="theme-btn" onClick={() => setMathOpen(!mathOpen)}>
          {mathOpen ? 'Disable' : 'Enable'} formula rendering
        </button>
        <button
          className="theme-btn"
          onClick={() => markdownRef.current?.stop()}
        >
          Pause
        </button>

        <button
          className="theme-btn"
          onClick={() => markdownRef.current?.resume()}
        >
          Resume
        </button>
      </div>
      <div className="ds-message-box">
        <div className="ds-message-list">
          <MarkdownCMD
            ref={markdownRef}
            interval={10}
            plugins={mathOpen ? [katexPlugin] : []}
            theme={theme}
            timerType="requestAnimationFrame"
            onEnd={(data) => console.log('Paragraph finished:', data)}
          />
        </div>
      </div>
    </div>
    </ConfigProvider>
  );
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default App;
