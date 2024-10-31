export default function Footer() {
  return (
    <footer className="mt-auto text-center">
        <div className="flex justify-center">
            <span>© 2024&nbsp;
                <a href="https://pomogoo.vercel.app/" className="hover:underline">PomoGoo™</a><br />
            </span>
            <ul>
                <li className="px-6">
                   <a href="/about">About</a>
                   
                </li>
            </ul>
        </div>
        <span className="text-xs">Created by&nbsp;<a target="_blank" rel="noopener" href="https://x.com/seriugoose">seriu</a></span>
    </footer>
  )
}
