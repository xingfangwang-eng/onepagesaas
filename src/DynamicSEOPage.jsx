import React, { useState, useEffect } from 'react'
import { CreditCard, Wallet, Banknote, CheckCircle, ChevronDown, ArrowRight, Star, Award, Zap, Shield } from 'lucide-react'
import keywordsData from '../data/keywords.json'

// Meta 标签模板
const metaTemplates = [
  // 行动导向型
  {
    title: (data) => `${data.title} - Start Today and Grow Your Business`,
    description: (data) => `Discover how ${data.title.toLowerCase()}. Take action now and transform your online presence with our simple, effective solution.`
  },
  // 问题解决型
  {
    title: (data) => `Solve Your Problems with ${data.title}`,
    description: (data) => `Struggling with ${data.problem_description.toLowerCase()}? Our solution will help you ${data.how_to_solve.toLowerCase()}.`
  },
  // 结果展示型
  {
    title: (data) => `${data.title} - Get Results Fast`,
    description: (data) => `Achieve your goals with ${data.title.toLowerCase()}. See real results and grow your business today.`
  }
]

// 生成动态 Schema.org JSON-LD
const generateSchema = (data) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    name: data.title,
    description: data.problem_description
  }

  switch (data.schema_type) {
    case 'Product':
      return {
        ...baseSchema,
        '@type': 'Product',
        brand: 'OnePageSaaS',
        offers: {
          '@type': 'Offer',
          price: '0.00',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock'
        }
      }
    case 'Service':
      return {
        ...baseSchema,
        '@type': 'Service',
        provider: {
          '@type': 'Organization',
          name: 'OnePageSaaS',
          url: 'https://onepagesaas.run'
        }
      }
    case 'SoftwareApplication':
      return {
        ...baseSchema,
        '@type': 'SoftwareApplication',
        applicationCategory: 'WebApplication',
        operatingSystem: 'Any',
        provider: {
          '@type': 'Organization',
          name: 'OnePageSaaS',
          url: 'https://onepagesaas.run'
        }
      }
    default:
      return {
        ...baseSchema,
        '@type': 'WebPage'
      }
  }
}

// 生成内部链接
const generateInternalLinks = (currentSlug, count = 3) => {
  const filteredKeywords = keywordsData.filter(keyword => keyword.slug !== currentSlug)
  const shuffledKeywords = shuffleArray(filteredKeywords)
  return shuffledKeywords.slice(0, count)
}

