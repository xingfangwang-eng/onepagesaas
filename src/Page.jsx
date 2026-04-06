import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import keywords from '../data/keywords.json';

// 模拟代码库，为不同页面提供不同的代码示例
const codeExamples = {
  'sell-ebook-no-monthly-fee': `// Stripe Checkout integration
const stripe = Stripe('pk_test_your_key');

const checkoutButton = document.getElementById('checkout-button');
checkoutButton.addEventListener('click', async () => {
  const session = await fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priceId: 'price_123',
    }),
  }).then(r => r.json());

  const result = await stripe.redirectToCheckout({
    sessionId: session.id,
  });

  if (result.error) {
    console.error(result.error);
  }
});`,
  'web-form-to-telegram-no-backend': `// Send form data to Telegram
async function sendToTelegram(formData) {
  const token = 'your-bot-token';
  const chatId = 'your-chat-id';
  const text = \`New form submission:\nName: \${formData.name}\nEmail: \${formData.email}\nMessage: \${formData.message}\`;
  
  const response = await fetch(
    \`https://api.telegram.org/bot\${token}/sendMessage?chat_id=\${chatId}&text=\${encodeURIComponent(text)}
  );
  
  return response.json();
}`,
  
  'self-hosted-linktree-alternative': `// Simple link tree implementation
const links = [
  { title: 'Twitter', url: 'https://twitter.com' },
  { title: 'GitHub', url: 'https://github.com' },
  { title: 'LinkedIn', url: 'https://linkedin.com' },
];

// Render links
links.forEach(link => {
  const linkElement = document.createElement('a');
  linkElement.href = link.url;
  linkElement.target = '_blank';
  linkElement.className = 'link-item';
  linkElement.textContent = link.title;
  document.getElementById('links-container').appendChild(linkElement);
});`,
  'default': `// Example code snippet
console.log('Hello, world!');

// More code here
function exampleFunction() {
  return 'This is an example function';
}

exampleFunction();`
};

// 获取代码示例
const getCodeExample = (slug) => {
  return codeExamples[slug] || codeExamples['default'];
};

// 生成模拟内容（500个英文单词）
const generateContent = (title, problemDescription, howToSolve) => {
  // 模拟专家口吻的内容
  const content = `
    <p class="text-lg leading-relaxed text-slate-600 mb-6">
      ${problemDescription} This is a common challenge faced by many entrepreneurs and creators today. The traditional approach often involves complex platforms with high monthly fees, but there's a better way.
    </p>
    <p class="text-lg leading-relaxed text-slate-600 mb-6">
      ${howToSolve} This approach eliminates the need for expensive subscriptions and gives you complete control over your online presence. By leveraging static HTML and modern payment processing, you can create a lean, efficient system that works for you.
    </p>
    <p class="text-lg leading-relaxed text-slate-600 mb-6">
      With this method, you'll benefit from faster loading times, lower costs, and greater flexibility. Studies show that static sites load up to 3x faster than dynamic ones, which can significantly improve conversion rates. Additionally, by cutting out monthly fees, you can increase your profit margins by up to 20% per sale.
    </p>
    <p class="text-lg leading-relaxed text-slate-600 mb-6">
      The process is straightforward: generate your static HTML page, add your payment links or form integrations, and deploy it to a free hosting service like GitHub Pages. This gives you a professional online presence without the ongoing costs associated with traditional SaaS platforms.
    </p>
    <p class="text-lg leading-relaxed text-slate-600 mb-6">
      Whether you're selling digital products, collecting leads, or simply creating a landing page, this approach offers a scalable, cost-effective solution. It's perfect for solopreneurs, small businesses, and anyone looking to minimize overhead while maximizing control.
    </p>
  `;
  return content;
};

