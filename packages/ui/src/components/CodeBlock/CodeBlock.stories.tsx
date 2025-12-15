import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock, InlineCode } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Editorial/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    showLineNumbers: {
      control: 'boolean',
    },
    showCopy: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleJS = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

greet('World');`;

const samplePython = `def analyze_data(dataset):
    """Analyze the given dataset and return insights."""
    results = []
    for item in dataset:
        if item.is_valid():
            results.append(item.process())
    return results`;

const sampleJSON = `{
  "name": "blog",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}`;

export const Default: Story = {
  args: {
    language: 'javascript',
    children: sampleJS,
  },
};

export const WithFilename: Story = {
  name: 'With Filename',
  args: {
    filename: 'greet.js',
    children: sampleJS,
  },
};

export const WithLineNumbers: Story = {
  name: 'With Line Numbers',
  args: {
    filename: 'analyze.py',
    showLineNumbers: true,
    children: samplePython,
  },
};

export const WithHighlightedLines: Story = {
  name: 'With Highlighted Lines',
  args: {
    filename: 'example.js',
    showLineNumbers: true,
    highlightLines: [2, 3],
    children: sampleJS,
  },
};

export const CustomStartLine: Story = {
  name: 'Custom Start Line',
  args: {
    filename: 'snippet.py',
    showLineNumbers: true,
    startLine: 45,
    children: samplePython,
  },
};

export const WithoutCopyButton: Story = {
  name: 'Without Copy Button',
  args: {
    language: 'json',
    showCopy: false,
    children: sampleJSON,
  },
};

export const AllLanguages: Story = {
  name: 'Various Languages',
  render: () => (
    <div className="space-y-6">
      <CodeBlock filename="app.js" showLineNumbers>
        {sampleJS}
      </CodeBlock>

      <CodeBlock filename="analyze.py" showLineNumbers>
        {samplePython}
      </CodeBlock>

      <CodeBlock filename="package.json">
        {sampleJSON}
      </CodeBlock>

      <CodeBlock filename="styles.css" showLineNumbers>
{`.article-header {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-text-primary);
}`}
      </CodeBlock>
    </div>
  ),
};

export const InArticle: Story = {
  name: 'In Article Context',
  render: () => (
    <article className="max-w-prose mx-auto space-y-4">
      <h1 className="text-h1 font-bold text-figure-primary">
        Getting Started with React
      </h1>
      <p className="text-body text-figure-primary">
        React is a JavaScript library for building user interfaces. Let's start
        with a simple example. First, we'll create a basic component:
      </p>

      <CodeBlock filename="Greeting.jsx" showLineNumbers>
{`import React from 'react';

function Greeting({ name }) {
  return (
    <div className="greeting">
      <h1>Hello, {name}!</h1>
      <p>Welcome to React.</p>
    </div>
  );
}

export default Greeting;`}
      </CodeBlock>

      <p className="text-body text-figure-primary">
        The <InlineCode>Greeting</InlineCode> component accepts a{' '}
        <InlineCode>name</InlineCode> prop and renders a personalized message.
        You can use it in your app like this:
      </p>

      <CodeBlock filename="App.jsx" showLineNumbers highlightLines={[4]}>
{`import Greeting from './Greeting';

function App() {
  return <Greeting name="World" />;
}

export default App;`}
      </CodeBlock>

      <p className="text-body text-figure-primary">
        Note how on line 4, we pass the <InlineCode>name</InlineCode> prop to
        our component. This is a fundamental pattern in React called "props"
        (short for properties).
      </p>
    </article>
  ),
};

export const InlineCodeStory: Story = {
  name: 'Inline Code',
  render: () => (
    <div className="max-w-prose space-y-4">
      <p className="text-body text-figure-primary">
        Use the <InlineCode>npm install</InlineCode> command to install
        dependencies. You can also use <InlineCode>yarn add</InlineCode> if
        you prefer Yarn as your package manager.
      </p>
      <p className="text-body text-figure-primary">
        The <InlineCode>useState</InlineCode> hook returns an array with two
        elements: the current state value and a function to update it. For
        example, <InlineCode>const [count, setCount] = useState(0)</InlineCode>.
      </p>
      <p className="text-body text-figure-primary">
        Common HTTP status codes include <InlineCode>200 OK</InlineCode>,{' '}
        <InlineCode>404 Not Found</InlineCode>, and{' '}
        <InlineCode>500 Internal Server Error</InlineCode>.
      </p>
    </div>
  ),
};

export const LongCode: Story = {
  name: 'Long Code Block',
  args: {
    filename: 'api.ts',
    showLineNumbers: true,
    children: `import { Request, Response } from 'express';
import { validateInput, sanitizeData } from './utils';
import { DatabaseConnection } from './database';

interface Article {
  id: string;
  title: string;
  content: string;
  author: string;
  publishedAt: Date;
  tags: string[];
}

export async function getArticles(req: Request, res: Response) {
  try {
    const { page = 1, limit = 10, category } = req.query;

    const db = await DatabaseConnection.getInstance();

    const query = category
      ? { category, status: 'published' }
      : { status: 'published' };

    const articles = await db.collection<Article>('articles')
      .find(query)
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ publishedAt: -1 })
      .toArray();

    const total = await db.collection('articles').countDocuments(query);

    return res.json({
      data: articles,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}`,
  },
};
