import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">ChinaMediGuide</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Medical Services for Foreigners in China
      </p>
      <div className="flex gap-4">
        <Link
          href="/en"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          English
        </Link>
        <Link
          href="/zh"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
        >
          中文
        </Link>
        <Link
          href="/ja"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
        >
          日本語
        </Link>
        <Link
          href="/ko"
          className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
        >
          한국어
        </Link>
      </div>
    </main>
  )
}
