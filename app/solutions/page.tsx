import { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Search, ChevronDown, ExternalLink } from 'lucide-react'

// 导入关键词数据
import keywordsData from '../../data/keywords.json'

// 智能分类逻辑
const categorizeKeywords = (keywords) => {
  const categories = {
    'Digital Products': ['ebook', 'pdf', 'digital', 'download'],
    'Payment Solutions': ['stripe', 'payment', 'pay', 'buy'],
    'Lead Generation': ['lead', 'form', 'contact', 'collect'],
    'Portfolio & Marketing': ['portfolio', 'website', 'landing', 'page'],
    'Services & Business': ['business', 'service', 'consult', 'coach']
  }

  const categorized = {}
  Object.keys(categories).forEach(category => {
    categorized[category] = []
  })

  keywords.forEach(item => {
    let assigned = false
    Object.entries(categories).forEach(([category, keywords]) => {
      if (!assigned && keywords.some(keyword => 
        item.keyword.toLowerCase().includes(keyword) || 
        item.title.toLowerCase().includes(keyword)
      )) {
        categorized[category].push(item)
        assigned = true
      }
    })
    if (!assigned) {
      // 如果没有匹配的分类，放入最后一个分类
      const lastCategory = Object.keys(categories)[Object.keys(categories).length - 1]
      categorized[lastCategory].push(item)
    }
  })

  return categorized
}

// 生成 JSON-LD Schema
const generateSchema = (categories) => {
  const items = []
  let position = 1

  Object.values(categories).forEach(category => {
    category.forEach(item => {
      items.push({
        '@type': 'ListItem',
        position: position++,
        name: item.title,
        url: `https://onepagesaas.run/solutions/${item.slug}`
      })
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'OnePageSaaS Solutions',
    description: 'A collection of 100+ solutions for creating static websites without SaaS platforms',
    itemListElement: items
  }
}

const SolutionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState({})
  const [filteredItems, setFilteredItems] = useState([])
  const [schemaData, setSchemaData] = useState({})

  useEffect(() => {
    const categorized = categorizeKeywords(keywordsData)
    setCategories(categorized)
    setSchemaData(generateSchema(categorized))
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = keywordsData.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.keyword.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.problem_description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredItems(filtered)
    } else {
      setFilteredItems([])
    }
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        {/* JSON-LD Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      </Head>

      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search 100+ solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 标题 */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">
            OnePageSaaS Solutions
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            100+ static website solutions to grow your business without monthly fees
          </p>
        </div>

        {/* 分类导航 */}
        <nav className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
            Categories
          </h2>
          <div className="flex flex-wrap gap-4">
            {Object.keys(categories).map((category) => (
              <Link
                key={category}
                href={`#${category.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-white border border-slate-200 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </nav>

        {/* 搜索结果 */}
        {searchTerm && filteredItems.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 border-l-4 border-blue-600 pl-4">
              Search Results ({filteredItems.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article key={item.slug} className="bg-white border border-slate-200 p-8 hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    <Link href={`/solutions/${item.slug}`} className="hover:text-blue-600 transition-colors">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {item.problem_description}
                  </p>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    View Solution <ExternalLink className="ml-1 w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 分类内容 */}
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} id={category.toLowerCase().replace(/\s+/g, '-')} className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-l-4 border-blue-600 pl-4">
              {category} ({items.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <article key={item.slug} className="bg-white border border-slate-200 p-8 hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    <Link href={`/solutions/${item.slug}`} className="hover:text-blue-600 transition-colors">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {item.problem_description}
                  </p>
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    View Solution <ExternalLink className="ml-1 w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}

        {/* 底部信息 */}
        <div className="mt-16 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-500">
            SaaS is dead, logic lives forever. This is your independent asset.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SolutionsPage
