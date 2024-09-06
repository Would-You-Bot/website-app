const path = require('path')
const fs = require('fs')

// Get the page name from the command-line arguments
const pageName = process.argv[2]

if (!pageName) {
  console.error('Please provide a page name.')
  process.exit(1)
}

// Capitalize the page name for the component name
const componentName = pageName.charAt(0).toUpperCase() + pageName.slice(1)

const pageContent = `
export default function ${componentName}() {
  return (
    <main className="flex mx-auto w-full max-w-8xl flex-col gap-8 px-8">
      <></>
    </main>
  )
}
`

// Manually set the folder path to go into app/
const folderPath = path.join('app', pageName)
const filePath = path.join(folderPath, 'page.tsx')

fs.mkdirSync(folderPath, { recursive: true })
fs.writeFileSync(filePath, pageContent.trim())

console.log('Page created at:', filePath)