// Fisher-Yates 算法实现
const shuffleArray = (array) => {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// 生成随机 ID
const generateRandomId = () => {
  return Math.random().toString(36).substring(2, 10)
}

// 动态主题系统 - 5 组不同的 Tailwind 配置
const themes = [
  {
    name: 'theme-1',
    colors: 'bg-white text-gray-900',
    rounded: 'rounded-lg',
    border: 'border border-gray-200',
    font: 'font-sans'
  },
  {
    name: 'theme-2',
    colors: 'bg-gray-50 text-gray-800',
    rounded: 'rounded-md',
    border: 'border-2 border-gray-300',
    font: 'font-serif'
  },
  {
    name: 'theme-3',
    colors: 'bg-gray-100 text-gray-700',
    rounded: 'rounded-xl',
    border: 'border border-gray-300',
    font: 'font-mono'
  },
  {
    name: 'theme-4',
    colors: 'bg-white text-gray-800',
    rounded: 'rounded-sm',
    border: 'border-2 border-gray-200',
    font: 'font-sans'
  },
  {
    name: 'theme-5',
    colors: 'bg-gray-50 text-gray-900',
    rounded: 'rounded-full',
    border: 'border border-gray-200',
    font: 'font-serif'
  }
]

// 动态图标库
const iconMap = {
  payment: [CreditCard, Wallet, Banknote],
  success: [CheckCircle, Star, Award],
  action: [ChevronDown, ArrowRight, Zap],
  security: [Shield, CheckCircle, Star]
}

// 获取随机图标
const getRandomIcon = (category) => {
  const icons = iconMap[category] || iconMap.action
  const IconComponent = icons[Math.floor(Math.random() * icons.length)]
  return <IconComponent key={generateRandomId()} size={20} />
}

// 随机生成 HTML 标签
const getRandomTag = (content, tagOptions = ['div', 'section', 'article']) => {
  const tag = tagOptions[Math.floor(Math.random() * tagOptions.length)]
  return React.createElement(tag, { key: generateRandomId(), 'data-v': generateRandomId() }, content)
}

// 随机生成标题标签
const getRandomHeading = (content, tagOptions = ['h1', 'h2', 'h3']) => {
  const tag = tagOptions[Math.floor(Math.random() * tagOptions.length)]
  return React.createElement(tag, { key: generateRandomId(), 'data-v': generateRandomId() }, content)
}

// 核心区块组件
const Hero = ({ data, theme }) => {
  return getRandomTag(
    <div className={`hero-section ${theme.colors} ${theme.rounded} ${theme.border} ${theme.font} p-8 mb-8`} data-v={generateRandomId()}>
      {getRandomHeading(data.title, ['h1', 'h2'])}
      <p className="text-lg mt-4">{data.problem_description}</p>
      <div className="mt-6">
        {getRandomIcon('action')}
      </div>
    </div>
  )
}

const Problem = ({ data, theme }) => {
  return getRandomTag(
    <div className={`problem-section ${theme.colors} ${theme.rounded} ${theme.border} ${theme.font} p-8 mb-8`} data-v={generateRandomId()}>
      {getRandomHeading('Problem', ['h2', 'h3'])}
      <p className="mt-4">{data.problem_description}</p>
      <div className="mt-4">
        {getRandomIcon('action')}
      </div>
    </div>
  )
}

const Solution = ({ data, theme }) => {
  return getRandomTag(
    <div className={`solution-section ${theme.colors} ${theme.rounded} ${theme.border} ${theme.font} p-8 mb-8`} data-v={generateRandomId()}>
      {getRandomHeading('Solution', ['h2', 'h3'])}
      <p className="mt-4">{data.how_to_solve}</p>
      <div className="mt-4">
        {getRandomIcon('success')}
      </div>
    </div>
  )
}

const FAQ = ({ data, theme }) => {
  if (!data.faqs || data.faqs.length === 0) return null
  
  return getRandomTag(
    <div className={`faq-section ${theme.colors} ${theme.rounded} ${theme.border} ${theme.font} p-8 mb-8`} data-v={generateRandomId()}>
      {getRandomHeading('FAQ', ['h2', 'h3'])}
      <div className="faq-list mt-4">
        {data.faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${theme.rounded} ${theme.border} p-4 mb-4`} data-v={generateRandomId()}>
            {getRandomHeading(faq.question, ['h3', 'h4'])}
            <p className="mt-2">{faq.answer}</p>
            <div className="mt-2">
              {getRandomIcon('action')}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const FeatureList = ({ data, theme }) => {
  if (!data.features_pool || data.features_pool.length === 0) return null
  
  // 随机选择 3 个功能点
  const randomFeatures = shuffleArray(data.features_pool).slice(0, 3)
  
  return getRandomTag(
    <div className={`feature-list-section ${theme.colors} ${theme.rounded} ${theme.border} ${theme.font} p-8 mb-8`} data-v={generateRandomId()}>
      {getRandomHeading('Features', ['h2', 'h3'])}
      <ul className="space-y-4 mt-4">
        {randomFeatures.map((feature, index) => (
          <li key={index} className={`flex items-center ${theme.rounded} ${theme.border} p-3`} data-v={generateRandomId()}>
            <span className="mr-3">{getRandomIcon('success')}</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

const DynamicSEOPage = ({ data }) => {
  const [blocks, setBlocks] = useState([])
  const [theme, setTheme] = useState(themes[0])
  const [metaData, setMetaData] = useState({ title: '', description: '' })
  const [schemaData, setSchemaData] = useState({})
  const [internalLinks, setInternalLinks] = useState([])

  useEffect(() => {
    // 随机选择一个主题
    const randomTheme = themes[Math.floor(Math.random() * themes.length)]
    setTheme(randomTheme)

    // 随机选择一个 Meta 标签模板
    const randomMetaTemplate = metaTemplates[Math.floor(Math.random() * metaTemplates.length)]
    const title = randomMetaTemplate.title(data)
    const description = randomMetaTemplate.description(data)
    setMetaData({ title, description })

    // 生成 Schema.org 数据
    const schema = generateSchema(data)
    setSchemaData(schema)

    // 生成内部链接
    const links = generateInternalLinks(data.slug || 'current-page')
    setInternalLinks(links)

    // 定义核心区块
    const coreBlocks = [
      { name: 'Hero', component: Hero, shouldRender: true },
      { name: 'Problem', component: Problem, shouldRender: Math.random() > 0.1 }, // 90% 概率显示
      { name: 'Solution', component: Solution, shouldRender: Math.random() > 0.1 }, // 90% 概率显示
      { name: 'FAQ', component: FAQ, shouldRender: Math.random() > 0.3 }, // 70% 概率显示（30% 不显示）
      { name: 'FeatureList', component: FeatureList, shouldRender: Math.random() > 0.1 } // 90% 概率显示
    ]

    // 过滤掉不应该渲染的区块
    const filteredBlocks = coreBlocks.filter(block => block.shouldRender)

    // 使用 Fisher-Yates 算法随机打乱区块顺序
    let shuffledBlocks = shuffleArray(filteredBlocks)

    // 20% 的概率将 Hero 区块放在最底部
    if (Math.random() < 0.2 && shuffledBlocks.some(block => block.name === 'Hero')) {
      shuffledBlocks = shuffledBlocks.filter(block => block.name !== 'Hero')
      shuffledBlocks.push(coreBlocks.find(block => block.name === 'Hero'))
    }

    setBlocks(shuffledBlocks)
  }, [data])

  // 渲染 Meta 标签（实际项目中应该在头部渲染）
  const renderMetaTags = () => {
    return (
      <div className="hidden">
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </div>
    )
  }

  // 渲染内部链接网格
  const renderInternalLinks = () => {
    return (
      <div className={`internal-links ${theme.colors} ${theme.rounded} ${theme.border} ${theme.font} p-8 mb-8`} data-v={generateRandomId()}>
        {getRandomHeading('Related Resources', ['h2', 'h3'])}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {internalLinks.map((link, index) => (
            <a 
              key={index} 
              href={`/solutions/${link.slug}`} 
              className={`block ${theme.rounded} ${theme.border} p-4 hover:bg-gray-100 transition-colors`} 
              data-v={generateRandomId()}
            >
              {link.title}
            </a>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`dynamic-seo-page ${theme.colors} ${theme.font}`} data-style-hint={data.style_hint} data-theme={theme.name} data-v={generateRandomId()}>
      {renderMetaTags()}
      <div className="container mx-auto px-4 py-8">
        {blocks.map((block, index) => {
          const BlockComponent = block.component
          return <BlockComponent key={index} data={data} theme={theme} />
        })}
        {renderInternalLinks()}
      </div>
    </div>
  )
}

export default DynamicSEOPage
