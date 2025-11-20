import React from 'react'
import { Github, Twitter, Linkedin, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculator Hub</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Your one-stop solution for all calculations. From finance to health, 
              we've got you covered with 15+ professional calculators.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/finance" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Finance Calculators</a></li>
              <li><a href="/health" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Health Calculators</a></li>
              <li><a href="/converters" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Converters</a></li>
              <li><a href="/math" className="text-gray-600 dark:text-gray-400 hover:text-primary-600">Math Calculators</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Calculator Hub Team © 2025
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
