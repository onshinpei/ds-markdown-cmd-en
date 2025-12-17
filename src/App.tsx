import { useRef, useState } from 'react';
import { MarkdownCMD } from 'ds-markdown';
import type { MarkdownCMDRef } from 'ds-markdown';
import { katexPlugin } from 'ds-markdown/plugins';
import 'ds-markdown/style.css';
const App: React.FC<{
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}> = ({ theme, setTheme }) => {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [mathOpen, setMathOpen] = useState(true);

  // 模拟 AI 流式响应
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 思考阶段
    markdownRef.current?.push('🤔 正在分析您的问题...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 分析完成，开始回答', 'thinking');

    // 流式回答
    const chunks = [
      '# React 19 新特性解析\n\n',
      '## 🚀 React Compiler\n',
      'React 19 最大的亮点是引入了 **React Compiler**：\n\n',
      '- 🎯 **自动优化**：无需手动 memo 和 useMemo\n',
      '- ⚡ **性能提升**：编译时优化，运行时零开销\n',
      '- 🔧 **向后兼容**：现有代码无需修改\n\n',
      '## 📝 Actions 简化表单\n',
      '新的 Actions API 让表单处理变得更简单：\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>提交</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      '希望这个解答对您有帮助！🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <div className="ds-message-actions">
        <button onClick={simulateAIResponse}>🤖 询问 React 19 新特性</button>

        <button
          className="theme-btn"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          切换为{theme === 'light' ? '暗色' : '亮色'}
        </button>
        <button className="theme-btn" onClick={() => setMathOpen(!mathOpen)}>
          {mathOpen ? '关闭' : '开启'}公式转换
        </button>
        <button
          className="theme-btn"
          onClick={() => markdownRef.current.stop()}
        >
          暂停
        </button>

        <button
          className="theme-btn"
          onClick={() => markdownRef.current.resume()}
        >
          继续
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
            onEnd={(data) => console.log('段落完成:', data)}
          />
        </div>
      </div>
    </div>
  );
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
export default App;