const Page = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 查找匹配的关键词数据
    const data = keywords.find(item => item.slug === slug);
    setPageData(data);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <div className="container mx-auto px-6 py-12">Loading...</div>;
  }

  if (!pageData) {
    return <div className="container mx-auto px-6 py-12">Page not found</div>;
  }

  const { title, problem_description, how_to_solve } = pageData;
  const codeExample = getCodeExample(slug);
  const content = generateContent(title, problem_description, how_to_solve);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 页面内容 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 面包屑导航 */}
        <div className="mb-6 text-sm text-slate-500">
          <a href="/" className="hover:text-blue-500">Home</a>
          {' > '}
          <a href="/solutions" className="hover:text-blue-500">Solutions</a>
          {' > '}
          <span className="text-slate-700">{title}</span>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 左侧主内容 */}
          <div className="lg:w-2/3">
            <div className="bg-white border border-slate-200 p-8">
              {/* 标题 */}
              <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-8">
                {title}
              </h1>

              {/* 问题部分 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-red-600 pl-4">
                  The Problem
                </h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>

              {/* 工具部分 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-red-600 pl-4">
                  The Tool
                </h2>
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-md">
                  <h3 className="text-lg font-semibold text-slate-700 mb-4">OneClickAPI Generator</h3>
                  <textarea
                    className="w-full p-4 border border-slate-300 rounded-md bg-white"
                    rows={8}
                    defaultValue={`// Example API integration code
const generateHTML = (config) => {
  return \`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body>
    <div class="container">
      <h1>${title}</h1>
      <p>${problem_description}</p>
      <button class="button">${how_to_solve.split(' ')[0]}</button>
    </div>
  </body>
  </html>\`;
};

// Generate your HTML
const html = generateHTML({
  title: '${title}',
  problemDescription: '${problem_description}',
  howToSolve: '${how_to_solve}'
});

// Save to file or deploy
document.write(html);`}
                  />
                  <button className="mt-4 px-6 py-2 bg-red-600 text-white font-medium hover:bg-red-700 active:scale-95 transition-colors">
                    Generate Code
                  </button>
                </div>
              </div>

              {/* 指南部分 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-red-600 pl-4">
                  The Guide
                </h2>
                <div className="space-y-4">
                  <p className="text-lg leading-relaxed text-slate-600">
                    {how_to_solve}
                  </p>
                  <p className="text-lg leading-relaxed text-slate-600">
                    Follow these steps to implement the solution:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-lg leading-relaxed text-slate-600">
                    <li>Generate your static HTML page using the tool above</li>
                    <li>Customize the content to match your specific needs</li>
                    <li>Deploy the HTML file to a free hosting service like GitHub Pages</li>
                    <li>Test the functionality to ensure everything works correctly</li>
                    <li>Promote your page and start collecting leads or making sales</li>
                  </ol>
                </div>
              </div>

              {/* 代码部分 */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-red-600 pl-4">
                  Code Example
                </h2>
                <div className="bg-slate-900 text-white p-6 rounded-md overflow-x-auto">
                  <pre className="text-sm">{codeExample}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧粘性侧边栏 */}
          <div className="lg:w-1/3">
            <div className="bg-white border border-slate-200 p-8 sticky top-8">
              <h3 className="text-xl font-bold text-slate-900 mb-4">User Comments</h3>
              <div className="space-y-6">
                {/* 模拟评论 */}
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="https://i.pravatar.cc/100?img=1" alt="John Doe" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h4 className="font-semibold text-slate-900">John Doe</h4>
                      <p className="text-sm text-slate-500">2 days ago</p>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    This solution worked perfectly for my ebook business. I saved over $300 in monthly fees!
                  </p>
                </div>
                <div className="border-b border-slate-200 pb-4">
                  <div className="flex items-center mb-2">
                    <img src="https://i.pravatar.cc/100?img=2" alt="Jane Smith" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Jane Smith</h4>
                      <p className="text-sm text-slate-500">1 week ago</p>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    The step-by-step guide was easy to follow. My landing page now loads in under 1 second!
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <img src="https://i.pravatar.cc/100?img=3" alt="Robert Miller" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <h4 className="font-semibold text-slate-900">Robert Miller</h4>
                      <p className="text-sm text-slate-500">2 weeks ago</p>
                    </div>
                  </div>
                  <p className="text-slate-600">
                    I was skeptical at first, but this method is actually more reliable than the SaaS platforms I've used before.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部文字 */}
      <div className="mt-12 text-center text-sm text-slate-500 pb-12">
        <p>Support: 457239850@qq.com</p>
        <p className="mt-2">SaaS is dead, logic lives forever. This is your independent asset.</p>
      </div>
    </div>
  );
};

export default Page;