import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { generateHTML } from './generator'
import { generateWorkerScript } from './workerGenerator'
import Page from '../app/[slug]/page'
import SolutionsPage from './SolutionsPage'

function App() {
  // Tab state
  const [activeTab, setActiveTab] = useState('basic')
  
  // Preview HTML state
  const [previewHTML, setPreviewHTML] = useState('')

  // Basic configuration state
  const [config, setConfig] = useState({
    siteTitle: 'OnePageSaaS',
    productDescription: 'Quickly build your SaaS website',
    buttonText: 'Get started',
    primaryColor: '#6366f1',
    stripeLink: '',
    enableTelegram: false,
    telegramBotToken: '',
    telegramChatId: '',
    workerApiEndpoint: ''
  })

  // Business templates
  const templates = [
    {
      name: 'Ebook Sales Page',
      config: {
        siteTitle: 'Ebook Title',
        productDescription: 'Download our comprehensive ebook and learn how to grow your business.',
        buttonText: 'Buy Now',
        primaryColor: '#8b5cf6',
        stripeLink: 'https://buy.stripe.com/...',
        enableTelegram: false,
        telegramBotToken: '',
        telegramChatId: '',
        workerApiEndpoint: ''
      }
    },
    {
      name: 'Lead Collection Page',
      config: {
        siteTitle: 'Get Free Resources',
        productDescription: 'Enter your email to receive our free guide and exclusive updates.',
        buttonText: 'Subscribe',
        primaryColor: '#3b82f6',
        stripeLink: '',
        enableTelegram: false,
        telegramBotToken: '',
        telegramChatId: '',
        workerApiEndpoint: ''
      }
    },
    {
      name: 'Paid Community Page',
      config: {
        siteTitle: 'Join Our Community',
        productDescription: 'Become a member of our exclusive community and get access to premium content.',
        buttonText: 'Join Now',
        primaryColor: '#10b981',
        stripeLink: 'https://buy.stripe.com/...',
        enableTelegram: false,
        telegramBotToken: '',
        telegramChatId: '',
        workerApiEndpoint: ''
      }
    }
  ]

  // Handle configuration changes
  const handleConfigChange = (e) => {
    const { name, value, type, checked } = e.target
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Apply template
  const applyTemplate = (templateConfig) => {
    setConfig(templateConfig)
  }

  // Generate and copy HTML
  const handleGenerateHTML = () => {
    const html = generateHTML(config)
    navigator.clipboard.writeText(html)
      .then(() => alert('HTML copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err))
  }

  // Download HTML file
  const handleDownloadHTML = () => {
    const html = generateHTML(config)
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // Generate and copy Worker script
  const handleGenerateWorker = () => {
    const workerScript = generateWorkerScript(config)
    navigator.clipboard.writeText(workerScript)
      .then(() => alert('Worker script copied to clipboard!'))
      .catch(err => console.error('Failed to copy:', err))
  }

  // Update preview HTML when config changes
  useEffect(() => {
    const html = generateHTML(config)
    setPreviewHTML(html)
  }, [config])

  return (
    <Router>
      <Routes>
        {/* 动态路由 */}
        <Route path="/:slug" element={<Page />} />
        {/* 主页 */}
        <Route path="/" element={
          <div className="min-h-screen bg-gray-50">
            {/* Background grid gradient effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 opacity-50"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
            
            {/* Main container */}
            <div className="relative max-w-[1200px] mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-8">OnePageSaaS</h1>
              
              {/* Layout */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left configuration area */}
                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6">
                    {/* Tabs */}
                    <div className="flex border-b border-slate-200 mb-4">
                      <button
                        onClick={() => setActiveTab('basic')}
                        className={`px-4 py-2 font-medium text-sm transition-colors ${
                          activeTab === 'basic'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        Basic Config
                      </button>
                      <button
                        onClick={() => setActiveTab('backend')}
                        className={`px-4 py-2 font-medium text-sm transition-colors ${
                          activeTab === 'backend'
                            ? 'text-primary border-b-2 border-primary'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                      >
                        Backend Logic
                      </button>
                    </div>
                    
                    {/* Basic Configuration Tab */}
                    {activeTab === 'basic' && (
                      <div className="space-y-4">
                        {/* Business Templates */}
                        <div className="pt-2 mb-4">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2">Business Templates</h3>
                          <div className="grid grid-cols-1 gap-2">
                            {templates.map((template, index) => (
                              <button
                                key={index}
                                onClick={() => applyTemplate(template.config)}
                                className="px-3 py-2 text-xs bg-slate-50 hover:bg-slate-100 rounded-md text-slate-700 transition-colors"
                              >
                                {template.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Site Title</label>
                          <input
                            type="text"
                            name="siteTitle"
                            value={config.siteTitle}
                            onChange={handleConfigChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Product Description</label>
                          <textarea
                            name="productDescription"
                            value={config.productDescription}
                            onChange={handleConfigChange}
                            rows={3}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Button Text</label>
                          <input
                            type="text"
                            name="buttonText"
                            value={config.buttonText}
                            onChange={handleConfigChange}
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Primary Color</label>
                          <input
                            type="color"
                            name="primaryColor"
                            value={config.primaryColor}
                            onChange={handleConfigChange}
                            className="w-full h-10 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        
                        {/* Payment Module */}
                        <div className="pt-4 border-t border-slate-200">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2">Payment Module</h3>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Stripe Payment Link</label>
                            <input
                              type="url"
                              name="stripeLink"
                              value={config.stripeLink}
                              onChange={handleConfigChange}
                              placeholder="https://buy.stripe.com/..."
                              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>
                        </div>
                        
                        {/* Data Collection Module */}
                        <div className="pt-4 border-t border-slate-200">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2">Data Collection Module</h3>
                          <div className="flex items-center mb-2">
                            <input
                              type="checkbox"
                              name="enableTelegram"
                              checked={config.enableTelegram}
                              onChange={handleConfigChange}
                              className="mr-2 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                            />
                            <label className="text-sm font-medium text-slate-700">Enable Telegram Notifications</label>
                          </div>
                          
                          {config.enableTelegram && (
                            <div className="space-y-2 pl-6">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Telegram Bot Token</label>
                                <input
                                  type="text"
                                  name="telegramBotToken"
                                  value={config.telegramBotToken}
                                  onChange={handleConfigChange}
                                  placeholder="e.g., 123456789:ABCdefGhIJKlmNoPQRstUVwXYz"
                                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Telegram Chat ID</label>
                                <input
                                  type="text"
                                  name="telegramChatId"
                                  value={config.telegramChatId}
                                  onChange={handleConfigChange}
                                  placeholder="e.g., 123456789"
                                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Generate HTML Button */}
                        <div className="pt-4 border-t border-slate-200 space-y-2">
                          <button
                            onClick={handleGenerateHTML}
                            className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                          >
                            Copy HTML
                          </button>
                          <button
                            onClick={handleDownloadHTML}
                            className="w-full px-4 py-2 bg-slate-600 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                          >
                            Download HTML File
                          </button>
                        </div>
                      </div>
                    )}
                    
                    {/* Backend Logic Tab */}
                    {activeTab === 'backend' && (
                      <div className="space-y-4">
                        <div className="bg-slate-50 rounded-lg p-4 mb-4">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2">Cloudflare Worker Script Generator</h3>
                          <p className="text-xs text-slate-500 mb-3">
                            Generate a Cloudflare Worker script that receives requests from your HTML and stores data to CF KV.
                          </p>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-1">Worker API Endpoint</label>
                          <input
                            type="url"
                            name="workerApiEndpoint"
                            value={config.workerApiEndpoint}
                            onChange={handleConfigChange}
                            placeholder="https://your-worker.your-subdomain.workers.dev"
                            className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                          <p className="text-xs text-slate-500 mt-1">This will be used in your HTML to send data to the worker.</p>
                        </div>
                        
                        {/* Generate Worker Script Button */}
                        <div className="pt-4 border-t border-slate-200">
                          <button
                            onClick={handleGenerateWorker}
                            className="w-full px-4 py-2 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                          >
                            Generate Worker Script
                          </button>
                        </div>
                        
                        {/* Deployment Guide */}
                        <div className="pt-4 border-t border-slate-200">
                          <h3 className="text-sm font-semibold text-slate-900 mb-2">3-Step Deployment Guide</h3>
                          <div className="space-y-2 text-xs text-slate-600">
                            <div className="flex items-start">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-xs">1</span>
                              <p>Create a KV namespace in Cloudflare Dashboard and bind it to your worker.</p>
                            </div>
                            <div className="flex items-start">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-xs">2</span>
                              <p>Create a new Worker and paste the generated script, then deploy it.</p>
                            </div>
                            <div className="flex items-start">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center mr-2 text-xs">3</span>
                              <p>Copy the worker URL and paste it in the "Worker API Endpoint" field above.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right preview area */}
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 min-h-[600px]">
                    <h2 className="text-lg font-semibold text-slate-900 mb-4">Preview</h2>
                    <div className="border border-slate-200 rounded-lg overflow-hidden min-h-[500px]">
                      {previewHTML && (
                        <iframe
                          srcDoc={previewHTML}
                          className="w-full h-[500px] border-0"
                          title="Preview"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Browse All Alternatives Button */}
              <div className="mt-8 text-center">
                <Link to="/solutions" className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium hover:opacity-90 transition-colors">
                  Browse All Alternatives
                </Link>
              </div>
              
              {/* Quick Access Section */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-4 text-center">Quick Access</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <a href="/solutions/sell-ebook-no-monthly-fee" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Sell Ebook</a>
                  <a href="/solutions/web-form-to-telegram-no-backend" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Telegram Form</a>
                  <a href="/solutions/self-hosted-linktree-alternative" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Link Tree</a>
                  <a href="/solutions/one-page-site-with-payment" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Payment Page</a>
                  <a href="/solutions/bypass-gumroad-transaction-fees" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Bypass Gumroad</a>
                  <a href="/solutions/collect-leads-no-database" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Collect Leads</a>
                  <a href="/solutions/create-landing-page-no-code" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Landing Page</a>
                  <a href="/solutions/host-static-site-for-free" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Free Hosting</a>
                  <a href="/solutions/sell-digital-products-simple" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Digital Products</a>
                  <a href="/solutions/create-email-capture-form" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Email Capture</a>
                  <a href="/solutions/simple-contact-form-no-backend" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Contact Form</a>
                  <a href="/solutions/sell-services-online" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Sell Services</a>
                  <a href="/solutions/create-resume-site" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Resume Site</a>
                  <a href="/solutions/portfolio-site-no-cms" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Portfolio</a>
                  <a href="/solutions/create-blog-no-cms" className="text-xs text-slate-500 hover:text-blue-500 transition-colors">Blog</a>
                </div>
              </div>
              
              {/* Footer */}
              <div className="mt-12 text-center text-sm text-slate-500">
                <p>Support: 457239850@qq.com</p>
                <p className="mt-2">SaaS is dead, logic lives forever. This is your independent asset.</p>
              </div>
            </div>
          </div>
        } />
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/:slug" element={<Page />} />
      </Routes>
    </Router>
  )
}

export default App
