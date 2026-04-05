import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, ChevronDown, ExternalLink } from 'lucide-react'

// 导入关键词数据
import keywordsData from '../data/keywords.json'

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

const SolutionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [categories, setCategories] = useState({})
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    const categorized = categorizeKeywords(keywordsData)
    setCategories(categorized)
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
      {/* 顶部搜索栏 */}
      <div className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search solutions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-4">
            OnePageSaaS Solutions
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            A collection of 100+ solutions for creating static websites without SaaS platforms. 
            Find the perfect template for your business needs.
          </p>
        </div>

        {/* 搜索结果 */}
        {searchTerm && filteredItems.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-1 h-6 bg-blue-500 mr-3"></div>
              Search Results ({filteredItems.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <article key={item.slug} className="bg-white border border-slate-200 p-8 rounded-md hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    <Link to={`/solutions/${item.slug}`} className="hover:text-blue-500 transition-colors">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {item.problem_description}
                  </p>
                  <Link 
                    to={`/solutions/${item.slug}`} 
                    className="inline-flex items-center text-blue-500 hover:underline"
                  >
                    View Solution
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 分类内容 */}
        {!searchTerm && Object.entries(categories).map(([category, items]) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <div className="w-1 h-6 bg-blue-500 mr-3"></div>
              {category} ({items.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <article key={item.slug} className="bg-white border border-slate-200 p-8 rounded-md hover:border-blue-500 transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    <Link to={`/solutions/${item.slug}`} className="hover:text-blue-500 transition-colors">
                      {item.title}
                    </Link>
                  </h3>
                  <p className="text-slate-600 mb-4 line-clamp-2">
                    {item.problem_description}
                  </p>
                  <Link 
                    to={`/solutions/${item.slug}`} 
                    className="inline-flex items-center text-blue-500 hover:underline"
                  >
                    View Solution
                    <ExternalLink className="w-4 h-4 ml-1" />
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