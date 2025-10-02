import Button from '@/components/button'

export default function Home (): React.ReactNode {
  return (
    <div className='font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1 className='text-4xl font-bold text-center sm:text-left animate-bounce text-blueberry-950'>
          Miaou
        </h1>
        <Button size='sm' variant='outline' />
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <p>Miaou footer</p>
      </footer>
    </div>
  )
}
