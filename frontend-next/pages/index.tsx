import Image from 'next/image'
import { Inter } from 'next/font/google'
import FirstPost from './posts/firstPost'
import Link from 'next/link'
import { getSortedPostsData } from '../lib/posts';
import utilStyles from '../styles/utils.module.css'

const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
  }

export default function Home({ allPostsData }: any) {
  return <>
    <h1 className="title">
    Read <Link href="/posts/firstPost">this page!</Link>
    </h1>
    <div>
        <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
            <h2 className={utilStyles.headingLg}>Blog</h2>
            <ul className={utilStyles.list}>
            {allPostsData.map(({ id, date, title }: any) => (
                <li className={utilStyles.listItem} key={id}>
                {title}
                <br />
                {id}
                <br />
                {date}
                </li>
            ))}
        </ul>
      </section>
    </div>
  </>
}
